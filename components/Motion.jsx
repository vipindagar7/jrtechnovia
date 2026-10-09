"use client";
import { useRef } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP, MOTION_OK, DESKTOP } from "@/lib/gsap";

/**
 * Global motion layer: scroll progress, fade-ups, split headings, drifting
 * outline text, custom cursor, magnetic buttons and 3D tilt cards.
 * Everything is transform/opacity only, and pointer effects run on desktop only.
 */
export default function Motion() {
  const bar = useRef(null);
  const dot = useRef(null);
  const ring = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Scroll progress bar — always on (cheap scaleX)
    gsap.to(bar.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
    });

    mm.add(MOTION_OK, () => {
      // Fade-up batch
      gsap.set(".reveal", { y: 40, autoAlpha: 0 });
      ScrollTrigger.batch(".reveal", {
        start: "top 90%",
        once: true,
        onEnter: (els) =>
          gsap.to(els, { y: 0, autoAlpha: 1, stagger: 0.08, duration: 0.8, ease: "power3.out", overwrite: true }),
      });

      // Split headings: masked line-by-line word rise
      const splits = gsap.utils.toArray(".split-head").map((el) =>
        SplitText.create(el, {
          type: "lines,words",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.words, {
              yPercent: 110,
              rotate: 4,
              stagger: 0.05,
              duration: 0.9,
              ease: "power4.out",
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            }),
        })
      );

      // Eyebrow dots slide in
      gsap.utils.toArray(".section .eyebrow").forEach((el) =>
        gsap.from(el, {
          clipPath: "inset(0 100% 0 0)",
          duration: 0.9,
          ease: "power3.inOut",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        })
      );

      // Giant outline words drifting with scroll
      gsap.utils.toArray(".drift").forEach((el) =>
        gsap.fromTo(
          el,
          { xPercent: el.dataset.dir === "left" ? 10 : -30 },
          {
            xPercent: el.dataset.dir === "left" ? -30 : 10,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.5 },
          }
        )
      );

      return () => splits.forEach((s) => s.revert());
    });

    mm.add(DESKTOP, () => {
      document.documentElement.classList.add("has-cursor");

      // Cursor
      const dx = gsap.quickTo(dot.current, "x", { duration: 0.12, ease: "power3" });
      const dy = gsap.quickTo(dot.current, "y", { duration: 0.12, ease: "power3" });
      const rx = gsap.quickTo(ring.current, "x", { duration: 0.45, ease: "power3" });
      const ry = gsap.quickTo(ring.current, "y", { duration: 0.45, ease: "power3" });
      const move = (e) => {
        dx(e.clientX);
        dy(e.clientY);
        rx(e.clientX);
        ry(e.clientY);
      };
      const over = (e) => {
        const hot = e.target.closest("a, button, .tilt, summary");
        ring.current.classList.toggle("is-hot", !!hot);
      };
      window.addEventListener("pointermove", move, { passive: true });
      window.addEventListener("pointerover", over, { passive: true });

      // Magnetic buttons
      const mags = gsap.utils.toArray(".magnetic").map((el) => {
        // xPercent/yPercent so it never fights intro tweens that use x/y
        const x = gsap.quickTo(el, "xPercent", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
        const y = gsap.quickTo(el, "yPercent", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
        const m = (e) => {
          const r = el.getBoundingClientRect();
          x(((e.clientX - (r.left + r.width / 2)) * 0.3 * 100) / r.width);
          y(((e.clientY - (r.top + r.height / 2)) * 0.4 * 100) / r.height);
        };
        const l = () => {
          x(0);
          y(0);
        };
        el.addEventListener("pointermove", m);
        el.addEventListener("pointerleave", l);
        return () => {
          el.removeEventListener("pointermove", m);
          el.removeEventListener("pointerleave", l);
        };
      });

      // 3D tilt cards
      const tilts = gsap.utils.toArray(".tilt").map((el) => {
        gsap.set(el, { transformPerspective: 900 });
        const rX = gsap.quickTo(el, "rotationX", { duration: 0.5, ease: "power3" });
        const rY = gsap.quickTo(el, "rotationY", { duration: 0.5, ease: "power3" });
        const m = (e) => {
          const r = el.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          rY(px * 10);
          rX(-py * 10);
          el.style.setProperty("--mx", `${(px + 0.5) * 100}%`);
          el.style.setProperty("--my", `${(py + 0.5) * 100}%`);
        };
        const l = () => {
          rX(0);
          rY(0);
        };
        el.addEventListener("pointermove", m);
        el.addEventListener("pointerleave", l);
        return () => {
          el.removeEventListener("pointermove", m);
          el.removeEventListener("pointerleave", l);
        };
      });

      return () => {
        document.documentElement.classList.remove("has-cursor");
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerover", over);
        [...mags, ...tilts].forEach((off) => off());
      };
    });
  });

  return (
    <>
      <div className="progress" aria-hidden="true">
        <div ref={bar} className="progress-bar" />
      </div>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
