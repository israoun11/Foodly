import { forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "../../lib/cn.js";

const VARIANTS = {
  solid: "bg-ink text-paper hover:bg-orange hover:text-ink",
  outline: "border-2 border-ink text-ink hover:bg-ink hover:text-paper",
  orange: "bg-orange text-paper hover:bg-orange-dark",
  ghost: "text-ink hover:text-orange",
};

const SIZES = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
  sm: "px-4 py-2 text-sm",
};

export const Button = forwardRef(function Button(
  {
    variant = "solid",
    size = "md",
    isLoading = false,
    className = "",
    children,
    disabled,
    type = "button",
    ...props
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold uppercase tracking-wide transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50",
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...props}
    >
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
      {children}
    </button>
  );
});
