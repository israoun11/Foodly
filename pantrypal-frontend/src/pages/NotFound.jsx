import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home } from "lucide-react";
import { Button } from "../components/ui/Button.jsx";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[70vh] flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <p className="font-display text-display-xl italic text-orange">404</p>
        <h1 className="mt-2 font-display text-3xl italic text-ink">
          Nothing on this shelf
        </h1>
        <p className="mt-3 max-w-sm text-ink/60">
          The page you're looking for doesn't exist, or it's been moved.
        </p>
        <Link to="/" className="mt-8 inline-block">
          <Button size="lg">
            <Home className="h-4 w-4" />
            Back to home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
