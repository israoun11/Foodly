import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CATEGORIES, RECIPES } from "../../data/recipes.js";
import { CategoryTabs } from "../recipes/CategoryTabs.jsx";
import { RecipeCard } from "../recipes/RecipeCard.jsx";

export function RecipeCollection() {
  const [activeCategory, setActiveCategory] = useState(null);

  const visibleRecipes = useMemo(() => {
    const filtered = activeCategory
      ? RECIPES.filter(
          (recipe) =>
            recipe.category === activeCategory || recipe.tags.includes(activeCategory),
        )
      : RECIPES;
    return filtered.slice(0, 6);
  }, [activeCategory]);

  return (
    <section className="py-24 md:py-32">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-orange">
              The Collection
            </span>
            <h2 className="mt-4 font-display text-display-lg italic text-ink">
              Recipes worth returning to.
            </h2>
          </div>
          <Link
            to="/recipes"
            className="flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wide text-ink hover:text-orange"
          >
            View all recipes
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10">
          <CategoryTabs
            categories={CATEGORIES}
            active={activeCategory}
            onChange={setActiveCategory}
          />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {visibleRecipes.map((recipe, index) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
            >
              <RecipeCard recipe={recipe} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
