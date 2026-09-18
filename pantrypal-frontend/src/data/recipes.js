export const CATEGORIES = [
  "Quick",
  "Healthy",
  "High Protein",
  "Vegetarian",
  "Breakfast",
  "Lunch",
  "Dinner",
  "Dessert",
];

/**
 * @typedef {Object} Recipe
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} image
 * @property {string[]} ingredients
 * @property {string[]} instructions
 * @property {number} cookingTime - minutes
 * @property {number} servings
 * @property {"Easy"|"Medium"|"Hard"} difficulty
 * @property {{calories:number, protein:number, carbs:number, fat:number}} nutrition
 * @property {string} category
 * @property {string[]} tags
 */

/** @type {Recipe[]} */
export const RECIPES = [
  {
    id: "citrus-avocado-toast",
    title: "Citrus Avocado Toast",
    description:
      "Creamy avocado, charred sourdough, and a bright orange-chili finish. Ten minutes, zero fuss.",
    image:
      "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=1200&q=80",
    ingredients: [
      "2 slices sourdough bread",
      "1 ripe avocado",
      "1/2 orange, segmented",
      "1 tsp chili flakes",
      "1 tbsp olive oil",
      "Flaky sea salt",
    ],
    instructions: [
      "Toast the sourdough until deeply golden.",
      "Mash the avocado with olive oil and a pinch of salt.",
      "Spread over the toast and top with orange segments.",
      "Finish with chili flakes and more flaky salt.",
    ],
    cookingTime: 10,
    servings: 1,
    difficulty: "Easy",
    nutrition: { calories: 340, protein: 8, carbs: 32, fat: 22 },
    category: "Breakfast",
    tags: ["Quick", "Vegetarian", "Breakfast"],
  },
  {
    id: "seared-salmon-greens",
    title: "Seared Salmon with Charred Greens",
    description:
      "Crisp-skinned salmon over blistered broccolini — a weeknight dinner that eats like a restaurant plate.",
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1200&q=80",
    ingredients: [
      "2 salmon fillets",
      "1 bunch broccolini",
      "2 cloves garlic, sliced",
      "1 lemon",
      "2 tbsp olive oil",
      "Salt and black pepper",
    ],
    instructions: [
      "Pat salmon dry and season generously with salt.",
      "Sear skin-side down in a hot pan for 5 minutes, flip and cook 2 more.",
      "In the same pan, char the broccolini with garlic until blistered.",
      "Plate together and finish with a squeeze of lemon.",
    ],
    cookingTime: 25,
    servings: 2,
    difficulty: "Medium",
    nutrition: { calories: 420, protein: 38, carbs: 10, fat: 26 },
    category: "Dinner",
    tags: ["High Protein", "Healthy", "Dinner"],
  },
  {
    id: "roasted-veg-grain-bowl",
    title: "Roasted Vegetable Grain Bowl",
    description:
      "Caramelized carrots and peppers over nutty farro, tied together with a lemon-tahini drizzle.",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80",
    ingredients: [
      "1 cup farro, cooked",
      "2 carrots, sliced",
      "1 red pepper, sliced",
      "2 tbsp tahini",
      "1 lemon, juiced",
      "Olive oil, salt, pepper",
    ],
    instructions: [
      "Roast carrots and pepper at 425°F for 20 minutes.",
      "Whisk tahini with lemon juice and a splash of water.",
      "Layer farro, roasted vegetables, and drizzle with dressing.",
    ],
    cookingTime: 35,
    servings: 2,
    difficulty: "Easy",
    nutrition: { calories: 390, protein: 12, carbs: 54, fat: 14 },
    category: "Lunch",
    tags: ["Vegetarian", "Healthy", "Lunch"],
  },
  {
    id: "high-protein-turkey-chili",
    title: "High-Protein Turkey Chili",
    description:
      "A rich, slow-simmered chili built for meal prep — big on flavor, bigger on protein.",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80",
    ingredients: [
      "1 lb ground turkey",
      "1 can black beans",
      "1 can crushed tomatoes",
      "1 onion, diced",
      "2 tbsp chili powder",
      "1 tsp cumin",
    ],
    instructions: [
      "Brown the turkey with onion until cooked through.",
      "Stir in beans, tomatoes, and spices.",
      "Simmer uncovered for 25 minutes, stirring occasionally.",
    ],
    cookingTime: 40,
    servings: 4,
    difficulty: "Easy",
    nutrition: { calories: 310, protein: 32, carbs: 24, fat: 9 },
    category: "Dinner",
    tags: ["High Protein", "Quick", "Dinner"],
  },
  {
    id: "heirloom-tomato-salad",
    title: "Heirloom Tomato & Herb Salad",
    description:
      "Peak-season tomatoes, torn basil, and good olive oil. Nothing to prove, everything to enjoy.",
    image:
      "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=1200&q=80",
    ingredients: [
      "4 heirloom tomatoes",
      "Handful fresh basil",
      "2 tbsp olive oil",
      "1 tbsp balsamic vinegar",
      "Flaky salt",
    ],
    instructions: [
      "Slice tomatoes and arrange on a plate.",
      "Scatter torn basil leaves over the top.",
      "Drizzle with olive oil and balsamic, finish with salt.",
    ],
    cookingTime: 10,
    servings: 2,
    difficulty: "Easy",
    nutrition: { calories: 140, protein: 3, carbs: 12, fat: 10 },
    category: "Lunch",
    tags: ["Quick", "Vegetarian", "Healthy"],
  },
  {
    id: "lemon-herb-roast-chicken",
    title: "Lemon Herb Roast Chicken",
    description:
      "A Sunday-dinner classic — crisp skin, juicy meat, and a pan full of golden vegetables.",
    image:
      "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=1200&q=80",
    ingredients: [
      "1 whole chicken",
      "2 lemons",
      "4 cloves garlic",
      "Fresh thyme and rosemary",
      "3 tbsp olive oil",
      "Salt and pepper",
    ],
    instructions: [
      "Rub the chicken with olive oil, salt, and pepper.",
      "Stuff the cavity with lemon, garlic, and herbs.",
      "Roast at 425°F for about 1 hour 15 minutes until golden.",
      "Rest for 10 minutes before carving.",
    ],
    cookingTime: 90,
    servings: 4,
    difficulty: "Medium",
    nutrition: { calories: 460, protein: 41, carbs: 4, fat: 30 },
    category: "Dinner",
    tags: ["High Protein", "Dinner"],
  },
  {
    id: "berry-yogurt-parfait",
    title: "Berry & Honey Yogurt Parfait",
    description:
      "Layers of thick Greek yogurt, seasonal berries, and toasted oats — breakfast that feels like dessert.",
    image:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=80",
    ingredients: [
      "1 cup Greek yogurt",
      "1/2 cup mixed berries",
      "2 tbsp toasted oats",
      "1 tbsp honey",
    ],
    instructions: [
      "Layer yogurt and berries in a glass.",
      "Top with toasted oats and a drizzle of honey.",
    ],
    cookingTime: 5,
    servings: 1,
    difficulty: "Easy",
    nutrition: { calories: 260, protein: 18, carbs: 30, fat: 6 },
    category: "Breakfast",
    tags: ["Quick", "Healthy", "Breakfast", "Vegetarian"],
  },
  {
    id: "dark-chocolate-avocado-mousse",
    title: "Dark Chocolate Avocado Mousse",
    description:
      "Silky, deeply chocolatey, and secretly made from avocado. Nobody will guess.",
    image:
      "https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?auto=format&fit=crop&w=1200&q=80",
    ingredients: [
      "2 ripe avocados",
      "1/3 cup cocoa powder",
      "1/4 cup maple syrup",
      "1 tsp vanilla extract",
      "Pinch of salt",
    ],
    instructions: [
      "Blend all ingredients until completely smooth.",
      "Chill for at least 30 minutes before serving.",
    ],
    cookingTime: 15,
    servings: 4,
    difficulty: "Easy",
    nutrition: { calories: 210, protein: 4, carbs: 22, fat: 14 },
    category: "Dessert",
    tags: ["Vegetarian", "Dessert", "Quick"],
  },
  {
    id: "spiced-carrot-lentil-soup",
    title: "Spiced Carrot & Lentil Soup",
    description:
      "A warming, budget-friendly soup that's as good for meal prep as it is for a cold night.",
    image:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=80",
    ingredients: [
      "4 carrots, chopped",
      "1 cup red lentils",
      "1 onion, diced",
      "1 tsp cumin",
      "1 tsp turmeric",
      "4 cups vegetable stock",
    ],
    instructions: [
      "Sauté onion until soft, then add spices and toast briefly.",
      "Add carrots, lentils, and stock. Simmer 25 minutes.",
      "Blend until smooth, adjusting seasoning to taste.",
    ],
    cookingTime: 40,
    servings: 4,
    difficulty: "Easy",
    nutrition: { calories: 220, protein: 12, carbs: 36, fat: 3 },
    category: "Lunch",
    tags: ["Vegetarian", "Healthy", "Lunch"],
  },
  {
    id: "garlic-shrimp-zoodles",
    title: "Garlic Shrimp Zoodles",
    description:
      "A low-carb, high-protein plate that comes together faster than delivery.",
    image:
      "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?auto=format&fit=crop&w=1200&q=80",
    ingredients: [
      "1 lb shrimp, peeled",
      "3 zucchini, spiralized",
      "4 cloves garlic, minced",
      "2 tbsp butter",
      "Red pepper flakes",
      "Lemon juice",
    ],
    instructions: [
      "Sauté garlic in butter until fragrant.",
      "Add shrimp and cook until pink, about 3 minutes per side.",
      "Toss in zoodles just until warmed through, finish with lemon.",
    ],
    cookingTime: 20,
    servings: 2,
    difficulty: "Easy",
    nutrition: { calories: 290, protein: 34, carbs: 9, fat: 13 },
    category: "Dinner",
    tags: ["High Protein", "Quick", "Healthy", "Dinner"],
  },
  {
    id: "sheet-pan-veggie-fajitas",
    title: "Sheet Pan Veggie Fajitas",
    description:
      "Smoky peppers and onions roasted to a char, piled into warm tortillas. One pan, minimal cleanup.",
    image:
      "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=1200&q=80",
    ingredients: [
      "3 bell peppers, sliced",
      "1 onion, sliced",
      "2 tbsp olive oil",
      "1 tbsp fajita seasoning",
      "8 small tortillas",
    ],
    instructions: [
      "Toss peppers and onion with oil and seasoning.",
      "Roast at 425°F for 20 minutes, stirring halfway.",
      "Serve in warm tortillas with your favorite toppings.",
    ],
    cookingTime: 30,
    servings: 4,
    difficulty: "Easy",
    nutrition: { calories: 260, protein: 6, carbs: 38, fat: 9 },
    category: "Dinner",
    tags: ["Vegetarian", "Quick", "Dinner"],
  },
  {
    id: "protein-oat-pancakes",
    title: "Protein Oat Pancakes",
    description:
      "Blender pancakes made from oats and cottage cheese — fluffy, filling, and no protein powder required.",
    image:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=1200&q=80",
    ingredients: [
      "1 cup rolled oats",
      "1 cup cottage cheese",
      "2 eggs",
      "1 tsp baking powder",
      "1 tsp cinnamon",
    ],
    instructions: [
      "Blend all ingredients until smooth.",
      "Cook 1/4-cup portions on a hot, lightly oiled pan until bubbles form.",
      "Flip and cook until golden on both sides.",
    ],
    cookingTime: 20,
    servings: 2,
    difficulty: "Easy",
    nutrition: { calories: 320, protein: 26, carbs: 28, fat: 10 },
    category: "Breakfast",
    tags: ["High Protein", "Breakfast", "Quick"],
  },
];

export function getRecipeById(id) {
  return RECIPES.find((recipe) => recipe.id === id) ?? null;
}

export function getRecipesByCategory(category) {
  if (!category) return RECIPES;
  return RECIPES.filter(
    (recipe) => recipe.category === category || recipe.tags.includes(category),
  );
}
