import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "../hooks/useAuth.js";
import { getRecipeById } from "../data/recipes.js";
import { MOCK_ACCOUNT } from "../data/mockAccount.js";
import { Button } from "../components/ui/Button.jsx";

/** "Jordan Rivera" -> "JR". Used for the avatar since users don't have a photo field. */
function getInitials(name) {
  if (!name) return "?";
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "");
  return initials.join("") || "?";
}

/** A compact list of recipes for one section (Favorites / Saved / Recently viewed). */
function RecipeRow({ title, ids }) {
  const recipes = ids.map(getRecipeById).filter(Boolean);
  if (recipes.length === 0) return null;

  return (
    <div className="border-t border-ink/10 py-6">
      <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-ink/45">
        {title}
      </h2>
      <div className="mt-4 flex flex-col divide-y divide-ink/8">
        {recipes.map((recipe) => (
          <Link
            key={recipe.id}
            to={`/recipes/${recipe.id}`}
            className="-mx-2 flex items-center gap-4 px-2 py-3 transition-colors hover:bg-sand/50"
          >
            <img
              src={recipe.image}
              alt=""
              className="h-14 w-14 shrink-0 bg-sand object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-lg italic text-ink">
                {recipe.title}
              </p>
              <p className="text-xs text-ink/50">
                {recipe.cookingTime} min · {recipe.category}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Account() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  const preferences = [
    { label: "Diet", value: MOCK_ACCOUNT.preferences.diet },
    {
      label: "Avoiding",
      value: MOCK_ACCOUNT.preferences.dislikedIngredients.join(", ") || "Nothing",
    },
    { label: "This week", value: MOCK_ACCOUNT.preferences.weeklyGoal },
  ];

  return (
    <div className="container-page max-w-2xl py-16 md:py-20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-cream font-display text-xl italic text-orange-dark"
            aria-hidden="true"
          >
            {getInitials(user?.name)}
          </div>
          <div className="min-w-0">
            <h1 className="truncate font-display text-2xl italic text-ink">
              {user?.name}
            </h1>
            <p className="truncate text-sm text-ink/50">{user?.email}</p>
          </div>
        </div>

        <Button variant="ghost" size="sm" onClick={handleLogout} className="shrink-0 self-start sm:self-auto">
          <LogOut className="h-4 w-4" />
          Log out
        </Button>
      </div>

      <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-y border-ink/10 py-6">
        {preferences.map((pref) => (
          <div key={pref.label}>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-ink/40">
              {pref.label}
            </p>
            <p className="mt-1 text-sm text-ink/80">{pref.value}</p>
          </div>
        ))}
      </div>

      <RecipeRow title="Favorites" ids={MOCK_ACCOUNT.favoriteRecipeIds} />
      <RecipeRow title="Saved recipes" ids={MOCK_ACCOUNT.savedRecipeIds} />
      <RecipeRow title="Recently viewed" ids={MOCK_ACCOUNT.recentlyViewedIds} />
    </div>
  );
}