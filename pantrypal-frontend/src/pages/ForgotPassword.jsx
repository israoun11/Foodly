import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Input } from "../components/ui/Input.jsx";
import { Button } from "../components/ui/Button.jsx";

/**
 * UI-only for now — the backend doesn't expose a password-reset
 * endpoint yet, so this simulates the request rather than calling
 * one that doesn't exist. Swap handleSubmit for a real API call
 * (e.g. POST /api/auth/forgot-password) once that route is added.
 */
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setIsSubmitting(false);
    setIsSent(true);
  }

  return (
    <div className="container-page flex min-h-[75vh] items-center justify-center py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        {isSent ? (
          <div className="text-center">
            <CheckCircle2 className="mx-auto h-10 w-10 text-leaf" />
            <h1 className="mt-4 font-display text-3xl italic text-ink">Check your email</h1>
            <p className="mt-2 text-ink/60">
              If an account exists for {email}, a reset link is on its way.
            </p>
            <Link to="/login" className="mt-8 inline-block text-sm font-semibold text-orange">
              Back to login
            </Link>
          </div>
        ) : (
          <>
            <h1 className="font-display text-4xl italic text-ink">Reset your password</h1>
            <p className="mt-2 text-ink/60">
              Enter your email and we'll send you a link to reset it.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5" noValidate>
              <Input
                id="email"
                type="email"
                label="Email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                error={error}
              />
              <Button type="submit" size="lg" isLoading={isSubmitting} className="w-full">
                Send reset link
              </Button>
            </form>

            <Link to="/login" className="mt-8 inline-block text-sm text-ink/60 hover:text-orange">
              Back to login
            </Link>
          </>
        )}
      </motion.div>
    </div>
  );
}
