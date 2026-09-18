import { useEffect, useState } from "react";

/**
 * Tracks prefers-reduced-motion so 3D movement and scroll-linked
 * animation can be disabled for people who've asked for it.
 * @returns {boolean}
 */
export function useReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (event) => setPrefersReduced(event.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReduced;
}
