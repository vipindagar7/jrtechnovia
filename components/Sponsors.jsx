// Server component — packages from the official Sponsorship Proposal.
import { site } from "@/data/site";
import Icon from "./Icons";

const tiers = [
  {
    name: "Title",
    price: "₹51,000",
    lead: "The premier partnership",
    perks: ["“TECHNOVIA 2026 powered by [You]” branding", "Highest logo prominence on main backdrop", "Address participants in an official session", "Priority stall / exhibition space"],
    featured: true,
  },
  {
    name: "Diamond",
    price: "₹31,000",
    lead: "Premium visibility",
    perks: ["Prominent logo on event branding", "Opening / closing ceremony acknowledgement", "Dedicated social media recognition", "Promotional stall or product display"],
  },
  {
    name: "Gold",
    price: "₹21,000",
    lead: "Connect with emerging talent",
    perks: ["Logo on sponsor panels & banners", "Session or ceremony acknowledgement", "Social media mention", "Promotional material at the venue"],
  },
  {
    name: "Silver",
    price: "₹11,000",
    lead: "Support student achievement",
    perks: ["Logo on the sponsor board", "Collective social media post", "Promotional material for participants", "Official appreciation certificate"],
  },
  {
    name: "Event",
    price: "₹5,000",
    unit: "/ event",
    lead: "Own a competition",
    perks: ["Official sponsor of one competition", "Logo on event signage", "Present prizes at your event", "Event-specific social recognition"],
  },
];

export default function Sponsors() {
  const c = site.sponsorContact;
  return (
    <section className="section sponsors" id="sponsors">
      <span className="drift outline-word" data-dir="left" aria-hidden="true">
        Partner · Sponsor · Support ·
      </span>
      <div className="container">
        <header className="section-head section-head-row">
          <div>
            <p className="eyebrow">
              <span className="dot" /> Sponsorship
            </p>
            <h2 className="h2 split-head">
              Partner with <span className="red">innovation</span>
            </h2>
            <p className="lead reveal">
              Put your brand in front of young engineers and innovators. Custom packages and in-kind partnerships
              (kits, prizes, software, mentoring) are welcome.
            </p>
          </div>
          <a href={site.sponsorDeckUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost magnetic reveal">
            <Icon name="download" size={18} /> Sponsorship proposal
          </a>
        </header>

        <div className="tiers">
          {tiers.map((t) => (
            <article key={t.name} className={`tier tilt reveal ${t.featured ? "is-featured" : ""}`}>
              {t.featured && <span className="tier-flag">Premier</span>}
              <p className="tier-name">{t.name} sponsor</p>
              <p className="tier-price">
                {t.price}
                {t.unit && <small>{t.unit}</small>}
              </p>
              <p className="tier-lead">{t.lead}</p>
              <ul>
                {t.perks.map((p) => (
                  <li key={p}>
                    <Icon name="check" size={16} /> {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="sponsor-contact reveal">
          <p>
            <strong>Become a sponsor.</strong> Talk to {c.name}, {c.role}.
          </p>
          <div>
            <a href={`tel:${c.tel}`} className="btn btn-red btn-sm magnetic">
              <Icon name="phone" size={16} /> {c.phone}
            </a>
            <a href={`mailto:${site.email}?subject=Sponsorship%20—%20Junior%20Technovia%202026`} className="btn btn-ghost btn-sm magnetic">
              <Icon name="mail" size={16} /> Email us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
