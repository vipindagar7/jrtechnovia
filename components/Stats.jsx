"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { site } from "@/data/site";
import { events } from "@/data/events";

const inr = (n) => n.toLocaleString("en-IN");

const stats = [
  { value: site.prizePool, prefix: "₹", label: "Cash prize pool", inr: true },
  { value: events.length, label: "Events" },
  { value: site.days.length, label: "Days of competition" },
  { value: 100, prefix: "₹", label: "Entry per student, per event" },
];

export default function Stats() {
  const root = useRef(null);

  useGSAP(
    () => {
      root.current.querySelectorAll("[data-count]").forEach((el) => {
        const end = Number(el.dataset.count);
        const fmt = el.dataset.inr ? inr : String;
        const obj = { v: 0 };
        gsap.to(obj, {
          v: end,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => (el.textContent = fmt(Math.round(obj.v))),
        });
      });
      gsap.from(".stat-line", {
        scaleX: 0,
        transformOrigin: "left",
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
      });
    },
    { scope: root }
  );

  return (
    <section className="stats" ref={root}>
      <div className="container stats-grid">
        {stats.map((s) => (
          <div className="stat reveal" key={s.label}>
            <span className="stat-line" />
            <div className="stat-num">
              {s.prefix && <span className="stat-prefix">{s.prefix}</span>}
              <span data-count={s.value} data-inr={s.inr ? "1" : undefined}>
                {s.inr ? inr(s.value) : s.value}
              </span>
            </div>
            <p>{s.label}</p>
          </div>
        ))}
      </div>
      <p className="container stats-note reveal">
        Open to <strong>{site.eligibility}</strong> students with valid school ID · Solo or teams of up to 4
      </p>
    </section>
  );
}
