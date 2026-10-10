"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, Flip, useGSAP);
  ScrollTrigger.config({ ignoreMobileResize: true });
  gsap.config({ force3D: true });
}

export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const DESKTOP = "(prefers-reduced-motion: no-preference) and (min-width: 901px) and (pointer: fine)";

export { gsap, ScrollTrigger, SplitText, Flip, useGSAP };
