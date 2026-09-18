import { RECIPES } from "./recipes.js";

export const MOCK_ACCOUNT = {
  savedRecipeIds: [RECIPES[1].id, RECIPES[4].id, RECIPES[9].id],
  favoriteRecipeIds: [RECIPES[0].id, RECIPES[6].id],
  recentlyViewedIds: [RECIPES[2].id, RECIPES[5].id, RECIPES[8].id, RECIPES[11].id],
  preferences: {
    diet: "No restrictions",
    dislikedIngredients: ["Cilantro"],
    weeklyGoal: "Cook 4 dinners at home",
  },
};
