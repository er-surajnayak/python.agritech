import { useCallback, useEffect, useRef, useState } from "react";

export type RunnerStatus = "idle" | "loading" | "running" | "success" | "error";

export interface PythonTraceVariable {
  name: string;
  value: string;
  type: string;
}

export interface PythonTraceStep {
  lineNumber: number;
  code: string;
  frameName?: string;
  callStack?: string[];
  variables: PythonTraceVariable[];
  output: string;
  error?: string;
}

export interface PlaygroundExecution {
  status: RunnerStatus;
  output: string;
  trace: PythonTraceStep[];
  traceTruncated: boolean;
}

interface WorkerResponse {
  type: "loading" | "running" | "result" | "error";
  requestId: number;
  output?: string;
  trace?: PythonTraceStep[];
  traceTruncated?: boolean;
}

const EXECUTION_TIMEOUT_MS = 30_000;

export function usePythonRunner() {
  const workerRef = useRef<Worker | null>(null);
  const requestIdRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [status, setStatus] = useState<RunnerStatus>("idle");
  const [output, setOutput] = useState("Run the code to see Python output here.");
  const [trace, setTrace] = useState<PythonTraceStep[]>([]);
  const [traceTruncated, setTraceTruncated] = useState(false);

  const clearExecutionTimeout = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  }, []);

  const disposeWorker = useCallback(() => {
    workerRef.current?.terminate();
    workerRef.current = null;
    clearExecutionTimeout();
  }, [clearExecutionTimeout]);

  const createWorker = useCallback(() => {
    const worker = new Worker(new URL("./python.worker.ts", import.meta.url), { type: "module" });
    worker.onmessage = ({ data }: MessageEvent<WorkerResponse>) => {
      if (data.requestId !== requestIdRef.current) return;
      if (data.type === "loading") setStatus("loading");
      if (data.type === "running") setStatus("running");
      if (data.type === "result" || data.type === "error") {
        clearExecutionTimeout();
        setStatus(data.type === "result" ? "success" : "error");
        setOutput(data.output ?? "Python did not return an output message.");
        setTrace(data.trace ?? []);
        setTraceTruncated(Boolean(data.traceTruncated));
      }
    };
    worker.onerror = () => {
      clearExecutionTimeout();
      setStatus("error");
      setOutput("The Python runtime could not start. Please reset and try again.");
      setTrace([]);
      setTraceTruncated(false);
      disposeWorker();
    };
    workerRef.current = worker;
    return worker;
  }, [clearExecutionTimeout, disposeWorker]);

  const run = useCallback((code: string, inputs?: string[], traceExecution = false) => {
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    setStatus("loading");
    setOutput("Preparing the Python runtime…");
    setTrace([]);
    setTraceTruncated(false);
    const worker = workerRef.current ?? createWorker();
    worker.postMessage({ type: "run", requestId, code, inputs, trace: traceExecution });

    clearExecutionTimeout();
    timeoutRef.current = setTimeout(() => {
      setStatus("error");
      setOutput("Execution stopped after 30 seconds. Reset the playground and try a smaller program.");
      setTrace([]);
      setTraceTruncated(false);
      disposeWorker();
    }, EXECUTION_TIMEOUT_MS);
  }, [clearExecutionTimeout, createWorker, disposeWorker]);

  const clear = useCallback(() => {
    requestIdRef.current += 1;
    clearExecutionTimeout();
    setStatus("idle");
    setOutput("Run the code to see Python output here.");
    setTrace([]);
    setTraceTruncated(false);
  }, [clearExecutionTimeout]);

  useEffect(() => disposeWorker, [disposeWorker]);

  return { status, output, trace, traceTruncated, run, clear };
}
