"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { site } from "@/data/site";
import Icon from "./Icons";
import { Gear } from "./Wordmark";

const links = [
  ["Events", "#events"],
  ["Schedule", "#schedule"],
  ["Prizes", "#prizes"],
  ["Rules", "#rules"],
  ["Sponsors", "#sponsors"],
  ["Contact", "#contact"],
];

export default function Nav() {
  const root = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        setHidden(y > 400 && y > last);
        last = y;
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", open);
  }, [open]);

  // Intro + mobile menu stagger
  const { contextSafe } = useGSAP(
    () => {
      gsap.from(".nav-logo, .nav-links > a, .nav-toggle", {
        y: -30,
        autoAlpha: 0,
        stagger: 0.06,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
      });
      gsap.from(".nav-cta", { autoAlpha: 0, duration: 0.6, delay: 0.7 });
    },
    { scope: root }
  );

  const toggle = contextSafe(() => {
    const next = !open;
    setOpen(next);
    if (next && window.matchMedia("(max-width: 900px)").matches) {
      gsap.fromTo(
        ".nav-links a",
        { x: 40, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, stagger: 0.06, duration: 0.6, ease: "power3.out", delay: 0.1 }
      );
    }
  });

  return (
    <header
      ref={root}
      className={`nav ${scrolled ? "is-scrolled" : ""} ${hidden && !open ? "is-hidden" : ""} ${open ? "is-open" : ""}`}
    >
      <div className="nav-inner container">
        <a href="#top" className="nav-logo" onClick={() => setOpen(false)}>
          <Gear className="nav-logo-gear" />
          <span>
            <em>Junior</em>
            <strong>Technovia</strong>
          </span>
          <b>{site.year.slice(2)}</b>
        </a>

        <nav className="nav-links" aria-label="Primary">
          {links.map(([label, href], i) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              <small>0{i + 1}</small>
              {label}
            </a>
          ))}
          <a href={site.registerUrl} target="_blank" rel="noopener noreferrer" className="nav-links-cta" onClick={() => setOpen(false)}>
            Register now →
          </a>
        </nav>

        <a href={site.registerUrl} target="_blank" rel="noopener noreferrer" className="btn btn-red btn-sm nav-cta">
          Register <Icon name="arrow" size={16} />
        </a>

        <button className="nav-toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={toggle}>
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
