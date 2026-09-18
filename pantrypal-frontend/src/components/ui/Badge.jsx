import { cn } from "../../lib/cn.js";

export function Badge({ children, tone = "cream", className = "" }) {
  const TONES = {
    cream: "bg-cream text-ink",
    orange: "bg-orange text-paper",
    leaf: "bg-leaf text-paper",
    yolk: "bg-yolk text-ink",
    outline: "border border-ink/25 text-ink",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
