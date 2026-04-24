"use client";

import { useRef, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProjectCardV2 from "./ProjectCardV2";
import type { Project } from "@/data/projects";

interface ProjectsCarouselProps {
  projects: Project[];
}

const ROTATE_PER_OFFSET = 28;
const SCALE_MIN = 0.82;
const OPACITY_MIN = 0.55;

export default function ProjectsCarousel({ projects }: ProjectsCarouselProps): React.JSX.Element {
  const slidesRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isPausedRef = useRef(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: false,
    dragFree: false,
  });

  useGSAP(
    () => {
      const container = slidesRef.current;
      if (!container) return;
      const slides = container.querySelectorAll<HTMLElement>(".carousel-slide");
      gsap.fromTo(
        slides,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.06 }
      );
    },
    { dependencies: [projects], scope: slidesRef }
  );

  const applyCoverflow = useCallback(() => {
    if (!emblaApi) return;
    const engine = emblaApi.internalEngine();
    const scrollSnaps = emblaApi.scrollSnapList();
    const location = emblaApi.scrollProgress();
    const slideNodes = emblaApi.slideNodes();

    scrollSnaps.forEach((snap, index) => {
      let diff = snap - location;
      if (engine.options.loop) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        engine.slideLooper.loopPoints.forEach((loopItem: any) => {
          const target = loopItem.target();
          if (index === loopItem.index && target !== 0) {
            const sign = Math.sign(target);
            if (sign === -1) diff = snap - (1 + location);
            if (sign === 1) diff = snap + (1 - location);
          }
        });
      }

      const offset = diff * scrollSnaps.length;
      const abs = Math.abs(offset);
      const clampedAbs = Math.min(abs, 2.5);

      const rotateY = Math.max(Math.min(offset * ROTATE_PER_OFFSET, 55), -55);
      const scale = Math.max(1 - clampedAbs * 0.12, SCALE_MIN);
      const opacity = Math.max(1 - clampedAbs * 0.25, OPACITY_MIN);
      const z = clampedAbs < 0.5 ? 0 : -120;
      const zIndex = 100 - Math.round(clampedAbs * 10);

      const node = slideNodes[index];
      if (!node) return;
      gsap.set(node, {
        rotateY: -rotateY,
        scale,
        z,
        opacity,
        zIndex,
        transformOrigin: "50% 50%",
      });
    });
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    applyCoverflow();
    emblaApi.on("scroll", applyCoverflow);
    emblaApi.on("reInit", applyCoverflow);
    return () => {
      emblaApi.off("scroll", applyCoverflow);
      emblaApi.off("reInit", applyCoverflow);
    };
  }, [emblaApi, applyCoverflow]);

  useEffect(() => {
    if (!emblaApi) return;
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      if (!isPausedRef.current) emblaApi.scrollNext();
    }, 4000);
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [emblaApi]);

  const pause = () => { isPausedRef.current = true; };
  const resumeLater = () => { setTimeout(() => { isPausedRef.current = false; }, 3500); };

  const handlePrev = () => { pause(); emblaApi?.scrollPrev(); resumeLater(); };
  const handleNext = () => { pause(); emblaApi?.scrollNext(); resumeLater(); };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handlePrev}
        onMouseEnter={pause}
        onMouseLeave={() => { isPausedRef.current = false; }}
        aria-label="previous project"
        className="absolute left-0 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-12 h-12 rounded-full bg-[rgba(22,20,21,0.7)] border border-white/10 text-[#f3e2c8] backdrop-blur-sm cursor-pointer"
      >
        <ChevronLeft size={22} />
      </button>

      <button
        type="button"
        onClick={handleNext}
        onMouseEnter={pause}
        onMouseLeave={() => { isPausedRef.current = false; }}
        aria-label="next project"
        className="absolute right-0 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-12 h-12 rounded-full bg-[rgba(22,20,21,0.7)] border border-white/10 text-[#f3e2c8] backdrop-blur-sm cursor-pointer"
      >
        <ChevronRight size={22} />
      </button>

      <div
        ref={emblaRef}
        className="overflow-hidden"
        style={{ perspective: "1800px" }}
        onMouseEnter={pause}
        onMouseLeave={() => { isPausedRef.current = false; }}
      >
        <div
          ref={slidesRef}
          className="flex"
          style={{ transformStyle: "preserve-3d" }}
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="carousel-slide flex-none px-4"
              style={{
                flex: "0 0 38%",
                transformStyle: "preserve-3d",
                willChange: "transform, opacity",
              }}
            >
              <ProjectCardV2 project={project} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
