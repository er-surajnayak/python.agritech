import { Button, InlineLoading, InlineNotification, Tag, TextArea } from "@carbon/react";
import { Play, Reset } from "@carbon/icons-react";
import { useState } from "react";
import type { ReactNode } from "react";
import { usePythonRunner } from "@/components/learning/usePythonRunner";
import type { PlaygroundExecution } from "@/components/learning/usePythonRunner";
import type { PlaygroundContent } from "@/types/content";

export function CodePlayground({
  id,
  content,
  className = "",
  renderSupplement,
  inputValues,
  outputLabel = "Output",
  traceExecution = false,
  validateCode,
}: {
  id: string;
  content: PlaygroundContent;
  className?: string;
  renderSupplement?: (code: string, execution: PlaygroundExecution) => ReactNode;
  inputValues?: string[];
  outputLabel?: string;
  traceExecution?: boolean;
  validateCode?: (code: string) => string | null;
}) {
  const [code, setCode] = useState(content.starterCode);
  const { status, output, trace, traceTruncated, run, clear } = usePythonRunner();
  const isBusy = status === "loading" || status === "running";
  const validationMessage = validateCode?.(code) ?? null;

  function reset() {
    setCode(content.starterCode);
    clear();
  }

  return (
    <section id={id} className={`lesson-card code-playground ${className}`.trim()} aria-labelledby={`${id}-title`}>
      <div className="lesson-card-heading">
        <div>
          <p className="lesson-section-label">Interactive playground</p>
          <h2 id={`${id}-title`}>{content.title}</h2>
          <p>{content.description}</p>
        </div>
        <Tag type="green" size="sm">Python 3.14</Tag>
      </div>

      <div className="playground-grid">
        <div className="playground-editor">
          <TextArea
            id={`${id}-editor`}
            labelText="Python code"
            helperText="Edit the code, then run it in the browser-based Python runtime."
            value={code}
            rows={8}
            onChange={(event) => setCode(event.currentTarget.value)}
            disabled={isBusy}
          />
          {validationMessage && <InlineNotification kind="warning" lowContrast hideCloseButton title="Run blocked for safety" subtitle={validationMessage} />}
          <div className="playground-actions">
            <Button size="md" renderIcon={Play} onClick={() => run(code, inputValues, traceExecution)} disabled={isBusy || !code.trim() || Boolean(validationMessage)}>
              {isBusy ? "Running…" : "Run code"}
            </Button>
            <Button size="md" kind="secondary" renderIcon={Reset} onClick={reset} disabled={isBusy}>
              Reset
            </Button>
            {isBusy && <InlineLoading description={status === "loading" ? "Loading Python" : "Executing code"} />}
          </div>
        </div>

        <div className="playground-output" aria-live="polite" aria-busy={isBusy}>
          <div className="playground-output-heading">
            <span>{outputLabel}</span>
            <Tag size="sm" type={status === "error" ? "red" : status === "success" ? "green" : "gray"}>
              {status}
            </Tag>
          </div>
          <pre><code>{output}</code></pre>
          <p>{content.expectedOutcome}</p>
        </div>
      </div>
      {renderSupplement?.(code, { status, output, trace, traceTruncated })}
    </section>
  );
}
