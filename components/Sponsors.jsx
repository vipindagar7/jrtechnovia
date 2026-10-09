// Server component. PLACEHOLDER — swap the slots for real sponsor logos.
import { site } from "@/data/site";

const sponsors = [
  { tier: "Title sponsor", slots: 1 },
  { tier: "Tech sponsors", slots: 3 },
  { tier: "Co-sponsors", slots: 4 },
];

export default function Sponsors() {
  return (
    <section className="section sponsors">
      <div className="container">
        <header className="section-head center">
          <p className="eyebrow">
            <span className="dot" /> Organised by {site.organiser}
          </p>
          <h2 className="h2 split-head">
            Powered <span className="red">by</span>
          </h2>
        </header>
        {sponsors.map((s) => (
          <div className="sponsor-row reveal" key={s.tier}>
            <p className="sponsor-tier">{s.tier}</p>
            <div className="sponsor-logos">
              {Array.from({ length: s.slots }).map((_, i) => (
                <div className="sponsor-slot" key={i}>
                  Your logo here
                </div>
              ))}
            </div>
          </div>
        ))}
        <p className="sponsor-cta reveal">
          Want to sponsor Junior Technovia? <a href={`mailto:${site.contact.email}`}>Get in touch</a>
        </p>
      </div>
    </section>
  );
}
