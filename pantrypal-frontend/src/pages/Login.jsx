import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth.js";
import { Input } from "../components/ui/Input.jsx";
import { Button } from "../components/ui/Button.jsx";

function validate(form) {
  const errors = {};
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Enter a valid email address";
  }
  if (!form.password) {
    errors.password = "Password is required";
  }
  return errors;
}

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname ?? "/account";

  const [form, setForm] = useState({ email: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError("");

    const errors = validate(form);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    setIsSubmitting(true);

    const outcome = await login(form);
    setIsSubmitting(false);

    if (!outcome.success) {
      setFormError(outcome.error.message);
      return;
    }
    navigate(redirectTo, { replace: true });
  }

  return (
    <div className="container-page flex min-h-[75vh] items-center justify-center py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <h1 className="font-display text-4xl italic text-ink">Welcome back</h1>
        <p className="mt-2 text-ink/60">Log in to your Foodly account.</p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5" noValidate>
          <Input
            id="email"
            name="email"
            type="email"
            label="Email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            error={fieldErrors.email}
          />
          <Input
            id="password"
            name="password"
            type="password"
            label="Password"
            autoComplete="current-password"
            value={form.password}
            onChange={handleChange}
            error={fieldErrors.password}
          />

          <div className="flex justify-end">
            <Link to="/forgot-password" className="text-sm text-ink/60 hover:text-orange">
              Forgot password?
            </Link>
          </div>

          {formError && (
            <p role="alert" className="text-sm text-orange-dark">
              {formError}
            </p>
          )}

          <Button type="submit" size="lg" isLoading={isSubmitting} className="mt-2 w-full">
            Log in
          </Button>
        </form>

        <p className="mt-8 text-sm text-ink/60">
          New to Foodly?{" "}
          <Link to="/register" className="font-semibold text-ink hover:text-orange">
            Create an account
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
