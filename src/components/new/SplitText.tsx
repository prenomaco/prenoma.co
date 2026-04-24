"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

type Tag = "h1" | "h2" | "h3" | "p" | "span";

interface SplitTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  as?: Tag;
}

export default function SplitText({
  text,
  className,
  style,
  delay = 0,
  as: Tag = "span",
}: SplitTextProps): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);

  const words = text.split(" ");

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const letterEls = containerRef.current.querySelectorAll<HTMLSpanElement>(
        "[data-split-letter]"
      );
      if (!letterEls.length) return;

      gsap.fromTo(
        letterEls,
        { y: "110%" },
        {
          y: "0%",
          duration: 0.55,
          stagger: 0.028,
          ease: "power3.out",
          delay,
        }
      );
    },
    { scope: containerRef, dependencies: [delay, text] }
  );

  const handleMouseEnter = (el: HTMLSpanElement) => {
    gsap.to(el, { y: -5, duration: 0.2, ease: "power2.out" });
  };

  const handleMouseLeave = (el: HTMLSpanElement) => {
    gsap.to(el, { y: 0, duration: 0.3, ease: "elastic.out(1, 0.5)" });
  };

  return (
    <div ref={containerRef} style={{ display: "contents" }}>
      <Tag className={className} style={style}>
        {words.map((word, wi) => (
          <span key={wi} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
            {Array.from(word).map((char, ci) => (
              <span
                key={ci}
                style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", paddingBottom: "0.18em", marginBottom: "-0.18em" }}
              >
                <span
                  data-split-letter
                  style={{ display: "inline-block" }}
                  onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                  onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                >
                  {char}
                </span>
              </span>
            ))}
            {/* Space after word (except last) */}
            {wi < words.length - 1 && (
              <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
                <span data-split-letter style={{ display: "inline-block" }}>&nbsp;</span>
              </span>
            )}
          </span>
        ))}
      </Tag>
    </div>
  );
}
