import { useState } from "react";
import { Button, CodeSnippet, Tag, Tile } from "@carbon/react";
import {
  Idea,
  CheckmarkFilled,
  Warning,
  Locked,
  Unlocked,
  Run,
} from "@carbon/icons-react";
import type {
  OopEncapsulationDevelopmentPack,
} from "@/types/content";

// ─── 1. Access Modifier Inspector ────────────────────────────────────────────

export function OopAccessModifierInspector({
  accessModifiers,
  pythonPhilosophyNote,
}: {
  accessModifiers: OopEncapsulationDevelopmentPack["accessModifiers"];
  pythonPhilosophyNote: OopEncapsulationDevelopmentPack["pythonPhilosophyNote"];
}) {
  const [selectedModifier, setSelectedModifier] = useState<"public" | "protected" | "private">("public");
  const [accessAttempted, setAccessAttempted] = useState(false);

  const mod = accessModifiers[selectedModifier];

  return (
    <section id="access-modifiers" className="lesson-card oop-access-inspector">
      <h2>Public vs Protected vs Private Members</h2>
      <p>
        Explore Python&apos;s three levels of attribute visibility and experience how name mangling works.
      </p>

      {/* Modifier selector buttons */}
      <div className="oop-ami-buttons" role="tablist" aria-label="Access Modifier Selector">
        <button
          role="tab"
          aria-selected={selectedModifier === "public"}
          className={`oop-ami-btn${selectedModifier === "public" ? " active" : ""}`}
          onClick={() => {
            setSelectedModifier("public");
            setAccessAttempted(false);
          }}
        >
          Public (self.name)
        </button>
        <button
          role="tab"
          aria-selected={selectedModifier === "protected"}
          className={`oop-ami-btn${selectedModifier === "protected" ? " active" : ""}`}
          onClick={() => {
            setSelectedModifier("protected");
            setAccessAttempted(false);
          }}
        >
          Protected (self._location)
        </button>
        <button
          role="tab"
          aria-selected={selectedModifier === "private"}
          className={`oop-ami-btn${selectedModifier === "private" ? " active" : ""}`}
          onClick={() => {
            setSelectedModifier("private");
            setAccessAttempted(false);
          }}
        >
          Private (self.__temperature)
        </button>
      </div>

      {/* Selected modifier detail tile */}
      <Tile className={`oop-ami-tile oop-ami-tile--${selectedModifier}`}>
        <div className="oop-ami-tile-header">
          <Tag
            type={
              selectedModifier === "public"
                ? "blue"
                : selectedModifier === "protected"
                ? "magenta"
                : "purple"
            }
            size="sm"
          >
            {mod.syntax}
          </Tag>
          <h3>{mod.title}</h3>
        </div>
        <p className="oop-ami-desc">{mod.description}</p>
        <CodeSnippet type="multi" feedback="Copied">
          {mod.code}
        </CodeSnippet>

        <div className="oop-ami-test-area">
          <Button
            kind="primary"
            size="sm"
            renderIcon={selectedModifier === "private" ? Locked : Unlocked}
            onClick={() => setAccessAttempted(true)}
          >
            Test External Access: farm.{mod.syntax.replace("self.", "")}
          </Button>

          {accessAttempted && (
            <div
              className={`oop-ami-result${
                selectedModifier === "private" ? " is-error" : " is-success"
              }`}
            >
              {selectedModifier === "public" && (
                <p>✅ <strong>Success:</strong> Public attribute returned value freely.</p>
              )}
              {selectedModifier === "protected" && (
                <p>
                  ⚠ <strong>Allowed with Warning:</strong> Python allows access, but
                  single underscore (_location) tells developers &quot;Internal use only!&quot;
                </p>
              )}
              {selectedModifier === "private" && (
                <p>
                  🔒 <strong>AttributeError:</strong> Direct access failed! Python
                  mangled <code>__temperature</code> to <code>_Farm__temperature</code>.
                  Access via <code>get_temperature()</code> getter!
                </p>
              )}
            </div>
          )}
        </div>
      </Tile>

      {/* Python Philosophy Note */}
      <Tile className="oop-philosophy-tile">
        <div className="oop-phil-header">
          <Idea size={20} aria-hidden="true" />
          <h3>{pythonPhilosophyNote.title}</h3>
        </div>
        <p>{pythonPhilosophyNote.body}</p>
        <blockquote className="oop-phil-quote">&ldquo;{pythonPhilosophyNote.quote}&rdquo;</blockquote>
      </Tile>
    </section>
  );
}

// ─── 2. Getter & Setter Validation Inspector ─────────────────────────────────

