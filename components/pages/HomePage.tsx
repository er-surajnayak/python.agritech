import { ArrowRight, ChartLine, Checkmark, Code, DataVis_1, IbmKnowledgeCatalog } from "@carbon/icons-react";
import { Link } from "@/components/navigation/client-router";
import { agritechCourse } from "@/content/course-framework";

export function HomePage() {
  return (
    <div className="home-page page-enter">
      <section className="hero-section">
        <div className="hero-copy">
          <div className="hero-badge"><span /> Interactive faculty learning platform</div>
          <h1>Python that grows<br />with your <em>field.</em></h1>
          <p>
            Learn programming from the ground up through agricultural data, field scenarios and visual practice—then progress confidently into data science.
          </p>
          <div className="hero-actions">
            <Link className="primary-action" href="/course">Explore the course <ArrowRight size={18} /></Link>
            <Link className="secondary-action" href="/modules">View learning path</Link>
          </div>
          <div className="hero-trust">
            <span><Checkmark size={16} /> No prior coding</span>
            <span><Checkmark size={16} /> Faculty focused</span>
            <span><Checkmark size={16} /> Learn by doing</span>
          </div>
        </div>
        <div className="hero-lab" aria-label="Learning path preview">
          <div className="lab-header">
            <span className="lab-status"><i /> LEARNING PATH</span>
            <span>DI / AGRITECH</span>
          </div>
          <div className="lab-visual">
            <div className="lab-orbit lab-orbit-one" />
            <div className="lab-orbit lab-orbit-two" />
            <div className="lab-core"><Code size={28} /><strong>PY</strong></div>
            <div className="lab-node lab-node-one"><span>01</span> FOUNDATIONS</div>
            <div className="lab-node lab-node-two"><span>03</span> NUMPY</div>
            <div className="lab-node lab-node-three"><span>05</span> VISUALISE</div>
          </div>
          <div className="lab-footer">
            <div><span>OUTCOME</span><strong>DATA CONFIDENCE</strong></div>
            <ChartLine size={24} />
          </div>
        </div>
      </section>

      <section className="outcome-strip" aria-label="Course outcomes">
        <div><strong>5</strong><span>Learning stages</span></div>
        <div><strong>0</strong><span>Prior knowledge needed</span></div>
        <div><strong>4</strong><span>Data science tools</span></div>
        <div><strong>100%</strong><span>Agriculture-based context</span></div>
      </section>

      <section className="section-block learning-method">
        <div className="section-heading">
          <div><p className="eyebrow">Designed for understanding</p><h2>From abstract syntax to useful insight</h2></div>
          <p>Every part of the experience reduces cognitive load and connects new technical ideas to work faculty already understand.</p>
        </div>
        <div className="method-grid">
          <article><span>01</span><Code size={24} /><h3>See the idea</h3><p>Simple explanations, visual structure and careful pacing make the unfamiliar approachable.</p></article>
          <article><span>02</span><IbmKnowledgeCatalog size={24} /><h3>Connect to the field</h3><p>Agricultural sensors, rainfall, soil and yield provide meaningful context.</p></article>
          <article><span>03</span><DataVis_1 size={24} /><h3>Apply with data</h3><p>Practice evolves from guided Python into clear analytical thinking.</p></article>
        </div>
      </section>

      <section className="section-block journey-section">
        <div className="section-heading compact">
          <div><p className="eyebrow">The learning journey</p><h2>One clear path, built in layers</h2></div>
          <Link href="/modules">View all modules <ArrowRight size={16} /></Link>
        </div>
        <div className="journey-list">
          {agritechCourse.modules.map((module, index) => (
            <article key={module.id} className={index === 0 ? "is-current" : ""}>
              <span className="journey-index">{module.index}</span>
              <div className="journey-copy"><h3>{module.title}</h3><p>{module.description}</p></div>
              <div className="journey-topics">
                <span>{module.difficulty}</span>
                <span>{module.estimatedDuration}</span>
                <span>{module.lessons.length} lessons</span>
              </div>
              <span className="journey-status">{index === 0 ? "In progress" : "Planned"}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="platform-cta">
        <div><p className="eyebrow">Start from zero. Finish with evidence.</p><h2>Build the confidence to ask better questions of agricultural data.</h2></div>
        <Link className="primary-action light" href="/course">See course overview <ArrowRight size={18} /></Link>
      </section>
    </div>
  );
}
