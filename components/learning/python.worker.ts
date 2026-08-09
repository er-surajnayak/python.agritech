/// <reference lib="webworker" />

import type { PyodideAPI, PyodideConfig } from "pyodide";

interface RunRequest {
  type: "run";
  requestId: number;
  code: string;
  inputs?: string[];
  trace?: boolean;
}

interface TraceVariable {
  name: string;
  value: string;
  type: string;
}

interface TraceStep {
  lineNumber: number;
  code: string;
  frameName?: string;
  callStack?: string[];
  variables: TraceVariable[];
  output: string;
  error?: string;
}

interface TraceResult {
  output: string;
  error: string | null;
  trace: TraceStep[];
  truncated: boolean;
}

const workerScope = self as DedicatedWorkerGlobalScope;
let stdout: string[] = [];
let stderr: string[] = [];

interface PyodideLoaderModule {
  loadPyodide(options?: PyodideConfig): Promise<PyodideAPI>;
}

async function createRuntime() {
  const indexURL = import.meta.env.DEV ? "/node_modules/pyodide/" : "/pyodide/";
  const loaderURL = new URL(`${indexURL}pyodide.mjs`, workerScope.location.origin).href;
  const { loadPyodide } = await import(/* @vite-ignore */ loaderURL) as PyodideLoaderModule;
  return loadPyodide({
    indexURL,
    packageBaseUrl: "https://cdn.jsdelivr.net/pyodide/v314.0.3/full/",
    stdout: (message) => stdout.push(message),
    stderr: (message) => stderr.push(message),
  });
}

const runtimePromise = createRuntime();

workerScope.onmessage = async ({ data }: MessageEvent<RunRequest>) => {
  if (data.type !== "run") return;

  workerScope.postMessage({ type: "loading", requestId: data.requestId });
  stdout = [];
  stderr = [];

  try {
    const runtime = await runtimePromise;
    workerScope.postMessage({ type: "running", requestId: data.requestId });
    const globals = runtime.toPy({});

    try {
      await runtime.loadPackagesFromImports(data.code);
      let code = data.code;
      if (data.trace) {
        globals.set("__di_user_code", data.code);
        globals.set("__di_has_inputs", Boolean(data.inputs));
        const inputValues = runtime.toPy(data.inputs ?? []);
        globals.set("__di_input_values", inputValues);
        inputValues.destroy();
        code = `
import builtins
import contextlib
import io
import json
import sys
import traceback

__di_original_input = builtins.input
__di_answers = iter(__di_input_values)
__di_console = io.StringIO()
__di_trace = []
__di_pending = {}
__di_lines = __di_user_code.splitlines()
__di_error = None
__di_trace_limit = 250
__di_truncated = False

def __di_input(prompt=""):
    try:
        value = next(__di_answers)
    except StopIteration as error:
        raise EOFError("No simulated response remains for this input() call.") from error
    print(f"{prompt}{value}")
    return value

def __di_snapshot(frame):
    values = []
    for name, value in frame.f_locals.items():
        if name.startswith("__"):
            continue
        try:
            rendered = repr(value)
        except Exception:
            rendered = "<unavailable>"
        if len(rendered) > 120:
            rendered = rendered[:117] + "..."
        values.append({"name": name, "value": rendered, "type": type(value).__name__})
    return values

def __di_append(frame, line_number, error=None):
    global __di_truncated
    if len(__di_trace) >= __di_trace_limit:
        __di_truncated = True
        return
    source = __di_lines[line_number - 1] if 0 < line_number <= len(__di_lines) else ""
    stack = []
    current_frame = frame
    while current_frame and current_frame.f_code.co_filename == "<lesson-playground>":
        frame_name = current_frame.f_code.co_name
        stack.append("Main Program" if frame_name == "<module>" else f"{frame_name}()")
        current_frame = current_frame.f_back
    stack.reverse()
    step = {
        "lineNumber": line_number,
        "code": source,
        "frameName": "Main Program" if frame.f_code.co_name == "<module>" else f"{frame.f_code.co_name}()",
        "callStack": stack,
        "variables": __di_snapshot(frame),
        "output": __di_console.getvalue().rstrip("\\n"),
    }
    if error:
        step["error"] = error
    __di_trace.append(step)

def __di_tracer(frame, event, arg):
    if frame.f_code.co_filename != "<lesson-playground>":
        return __di_tracer
    frame_id = id(frame)
    if event == "line":
        previous = __di_pending.get(frame_id)
        if previous is not None:
            __di_append(frame, previous)
        __di_pending[frame_id] = frame.f_lineno
    elif event == "exception":
        previous = __di_pending.pop(frame_id, frame.f_lineno)
        error_type, error_value, _ = arg
        __di_append(frame, previous, f"{error_type.__name__}: {error_value}")
    elif event == "return":
        previous = __di_pending.pop(frame_id, None)
        if previous is not None:
            __di_append(frame, previous)
    return __di_tracer

if __di_has_inputs:
    builtins.input = __di_input

__di_scope = {"__builtins__": builtins}
try:
    with contextlib.redirect_stdout(__di_console), contextlib.redirect_stderr(__di_console):
        sys.settrace(__di_tracer)
        try:
            exec(compile(__di_user_code, "<lesson-playground>", "exec"), __di_scope, __di_scope)
        finally:
            sys.settrace(None)
except Exception:
    __di_error = traceback.format_exc().strip()
finally:
    builtins.input = __di_original_input

json.dumps({
    "output": __di_console.getvalue().rstrip("\\n"),
    "error": __di_error,
    "trace": __di_trace,
    "truncated": __di_truncated,
})
`;
      } else if (data.inputs) {
        globals.set("__di_user_code", data.code);
        const inputValues = runtime.toPy(data.inputs);
        globals.set("__di_input_values", inputValues);
        inputValues.destroy();
        code = `
import builtins

__di_original_input = builtins.input
__di_answers = iter(__di_input_values)

def __di_input(prompt=""):
    try:
        value = next(__di_answers)
    except StopIteration as error:
        raise EOFError("No simulated response remains for this input() call.") from error
    print(f"{prompt}{value}")
    return value

builtins.input = __di_input
try:
    exec(compile(__di_user_code, "<lesson-playground>", "exec"))
finally:
    builtins.input = __di_original_input
`;
      }
      const result = await runtime.runPythonAsync(code, { globals });
      if (data.trace) {
        const traced = JSON.parse(String(result)) as TraceResult;
        const output = traced.error || traced.output || "Program completed with no output.";
        workerScope.postMessage({
          type: traced.error ? "error" : "result",
          requestId: data.requestId,
          output,
          trace: traced.trace,
          traceTruncated: traced.truncated,
        });
        return;
      }
      const resultText = result == null ? "" : String(result);
      const output = [...stdout, ...stderr, ...(resultText ? [resultText] : [])].join("\n");
      workerScope.postMessage({
        type: "result",
        requestId: data.requestId,
        output: output || "Program completed with no output.",
      });
    } finally {
      globals.destroy();
    }
  } catch (error) {
    workerScope.postMessage({
      type: "error",
      requestId: data.requestId,
      output: error instanceof Error ? error.message : String(error),
    });
  }
};

export {};
