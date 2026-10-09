"use client";
import { useEffect, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { site } from "@/data/site";
import { events, zoneById } from "@/data/events";
import { rulebook } from "@/data/rulebook";
import { actions } from "@/lib/store";
import Icon from "./Icons";

export default function EventModal({ code }) {
  const root = useRef(null);
  const closeBtn = useRef(null);
  const card = events.find((e) => e.code === code);
  const event = { ...(rulebook[code] || {}), ...card };
  const zone = zoneById(event.zone);
  const info = event.info ? Object.entries(event.info) : [];

  const { contextSafe } = useGSAP(
    () => {
      gsap
        .timeline()
        .fromTo(".modal-backdrop", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 })
        .fromTo(".modal-panel", { xPercent: 100 }, { xPercent: 0, duration: 0.6, ease: "expo.out" }, 0)
        .from(".modal-stripe", { scaleY: 0, transformOrigin: "top", duration: 0.8, ease: "power3.out" }, 0.15)
        .from(".modal-body > *", { y: 30, autoAlpha: 0, stagger: 0.06, duration: 0.5, ease: "power3.out" }, 0.25)
        .from(".spec-table > div", { autoAlpha: 0, x: -10, stagger: 0.025, duration: 0.3 }, 0.45);
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

  return (
    <div className="modal" ref={root} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-backdrop" onClick={close} />
      <aside className="modal-panel">
        <span className="modal-stripe" aria-hidden="true" />
        <div className="modal-head">
          <span className="modal-code">
            {event.code} · Zone {zone.no} · {zone.name}
          </span>
          <button ref={closeBtn} className="modal-close" onClick={close} aria-label="Close">
            <Icon name="close" />
          </button>
        </div>

        <div className="modal-body" data-lenis-prevent>
          <div className="modal-title-row">
            <span className="event-icon lg">
              <Icon name={event.icon} size={40} />
            </span>
            <div>
              <h3 id="modal-title">{event.name}</h3>
              <p className="event-tag">{event.tagline}</p>
            </div>
          </div>

          {event.tba ? (
            <>
              <p className="modal-text">{event.summary}</p>
              <div className="notice">
                <Icon name="shield" size={22} />
                <p>
                  Detailed format, judging criteria and rules for {event.name} will be published soon. Teams of{" "}
                  {site.teamSize} from {site.eligibility}.
                </p>
              </div>
            </>
          ) : (
            <>
              <section>
                <h4>Technical specifications</h4>
                <dl className="spec-table">
                  {event.specs.map(([k, v]) => (
                    <div key={k}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              {info.length > 0 && (
                <section className="info-grid">
                  {info.map(([k, v]) => (
                    <div key={k} className="info-card">
                      <h5>{k}</h5>
                      <p>{v}</p>
                    </div>
                  ))}
                </section>
              )}

              <section>
                <h4>Rules</h4>
                <ol className="rule-list">
                  {event.rules.map((r, i) => (
                    <li key={i}>
                      <span>{String(i + 1).padStart(2, "0")}</span>
                      <p>{r}</p>
                    </li>
                  ))}
                </ol>
              </section>

              {event.prohibited?.length > 0 && (
                <section>
                  <h4 className="red">Strictly prohibited</h4>
                  <ul className="chips">
                    {event.prohibited.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </section>
              )}
            </>
          )}

          <div className="modal-actions">
            <a href={site.registerUrl} className="btn btn-red" onClick={close}>
              Register for {event.name} <Icon name="arrow" size={18} />
            </a>
            <a href={site.rulebookUrl} className="btn btn-ghost" download>
              <Icon name="download" size={18} /> Rulebook
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
}
