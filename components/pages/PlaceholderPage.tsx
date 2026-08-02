import { ArrowRight, CheckmarkOutline } from "@carbon/icons-react";
import { Link } from "@/components/navigation/client-router";
import type { PlaceholderPageContent } from "@/types/content";

export function PlaceholderPage({ content }: { content: PlaceholderPageContent }) {
  return (
    <div className="standard-page placeholder-page page-enter">
      <header className="placeholder-hero">
        <div>
          <p className="eyebrow">{content.eyebrow}</p>
          <h1>{content.title}</h1>
          <p>{content.description}</p>
          <Link className="text-action" href="/modules">Explore the curriculum <ArrowRight size={17} /></Link>
        </div>
        <div className="placeholder-metric"><span>{content.accent}</span><strong>{content.metric}</strong><p>{content.metricLabel}</p></div>
      </header>
      <section className="placeholder-grid">
        {content.cards.map((card) => (
          <article key={card.title}>
            <span className="placeholder-icon">{card.icon}</span>
            <h2>{card.title}</h2>
            <p>{card.description}</p>
            <CheckmarkOutline size={20} />
          </article>
        ))}
      </section>
      <div className="system-notice"><span /> <p><strong>Platform foundation ready.</strong> This area is connected to the shared routing and content model. Learning content will be introduced in a future phase.</p></div>
    </div>
  );
}
