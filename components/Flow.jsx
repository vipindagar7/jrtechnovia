"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const steps = [
  ["Register", "Sign up your team of 2–4 for one or more events."],
  ["Inspection", "Every robot and drone passes a technical and safety check."],
  ["Practice", "One practice run or flight to get a feel for the arena."],
  ["Compete", "Up to 2 official attempts. Best valid result counts."],
  ["Podium", "Top 3 in each event take home cash prizes."],
];

export default function Flow() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          desktop: "(prefers-reduced-motion: no-preference) and (min-width: 901px)",
          mobile: "(prefers-reduced-motion: no-preference) and (max-width: 900px)",
        },
        (ctx) => {
          const d = ctx.conditions.desktop;
          const rail = root.current.querySelector(".flow-rail");
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: rail,
              start: "top 75%",
              end: "bottom 55%",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          });
          tl.fromTo(
            ".flow-progress",
            d ? { scaleX: 0, scaleY: 1, transformOrigin: "left center" } : { scaleY: 0, scaleX: 1, transformOrigin: "center top" },
            { scaleX: 1, scaleY: 1, ease: "none" }
          )
            .fromTo(
              ".flow-bot",
              { x: 0, y: 0 },
              d
                ? { x: () => rail.offsetWidth - 20, ease: "none" }
                : { y: () => rail.offsetHeight - 20, ease: "none" },
              0
            )
            .from(".flow-step", { autoAlpha: 0.15, y: 30, stagger: 0.2, ease: "power1.out" }, 0)
            .from(".flow-no", { scale: 0.5, backgroundColor: "#0b0b0c", stagger: 0.2, ease: "back.out(2)" }, 0);
        }
      );
    },
    { scope: root }
  );

  return (
    <section className="section flow" ref={root}>
      <div className="container">
        <header className="section-head">
          <p className="eyebrow">
            <span className="dot" /> Race day
          </p>
          <h2 className="h2 split-head">
            From pit to <span className="red">podium</span>
          </h2>
        </header>
        <div className="flow-rail">
          <div className="flow-line">
            <div className="flow-progress" />
          </div>
          <span className="flow-bot" aria-hidden="true" />
          <ol className="flow-steps">
            {steps.map(([t, d], i) => (
              <li className="flow-step" key={t}>
                <span className="flow-no">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
