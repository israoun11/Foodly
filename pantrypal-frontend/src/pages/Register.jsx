import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth.js";
import { Input } from "../components/ui/Input.jsx";
import { Button } from "../components/ui/Button.jsx";

function validate(form) {
  const errors = {};
  if (form.name.trim().length < 2) errors.name = "Name must be at least 2 characters";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Enter a valid email address";
  }
  if (form.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }
  return errors;
}

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
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

    const outcome = await register(form);
    setIsSubmitting(false);

    if (!outcome.success) {
      setFormError(outcome.error.message);
      return;
    }
    navigate("/account", { replace: true });
  }

  return (
    <div className="container-page flex min-h-[75vh] items-center justify-center py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <h1 className="font-display text-4xl italic text-ink">Create your account</h1>
        <p className="mt-2 text-ink/60">Start cooking with what you already have.</p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5" noValidate>
          <Input
            id="name"
            name="name"
            label="Name"
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            error={fieldErrors.name}
          />
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
            autoComplete="new-password"
            value={form.password}
            onChange={handleChange}
            error={fieldErrors.password}
          />

          {formError && (
            <p role="alert" className="text-sm text-orange-dark">
              {formError}
            </p>
          )}

          <Button type="submit" size="lg" isLoading={isSubmitting} className="mt-2 w-full">
            Create account
          </Button>
        </form>

        <p className="mt-8 text-sm text-ink/60">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-ink hover:text-orange">
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