export function OopEncapsulationInspector({
  gettersAndSetters,
}: {
  gettersAndSetters: OopEncapsulationDevelopmentPack["gettersAndSetters"];
}) {
  const [tempInput, setTempInput] = useState<string>("35.0");
  const [currentTemp, setCurrentTemp] = useState<number>(31.5);
  const [lastValidation, setLastValidation] = useState<{
    success: boolean;
    msg: string;
  } | null>(null);

  function handleSetTemperature() {
    const val = parseFloat(tempInput);
    if (isNaN(val)) {
      setLastValidation({
        success: false,
        msg: "❌ Invalid input: Not a valid number!",
      });
      return;
    }
    if (val >= -10.0 && val <= 60.0) {
      setCurrentTemp(val);
      setLastValidation({
        success: true,
        msg: `✅ Valid Temperature! __temperature updated to ${val}°C`,
      });
    } else {
      setLastValidation({
        success: false,
        msg: `❌ REJECTED! ${val}°C is outside valid range (-10.0°C to 60.0°C). __temperature remains ${currentTemp}°C.`,
      });
    }
  }

  return (
    <section id="getters-setters" className="lesson-card oop-encapsulation-inspector">
      <h2>{gettersAndSetters.title}</h2>
      <p>
        Setters sit between external code and private attributes, acting as security checkpoints that reject bad data before it can corrupt object state.
      </p>

      <CodeSnippet type="multi" feedback="Copied">
        {gettersAndSetters.validationCode}
      </CodeSnippet>

      {/* Interactive Validation Simulator */}
      <div className="oop-val-simulator">
        <h3>Interactive: Test Setter Validation Logic</h3>
        <p>Try setting <code>farm.set_temperature(val)</code> with valid values (e.g. 35.0°C) and invalid values (e.g. 999.0°C or -500.0°C):</p>

        <div className="oop-val-controls">
          <input
            type="number"
            className="oop-val-input"
            value={tempInput}
            onChange={(e) => setTempInput(e.target.value)}
            placeholder="Enter temp °C"
            aria-label="Temperature input"
          />
          <Button kind="primary" size="sm" renderIcon={Run} onClick={handleSetTemperature}>
            Call set_temperature()
          </Button>
          <Button kind="ghost" size="sm" onClick={() => setTempInput("999.0")}>
            Preset: 999.0°C (Invalid)
          </Button>
          <Button kind="ghost" size="sm" onClick={() => setTempInput("35.0")}>
            Preset: 35.0°C (Valid)
          </Button>
        </div>

        {lastValidation && (
          <div
            className={`oop-val-result${
              lastValidation.success ? " is-success" : " is-error"
            }`}
            role="status"
            aria-live="polite"
          >
            {lastValidation.msg}
          </div>
        )}

        <div className="oop-val-current-state">
          <span className="oop-val-state-label">Object Private State:</span>
          <code>farm.get_temperature() ➔ <strong>{currentTemp}°C</strong></code>
        </div>
      </div>
    </section>
  );
}

// ─── 3. Debug Challenges 5.4 ──────────────────────────────────────────────────

export function OopDebugChallenges5_4({
  challenges,
}: {
  challenges: OopEncapsulationDevelopmentPack["debugChallenges"];
}) {
  const [revealedIndex, setRevealedIndex] = useState<number | null>(null);

  return (
    <section id="debug-challenge" className="lesson-card oop-debug-challenges">
      <h2>Debug Challenge — Encapsulation Bugs</h2>
      <p>
        Identify and fix these common encapsulation errors involving private attributes, getters, and setters.
      </p>
      <div className="oop-debug-list">
        {challenges.map((c, i) => {
          const isRevealed = revealedIndex === i;
          return (
            <div key={i} className="oop-debug-item">
              <div className="oop-debug-item-header">
                <Tag type="red" size="sm">
                  {c.mistakesToFind === 0
                    ? "Discussion"
                    : `${c.mistakesToFind} mistake${
                        c.mistakesToFind !== 1 ? "s" : ""
                      }`}
                </Tag>
                <h3>{c.title}</h3>
              </div>
              <p>{c.prompt}</p>
              <CodeSnippet type="multi" feedback="Copied">
                {c.code}
              </CodeSnippet>
              {!isRevealed ? (
                <div className="oop-debug-guidance">
                  <p className="oop-debug-hint">{c.hiddenGuidance}</p>
                  <Button
                    kind="secondary"
                    size="sm"
                    onClick={() => setRevealedIndex(i)}
                    aria-label={`Show solution for: ${c.title}`}
                  >
                    Show solution
                  </Button>
                </div>
              ) : (
                <div className="oop-debug-solution">
                  <p className="oop-debug-solution-label">Solution</p>
                  <CodeSnippet type="multi" feedback="Copied">
                    {c.solution}
                  </CodeSnippet>
                  <Button
                    kind="ghost"
                    size="sm"
                    onClick={() => setRevealedIndex(null)}
                    aria-label={`Hide solution for: ${c.title}`}
                  >
                    Hide solution
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─── 4. Think Like an Engineer 5.4 ───────────────────────────────────────────

export function OopEngineerThinkingCard5_4({
  prompt,
}: {
  prompt: string;
}) {
  return (
    <section
      id="think-like-engineer"
      className="lesson-card oop-engineer-thinking"
      aria-label="Think like an engineer"
    >
      <div className="oop-engineer-header">
        <Idea size={24} aria-hidden="true" />
        <h2>Think Like an Engineer — Privacy vs Pragmatism</h2>
      </div>
      <p className="oop-engineer-prompt">{prompt}</p>
      <Tile className="oop-engineer-note">
        <p>
          Consider API design: Starting public keeps code simple; refactoring to <code>@property</code> later allows adding validation without breaking caller syntax like <code>farm.temperature</code>!
        </p>
      </Tile>
    </section>
  );
}
