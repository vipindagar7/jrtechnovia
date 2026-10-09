"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { zones, eventsByZone } from "@/data/events";
import { actions } from "@/lib/store";
import Icon from "./Icons";

export default function Zones() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          wide: "(prefers-reduced-motion: no-preference) and (min-width: 961px)",
          narrow: "(prefers-reduced-motion: no-preference) and (max-width: 960px)",
        },
        (ctx) => {
          if (ctx.conditions.wide) {
            const tl = gsap.timeline({ scrollTrigger: { trigger: ".zones-grid", start: "top 80%" } });
            tl.from(".zone", {
              y: 140,
              rotate: (i) => (i - 1) * 5,
              autoAlpha: 0,
              stagger: 0.15,
              duration: 1.1,
              ease: "power4.out",
            })
              .from(".zone-no", { yPercent: 70, stagger: 0.15, duration: 1.3, ease: "expo.out" }, 0.2)
              .from(".zone-events li", { x: -20, autoAlpha: 0, stagger: 0.04, duration: 0.5 }, 0.6);
          } else {
            gsap.utils.toArray(".zone").forEach((z) =>
              gsap.from(z, {
                x: 60,
                autoAlpha: 0,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: { trigger: z, start: "top 88%", once: true },
              })
            );
          }
        }
      );
    },
    { scope: root }
  );

  return (
    <section className="section zones" id="zones" ref={root}>
      <span className="drift outline-word" data-dir="left" aria-hidden="true">
        Speed · Combat · Innovation ·
      </span>
      <div className="container">
        <header className="section-head">
          <p className="eyebrow">
            <span className="dot" /> Three zones · Nine events
          </p>
          <h2 className="h2 split-head">
            Pick your <span className="red">arena</span>
          </h2>
          <p className="lead reveal">
            Every event at Junior Technovia sits in one of three zones. Enter as many events as your team can handle.
          </p>
        </header>

        <div className="zones-grid">
          {zones.map((z) => (
            <article className={`zone tilt zone-${z.id}`} key={z.id}>
              <span className="zone-shine" />
              <span className="zone-no" aria-hidden="true">
                {z.no}
              </span>
              <div className="zone-icon">
                <Icon name={z.icon} size={28} />
              </div>
              <p className="zone-label">Zone {z.no}</p>
              <h3>{z.name}</h3>
              <p className="zone-blurb">{z.blurb}</p>
              <ul className="zone-events">
                {eventsByZone(z.id).map((e) => (
                  <li key={e.code}>
                    <Icon name={e.icon} size={18} /> {e.name}
                  </li>
                ))}
              </ul>
              <button className="zone-cta" onClick={() => actions.pickZone(z.id)}>
                View events <Icon name="arrow" size={18} />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
