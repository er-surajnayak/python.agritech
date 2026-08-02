import { Button, Tag, Tile } from "@carbon/react";
import { ChevronLeft, ChevronRight, Code, Pause, Play, Restart } from "@carbon/icons-react";
import { useEffect, useState } from "react";
import type { PlaygroundExecution, PythonTraceVariable } from "@/components/learning/usePythonRunner";

const traceTypeColors: Record<string, "blue" | "cyan" | "purple" | "teal" | "gray" | "warm-gray"> = {
  int: "blue",
  float: "cyan",
  str: "purple",
  bool: "teal",
  NoneType: "gray",
};

function TraceTypeBadge({ variable }: { variable: PythonTraceVariable }) {
  return <Tag size="sm" type={traceTypeColors[variable.type] ?? "warm-gray"}>{variable.type}</Tag>;
}

export function CodeTracePanel({ execution }: { execution: PlaygroundExecution }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const safeActiveIndex = Math.min(activeIndex, Math.max(0, execution.trace.length - 1));
  const active = execution.trace[safeActiveIndex];

  useEffect(() => {
    if (!playing || !execution.trace.length) return;
    if (safeActiveIndex >= execution.trace.length - 1) return;
    const timer = window.setTimeout(() => {
      setActiveIndex(safeActiveIndex + 1);
      if (safeActiveIndex + 1 >= execution.trace.length - 1) setPlaying(false);
    }, 650);
    return () => window.clearTimeout(timer);
  }, [execution.trace.length, playing, safeActiveIndex]);

  function replay() {
    setActiveIndex(0);
    setPlaying(true);
  }

  return (
    <section className="code-trace-panel" aria-labelledby="code-trace-title">
      <div className="code-trace-heading"><div><Code size={20} /><div><p className="lesson-section-label">Execution explorer</p><h3 id="code-trace-title">Code Trace Panel</h3></div></div><Tag size="sm" type={execution.status === "error" ? "red" : execution.status === "success" ? "green" : "gray"}>{execution.status}</Tag></div>
      {!execution.trace.length ? <Tile className="code-trace-empty"><p>{execution.status === "loading" || execution.status === "running" ? "Python is collecting execution events…" : "Run the playground to inspect each executed line, variable value, type, output, and error."}</p></Tile> : <>
        <div className="code-trace-controls"><Button hasIconOnly kind="ghost" size="sm" renderIcon={ChevronLeft} iconDescription="Previous trace step" disabled={safeActiveIndex === 0 || playing} onClick={() => setActiveIndex((index) => Math.max(0, index - 1))} /><Button size="sm" kind="tertiary" renderIcon={playing ? Pause : Play} onClick={() => setPlaying((value) => !value)} disabled={execution.trace.length < 2}>{playing ? "Pause trace" : "Play trace"}</Button><Button hasIconOnly kind="ghost" size="sm" renderIcon={ChevronRight} iconDescription="Next trace step" disabled={safeActiveIndex === execution.trace.length - 1 || playing} onClick={() => setActiveIndex((index) => Math.min(execution.trace.length - 1, index + 1))} /><Button size="sm" kind="ghost" renderIcon={Restart} onClick={replay}>Replay</Button><span>Step {safeActiveIndex + 1} of {execution.trace.length}</span></div>
        <ol className="code-trace-timeline" aria-label="Executed Python lines">{execution.trace.map((step, index) => <li key={`${step.lineNumber}-${index}`} className={index === safeActiveIndex ? "is-active" : index < safeActiveIndex ? "is-complete" : ""}><button type="button" onClick={() => { setPlaying(false); setActiveIndex(index); }} aria-current={index === safeActiveIndex ? "step" : undefined}><span>{step.lineNumber}</span><code>{step.code.trim() || "Blank line"}</code></button></li>)}</ol>
        <div className="code-trace-detail" aria-live="polite">
          <div className="code-trace-current"><span>Current executed line</span><strong>Line {active.lineNumber}</strong><code>{active.code}</code>{active.error && <Tile className="code-trace-error"><strong>Error encountered</strong><code>{active.error}</code></Tile>}</div>
          <div className="code-trace-variables"><span>Variables after this line</span>{active.variables.length ? <div>{active.variables.map((variable) => <Tile key={variable.name}><strong>{variable.name}</strong><code>{variable.value}</code><TraceTypeBadge variable={variable} /></Tile>)}</div> : <p>No learner variables exist yet.</p>}</div>
          <div className="code-trace-output"><span>Console output at this step</span><pre><code>{active.output || "No output yet."}</code></pre></div>
        </div>
        {execution.traceTruncated && <p className="code-trace-limit">Trace limited to the first 250 execution events to keep the learning interface responsive.</p>}
      </>}
    </section>
  );
}
