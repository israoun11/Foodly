import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion.js";

const SHAPES = [
  { color: "bg-orange", size: "h-40 w-40", top: "10%", left: "8%", depth: -120 },
  { color: "bg-leaf", size: "h-28 w-28", top: "55%", left: "18%", depth: 160 },
  { color: "bg-yolk", size: "h-52 w-52", top: "20%", left: "72%", depth: -90 },
  { color: "bg-orange-light", size: "h-24 w-24", top: "68%", left: "80%", depth: 130 },
  { color: "bg-leaf-light", size: "h-20 w-20", top: "40%", left: "45%", depth: -60 },
];

export function InteractiveShowcase() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={ref}
      className="relative flex min-h-[70vh] items-center overflow-hidden bg-ink py-32 text-paper"
    >
      {!reduced &&
        SHAPES.map((shape, index) => (
          <ParallaxShape key={index} shape={shape} scrollYProgress={scrollYProgress} />
        ))}

      <div className="container-page relative z-10 text-center">
        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-light">
          A different kind of kitchen tool
        </span>
        <h2 className="mx-auto mt-5 max-w-2xl font-display text-display-lg italic">
          Ingredients in motion, recipes within reach.
        </h2>
        <p className="mx-auto mt-6 max-w-md text-paper/60">
          Every recipe on Foodly starts the same way yours does — with
          whatever's already sitting on the counter.
        </p>
      </div>
    </section>
  );
}

function ParallaxShape({ shape, scrollYProgress }) {
  const y = useTransform(scrollYProgress, [0, 1], [-shape.depth, shape.depth]);
  return (
    <motion.div
      style={{ top: shape.top, left: shape.left, y }}
      className={`absolute rounded-full opacity-20 blur-2xl ${shape.color} ${shape.size}`}
      aria-hidden="true"
    />
  );
}
