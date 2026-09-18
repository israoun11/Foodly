import { forwardRef } from "react";
import { cn } from "../../lib/cn.js";

export const Input = forwardRef(function Input(
  { label, id, error, className = "", ...props },
  ref,
) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-ink/70">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        className={cn(
          "border-b-2 bg-transparent px-1 py-2.5 text-ink outline-none transition-colors placeholder:text-ink/30",
          error ? "border-orange-dark" : "border-ink/20 focus:border-orange",
          className,
        )}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="text-sm text-orange-dark">
          {error}
        </p>
      )}
    </div>
  );
});
