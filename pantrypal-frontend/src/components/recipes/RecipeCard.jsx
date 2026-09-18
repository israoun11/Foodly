import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, Flame } from "lucide-react";
import { Badge } from "../ui/Badge.jsx";

export function RecipeCard({ recipe, size = "md" }) {
  const isLarge = size === "lg";

  return (
    <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.25 }}>
      <Link to={`/recipes/${recipe.id}`} className="group block">
        <div
          className={`relative overflow-hidden ${isLarge ? "h-96" : "h-64"} bg-sand`}
        >
          <img
            src={recipe.image}
            alt={recipe.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
          <div className="absolute left-3 top-3">
            <Badge tone="orange">{recipe.category}</Badge>
          </div>
        </div>

        <div className="mt-4">
          <h3
            className={`font-display italic text-ink ${isLarge ? "text-3xl" : "text-2xl"}`}
          >
            {recipe.title}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-sm text-ink/60">
            {recipe.description}
          </p>

          <div className="mt-3 flex items-center gap-4 text-xs font-medium uppercase tracking-wide text-ink/50 transition-transform duration-300 group-hover:translate-x-1">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" /> {recipe.cookingTime} min
            </span>
            <span className="flex items-center gap-1.5">
              <Flame className="h-3.5 w-3.5" /> {recipe.nutrition.calories} cal
            </span>
            <span>{recipe.difficulty}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
