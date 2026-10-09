"use client";
import dynamic from "next/dynamic";
import { useStore } from "@/lib/store";

// The modal + full rulebook data are split into their own chunk and only
// downloaded the first time someone opens an event.
const EventModal = dynamic(() => import("./EventModal"), { ssr: false });

export default function ModalHost() {
  const active = useStore((s) => s.active);
  return active ? <EventModal code={active} /> : null;
}
