"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

/* 
  FALLBACK FOR LATER (STATIC ASCII VERSION)
  ==========================================
                                           ...............                                           
                                    .............................                                    
                                .....................................                                
                            ............    ............  .  ............                            
                         ..........      ..............   ....    ..........                         
                       ........        ................    ....       ........                       
                     .......         .................     ......        .......                     
                   .......          .................       ......         .......                   
                  ......           ..................        ......          ......                  
                 ......            .............                 ..            ......                
                  .....            ........                                                          
                   ......         ............                                                       
                    .......       ................             .....                                 
                      .......      ..................       .......                                  
                        .......    ...................      .......                                  
                          ........  ..................     .......                                   
                            ...........................   .......                                    
                               .........................  ......                                     
                                  ............................                                       
                                       .....................                                         
                                               .........                                             
*/

export default function LoadingScreen(): React.JSX.Element | null {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Wait for initial render + 1.2s to show off the loading screen
    // then smoothly fade out using GSAP
    const timer = setTimeout(() => {
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: () => {
            setIsLoading(false);
          },
        });
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[999] bg-ink flex flex-col items-center justify-center text-ghost overflow-hidden"
    >
      <style>{`
        @keyframes glint {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        .animate-glint {
          background-image: linear-gradient(
            90deg,
            var(--color-ghost) 0%,
            var(--color-ghost) 40%,
            var(--color-cream) 50%,
            var(--color-ghost) 60%,
            var(--color-ghost) 100%
          );
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: glint 2.5s linear infinite;
        }
      `}</style>

      <div className="text-center font-bold uppercase px-4">
        {/* Pure Glinting Text for all screen sizes */}
        <p className="text-[16px] sm:text-[20px] tracking-[0.4em] sm:tracking-[0.5em] leading-relaxed animate-glint">
          PRENOMA.CO
        </p>
      </div>
    </div>
  );
}
