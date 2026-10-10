"use client";
import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { site } from "@/data/site";
import { eventsByDay, zoneById } from "@/data/events";
import { actions } from "@/lib/store";
import Icon from "./Icons";

export default function Schedule() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.utils.toArray(".day").forEach((day, i) => {
          const tl = gsap.timeline({ scrollTrigger: { trigger: day, start: "top 82%", once: true } });
          tl.from(day, { x: i ? 60 : -60, autoAlpha: 0, duration: 0.9, ease: "power3.out" })
            .from(day.querySelectorAll(".day-num span"), { yPercent: 100, stagger: 0.08, duration: 0.7, ease: "power4.out" }, 0.2)
            .from(day.querySelectorAll(".slot"), { x: -24, autoAlpha: 0, stagger: 0.08, duration: 0.5, ease: "power3.out" }, 0.35);
        });
      });
    },
    { scope: root }
  );

  return (
    <section className="section schedule" id="schedule" ref={root}>
      <div className="container">
        <header className="section-head">
          <p className="eyebrow">
            <span className="dot" /> Schedule
          </p>
          <h2 className="h2 split-head">
            Two days. <span className="red">Eight events.</span>
          </h2>
          <p className="lead reveal">
            Tap any event for its full specs and rules. Exact reporting times will be shared with registered teams.
          </p>
        </header>

        <div className="days">
          {site.days.map((d) => (
            <article className="day" key={d.id}>
              <header className="day-head">
                <p className="day-num" aria-hidden="true">
                  {d.date.slice(0, 2).split("").map((c, i) => (
                    <span key={i}>{c}</span>
                  ))}
                </p>
                <div>
                  <p className="day-label">{d.label}</p>
                  <h3>
                    {d.weekday}, {d.date}
                  </h3>
                </div>
              </header>
              <ul className="slots">
                {eventsByDay(d.id).map((e) => (
                  <li key={e.code}>
                    <button className="slot" onClick={() => actions.open(e.code)}>
                      <span className="slot-icon">
                        <Icon name={e.icon} size={22} />
                      </span>
                      <span className="slot-main">
                        <strong>{e.name}</strong>
                        <small>{zoneById(e.zone).name}</small>
                      </span>
                      <span className="slot-code">{e.code}</span>
                      <Icon name="arrow" size={18} className="slot-arrow" />
                    </button>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
