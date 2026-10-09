// Server component: rules are rendered to static HTML with native <details>,
// so the 15 sections cost zero JavaScript.
import { generalRules } from "@/data/rulebook";
import { site } from "@/data/site";
import Icon from "./Icons";

function Block({ b }) {
  if (b.t === "p") return <p>{b.text}</p>;
  return (
    <ul>
      {b.items.map((it, i) => (
        <li key={i}>
          {it.text}
          {it.sub && (
            <ul className="sub">
              {it.sub.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function Rules() {
  return (
    <section className="section rules" id="rules">
      <div className="container rules-grid">
        <header className="rules-side">
          <p className="eyebrow">
            <span className="dot" /> Rulebook
          </p>
          <h2 className="h2 split-head">
            General <span className="red">rules</span>
          </h2>
          <p className="lead reveal">
            These apply to every competition. Event-specific specs and rules are on each event card. Participation means
            you accept these rules.
          </p>
          <a href={site.rulebookUrl} className="btn btn-ghost magnetic reveal" download>
            <Icon name="download" size={18} /> Download full rulebook
          </a>
          <div className="safety-callout reveal">
            <Icon name="shield" size={22} />
            <p>Safety takes priority over competition results at all times.</p>
          </div>
        </header>

        <div className="acc-list">
          {generalRules.map((s) => (
            <details className="acc reveal" key={s.id}>
              <summary className="acc-head">
                <span className="acc-id">{s.id}</span>
                <span className="acc-title">{s.title}</span>
                <span className="acc-icon">
                  <Icon name="plus" size={20} />
                </span>
              </summary>
              <div className="acc-inner">
                {s.blocks.map((b, i) => (
                  <Block b={b} key={i} />
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
