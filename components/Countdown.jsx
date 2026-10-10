"use client";
import { useEffect, useRef } from "react";
import { site } from "@/data/site";

const UNITS = ["Days", "Hrs", "Min", "Sec"];

function parts(target) {
  const s = Math.max(0, Math.floor((new Date(target).getTime() - Date.now()) / 1000));
  return [Math.floor(s / 86400), Math.floor((s % 86400) / 3600), Math.floor((s % 3600) / 60), s % 60];
}

/** Writes digits straight to the DOM once a second — no React re-render of the hero. */
export default function Countdown() {
  const refs = useRef([]);

  useEffect(() => {
    const tick = () =>
      parts(site.eventStart).forEach((v, i) => {
        const el = refs.current[i];
        const txt = String(v).padStart(2, "0");
        if (el && el.textContent !== txt) {
          el.textContent = txt;
          el.classList.remove("flip");
          void el.offsetWidth; // restart CSS flip
          el.classList.add("flip");
        }
      });
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="hero-count" aria-label={`Countdown to ${site.dateLabel}`}>
      {UNITS.map((u, i) => (
        <div key={u}>
          <strong ref={(el) => (refs.current[i] = el)} suppressHydrationWarning>
            --
          </strong>
          <span>{u}</span>
        </div>
      ))}
    </div>
  );
}
