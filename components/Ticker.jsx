"use client";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";
import { events } from "@/data/events";

const names = events.map((e) => e.short || e.name);

function Row({ items, className }) {
  const row = [...items, ...items];
  return (
    <div className={`ticker ${className}`}>
      <div className="ticker-track">
        {row.map((t, i) => (
          <span key={i} className="ticker-item">
            {t}
            <i className="chk" />
          </span>
        ))}
      </div>
    </div>
  );
}

/** Two crossing race-tape marquees. They reverse with scroll direction. */
export default function Ticker() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const a = gsap.to(".t-red .ticker-track", { xPercent: -50, duration: 30, ease: "none", repeat: -1 });
        const b = gsap.fromTo(
          ".t-dark .ticker-track",
          { xPercent: -50 },
          { xPercent: 0, duration: 34, ease: "none", repeat: -1 }
        );
        let dir = 1;
        ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => {
            a.paused(!self.isActive);
            b.paused(!self.isActive);
          },
          onUpdate: (self) => {
            if (self.direction !== dir) {
              dir = self.direction;
              gsap.to([a, b], { timeScale: dir, duration: 0.6, overwrite: true });
            }
          },
        });
      });
    },
    { scope: root }
  );

  return (
    <div className="tickers" ref={root} aria-hidden="true">
      <Row items={names} className="t-dark" />
      <Row items={names} className="t-red" />
    </div>
  );
}
