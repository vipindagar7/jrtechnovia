"use client";
import { useEffect, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { site } from "@/data/site";
import { events, zoneById } from "@/data/events";
import { eventDetails } from "@/data/eventDetails";
import { actions } from "@/lib/store";
import Icon from "./Icons";

function H({ children, red }) {
  return <h4 className={red ? "red" : undefined}>{children}</h4>;
}

export default function EventModal({ code }) {
  const root = useRef(null);
  const closeBtn = useRef(null);
  const card = events.find((e) => e.code === code);
  const d = eventDetails[code];
  const event = { ...d, ...card };
  const zone = zoneById(event.zone);
  const day = site.days.find((x) => x.id === event.day);

  const { contextSafe } = useGSAP(
    () => {
      gsap
        .timeline()
        .fromTo(".modal-backdrop", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 })
        .fromTo(".modal-panel", { xPercent: 100 }, { xPercent: 0, duration: 0.6, ease: "expo.out" }, 0)
        .from(".modal-stripe", { scaleY: 0, transformOrigin: "top", duration: 0.8, ease: "power3.out" }, 0.15)
        .from(".modal-hero img", { scale: 1.25, duration: 1.4, ease: "power3.out" }, 0.1)
        .from(".modal-stats > div", { y: 24, autoAlpha: 0, stagger: 0.06, duration: 0.5, ease: "power3.out" }, 0.35)
        .from(".modal-body > *", { y: 30, autoAlpha: 0, stagger: 0.05, duration: 0.5, ease: "power3.out" }, 0.4)
        .from(".crit-bar i", { scaleX: 0, transformOrigin: "left", stagger: 0.06, duration: 0.8, ease: "power3.out" }, 0.7);
    },
    { scope: root, dependencies: [code], revertOnUpdate: true }
  );

  const close = contextSafe(() => {
    gsap
      .timeline({ onComplete: actions.close })
      .to(".modal-panel", { xPercent: 100, duration: 0.4, ease: "power3.in" })
      .to(".modal-backdrop", { autoAlpha: 0, duration: 0.25 }, "-=0.2");
  });

  useEffect(() => {
    document.body.classList.add("no-scroll");
    closeBtn.current?.focus();
    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("no-scroll");
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  const total = event.criteria?.reduce((a, c) => a + c[1], 0);

  return (
    <div className="modal" ref={root} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-backdrop" onClick={close} />
      <aside className="modal-panel">
        <span className="modal-stripe" aria-hidden="true" />
        <div className="modal-head">
          <span className="modal-code">
            {event.code} · {zone.name} · {day.label}, {day.date}
          </span>
          <button ref={closeBtn} className="modal-close" onClick={close} aria-label="Close">
            <Icon name="close" />
          </button>
        </div>

        <div className="modal-scroll" data-lenis-prevent>
          <div className="modal-hero">
            <img src={event.image} alt="" width="960" height="500" />
            <div className="modal-hero-copy">
              <span className="event-icon lg">
                <Icon name={event.icon} size={36} />
              </span>
              <div>
                <h3 id="modal-title">{event.name}</h3>
                <p className="event-tag">{event.tagline}</p>
              </div>
            </div>
          </div>

          <div className="modal-stats">
            {event.stats.map(([v, l]) => (
              <div key={l}>
                <strong>{v}</strong>
                <span>{l}</span>
              </div>
            ))}
          </div>

          <div className="modal-body">
            <p className="modal-text">{event.summary}</p>

            <section>
              <H>{event.code === "JT07" || event.code === "JT08" ? "Requirements" : "Specifications"}</H>
              <dl className="spec-table">
                {event.specs.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
              {event.notes?.length > 0 && (
                <ul className="note-list">
                  {event.notes.map((n) => (
                    <li key={n}>
                      <Icon name="check" size={16} /> {n}
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {event.info?.length > 0 && (
              <section className="info-grid">
                {event.info.map(([k, v]) => (
                  <div key={k} className="info-card">
                    <h5>{k}</h5>
                    <p>{v}</p>
                  </div>
                ))}
              </section>
            )}

            {event.lists?.map((l) => (
              <section key={l.title}>
                <H>{l.title}</H>
                <ul className="note-list">
                  {l.items.map((n) => (
                    <li key={n}>
                      <Icon name="check" size={16} /> {n}
                    </li>
                  ))}
                </ul>
              </section>
            ))}

            {event.canvas && (
              <section>
                <H>The Business Model Canvas</H>
                <p className="modal-small">Every team must complete all nine blocks.</p>
                <div className="bmc">
                  {event.canvas.map(([k, q], i) => (
                    <div key={k} className={`bmc-${i}`}>
                      <strong>{k}</strong>
                      <span>{q}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section>
              <H>Rules</H>
              <ol className="rule-list">
                {event.rules.map((r, i) => (
                  <li key={i}>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <p>{r}</p>
                  </li>
                ))}
              </ol>
            </section>

            {event.penalties && (
              <section>
                <H>Judging &amp; penalties</H>
                <p className="modal-small">{event.judging}</p>
                <div className="penalties">
                  {event.penalties.map(([v, t, desc]) => (
                    <div key={t}>
                      <strong>{v}</strong>
                      <h5>{t}</h5>
                      <p>{desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {event.criteria && (
              <section>
                <H>Judging criteria · {total} points</H>
                <ul className="criteria">
                  {event.criteria.map(([name, pts, desc]) => (
                    <li key={name}>
                      <div className="crit-top">
                        <strong>{name}</strong>
                        <span>{pts}</span>
                      </div>
                      <div className="crit-bar">
                        <i style={{ width: `${(pts / 25) * 100}%` }} />
                      </div>
                      <p>{desc}</p>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {event.prohibited?.length > 0 && (
              <section>
                <H red>{event.prohibitedTitle || "Strictly prohibited"}</H>
                <ul className="chips">
                  {event.prohibited.map((p) => (
                    <li key={p}>
                      <Icon name="close" size={14} /> {p}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section className="modal-contact">
              <H>Event coordinators</H>
              <div className="coord-list">
                {site.coordinators.map((c) => (
                  <a key={c.tel} href={`tel:${c.tel}`} className="coord">
                    <Icon name="phone" size={18} />
                    <span>
                      <strong>{c.name}</strong>
                      <small>{c.phone}</small>
                    </span>
                  </a>
                ))}
              </div>
            </section>

            {event.ruleBookName && (
              <p className="modal-small">Listed in the official rule book as “{event.ruleBookName}”.</p>
            )}

            <div className="modal-actions">
              <a href={site.registerUrl} target="_blank" rel="noopener noreferrer" className="btn btn-red">
                Register now <Icon name="arrow" size={18} />
              </a>
              <a href={event.poster} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <Icon name="image" size={18} /> Poster
              </a>
              <a href={site.rulebookUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <Icon name="download" size={18} /> Rule book
              </a>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
