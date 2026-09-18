import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { RECIPES } from "../../data/recipes.js";
import { RecipeCard } from "../recipes/RecipeCard.jsx";

const FEATURED = RECIPES.slice(0, 6);

export function FeaturedRecipes() {
  const trackRef = useRef(null);

  function scrollByAmount(amount) {
    trackRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  }

  return (
    <section className="py-24 md:py-32">
      <div className="container-page flex items-end justify-between">
        <div>
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-orange">
            Featured
          </span>
          <h2 className="mt-4 font-display text-display-lg italic text-ink">
            This week's picks.
          </h2>
        </div>
        <div className="hidden gap-2 sm:flex">
          <button
            type="button"
            onClick={() => scrollByAmount(-420)}
            aria-label="Scroll left"
            className="rounded-full border-2 border-ink p-3 text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollByAmount(420)}
            aria-label="Scroll right"
            className="rounded-full border-2 border-ink p-3 text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <motion.div
        ref={trackRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="hide-scrollbar container-page mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4"
      >
        {FEATURED.map((recipe) => (
          <div key={recipe.id} className="w-[85vw] shrink-0 snap-start sm:w-[420px]">
            <RecipeCard recipe={recipe} size="lg" />
          </div>
        ))}
      </motion.div>
    </section>
  );
}
