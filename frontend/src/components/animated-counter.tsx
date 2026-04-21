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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animate();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();

    function animate() {
      // Extract the numeric part and suffix (e.g., "25,000+" → 25000, "+")
      const cleaned = value.replace(/,/g, "");
      const match = cleaned.match(/^([\d.]+)(.*)$/);
      if (!match) {
        setDisplay(value);
        return;
      }

      const target = parseFloat(match[1]);
      const suffix = match[2]; // e.g., "+"
      const isDecimal = match[1].includes(".");
      const hasCommas = value.includes(",");

      const startTime = performance.now();

      function step(currentTime: number) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = eased * target;

        let formatted: string;
        if (isDecimal) {
          formatted = current.toFixed(1);
        } else {
          const rounded = Math.floor(current);
          formatted = hasCommas ? rounded.toLocaleString() : rounded.toString();
        }

        setDisplay(formatted + suffix);

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      }

      requestAnimationFrame(step);
    }
  }, [value, duration]);

  return <span ref={ref}>{display}</span>;
}
