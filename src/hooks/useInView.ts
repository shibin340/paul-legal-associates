import { useEffect, useRef, useState } from "react";
export function useInView(threshold = 0.12): [React.RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  // Keep initial HTML readable before JavaScript and during hydration.
  const [inView, setInView] = useState(true);
  useEffect(() => {
    const element = ref.current;
    if (!element || !("IntersectionObserver" in window) ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = element.getBoundingClientRect();
    if (bounds.top < window.innerHeight && bounds.bottom > 0) return;
    // Enhance only off-screen elements once JavaScript is ready.
    setInView(false);
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    obs.observe(element);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}
