import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useAuth } from "../../hooks/useAuth.js";
import { Button } from "../ui/Button.jsx";
import { cn } from "../../lib/cn.js";

const LINKS = [
  { to: "/#discover", label: "Discover" },
  { to: "/recipes", label: "Recipes" },
  { to: "/#healthy", label: "Healthy" },
  { to: "/#about", label: "About" },
];

export function Navbar() {
  const { isAuthenticated } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 24);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-paper/90 shadow-[0_1px_0_0_rgba(24,22,17,0.08)] backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <nav className="container-page flex h-20 items-center justify-between">
        <Link to="/" className="font-display text-2xl italic text-ink">
          Foodly
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.to}
              className="text-sm font-medium uppercase tracking-wide text-ink/70 transition-colors hover:text-orange"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          {isAuthenticated ? (
            <Link to="/account">
              <Button size="sm" variant="outline">
                Account
              </Button>
            </Link>
          ) : (
            <>
          )}
        </div>

        <button
          type="button"
          className="text-ink md:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-ink/10 bg-paper md:hidden"
          >
            <div className="container-page flex flex-col gap-1 py-4">
              {LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.to}
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium uppercase tracking-wide text-ink/70"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-2 flex flex-col gap-2">
                {isAuthenticated ? (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate("/account");
                    }}
                  >
                    Account
                  </Button>
                ) : (
                  <>
                    
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
