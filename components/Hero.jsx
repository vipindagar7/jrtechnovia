"use client";
import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { site } from "@/data/site";
import Icon from "./Icons";
import Wordmark from "./Wordmark";
import Countdown from "./Countdown";
import HeroOrbit from "./HeroOrbit";

export default function Hero() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.set(".hero-curtain", { animation: "none", scaleY: 1, transformOrigin: "top center" })
          .to(".hero-curtain", { scaleY: 0, duration: 0.9, ease: "power4.inOut" })
          .from(".hero-kicker", { y: 20, autoAlpha: 0, duration: 0.6 }, "-=0.3")
          .from(".hero-junior", { x: -40, autoAlpha: 0, rotate: -8, duration: 0.8 }, "-=0.4")
          .from(".hero-title .wordmark > *", { yPercent: 115, stagger: 0.07, duration: 0.9 }, "-=0.6")
          .from(".hero-title .wordmark-gear", { rotate: -360, duration: 1.6, ease: "expo.out" }, "<")
          .from(".hero-year", { scaleX: 0.3, autoAlpha: 0, duration: 0.8 }, "-=1.1")
          .from(".hero-sub span", { y: 16, autoAlpha: 0, stagger: 0.04, duration: 0.5 }, "-=0.6")
          .from(".hero-motto > span", { y: 14, autoAlpha: 0, stagger: 0.12, duration: 0.5 }, "-=0.3")
          .from(".hero-meta > span", { x: -30, autoAlpha: 0, stagger: 0.1, duration: 0.6 }, "-=0.4")
          .from(".hero-actions > *", { y: 20, autoAlpha: 0, stagger: 0.08, duration: 0.6 }, "-=0.4")
          .from(".hero-count > div", { y: 20, autoAlpha: 0, stagger: 0.06, duration: 0.5 }, "-=0.4")
          .from(".hero-flag", { autoAlpha: 0, x: -30, duration: 1 }, 0.3);

        // gentle shine sweep across the chrome wordmark
        gsap.fromTo(
          ".hero-title .wordmark > span",
          { backgroundPosition: "0% 0%" },
          { backgroundPosition: "0% 200%", duration: 3.5, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 2 }
        );

        gsap.to(".hero-copy", {
          yPercent: -10,
          autoAlpha: 0.15,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.5 },
        });
      });
    },
    { scope: root }
  );

  return (
    <section className="hero" id="top" ref={root}>
      <div className="hero-curtain" aria-hidden="true" />
      <div className="hero-flag" aria-hidden="true" />
      <div className="hero-slashes" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="hero-kicker eyebrow">
            <span className="dot" /> For {site.eligibility} students
          </p>
          <h1 className="hero-title">
            <span className="hero-junior">Junior</span>
            <Wordmark />
            <span className="hero-year">
              <i /> {site.year} <i />
            </span>
          </h1>
          <p className="hero-sub">
            {site.subtitle.split(" ").map((w, i) => (
              <span key={i}>{w}</span>
            ))}
          </p>
          <p className="hero-motto">
            {site.motto.map((m, i) => (
              <span key={m}>
                {i > 0 && <i aria-hidden="true">|</i>}
                {m}
              </span>
            ))}
          </p>

          <div className="hero-meta">
            <span>
              <Icon name="calendar" size={20} /> {site.dateLabel}
            </span>
            <span>
              <Icon name="pin" size={20} /> {site.venueShort}
            </span>
          </div>

          <div className="hero-actions">
            <a href={site.registerUrl} target="_blank" rel="noopener noreferrer" className="btn btn-red magnetic">
              Register now <Icon name="arrow" size={18} />
            </a>
            <a href="#events" className="btn btn-ghost magnetic">
              Explore events
            </a>
          </div>

          <Countdown />
        </div>

        <HeroOrbit />
      </div>

      <a href="#zones" className="scroll-cue" aria-label="Scroll down">
        <span>Scroll</span>
        <i />
      </a>
    </section>
  );
}
