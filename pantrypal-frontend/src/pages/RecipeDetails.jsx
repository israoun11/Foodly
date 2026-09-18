import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Users, ChefHat } from "lucide-react";
import { getRecipeById } from "../data/recipes.js";
import { Badge } from "../components/ui/Badge.jsx";

const NUTRITION_LABELS = {
  calories: "Calories",
  protein: "Protein (g)",
  carbs: "Carbs (g)",
  fat: "Fat (g)",
};

export default function RecipeDetails() {
  const { id } = useParams();
  const recipe = getRecipeById(id);

  if (!recipe) {
    return (
      <div className="container-page py-24 text-center">
        <h1 className="font-display text-3xl italic text-ink">Recipe not found</h1>
        <Link to="/recipes" className="mt-6 inline-block text-orange hover:underline">
          Back to recipes
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="relative h-[50vh] w-full overflow-hidden">
        <img src={recipe.image} alt={recipe.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
        <Link
          to="/recipes"
          className="absolute left-6 top-6 flex items-center gap-1.5 rounded-full bg-paper/90 px-4 py-2 text-sm font-medium text-ink"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
        <div className="container-page absolute bottom-8 left-0 right-0">
          <Badge tone="orange">{recipe.category}</Badge>
          <h1 className="mt-3 font-display text-display-lg italic text-paper">
            {recipe.title}
          </h1>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="container-page grid grid-cols-1 gap-12 py-14 lg:grid-cols-3"
      >
        <div className="lg:col-span-2">
          <p className="text-lg text-ink/70">{recipe.description}</p>

          <div className="mt-6 flex flex-wrap gap-6 text-sm font-medium uppercase tracking-wide text-ink/50">
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-orange" /> {recipe.cookingTime} min
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-orange" /> Serves {recipe.servings}
            </span>
            <span className="flex items-center gap-1.5">
              <ChefHat className="h-4 w-4 text-orange" /> {recipe.difficulty}
            </span>
          </div>

          <h2 className="mt-12 font-display text-2xl italic text-ink">Instructions</h2>
          <ol className="mt-5 flex flex-col gap-4">
            {recipe.instructions.map((step, index) => (
              <li key={index} className="flex gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cream font-display italic text-ink">
                  {index + 1}
                </span>
                <p className="pt-0.5 text-ink/75">{step}</p>
              </li>
            ))}
          </ol>
        </div>

        <aside className="flex flex-col gap-8">
          <div className="bg-sand p-6">
            <h2 className="font-display text-xl italic text-ink">Ingredients</h2>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-ink/75">
              {recipe.ingredients.map((ingredient) => (
                <li key={ingredient} className="border-b border-ink/10 pb-2 last:border-0">
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-sand p-6">
            <h2 className="font-display text-xl italic text-ink">Nutrition</h2>
            <dl className="mt-4 grid grid-cols-2 gap-3">
              {Object.entries(NUTRITION_LABELS).map(([key, label]) => (
                <div key={key}>
                  <dt className="text-xs uppercase tracking-wide text-ink/45">{label}</dt>
                  <dd className="font-display text-2xl italic text-ink">
                    {recipe.nutrition[key]}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {recipe.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {recipe.tags.map((tag) => (
                <Badge key={tag} tone="cream">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </aside>
      </motion.div>
    </div>
  );
}
