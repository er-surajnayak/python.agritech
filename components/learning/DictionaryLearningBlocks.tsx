import { Accordion, AccordionItem, Button, CodeSnippet, TextInput, Tile, Tag } from "@carbon/react";
import { AgricultureAnalytics, CheckmarkOutline, Code, Debug, Flow, Idea } from "@carbon/icons-react";
import { useState } from "react";
import type { DictionaryDevelopmentPack } from "@/types/content";

type Pack = DictionaryDevelopmentPack;

export function DictionaryStorySection({ story }: { story: Pack["story"] }) {
  return (
    <>
      <section id="story" className="lesson-card dictionary-story" aria-labelledby="story-title">
        <p className="lesson-section-label"><AgricultureAnalytics size={16} /> Real-world story</p>
        <h2 id="story-title">{story.title}</h2>
        <p>{story.body}</p>
        
        <div className="dictionary-problem-block">
          <h3>{story.problem.title}</h3>
          <p>{story.problem.body}</p>
          
          <div className="list-limit-comparison">
            <div className="limit-card">
              <span>Raw List representation</span>
              <code>{story.problem.listSnippet}</code>
            </div>
            <span className="limit-arrow">→</span>
            <div className="limit-card limit-card--alert">
              <span>What does index 4 represent?</span>
              <code>{story.problem.listAccessSnippet}</code>
              <small>Battery? Temperature? Crop? The index tells us nothing.</small>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function DictionaryCharacteristicsSection({ whatIsDict }: { whatIsDict: Pack["whatIsDict"] }) {
  return (
    <section id="characteristics" className="lesson-card dictionary-characteristics" aria-labelledby="characteristics-title">
      <p className="lesson-section-label"><Idea size={16} /> Concepts & characteristics</p>
      <h2 id="characteristics-title">{whatIsDict.title}</h2>
      <p>{whatIsDict.body}</p>
      
      <div className="characteristics-grid">
        {whatIsDict.characteristics.map((char, index) => {
          const [label, desc] = char.split(": ");
          return (
            <Tile className="char-tile" key={index}>
              <strong>{label}</strong>
              <p>{desc}</p>
            </Tile>
          );
        })}
      </div>
    </section>
  );
}

export function DictionaryCreationSection({ creation }: { creation: Pack["creation"] }) {
  return (
    <section id="creation" className="lesson-card dictionary-creation" aria-labelledby="creation-title">
      <p className="lesson-section-label"><Code size={16} /> Syntactic rules</p>
      <h2 id="creation-title">{creation.title}</h2>
      <p>{creation.body}</p>
      
      <div className="creation-examples-grid">
        {creation.examples.map((ex, index) => (
          <Tile key={index} className="example-tile">
            <strong>{ex.label}</strong>
            <pre><code>{ex.code}</code></pre>
            <small>{ex.note}</small>
          </Tile>
        ))}
      </div>

      <div className="empty-warning-block">
        <Tile className="empty-warning-tile">
          <strong>⚠️ Creating Empty Collections: Dictionary vs Set</strong>
          <p>
            Empty curly braces <code>{"{}"}</code> default to initializing an empty <strong>dictionary</strong>, NOT an empty set.
            This is a legacy behavior in Python because dictionaries were introduced first.
          </p>
          <div className="comparison-flex">
            <div>
              <span className="label-correct">Correct Empty Set</span>
              <code>empty_set = set()</code>
            </div>
            <div>
              <span className="label-incorrect">Empty Dictionary</span>
              <code>empty_dict = {"{}"}</code>
            </div>
          </div>
        </Tile>
      </div>
    </section>
  );
}

// ----------------------------------------------------
// DYNAMIC DICTIONARY VISUALIZER
// ----------------------------------------------------
interface TelemetryDict {
  id: number;
  crop: string;
  moisture: number;
  temperature: number;
  battery: number;
  status: string;
  [key: string]: string | number;
}

export function DictionaryVisualizer() {
  const [data, setData] = useState<TelemetryDict>({
    id: 101,
    crop: "Rice",
    moisture: 28,
    temperature: 31,
    battery: 82,
    status: "Active"
  });

  const [selectedKey, setSelectedKey] = useState<string>("crop");
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleUpdate() {
    if (!newKey.trim() || !newValue.trim()) {
      setError("Please supply both a key and a value.");
      return;
    }
    setError(null);
    const parsedValue = /^-?\d+$/.test(newValue) ? Number(newValue) : newValue;
    setData((current) => ({
      ...current,
      [newKey.trim()]: parsedValue
    }));
    setSelectedKey(newKey.trim());
    setNewKey("");
    setNewValue("");
  }

  function handleDelete(keyToDelete: string) {
    if (keyToDelete === "id") {
      setError("Asset identifier 'id' cannot be removed for safety.");
      return;
    }
    setError(null);
    const updated = { ...data };
    delete updated[keyToDelete];
    setData(updated);
    if (selectedKey === keyToDelete) {
      setSelectedKey("id");
    }
  }

  return (
    <section id="dictionary-visualizer" className="lesson-card dictionary-visualizer-card" aria-labelledby="visualizer-title">
      <p className="lesson-section-label"><Flow size={16} /> Live interaction</p>
      <h2 id="visualizer-title">Dynamic Dictionary Visualizer</h2>
      <p>
        Dictionaries map unique labels (keys) to values. Click any key to inspect its value, add a custom field, or pop existing values to watch the dictionary mutate in real time.
      </p>

      <div className="visualizer-grid">
        <div className="visualizer-left">
          <div className="dictionary-card-display">
            <span className="card-header">Smart Farm Asset Node</span>
            <div className="dict-items-list">
              {Object.entries(data).map(([key, val]) => (
                <div
                  key={key}
                  className={`dict-item-row ${selectedKey === key ? "is-selected animate-added" : ""}`}
                  onClick={() => setSelectedKey(key)}
                >
                  <strong className="dict-key">"{key}"</strong>
                  <span className="dict-arrow">→</span>
                  <span className="dict-value">
                    {typeof val === "string" ? `"${val}"` : val}
                  </span>
                  <Button
                    size="sm"
                    kind="ghost"
                    className="delete-item-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(key);
                    }}
                    aria-label={`Remove key ${key}`}
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
            <div className="dict-syntax-preview">
              <code>sensor_node = {JSON.stringify(data, null, 2)}</code>
            </div>
          </div>
        </div>

        <div className="visualizer-right">
          <Tile className="details-tile">
            <span>Inspecting Element</span>
            <strong>sensor_node["{selectedKey}"]</strong>
            <code>Value: {data[selectedKey] !== undefined ? String(data[selectedKey]) : "None"}</code>
            <small>Data type: {typeof data[selectedKey]}</small>
          </Tile>

          <Tile className="controls-tile">
            <span>Mutate Dictionary (Add/Update)</span>
            <div className="input-row">
              <TextInput
                id="dict-new-key"
                labelText="Key"
                placeholder="e.g. moisture"
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
              />
              <TextInput
                id="dict-new-value"
                labelText="Value"
                placeholder="e.g. 29"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
              />
            </div>
            {error && <p className="error-text">{error}</p>}
            <div className="button-row">
              <Button size="sm" onClick={handleUpdate}>Set Key-Value</Button>
            </div>
          </Tile>
        </div>
      </div>
    </section>
  );
}

export function DictionaryAccessingSection({ accessing }: { accessing: Pack["accessing"] }) {
  const [keyInput, setKeyInput] = useState("crop");
  const [fallback, setFallback] = useState("Not Found");
  
  const dummyFarm: Record<string, string | number> = {
    name: "Green Valley",
    location: "Pune",
    crop: "Rice"
  };

  const bracketResult = dummyFarm[keyInput] !== undefined ? String(dummyFarm[keyInput]) : "KeyError";
  const getResult = dummyFarm[keyInput] !== undefined ? String(dummyFarm[keyInput]) : "None";
  const getFallbackResult = dummyFarm[keyInput] !== undefined ? String(dummyFarm[keyInput]) : fallback;

  return (
    <section id="accessing" className="lesson-card dictionary-access" aria-labelledby="access-title">
      <p className="lesson-section-label"><Code size={16} /> Access syntax</p>
      <h2 id="access-title">{accessing.title}</h2>
      <p>{accessing.body}</p>

      <div className="access-table-container">
        <div className="collection-comparison-table" role="table">
          <div role="row" className="comparison-heading">
            <strong role="columnheader">Method</strong>
            <strong role="columnheader">Code Example</strong>
            <strong role="columnheader">Result</strong>
            <strong role="columnheader">Error Behavior</strong>
          </div>
          {accessing.rows.map((row, i) => (
            <div role="row" key={i}>
              <span role="cell"><strong>{row.method}</strong></span>
              <span role="cell"><code>{row.example}</code></span>
              <span role="cell"><Tag type="blue" size="sm">{row.result}</Tag></span>
              <span role="cell"><small>{row.behavior}</small></span>
            </div>
          ))}
        </div>
      </div>

      <div className="get-tester-block">
        <Tile className="tester-tile">
          <strong>Interactive Safe-Lookup Tester</strong>
          <p>
            Toggle keys and default parameters below to inspect the difference between bracket access and the safe <code>get()</code> method on a farm dictionary:
            <code>{" { 'name': 'Green Valley', 'location': 'Pune', 'crop': 'Rice' }"}</code>
          </p>
          <div className="tester-inputs">
            <TextInput
              id="tester-key"
              labelText="Lookup Key"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
            />
            <TextInput
              id="tester-fallback"
              labelText="Fallback default"
              value={fallback}
              onChange={(e) => setFallback(e.target.value)}
            />
          </div>
          
          <div className="tester-results-grid">
            <div className={`result-box ${bracketResult === "KeyError" ? "result-box--error animate-shake" : "result-box--success"}`}>
              <span>farm["{keyInput}"]</span>
              <strong>{bracketResult}</strong>
              <small>{bracketResult === "KeyError" ? "💥 Program Crashes!" : "✅ Safe"}</small>
            </div>
            <div className="result-box result-box--success">
              <span>farm.get("{keyInput}")</span>
              <strong>{getResult}</strong>
              <small>✅ Safe (returns None if absent)</small>
            </div>
            <div className="result-box result-box--success">
              <span>farm.get("{keyInput}", "{fallback}")</span>
              <strong>{getFallbackResult}</strong>
              <small>✅ Safe (returns fallback if absent)</small>
            </div>
          </div>
        </Tile>
      </div>
    </section>
  );
}

export function DictionaryMutationSection({ updating, adding }: { updating: Pack["updating"]; adding: Pack["adding"] }) {
  return (
    <section id="updating" className="lesson-card dictionary-mutations" aria-labelledby="mutation-title">
      <p className="lesson-section-label"><Flow size={16} /> Modifying records</p>
      <h2 id="mutation-title">Updating and Adding Values</h2>
      <p>
        In dictionaries, updates and additions use the exact same assignment syntax. If the key exists, its value is overridden. If it is new, the key-value pair is appended.
      </p>
      
      <div className="mutations-flex">
        <Tile className="mutation-card">
          <Tag type="blue">Update Existing Key</Tag>
          <h3>{updating.title}</h3>
          <p>{updating.body}</p>
          <pre><code>{updating.code}</code></pre>
          <span>Resulting Dictionary</span>
          <pre><code>{updating.output}</code></pre>
        </Tile>

        <Tile className="mutation-card">
          <Tag type="green">Add New Key</Tag>
          <h3>{adding.title}</h3>
          <p>{adding.body}</p>
          <pre><code>{adding.code}</code></pre>
          <span>Resulting Dictionary</span>
          <pre><code>{adding.output}</code></pre>
        </Tile>
      </div>
    </section>
  );
}

export function DictionaryRemovingSection({ removing }: { removing: Pack["removing"] }) {
  return (
    <section id="removing" className="lesson-card dictionary-removals" aria-labelledby="removals-title">
      <p className="lesson-section-label"><Flow size={16} /> Cleanup commands</p>
      <h2 id="removals-title">{removing.title}</h2>
      <p>{removing.body}</p>

      <div className="collection-comparison-table" role="table">
        <div role="row" className="comparison-heading">
          <strong role="columnheader">Command</strong>
          <strong role="columnheader">Code snippet</strong>
          <strong role="columnheader">Execution Behavior</strong>
        </div>
        {removing.rows.map((row, i) => (
          <div role="row" key={i}>
            <span role="cell"><strong>{row.method}</strong></span>
            <span role="cell"><code>{row.code}</code></span>
            <span role="cell"><small>{row.behavior}</small></span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function DictionaryBuiltInExplorer({ builtIns }: { builtIns: Pack["builtIns"] }) {
  const [selectedFunc, setSelectedFunc] = useState<string>("len(d)");
  const active = builtIns.rows.find((r) => r.function === selectedFunc) || builtIns.rows[0];

  return (
    <section id="built-ins" className="lesson-card dictionary-builtins" aria-labelledby="builtins-title">
      <p className="lesson-section-label"><Code size={16} /> Built-in utilities</p>
      <h2 id="builtins-title">{builtIns.title}</h2>
      <p>{builtIns.body}</p>

      <div className="builtins-grid">
        <div className="selector-list">
          {builtIns.rows.map((row, i) => (
            <button
              type="button"
              key={i}
              className={`selector-btn ${selectedFunc === row.function ? "is-selected" : ""}`}
              onClick={() => setSelectedFunc(row.function)}
            >
              <code>{row.function}</code>
              <span>{row.purpose}</span>
            </button>
          ))}
        </div>

        <Tile className="result-display" aria-live="polite">
          <span>Executed Command</span>
          <code>{active.example}</code>
          <span>Returned Output</span>
          <strong>{active.output}</strong>
          <small>{active.purpose}</small>
        </Tile>
      </div>

      <Tile className="keys-alert-tile">
        <strong>⚠️ Crucial Rule: Built-ins operate on keys by default</strong>
        <p>
          Functions like <code>sorted()</code>, <code>min()</code>, and <code>max()</code> inspect dictionary **keys**, NOT values.
          To operate on values, you must call <code>values()</code> explicitly.
        </p>
        <pre><code>{`marks = {"A": 80, "B": 90, "C": 75}\nprint(max(marks))          # Output: 'C' (Inspected keys: "A", "B", "C")\nprint(max(marks.values())) # Output: 90  (Inspected values: 80, 90, 75)`}</code></pre>
      </Tile>
    </section>
  );
}

export function DictionaryMethodExplorer({ methods }: { methods: Pack["methods"] }) {
  const [selectedMethod, setSelectedMethod] = useState<string>("keys()");
  const active = methods.rows.find((r) => r.method === selectedMethod) || methods.rows[0];

  return (
    <section id="methods" className="lesson-card dictionary-methods" aria-labelledby="methods-title">
      <p className="lesson-section-label"><Code size={16} /> Member functions</p>
      <h2 id="methods-title">{methods.title}</h2>
      <p>{methods.body}</p>

      <div className="builtins-grid">
        <div className="selector-list">
          {methods.rows.map((row, i) => (
            <button
              type="button"
              key={i}
              className={`selector-btn ${selectedMethod === row.method ? "is-selected" : ""}`}
              onClick={() => setSelectedMethod(row.method)}
            >
              <code>{row.method}</code>
            </button>
          ))}
        </div>

        <Tile className="result-display" aria-live="polite">
          <span>Method call</span>
          <code>{active.example}</code>
          <span>Output View</span>
          <strong>{active.output}</strong>
          <small>{active.purpose}</small>
        </Tile>
      </div>
    </section>
  );
}

export function DictionaryIterationPreview({ iteration }: { iteration: Pack["iteration"] }) {
  const [activeTab, setActiveTab] = useState(0);
  const active = iteration.examples[activeTab];

  return (
    <section id="iteration" className="lesson-card dictionary-iteration" aria-labelledby="iteration-title">
      <p className="lesson-section-label"><Flow size={16} /> Loop preview</p>
      <h2 id="iteration-title">{iteration.title}</h2>
      <p>{iteration.body}</p>

      <div className="iteration-tabs">
        {iteration.examples.map((ex, idx) => (
          <Button
            key={idx}
            size="sm"
            kind={idx === activeTab ? "primary" : "ghost"}
            onClick={() => setActiveTab(idx)}
          >
            {ex.label}
          </Button>
        ))}
      </div>

      <div className="iteration-display-grid">
        <div className="code-block-pane">
          <span>Python Code</span>
          <pre><code>{active.code}</code></pre>
        </div>
        <div className="output-block-pane">
          <span>Console Print stdout</span>
          <pre><code>{active.output}</code></pre>
        </div>
      </div>
    </section>
  );
}

export function DictionaryComparisonSection({ comparison }: { comparison: Pack["comparison"] }) {
  return (
    <section id="comparison" className="lesson-card dictionary-comparison" aria-labelledby="comparison-title">
      <p className="lesson-section-label"><CheckmarkOutline size={16} /> Type summaries</p>
      <h2 id="comparison-title">{comparison.title}</h2>
      <p>{comparison.body}</p>

      <div className="collection-comparison-table" role="table">
        <div role="row" className="comparison-heading">
          <strong role="columnheader">Collection Type</strong>
          <strong role="columnheader">Best Used For</strong>
          <strong role="columnheader">Telemetry Example Mapping</strong>
        </div>
        {comparison.rows.map((row, i) => (
          <div role="row" key={i}>
            <span role="cell"><strong>{row.collection}</strong></span>
            <span role="cell"><small>{row.usage}</small></span>
            <span role="cell"><code>{row.mapping}</code></span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function RealWorldMappingSection() {
  const mappings = [
    { type: "List", equivalent: "Spreadsheet column / sequence of telemetry readings" },
    { type: "Tuple", equivalent: "GPS Coordinates / fixed sensor hardware settings" },
    { type: "Set", equivalent: "Unique registered sensor IDs / unique crop names list" },
    { type: "Dictionary", equivalent: "JSON API Response / database record row / labeled configuration" }
  ];

  return (
    <section id="mapping" className="lesson-card realworld-mapping" aria-labelledby="mapping-title">
      <p className="lesson-section-label"><CheckmarkOutline size={16} /> Bridge to future modules</p>
      <h2 id="mapping-title">Real-World Collections Mapping</h2>
      <p>
        As you move into advanced modules, databases, and data science, you will repeatedly encounter these collections mapping to concrete software systems.
      </p>
      
      <div className="collection-comparison-table" role="table">
        <div role="row" className="comparison-heading">
          <strong role="columnheader">Python Collection</strong>
          <strong role="columnheader">Real-world Equivalent Structure</strong>
        </div>
        {mappings.map((m, i) => (
          <div role="row" key={i}>
            <span role="cell"><strong>{m.type}</strong></span>
            <span role="cell"><span>{m.equivalent}</span></span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function DictionaryAgritechPanel({ agritech }: { agritech: Pack["agritech"] }) {
  return (
    <section id="agritech-example" className="lesson-card agritech-sensor-model" aria-labelledby="agritech-title">
      <p className="lesson-section-label"><AgricultureAnalytics size={16} /> Industry application</p>
      <h2 id="agritech-title">{agritech.title}</h2>
      <p>{agritech.body}</p>

      <div className="agritech-example-grid">
        <div className="code-display-block">
          <span>Python script</span>
          <pre><code>{agritech.code}</code></pre>
        </div>
        <div className="output-display-block">
          <span>Expected output</span>
          <pre><code>{agritech.output}</code></pre>
        </div>
      </div>
    </section>
  );
}

export function DictionaryEngineerScenario({ content }: { content: Pack["engineerScenario"] }) {
  return (
    <section id="engineer" className="lesson-card dictionary-engineer" aria-labelledby="engineer-title">
      <p className="lesson-section-label"><Idea size={16} /> Think like an engineer</p>
      <h2 id="engineer-title">{content.title}</h2>
      <p>{content.body}</p>
      <blockquote>{content.question}</blockquote>
    </section>
  );
}
