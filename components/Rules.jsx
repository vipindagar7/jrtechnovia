// Server component: rules are rendered to static HTML with native <details>,
// so the 15 sections cost zero JavaScript.
import { generalRules } from "@/data/rulebook";
import { site } from "@/data/site";
import Icon from "./Icons";

const checklist = [
  {
    title: "All teams",
    items: [
      "All participants are students of Classes 9–12 and carry valid school/student identification.",
      "We have read the General Rules and the rules of every event we are entering.",
      "Our team has nominated a representative to raise any dispute politely.",
      "We will follow instructions from referees, judges, and safety officials at all times.",
    ],
  },
  {
    title: "Robot & drone events",
    items: [
      "The robot/drone is in its final competition configuration and within its event's limits.",
      "Batteries are undamaged, securely mounted, and have insulated terminals.",
      "Wiring is tidy: no loose wires, exposed connections, or uncontrolled moving parts.",
      "No sharp edges or prohibited mechanisms; the controller is fully wireless where required.",
      "Ready for technical and safety inspection (Robo Hurdle teams: report 30 minutes early).",
      "Spare batteries, tools and cables packed; closed footwear on.",
    ],
  },
  {
    title: "Startup pitch & project exhibition",
    items: [
      "Our idea/project is original; any third-party parts or code are clearly identified.",
      "Business Model Canvas submitted / project title and abstract registered by the deadline.",
      "Every team member can explain the idea/project and answer the judges' questions.",
      "Presentation, poster and equipment are ready, and any demo follows the safety rules.",
    ],
  },
];

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
          <a href={site.rulebookUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost magnetic reveal">
            <Icon name="download" size={18} /> Official rule book (PDF)
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
          <details className="acc reveal">
            <summary className="acc-head">
              <span className="acc-id">✓</span>
              <span className="acc-title">Pre-competition checklist</span>
              <span className="acc-icon">
                <Icon name="plus" size={20} />
              </span>
            </summary>
            <div className="acc-inner">
              {checklist.map((g) => (
                <div key={g.title} className="check-group">
                  <p className="check-title">{g.title}</p>
                  <ul className="check-list">
                    {g.items.map((it) => (
                      <li key={it}>
                        <Icon name="check" size={16} /> {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
