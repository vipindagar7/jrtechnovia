"use client";
import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { site } from "@/data/site";
import Icon from "./Icons";

const perks = [
  { icon: "trophy", title: "Cash for the top 3", text: "Assured cash prizes for the top three positions in every event." },
  {
    icon: "ticket",
    title: `${site.fee} entry`,
    text: `Registration is ${site.fee} ${site.feeUnit}. Enter as many events as you like.`,
  },
  { icon: "certificate", title: "Certificate for all", text: "Every participant receives a certificate of participation." },
];

export default function Prizes() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: ".prize-hero", start: "top 75%" } });
        tl.from(".prize-amount .digit", {
          yPercent: 100,
          stagger: 0.04,
          duration: 0.9,
          ease: "power4.out",
        })
          .from(".podium-step", { scaleY: 0, transformOrigin: "bottom", stagger: { each: 0.15, from: "center" }, duration: 1, ease: "power4.out" }, 0.2)
          .from(".podium-step > *", { y: 20, autoAlpha: 0, stagger: 0.1, duration: 0.5 }, 0.8)
          .from(".confetti i", { y: 60, autoAlpha: 0, rotate: () => gsap.utils.random(-180, 180), stagger: 0.03, duration: 1.2, ease: "power3.out" }, 0.9);

        gsap.to(".confetti i", {
          y: () => gsap.utils.random(-14, 14),
          rotate: () => gsap.utils.random(-30, 30),
          duration: () => gsap.utils.random(2, 3.5),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 2.2,
        });

        gsap.from(".perk", {
          x: 80,
          autoAlpha: 0,
          stagger: 0.12,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".perks", start: "top 85%" },
        });
      });
    },
    { scope: root }
  );

  return (
    <section className="section prizes" id="prizes" ref={root}>
      <span className="drift outline-word" aria-hidden="true">
        Win · Win · Win · Win ·
      </span>
      <div className="container prizes-grid">
        <div className="prize-hero tilt">
          <p className="eyebrow">
            <span className="dot" /> Prize pool
          </p>
          <p className="prize-amount" aria-label={site.prizePoolLabel}>
            {site.prizePoolLabel.split("").map((c, i) => (
              <span className="digit-mask" key={i} aria-hidden="true">
                <span className="digit">{c}</span>
              </span>
            ))}
          </p>
          <p className="prize-caption">worth of cash prizes</p>

          <div className="podium" aria-hidden="true">
            <div className="confetti">
              {Array.from({ length: 14 }).map((_, i) => (
                <i key={i} style={{ "--x": `${(i * 37) % 100}%`, "--y": `${(i * 23) % 60}%` }} />
              ))}
            </div>
            <div className="podium-step s2">
              <span>2</span>
            </div>
            <div className="podium-step s1">
              <Icon name="trophy" size={34} />
              <span>1</span>
            </div>
            <div className="podium-step s3">
              <span>3</span>
            </div>
          </div>
        </div>

        <div className="perks">
          {perks.map((p) => (
            <div className="perk" key={p.title}>
              <span className="perk-icon">
                <Icon name={p.icon} size={26} />
              </span>
              <div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
