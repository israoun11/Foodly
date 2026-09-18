import { Hero } from "../components/sections/Hero.jsx";
import { Discover } from "../components/sections/Discover.jsx";
import { InteractiveShowcase } from "../components/sections/InteractiveShowcase.jsx";
import { RecipeCollection } from "../components/sections/RecipeCollection.jsx";
import { HealthyLiving } from "../components/sections/HealthyLiving.jsx";
import { FeaturedRecipes } from "../components/sections/FeaturedRecipes.jsx";
import { FinalCTA } from "../components/sections/FinalCTA.jsx";

export default function Home() {
  return (
    <div>
      <Hero />
      <Discover />
      <InteractiveShowcase />
      <RecipeCollection />
      <HealthyLiving />
      <FeaturedRecipes />
      <FinalCTA />
    </div>
  );
}
