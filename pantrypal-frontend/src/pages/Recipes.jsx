import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CATEGORIES, RECIPES } from "../data/recipes.js";
import { CategoryTabs } from "../components/recipes/CategoryTabs.jsx";
import { RecipeCard } from "../components/recipes/RecipeCard.jsx";

export default function Recipes() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [search, setSearch] = useState("");

  const visibleRecipes = useMemo(() => {
    let list = activeCategory
      ? RECIPES.filter(
          (recipe) =>
            recipe.category === activeCategory || recipe.tags.includes(activeCategory),
        )
      : RECIPES;

    if (search.trim()) {
      const query = search.trim().toLowerCase();
      list = list.filter((recipe) => recipe.title.toLowerCase().includes(query));
    }

    return list;
  }, [activeCategory, search]);

  return (
    <div className="container-page py-16 md:py-24">
      <div className="max-w-2xl">
        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-orange">
          Recipes
        </span>
        <h1 className="mt-4 font-display text-display-lg italic text-ink">
          Every recipe, one place.
        </h1>
      </div>

      <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <CategoryTabs
          categories={CATEGORIES}
          active={activeCategory}
          onChange={setActiveCategory}
        />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search recipes..."
          className="border-b-2 border-ink/20 bg-transparent px-1 py-2 text-sm outline-none focus:border-orange sm:w-64"
          aria-label="Search recipes"
        />
      </div>

      {visibleRecipes.length === 0 ? (
        <p className="mt-16 text-center text-ink/50">
          No recipes match your search.
        </p>
      ) : (
        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {visibleRecipes.map((recipe, index) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: (index % 6) * 0.06 }}
            >
              <RecipeCard recipe={recipe} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
