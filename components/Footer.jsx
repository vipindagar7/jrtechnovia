"use client";
import { site } from "@/data/site";
import { events } from "@/data/events";
import { actions } from "@/lib/store";
import Icon from "./Icons";
import Wordmark from "./Wordmark";

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-checker" aria-hidden="true" />
      <div className="container footer-grid">
        <div className="footer-brand reveal">
          <p className="footer-junior">Junior</p>
          <Wordmark />
          <p className="footer-year">{site.year}</p>
          <p className="muted">
            {site.level} {site.subtitle.toLowerCase()} for {site.eligibility}, organised by {site.organiser}.
          </p>
        </div>

        <div className="reveal">
          <h4>Events</h4>
          <ul className="footer-events">
            {events.map((e) => (
              <li key={e.code}>
                <button className="link" onClick={() => actions.open(e.code)}>
                  {e.name}
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
          <h4 className="mt">Contact</h4>
          <ul>
            <li>
              <a href={`mailto:${site.contact.email}`}>
                <Icon name="mail" size={16} /> {site.contact.email}
              </a>
            </li>
            <li>
              <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`}>
                <Icon name="phone" size={16} /> {site.contact.phone}
              </a>
            </li>
          </ul>
          <div className="socials">
            {Object.entries(site.social).map(([k, href]) => (
              <a key={k} href={href} aria-label={k} className="magnetic">
                <Icon name={k} size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <p className="footer-giant" aria-hidden="true">
        TECHNOVIA
      </p>
      <div className="container footer-bottom">
        <span>
          © {site.year} Junior Technovia · EIT Faridabad
        </span>
        <a href="#top">Back to start ↑</a>
      </div>
    </footer>
  );
}
