import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer id="about" className="border-t border-ink/10 bg-ink text-paper">
      <div className="container-page flex flex-col gap-10 py-16 sm:flex-row sm:justify-between">
        <div className="max-w-sm">
          <p className="font-display text-3xl italic">Foodly</p>
          <p className="mt-4 text-paper/60">
            A premium editorial food experience — recipes, healthy living, and
            cooking inspiration for what's already in your kitchen.
          </p>
        </div>

        <div className="flex gap-16">
          <div className="flex flex-col gap-2 text-sm">
            <span className="font-semibold uppercase tracking-wide text-paper/80">
              Explore
            </span>
            <a href="/#discover" className="text-paper/60 hover:text-orange">
              Discover
            </a>
            <Link to="/recipes" className="text-paper/60 hover:text-orange">
              Recipes
            </Link>
            <a href="/#healthy" className="text-paper/60 hover:text-orange">
              Healthy Living
            </a>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <span className="font-semibold uppercase tracking-wide text-paper/80">
              Account
            </span>
            <Link to="/login" className="text-paper/60 hover:text-orange">
              Log in
            </Link>
            <Link to="/register" className="text-paper/60 hover:text-orange">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-paper/10 py-5">
        <p className="container-page text-xs text-paper/40">
          © {new Date().getFullYear()} Foodly. A portfolio project.
        </p>
      </div>
    </footer>
  );
}
