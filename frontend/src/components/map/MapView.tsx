"use client";
import { useEffect, useRef } from "react";
import type { Trail } from "@/lib/types/trail";

type Props = { trail: Trail };

export function MapView({ trail }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = "";
    const el = document.createElement("div");
    el.className =
      "h-full w-full bg-[linear-gradient(45deg,#e2e8f0_25%,transparent_25%),linear-gradient(-45deg,#e2e8f0_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#e2e8f0_75%),linear-gradient(-45deg,transparent_75%,#e2e8f0_75%)] bg-[length:20px_20px] bg-[position:0_0,0_10px,10px_-10px,-10px_0px]";
    ref.current.appendChild(el);
  }, [trail.id]);

  return <div ref={ref} className="relative h-full w-full" />;
}
