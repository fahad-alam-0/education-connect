"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: string;
  duration?: number;
}

export function AnimatedCounter({ value, duration = 2000 }: AnimatedCounterProps) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    hasAnimated.current = false;

    if (typeof window === "undefined") {
      return;
    }

    let frameId: number | null = null;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      frameId = requestAnimationFrame(() => setDisplay(value));
      hasAnimated.current = true;
      return;
    }

    function animate() {
      // Extract numeric part and suffix (e.g., "25,000+" => 25000 and "+")
      const cleaned = value.replace(/,/g, "");
      const match = cleaned.match(/^([\d.]+)(.*)$/);
      if (!match) {
        frameId = requestAnimationFrame(() => setDisplay(value));
        return;
      }

      const target = Number.parseFloat(match[1]);
      const suffix = match[2];
      const isDecimal = match[1].includes(".");
      const hasCommas = value.includes(",");
      const startTime = performance.now();

      function step(currentTime: number) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = eased * target;

        const formatted = isDecimal
          ? current.toFixed(1)
          : hasCommas
            ? Math.floor(current).toLocaleString()
            : Math.floor(current).toString();

        setDisplay(`${formatted}${suffix}`);

        if (progress < 1) {
          frameId = requestAnimationFrame(step);
        }
      }

      frameId = requestAnimationFrame(step);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animate();
        }
      },
      { threshold: 0.3 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [value, duration]);

  return <span ref={ref}>{display}</span>;
}
