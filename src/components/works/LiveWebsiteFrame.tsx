"use client";

// Why: Interactive iframe component showing DESKTOP viewport scaled down
// Contract: frontend-contract-002
// Features: Desktop viewport (1440px), CSS transform scale, lazy loading, error states

import { useState, useRef, useEffect } from "react";

type FrameState = "loading" | "loaded" | "error" | "blocked";

interface LiveWebsiteFrameProps {
  url: string;
  title: string;
  thumbnail?: string;
}

export default function LiveWebsiteFrame({
  url,
  title,
  thumbnail,
}: LiveWebsiteFrameProps): React.JSX.Element {
  const [state, setState] = useState<FrameState>("loading");
  const [isVisible, setIsVisible] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Why: Lazy load iframe only when in viewport using Intersection Observer
  useEffect(() => {
    const currentRef = containerRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px" } // Load 100px before entering viewport
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, []);

  // Why: 15-second timeout to prevent indefinite loading state
  useEffect(() => {
    if (isVisible && state === "loading") {
      timeoutRef.current = setTimeout(() => {
        setState("error");
      }, 15000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isVisible, state]);

  const handleLoad = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setState("loaded");
  };

  const handleError = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setState("error");
  };

  // Desktop viewport dimensions
  const DESKTOP_WIDTH = 1440;
  const DESKTOP_HEIGHT = 900;
  
  // Container aspect ratio (16:10 for better desktop preview)
  const CONTAINER_ASPECT = 16 / 10;

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-ink overflow-hidden"
      style={{ 
        paddingBottom: `${(1 / CONTAINER_ASPECT) * 100}%` // Maintain aspect ratio
      }}
    >
      <div className="absolute inset-0">
        {/* Loading State: Skeleton pulse animation */}
        {state === "loading" && (
          <div className="absolute inset-0 flex items-center justify-center bg-ink">
            <div className="w-full h-full animate-pulse bg-ghost/20">
              <div className="flex items-center justify-center h-full">
                <span className="text-parchment/50 text-[14px] lg:text-[16px]">
                  Loading preview...
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Error State: Fallback with thumbnail or message */}
        {state === "error" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-ink border border-ghost/20">
            {thumbnail ? (
              <img
                src={thumbnail}
                alt={`${title} preview`}
                className="w-full h-full object-cover opacity-30"
              />
            ) : null}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6">
              <p className="text-parchment/70 text-[14px] lg:text-[16px] text-center">
                Preview unavailable
              </p>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-parchment text-ink text-[14px] font-medium hover:bg-ember hover:text-cream transition-colors duration-300"
              >
                Visit Site →
              </a>
            </div>
          </div>
        )}

        {/* Desktop Viewport Iframe: Scaled down to fit container */}
        {isVisible && state !== "error" && (
          <div 
            className="absolute inset-0 flex items-center justify-center overflow-hidden"
            style={{
              backgroundColor: "#ffffff", // White background for scaling effect
            }}
          >
            <iframe
              ref={iframeRef}
              src={url}
              title={`${title} live preview`}
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-popups-to-escape-sandbox"
              onLoad={handleLoad}
              onError={handleError}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              referrerPolicy="no-referrer-when-downgrade"
              className={`
                border-0
                ${state === "loaded" ? "pointer-events-auto" : "pointer-events-none"}
                ${state === "loaded" ? "opacity-100" : "opacity-0"}
                transition-opacity duration-500
                origin-top-left
              `}
              style={{
                width: `${DESKTOP_WIDTH}px`,
                height: `${DESKTOP_HEIGHT}px`,
                transform: `scale(${Math.min(
                  1,
                  (containerRef.current?.offsetWidth || 400) / DESKTOP_WIDTH
                )})`,
              }}
              loading="lazy"
            />
          </div>
        )}

        {/* Overlay for mobile touch: Prevent scroll conflicts */}
        {state === "loaded" && (
          <div className="absolute inset-0 pointer-events-none lg:hidden" />
        )}
      </div>
    </div>
  );
}
