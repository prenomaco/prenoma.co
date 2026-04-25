import { gsap } from "gsap";
import type React from "react";

export function hoverEffectEnter(e: React.MouseEvent<HTMLSpanElement>) {
  const height = (e.currentTarget.firstElementChild as HTMLElement)?.offsetHeight ?? 20;
  gsap.to(e.currentTarget, { y: -height, duration: 0.28, ease: "power2.out" });
}

export function hoverEffectLeave(e: React.MouseEvent<HTMLSpanElement>) {
  gsap.to(e.currentTarget, { y: 0, duration: 0.28, ease: "power2.out" });
}
