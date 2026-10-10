"use client";
import { site } from "@/data/site";
import { events } from "@/data/events";
import { actions } from "@/lib/store";
import Icon from "./Icons";

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-checker" aria-hidden="true" />

      <div className="container footer-top">
        <div className="footer-brand reveal">
          <img src="/logos/jt-logo.webp" alt="Junior Technovia 2026 — Idea, Innovation, Impact" width="640" height="327" loading="lazy" className="footer-logo" />
          <p className="muted">
            {site.subtitle} for {site.eligibility} students, organised by the {site.organiser}.
          </p>
          <a href={site.registerUrl} target="_blank" rel="noopener noreferrer" className="btn btn-red btn-sm magnetic">
            Register now <Icon name="arrow" size={16} />
          </a>
        </div>

        <div className="footer-coords reveal">
          <h4>Event coordinators</h4>
          {site.coordinators.map((c) => (
            <a key={c.tel} href={`tel:${c.tel}`} className="coord">
              <Icon name="phone" size={18} />
              <span>
                <strong>{c.name}</strong>
                <small>{c.phone}</small>
              </span>
            </a>
          ))}
          <a href={`mailto:${site.email}`} className="footer-mail">
            <Icon name="mail" size={16} /> {site.email}
          </a>
        </div>

        <div className="reveal">
          <h4>Events</h4>
          <ul className="footer-events">
            {events.map((e) => (
              <li key={e.code}>
                <button className="link" onClick={() => actions.open(e.code)}>
                  {e.short || e.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal">
          <h4>Venue</h4>
          <p className="muted">
            {site.venue}
            <br />
            {site.dateLabel}
          </p>
          <a href={site.mapUrl} target="_blank" rel="noopener noreferrer" className="footer-link">
            <Icon name="pin" size={16} /> Open in Maps
          </a>
          <h4 className="mt">Downloads</h4>
          <ul>
            <li>
              <a href={site.rulebookUrl} target="_blank" rel="noopener noreferrer">
                <Icon name="download" size={16} /> Official rule book
              </a>
            </li>
            <li>
              <a href={site.sponsorDeckUrl} target="_blank" rel="noopener noreferrer">
                <Icon name="download" size={16} /> Sponsorship proposal
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer-partners">
        <p>Organised by</p>
        <ul>
          {site.partners.map((p) => (
            <li key={p.src}>
              <img src={p.src} alt={p.name} width={p.w} height={p.h} loading="lazy" decoding="async" />
            </li>
          ))}
        </ul>
      </div>

      <p className="footer-giant" aria-hidden="true">
        TECHNOVIA
      </p>
      <div className="container footer-bottom">
        <span>© {site.year} Junior Technovia · Echelon Institute of Technology, Faridabad</span>
        <a href="#top">Back to start ↑</a>
      </div>
    </footer>
  );
}
