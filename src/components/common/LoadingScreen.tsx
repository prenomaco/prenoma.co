"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import AnimatedAsciiEye from "../home/AnimatedAsciiEye";

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
      {/* 
        We use AnimatedAsciiEye but heavily scaled down for the loading state center. 
        It still preserves mouse-tracking capability perfectly!
      */}
      <div className="relative flex items-center justify-center w-[400px] h-[250px] mb-8">
        <AnimatedAsciiEye 
          className="absolute inset-0 w-full h-full pointer-events-none select-none text-ghost" 
          scale={0.20} 
          maxMoveX={20} 
          maxMoveY={12} 
        />
      </div>
      
      <p className="font-mono text-[11px] tracking-[0.55em] uppercase text-cream font-medium opacity-80">
        Prenoma.co // Initializing Your Vision
      </p>
    </div>
  );
}
