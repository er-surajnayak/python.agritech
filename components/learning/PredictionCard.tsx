import { Button, CodeSnippet, RadioButton, RadioButtonGroup, Tag, Tile } from "@carbon/react";
import { Help } from "@carbon/icons-react";
import { useState } from "react";
import type { OutputPredictionContent } from "@/types/content";

export function PredictionCard({ id, label = "Predict the output", content }: { id: string; label?: string; content: OutputPredictionContent }) {
  const [selections, setSelections] = useState<Record<number, string>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  return (
    <section id={id} className="lesson-card predict-output-card" aria-labelledby={`${id}-title`}>
      <p className="lesson-section-label"><Help size={16} /> {label}</p><h2 id={`${id}-title`}>{content.title}</h2><p>{content.body}</p>
      <div className="prediction-grid">{content.predictions.map((prediction, index) => {
        const isRevealed = Boolean(revealed[index]);
        const isCorrect = selections[index] === prediction.answer;
        return <Tile key={prediction.title} className="prediction-case"><Tag type="blue">{prediction.title}</Tag><CodeSnippet type="multi" feedback="Copied">{prediction.code}</CodeSnippet><RadioButtonGroup name={`${id}-prediction-${index}`} legendText="Choose the expected output" valueSelected={selections[index]} onChange={(value) => { setSelections((current) => ({ ...current, [index]: String(value) })); setRevealed((current) => ({ ...current, [index]: false })); }}>{prediction.options.map((option, optionIndex) => <RadioButton key={option} id={`${id}-prediction-${index}-${optionIndex}`} value={option} labelText={option} />)}</RadioButtonGroup><Button size="sm" kind="tertiary" disabled={!selections[index] || isRevealed} onClick={() => setRevealed((current) => ({ ...current, [index]: true }))}>Reveal result</Button><div className={`prediction-feedback${isRevealed ? " is-visible" : ""}`} aria-live="polite">{isRevealed ? <><Tag type={isCorrect ? "green" : "red"}>{isCorrect ? "Correct" : "Review"}</Tag><strong>Output: {prediction.answer}</strong><p>{prediction.explanation}</p></> : <p>Predict first, then reveal the result.</p>}</div></Tile>;
      })}</div>
    </section>
  );
}
