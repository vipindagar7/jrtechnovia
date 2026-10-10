"use client";
import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";
import { events, zones, zoneById } from "@/data/events";
import { site } from "@/data/site";
import { actions, useStore } from "@/lib/store";
import Icon from "./Icons";

const filters = [{ id: "all", name: "All events" }, ...zones];
const count = (id) => (id === "all" ? events.length : events.filter((e) => e.zone === id).length);
const dayLabel = (id) => {
  const d = site.days.find((x) => x.id === id);
  return `${d.label} · ${d.date.slice(0, 6)}`;
};

export default function Events() {
  const root = useRef(null);
  const filter = useStore((s) => s.filter);
  const first = useRef(true);

  // Move the active-tab pill + animate the newly visible cards (no layout tricks, so nothing can get stuck)
  useLayoutEffect(() => {
    const el = root.current;
    const active = el.querySelector(".filter.is-active");
    const pill = el.querySelector(".filter-pill");
    if (active && pill) {
      const to = { x: active.offsetLeft, y: active.offsetTop, width: active.offsetWidth, height: active.offsetHeight };
      first.current ? gsap.set(pill, to) : gsap.to(pill, { ...to, duration: 0.5, ease: "power3.out" });
    }
    if (first.current) {
      first.current = false;
      return;
    }
    ScrollTrigger.refresh();
    if (window.matchMedia(MOTION_OK).matches) {
      gsap.fromTo(
        el.querySelectorAll(".ev:not(.is-hidden)"),
        { y: 40, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.07, ease: "power3.out", overwrite: true, clearProps: "transform" }
      );
    }
  }, [filter]);

  // Scroll reveal (runs once per card)
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.set(".ev", { y: 60, autoAlpha: 0 });
        ScrollTrigger.batch(".ev", {
          start: "top 92%",
          once: true,
          onEnter: (els) =>
            gsap.to(els, {
              y: 0,
              autoAlpha: 1,
              stagger: 0.1,
              duration: 0.9,
              ease: "power3.out",
              overwrite: true,
              clearProps: "transform",
            }),
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
                onClick={() => actions.setFilter(f.id)}
              >
                {f.name} <sup>{count(f.id)}</sup>
              </button>
            ))}
          </div>
        </header>

        <div className="ev-grid">
          {events.map((e, i) => {
            const hidden = filter !== "all" && e.zone !== filter;
            return (
              <article key={e.code} className={`ev ev-${e.zone} ${hidden ? "is-hidden" : ""}`} aria-hidden={hidden}>
                <button className="ev-hit" onClick={() => actions.open(e.code)} tabIndex={hidden ? -1 : 0}>
                  <span className="sr-only">Open specs and rules for {e.name}</span>
                </button>

                <div className="ev-media">
                  <img src={e.image} alt="" width="960" height="500" loading="lazy" decoding="async" />
                  <span className="ev-num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="ev-badges">
                    <span className="ev-day">
                      <Icon name="calendar" size={13} /> {dayLabel(e.day)}
                    </span>
                    <span className="ev-code">{e.code}</span>
                  </div>
                  <div className="ev-title">
                    <span className="ev-icon">
                      <Icon name={e.icon} size={24} />
                    </span>
                    <div>
                      <p className="ev-zone">{zoneById(e.zone).name}</p>
                      <h3>{e.name}</h3>
                    </div>
                  </div>
                </div>

                <div className="ev-body">
                  <p className="ev-tag">{e.tagline}</p>
                  <dl className="ev-specs">
                    {e.highlights.map(([k, v]) => (
                      <div key={k}>
                        <dt>{k}</dt>
                        <dd>{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="ev-cta" aria-hidden="true">
                  <span>View specs &amp; rules</span>
                  <span className="ev-arrow">
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