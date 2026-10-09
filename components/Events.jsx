"use client";
import { useLayoutEffect, useRef } from "react";
import { gsap, Flip, useGSAP, MOTION_OK } from "@/lib/gsap";
import { events, zones, zoneById } from "@/data/events";
import { actions, useStore } from "@/lib/store";
import Icon from "./Icons";

const filters = [{ id: "all", name: "All events" }, ...zones];

export default function Events() {
  const root = useRef(null);
  const flipState = useRef(null);
  const filter = useStore((s) => s.filter);
  const prev = useRef(filter);

  const changeFilter = (id) => {
    if (id === filter) return;
    actions.setFilter(id);
  };

  // Capture layout before React commits the new filter (covers changes from Zones too)
  if (prev.current !== filter && root.current && !flipState.current) {
    flipState.current = Flip.getState(root.current.querySelectorAll(".event-card"));
  }

  useLayoutEffect(() => {
    prev.current = filter;
    if (!flipState.current) return;
    Flip.from(flipState.current, {
      duration: 0.6,
      ease: "power3.inOut",
      absolute: true,
      scale: true,
      onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, scale: 0.85 }, { autoAlpha: 1, scale: 1, duration: 0.5 }),
      onLeave: (els) => gsap.to(els, { autoAlpha: 0, scale: 0.85, duration: 0.35 }),
    });
    flipState.current = null;
    // move the active-tab indicator
    const active = root.current.querySelector(".filter.is-active");
    const pill = root.current.querySelector(".filter-pill");
    if (active && pill)
      gsap.to(pill, { x: active.offsetLeft, y: active.offsetTop, width: active.offsetWidth, duration: 0.5, ease: "power3.out" });
  }, [filter]);

  useGSAP(
    () => {
      const active = root.current.querySelector(".filter.is-active");
      gsap.set(".filter-pill", { x: active.offsetLeft, y: active.offsetTop, width: active.offsetWidth });

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.utils.toArray(".event-card").forEach((card, i) => {
          gsap.from(card, {
            y: 80,
            rotateX: -25,
            transformPerspective: 800,
            transformOrigin: "top center",
            autoAlpha: 0,
            duration: 0.9,
            delay: (i % 3) * 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 92%", once: true },
          });
        });
      });
    },
    { scope: root }
  );

  return (
    <section className="section events" id="events" ref={root}>
      <div className="container">
        <header className="section-head section-head-row">
          <div>
            <p className="eyebrow">
              <span className="dot" /> The line-up
            </p>
            <h2 className="h2 split-head">
              Choose your <span className="red">challenge</span>
            </h2>
          </div>
          <div className="filters" role="tablist" aria-label="Filter events by zone">
            <span className="filter-pill" aria-hidden="true" />
            {filters.map((f) => (
              <button
                key={f.id}
                role="tab"
                aria-selected={filter === f.id}
                className={`filter ${filter === f.id ? "is-active" : ""}`}
                onClick={() => changeFilter(f.id)}
              >
                {f.name}
              </button>
            ))}
          </div>
        </header>

        <div className="events-grid">
          {events.map((e) => {
            const hidden = filter !== "all" && e.zone !== filter;
            return (
              <article
                key={e.code}
                className={`event-card ${hidden ? "is-hidden" : ""}`}
                data-flip-id={e.code}
                aria-hidden={hidden}
              >
                <button className="event-hit" onClick={() => actions.open(e.code)} tabIndex={hidden ? -1 : 0}>
                  <span className="sr-only">Open details for {e.name}</span>
                </button>
                <div className="event-top">
                  <span className="event-icon">
                    <Icon name={e.icon} size={30} />
                  </span>
                  <span className="event-code">{e.code}</span>
                </div>
                <p className="event-zone">{zoneById(e.zone).name}</p>
                <h3>{e.name}</h3>
                <p className="event-tag">{e.tagline}</p>
                <dl className="event-specs">
                  {e.highlights.map(([k, v]) => (
                    <div key={k}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="event-foot">
                  <span>{e.tba ? "Rules coming soon" : "Specs & rules"}</span>
                  <span className="event-arrow">
                    <Icon name="arrow" size={18} />
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
