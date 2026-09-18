import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../ui/Button.jsx";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-orange py-28 text-paper md:py-36">
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-paper/10" />
      <div className="pointer-events-none absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-ink/10" />

      <div className="container-page relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="font-display text-display-xl italic"
        >
          What's in your kitchen?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mx-auto mt-6 max-w-md text-paper/85"
        >
          Open the fridge, take a look, and let Foodly show you what
          tonight could be.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-9"
        >
          <Link to="/recipes">
            <Button variant="outline" size="lg" className="border-paper text-paper hover:bg-paper hover:text-orange">
              Explore Recipes
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
