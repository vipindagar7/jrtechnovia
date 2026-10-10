"use client";
import { useSyncExternalStore } from "react";

// Tiny shared store so independent client islands (Zones, Events, Footer, Modal)
// can talk without wrapping the whole page in one big client component.
let state = { filter: "all", active: null };
const listeners = new Set();

const set = (patch) => {
  state = { ...state, ...patch };
  listeners.forEach((l) => l());
};

export const actions = {
  setFilter: (filter) => set({ filter }),
  open: (code) => set({ active: code }),
  close: () => set({ active: null }),
  pickZone: (filter) => {
    set({ filter });
    document.getElementById("events")?.scrollIntoView({ behavior: "smooth" });
  },
};

const subscribe = (l) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export function useStore(selector) {
  return useSyncExternalStore(
    subscribe,
    () => selector(state),
    () => selector({ filter: "all", active: null })
  );
}
