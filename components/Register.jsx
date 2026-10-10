"use client";
import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { site } from "@/data/site";
import Icon from "./Icons";
import Wordmark, { Gear } from "./Wordmark";

export default function Register() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap
          .timeline({ scrollTrigger: { trigger: root.current, start: "top 75%" } })
          .from(".register-panel", { scaleX: 0, transformOrigin: "left center", duration: 1, ease: "power4.inOut" })
          .from(".register-copy h2 .line", { yPercent: 110, stagger: 0.1, duration: 0.8, ease: "power4.out" }, "-=0.3")
          .from(".register-copy > :not(h2)", { y: 20, autoAlpha: 0, stagger: 0.08, duration: 0.6 }, "-=0.5")
          .from(".register-qr", { rotate: -12, scale: 0.6, autoAlpha: 0, duration: 0.8, ease: "back.out(1.8)" }, "-=0.6");

        gsap.to(".register-gear", {
          rotate: 360,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 1 },
        });
        gsap.to(".register-checker", {
          backgroundPositionX: "+=96px",
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 1 },
        });
      });
    },
    { scope: root }
  );

  return (
    <section className="section register" id="register" ref={root}>
      <div className="container">
        <div className="register-panel">
          <div className="register-checker" aria-hidden="true" />
          <Gear className="register-gear" />

          <div className="register-copy">
            <p className="eyebrow light">
              <span className="dot white" /> Registrations open
            </p>
            <h2>
              <span className="line-mask">
                <span className="line">Your bot.</span>
              </span>
              <span className="line-mask">
                <span className="line">Our track.</span>
              </span>
              <span className="line-mask">
                <span className="line dark">{site.dateLabel}.</span>
              </span>
            </h2>
            <p className="register-meta">
              {site.fee} {site.feeUnit} · Teams of {site.teamSize} · {site.eligibility} · {site.venueShort}
            </p>
            <div className="register-actions">
              <a href={site.registerUrl} target="_blank" rel="noopener noreferrer" className="btn btn-white magnetic">
                Register your team <Icon name="arrow" size={18} />
              </a>
              <a href={site.rulebookUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline-white magnetic">
                <Icon name="download" size={18} /> Rule book
              </a>
            </div>
            <div className="register-coords">
              <span>Questions?</span>
              {site.coordinators.map((c) => (
                <a key={c.tel} href={`tel:${c.tel}`}>
                  <Icon name="phone" size={16} /> {c.name} · {c.phone}
                </a>
              ))}
            </div>
          </div>

          <a className="register-qr" href={site.registerUrl} target="_blank" rel="noopener noreferrer">
            <img src={site.qrUrl} alt="QR code linking to the registration form" width="150" height="150" />
            <p>
              Scan to <strong>register</strong>
            </p>
          </a>

          <Wordmark className="register-mark" />
        </div>
      </div>
    </section>
  );
}
