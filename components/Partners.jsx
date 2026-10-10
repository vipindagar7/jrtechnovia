// Server component — organiser / affiliation logos (as on the official posters).
import { site } from "@/data/site";

export default function Partners({ variant = "band" }) {
  return (
    <section className={`partners partners-${variant}`} aria-label="Organised by">
      <div className="container partners-inner">
        <p className="partners-label">
          <span className="dot" /> Organised by
        </p>
        <ul className="partners-logos">
          {site.partners.map((p) => (
            <li key={p.src} className="reveal">
              <img src={p.src} alt={p.name} width={p.w} height={p.h} loading="lazy" decoding="async" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
