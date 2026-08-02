import { Button, CodeSnippet, DataTable, Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow, Tag, TextInput, Tile } from "@carbon/react";
import { AgricultureAnalytics, ArrowDown, Checkmark, Code, Flow, Menu, Renew, WarningAlt } from "@carbon/icons-react";
import { useEffect, useState } from "react";
import { CodePlayground } from "@/components/learning/CodePlayground";
import { CodeStepRunner, DecisionTimeline } from "@/components/learning/IfStatementLearningBlocks";
import { inspectMatchCaseExecution } from "@/components/learning/if-statement-inspector";
import { WorkflowAnimation } from "@/components/learning/WorkflowAnimation";
import type { MatchCaseExampleContent, MatchCaseLessonDevelopmentPack, MatchCaseOptionContent, PlaygroundContent } from "@/types/content";
import type { PlaygroundExecution } from "@/components/learning/usePythonRunner";

function patternValue(pattern: string) {
  return pattern === "_" ? null : pattern.replace(/^['"]|['"]$/g, "");
}

function selectedCase(options: MatchCaseOptionContent[], value: string) {
  const exact = options.findIndex((option) => patternValue(option.pattern) === value);
  return exact >= 0 ? exact : options.findIndex((option) => option.pattern === "_");
}

export function MatchCaseStoryCard({ content }: { content: MatchCaseLessonDevelopmentPack["story"] }) {
  return <><section id="match-story" className="lesson-card match-story" aria-labelledby="match-story-title"><p className="lesson-section-label"><AgricultureAnalytics size={16} /> Smart Farm story continuation</p><h2 id="match-story-title">{content.title}</h2><p>{content.body}</p><div className="match-story-grid"><Tile><span>The system already handles</span>{content.operations.map((item) => <strong key={item}>{item}</strong>)}</Tile><ArrowDown size={22} /><Tile><span>New fixed-value menu</span>{content.menu.map((item) => <code key={item}>{item}</code>)}</Tile></div></section><WorkflowAnimation id="match-story-workflow" title={content.workflow.title} description={content.workflow.description} steps={content.workflow.steps} /></>;
}

export function WhyMatchCard({ content }: { content: MatchCaseLessonDevelopmentPack["whyMatch"] }) {
  return <section id="why-match" className="lesson-card why-match" aria-labelledby="why-match-title"><p className="lesson-section-label"><Code size={16} /> Why not only if-elif?</p><h2 id="why-match-title">{content.title}</h2><p>{content.body}</p><div className="why-match-grid"><CodeSnippet type="multi" feedback="Copied">{content.ifElifCode}</CodeSnippet><div>{content.scalingCases.map((item) => <Tile key={item}><strong>{item}</strong><span>Repeated equality branches</span></Tile>)}</div></div></section>;
}

export function MatchDefinitionCard({ content }: { content: MatchCaseLessonDevelopmentPack["definition"] }) {
  return <section id="match-definition" className="lesson-card match-definition" aria-labelledby="match-definition-title"><p className="lesson-section-label"><Flow size={16} /> What is match-case?</p><h2 id="match-definition-title">{content.title}</h2><p>{content.body}</p><ol>{content.rules.map((rule, index) => <li key={rule}><span>{index + 1}</span><strong>{rule}</strong></li>)}</ol></section>;
}

export function MatchSyntaxBreakdown({ content }: { content: MatchCaseLessonDevelopmentPack["syntax"] }) {
  const [active, setActive] = useState(0);
  return <section id="match-syntax" className="lesson-card match-syntax" aria-labelledby="match-syntax-title"><p className="lesson-section-label"><Code size={16} /> Syntax</p><h2 id="match-syntax-title">{content.title}</h2><p>{content.body}</p><CodeSnippet type="multi" feedback="Copied">{content.template}</CodeSnippet><div className="match-syntax-parts">{content.parts.map((part, index) => <button type="button" key={part.label} className={active === index ? "is-active" : ""} onClick={() => setActive(index)}><code>{part.token}</code><strong>{part.label}</strong></button>)}</div><Tile aria-live="polite"><strong>{content.parts[active].label}</strong><p>{content.parts[active].description}</p></Tile></section>;
}

export function PatternMatchingTimeline({ options, value, visibleCount = options.length }: { options: MatchCaseOptionContent[]; value: string; visibleCount?: number }) {
  const selected = selectedCase(options, value);
  return <div className="pattern-matching-timeline" aria-label={`Case ${selected + 1} selected for ${value}`}><div className="match-value"><span>Input value</span><strong>{value}</strong></div><ArrowDown size={20} /><ol>{options.map((option, index) => { const compared = index <= selected; const matched = index === selected; return <li key={option.id} className={`${matched ? "is-matched" : compared ? "is-compared" : "is-skipped"} ${index < visibleCount ? "is-visible" : "is-hidden"}`}><span>Case {index + 1}</span><code>{option.pattern}</code><Tag size="sm" type={matched ? "green" : compared ? "red" : "gray"}>{matched ? "Matched" : compared ? "No match" : "Skipped"}</Tag><strong>{option.output}</strong></li>; })}</ol></div>;
}

export function CaseSelector({ options, value, onChange, label }: { options: MatchCaseOptionContent[]; value: string; onChange: (value: string) => void; label: string }) {
  const knownValues = options.filter((item) => item.pattern !== "_");
  return <div className="case-selector" aria-label={label}>{knownValues.map((option) => <Button key={option.id} size="sm" kind={value === option.label ? "primary" : "tertiary"} onClick={() => onChange(option.label)}>{option.label}</Button>)}<Button size="sm" kind={!knownValues.some((option) => patternValue(option.pattern) === value) ? "primary" : "tertiary"} onClick={() => onChange("Other")}>Other</Button></div>;
}

export function MatchCaseVisualizer({ content, id = "match-first-example" }: { content: MatchCaseExampleContent; id?: string }) {
  const [value, setValue] = useState(content.defaultValue);
  const [visibleCount, setVisibleCount] = useState(content.options.length);
  useEffect(() => { const selected = selectedCase(content.options, value); if (visibleCount > selected) return; const timer = window.setTimeout(() => setVisibleCount((count) => count + 1), 420); return () => window.clearTimeout(timer); }, [content.options, value, visibleCount]);
  return <section id={id} className="lesson-card match-case-visualizer" aria-labelledby={`${id}-title`}><div className="lesson-card-heading"><div><p className="lesson-section-label"><Flow size={16} /> Match-Case Visualizer</p><h2 id={`${id}-title`}>{content.title}</h2><p>{content.explanation}</p></div><Button size="sm" kind="ghost" renderIcon={Renew} onClick={() => setVisibleCount(0)}>Replay matching</Button></div><div className="match-visualizer-grid"><div><CodeSnippet type="multi" feedback="Copied">{content.code}</CodeSnippet><CaseSelector options={content.options} value={value} label={`Select ${content.variable}`} onChange={(nextValue) => { setValue(nextValue); setVisibleCount(content.options.length); }} /></div><PatternMatchingTimeline options={content.options} value={value} visibleCount={visibleCount} /></div></section>;
}

export function AgritechMatchExamples({ examples }: { examples: MatchCaseLessonDevelopmentPack["agritechExamples"] }) {
  const [selected, setSelected] = useState(0);
  return <section id="match-agritech-examples" className="agritech-match-examples"><div>{examples.map((example, index) => <Button key={example.title} size="sm" kind={selected === index ? "primary" : "ghost"} onClick={() => setSelected(index)}>{example.title}</Button>)}</div><MatchCaseVisualizer key={examples[selected].title} content={examples[selected]} id="match-agritech-active" /></section>;
}

export function MenuSimulator({ content }: { content: MatchCaseLessonDevelopmentPack["menuSimulator"] }) {
  const [menuIndex, setMenuIndex] = useState(0);
  const [optionIndex, setOptionIndex] = useState(0);
  const menu = content.menus[menuIndex];
  const option = menu.options[optionIndex];
  const switchMenu = (index: number) => { setMenuIndex(index); setOptionIndex(0); };
  return <section id="menu-simulator" className="lesson-card menu-simulator" aria-labelledby="menu-simulator-title"><p className="lesson-section-label"><Menu size={16} /> Menu Simulator</p><h2 id="menu-simulator-title">{content.title}</h2><p>{content.body}</p><div className="menu-type-tabs">{content.menus.map((item, index) => <Button key={item.id} size="sm" kind={index === menuIndex ? "primary" : "ghost"} onClick={() => switchMenu(index)}>{item.label}</Button>)}</div><div className="menu-simulator-grid"><div><span>{menu.prompt}</span>{menu.options.map((item, index) => <button type="button" key={item.id} className={index === optionIndex ? "is-selected" : ""} onClick={() => setOptionIndex(index)}><span>{index + 1}</span><strong>{item.label}</strong></button>)}</div><Tile aria-live="polite"><Tag type="purple">Executed case</Tag><code>case {option.pattern}:</code><strong>{option.output}</strong></Tile></div></section>;
}

export function MatchTraceTimeline({ code, execution }: { code: string; execution: PlaygroundExecution }) {
  const inspection = inspectMatchCaseExecution(code, execution);
  return <section className="match-trace-timeline" aria-labelledby="match-trace-title"><div><p className="lesson-section-label"><Flow size={16} /> Pattern Matching Timeline</p><h3 id="match-trace-title">Follow the actual Python case checks</h3></div><ol>{inspection.cases.map((item, index) => <li key={`${item.headerLine}-${item.pattern}`} className={item.selected ? "is-selected" : item.evaluated ? "is-evaluated" : "is-skipped"}><span>{index + 1}</span><code>case {item.pattern}</code><Tag size="sm" type={item.selected ? "green" : item.evaluated ? "red" : "gray"}>{item.selected ? "Executed" : item.evaluated ? "Compared" : "Skipped"}</Tag></li>)}</ol></section>;
}

export function MatchCasePlayground({ content, fields }: { content: PlaygroundContent; fields: MatchCaseLessonDevelopmentPack["simulatorFields"] }) {
  const field = fields[0];
  const [input, setInput] = useState(field.defaultValue);
  return <CodePlayground id="playground" content={content} className="match-playground" inputValues={[input]} traceExecution renderSupplement={(code, execution) => <div className="if-playground-supplement"><div className="if-playground-input"><TextInput id="match-playground-input" labelText={field.label} helperText="Case matching is case-sensitive; try Rice, Wheat, Cotton, or another crop." value={input} onChange={(event) => setInput(event.currentTarget.value)} /><Button size="sm" kind="ghost" renderIcon={Renew} onClick={() => setInput(field.defaultValue)}>Reset input</Button></div><MatchTraceTimeline code={code} execution={execution} /><DecisionTimeline input={`${field.label}: ${input}`} code={code} execution={execution} mode="match-case" /><CodeStepRunner key={`${execution.status}-${execution.trace.length}-${execution.output}`} code={code} execution={execution} mode="match-case" /></div>} />;
}

export function MatchComparisonCard({ content }: { content: MatchCaseLessonDevelopmentPack["comparison"] }) {
  const headers = [{ key: "situation", header: "Situation" }, { key: "bestChoice", header: "Best choice" }, { key: "reason", header: "Reason" }];
  return <section id="compare-choose" className="lesson-card match-comparison" aria-labelledby="match-comparison-title"><p className="lesson-section-label"><Flow size={16} /> Compare & Choose</p><h2 id="match-comparison-title">{content.title}</h2><p>{content.body}</p><DataTable rows={content.rows.map((row, index) => ({ id: String(index), ...row }))} headers={headers}>{({ rows, headers: tableHeaders, getHeaderProps, getRowProps, getTableProps }) => <TableContainer><Table {...getTableProps()}><TableHead><TableRow>{tableHeaders.map((header) => <TableHeader {...getHeaderProps({ header })} key={header.key}>{header.header}</TableHeader>)}</TableRow></TableHead><TableBody>{rows.map((row) => <TableRow {...getRowProps({ row })} key={row.id}>{row.cells.map((cell) => <TableCell key={cell.id}>{cell.value}</TableCell>)}</TableRow>)}</TableBody></Table></TableContainer>}</DataTable></section>;
}

export function StructureAdvisor({ content }: { content: MatchCaseLessonDevelopmentPack["structureAdvisor"] }) {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [choice, setChoice] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const scenario = content.scenarios[scenarioIndex];
  const choices = ["if", "if-else", "if-elif-else", "nested-if", "match-case"];
  const next = () => { setScenarioIndex((value) => (value + 1) % content.scenarios.length); setChoice(null); setRevealed(false); };
  const correct = choice === scenario.answer;
  return <section id="structure-advisor" className="lesson-card structure-advisor" aria-labelledby="structure-advisor-title"><p className="lesson-section-label"><Flow size={16} /> Structure Advisor</p><h2 id="structure-advisor-title">{content.title}</h2><p>{content.body}</p><Tile><span>Problem {scenarioIndex + 1} of {content.scenarios.length}</span><strong>{scenario.prompt}</strong></Tile><div className="structure-choice-grid">{choices.map((item) => <Button key={item} size="sm" kind={choice === item ? "primary" : "tertiary"} onClick={() => { setChoice(item); setRevealed(false); }}>{item}</Button>)}</div><div className="structure-actions"><Button size="sm" disabled={!choice} onClick={() => setRevealed(true)}>Ask advisor</Button><Button size="sm" kind="ghost" onClick={next}>Next problem</Button></div>{revealed && <Tile className={correct ? "is-correct" : "is-incorrect"} aria-live="polite">{correct ? <Checkmark size={20} /> : <WarningAlt size={20} />}<div><strong>{correct ? "Appropriate structure" : `Recommended: ${scenario.answer}`}</strong><p>{scenario.explanation}</p></div></Tile>}</section>;
}
