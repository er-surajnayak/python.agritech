import { Button, Tag } from "@carbon/react";
import { ArrowLeft, ArrowRight, Flow } from "@carbon/icons-react";
import { useState } from "react";
import type { WorkflowStep } from "@/types/content";

export function WorkflowAnimation({
  id,
  title,
  description,
  steps,
}: {
  id: string;
  title: string;
  description: string;
  steps: WorkflowStep[];
}) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id={id} className="lesson-card workflow-card" aria-labelledby={`${id}-title`}>
      <div className="lesson-card-heading workflow-heading">
        <div>
          <p className="lesson-section-label"><Flow size={16} /> Visual workflow</p>
          <h2 id={`${id}-title`}>{title}</h2>
          <p>{description}</p>
        </div>
        <Tag size="sm" type="blue">Step {activeStep + 1} of {steps.length}</Tag>
      </div>

      <ol className="workflow-steps" aria-label={`${title} steps`}>
        {steps.map((step, index) => (
          <li
            key={step.title}
            className={index === activeStep ? "is-active" : index < activeStep ? "is-complete" : ""}
            style={{ "--workflow-index": index } as React.CSSProperties}
          >
            <Button
              kind="ghost"
              size="sm"
              onClick={() => setActiveStep(index)}
              aria-current={index === activeStep ? "step" : undefined}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {step.title}
            </Button>
          </li>
        ))}
      </ol>

      <div className="workflow-detail" key={activeStep}>
        <span>{String(activeStep + 1).padStart(2, "0")}</span>
        <div><h3>{steps[activeStep].title}</h3><p>{steps[activeStep].description}</p></div>
      </div>

      <div className="workflow-controls">
        <Button kind="ghost" size="sm" renderIcon={ArrowLeft} onClick={() => setActiveStep((step) => Math.max(0, step - 1))} disabled={activeStep === 0}>Previous step</Button>
        <Button kind="ghost" size="sm" renderIcon={ArrowRight} onClick={() => setActiveStep((step) => Math.min(steps.length - 1, step + 1))} disabled={activeStep === steps.length - 1}>Next step</Button>
      </div>
    </section>
  );
}
