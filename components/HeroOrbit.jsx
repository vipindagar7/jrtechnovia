"use client";
import { useEffect, useRef } from "react";
import { gsap, useGSAP, MOTION_OK, DESKTOP } from "@/lib/gsap";
import { events } from "@/data/events";
import Icon from "./Icons";
import { Gear } from "./Wordmark";

const nodes = events.slice(0, 6).concat(events.slice(6, 9));

/**
 * HUD-style "event orbit": a spinning gear core that cycles through every event,
 * with the nine events orbiting on a ring. Continuous spins are CSS keyframes on
 * HTML layers (compositor-only); GSAP handles the intro, the cycle and parallax.
 * Animations pause automatically when the hero is off-screen.
 */
export default function HeroOrbit() {
  const root = useRef(null);
  const cycle = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const labels = gsap.utils.toArray(".core-label");
      const dots = gsap.utils.toArray(".orbit-node");

      // Cycle core label + highlight matching node
      const tl = gsap.timeline({ repeat: -1 });
      labels.forEach((el, i) => {
        tl.call(() => dots.forEach((d, j) => d.classList.toggle("is-on", i === j)))
          .fromTo(el, { yPercent: 60, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.5, ease: "power3.out" })
          .to(el, { yPercent: -60, autoAlpha: 0, duration: 0.4, ease: "power3.in" }, "+=1.6");
      });
      // Orbit spin: ring and counter-rotating chips share one timeline so icons stay upright
      const spin = gsap
        .timeline({ repeat: -1, defaults: { ease: "none", duration: 48 } })
        .to(".orbit-track", { rotation: 360 }, 0)
        .to(".orbit-node-in", { rotation: -360 }, 0);
      cycle.current = [tl, spin];

      mm.add(MOTION_OK, () => {
        gsap
          .timeline({ delay: 0.3 })
          .from(".orbit-ring", { scale: 0.5, autoAlpha: 0, rotate: -90, stagger: 0.12, duration: 1.4, ease: "expo.out" })
          .from(".orbit-core", { scale: 0, rotate: -180, duration: 1.2, ease: "back.out(1.6)" }, 0.2)
          .from(".orbit-node-in", { scale: 0, autoAlpha: 0, stagger: 0.06, duration: 0.6, ease: "back.out(2)" }, 0.6)
          .from(".hud > *", { autoAlpha: 0, stagger: 0.05, duration: 0.5 }, 0.8);

        gsap.to(".orbit-stage", {
          scale: 0.82,
          rotate: 25,
          autoAlpha: 0.3,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top 20%", end: "bottom top", scrub: 0.5 },
        });
      });

      mm.add(DESKTOP, () => {
        const layers = gsap.utils.toArray("[data-depth]").map((el) => ({
          x: gsap.quickTo(el, "x", { duration: 0.8, ease: "power3" }),
          y: gsap.quickTo(el, "y", { duration: 0.8, ease: "power3" }),
          d: Number(el.dataset.depth),
        }));
        const hero = root.current.closest(".hero");
        const move = (e) => {
          const px = e.clientX / window.innerWidth - 0.5;
          const py = e.clientY / window.innerHeight - 0.5;
          layers.forEach((l) => {
            l.x(px * l.d);
            l.y(py * l.d);
          });
        };
        hero.addEventListener("pointermove", move, { passive: true });
        return () => hero.removeEventListener("pointermove", move);
      });
    },
    { scope: root }
  );

  // Pause CSS spins + GSAP cycle when off-screen
  useEffect(() => {
    const el = root.current;
    const io = new IntersectionObserver(([e]) => {
      el.classList.toggle("is-paused", !e.isIntersecting);
      cycle.current?.forEach((t) => t.paused(!e.isIntersecting));
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="orbit" ref={root} aria-hidden="true">
      <div className="orbit-stage">
        <div className="orbit-glow" />
        <div className="orbit-ring ring-1" data-depth="10" />
        <div className="orbit-ring ring-2" data-depth="18">
          <svg viewBox="0 0 200 200">
            {Array.from({ length: 72 }).map((_, i) => (
              <line
                key={i}
                x1="100"
                y1="2"
                x2="100"
                y2={i % 6 === 0 ? 10 : 6}
                transform={`rotate(${i * 5} 100 100)`}
                stroke={i % 18 === 0 ? "#e10600" : "rgba(255,255,255,.35)"}
                strokeWidth={i % 6 === 0 ? 1.2 : 0.6}
              />
            ))}
          </svg>
        </div>
        <div className="orbit-ring ring-3" data-depth="26">
          <div className="radar" />
        </div>

        <div className="orbit-track" data-depth="34">
          {nodes.map((e, i) => (
            <div className="orbit-node" key={e.code} style={{ "--a": `${(360 / nodes.length) * i}deg` }}>
              <div className="orbit-node-in">
                <Icon name={e.icon} size={22} />
              </div>
            </div>
          ))}
        </div>

        <div className="orbit-core" data-depth="14">
          <Gear className="core-gear" />
          <div className="core-disc">
            <div className="core-labels">
              {nodes.map((e) => (
                <div className="core-label" key={e.code}>
                  <Icon name={e.icon} size={26} />
                  <strong>{e.name}</strong>
                  <small>{e.code}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="hud">
        <span className="hud-c tl" />
        <span className="hud-c tr" />
        <span className="hud-c bl" />
        <span className="hud-c br" />
        <span className="hud-t t1">SYS · ONLINE</span>
        <span className="hud-t t2">20.11.2026</span>
        <span className="hud-t t3">28.41°N · 77.31°E</span>
        <span className="hud-t t4">09 EVENTS / 03 ZONES</span>
        <span className="hud-scan" />
      </div>
    </div>
  );
}
