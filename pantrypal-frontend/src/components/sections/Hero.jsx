import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { FoodScene } from "../three/FoodScene.jsx";
import { Button } from "../ui/Button.jsx";

const lineVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.15 * index, ease: "easeOut" },
  }),
};

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-8 md:pt-16">
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-yolk/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-leaf/10 blur-3xl" />

      <div className="container-page grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h1 className="font-display text-display-xl italic text-ink">
            {["Good food starts", "with what", "you have."].map((line, index) => (
              <motion.span
                key={line}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={lineVariants}
                className="block"
              >
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-6 max-w-md text-lg text-ink/60"
          >
            An editorial recipe experience for cooking with what's already in
            your kitchen — no grocery run required.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Link to="/recipes">
              <Button size="lg">Explore Recipes</Button>
            </Link>
            <a
              href="#discover"
              className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-ink/70 hover:text-orange"
            >
              See how it works
              <ArrowDown className="h-4 w-4" />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
          className="h-[380px] sm:h-[460px] lg:col-span-5 lg:h-[560px]"
        >
          <FoodScene />
        </motion.div>
      </div>
    </section>
  );
}
