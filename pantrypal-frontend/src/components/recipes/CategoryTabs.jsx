import { cn } from "../../lib/cn.js";

export function CategoryTabs({ categories, active, onChange }) {
  return (
    <div className="hide-scrollbar flex gap-2 overflow-x-auto pb-2">
      <button
        type="button"
        onClick={() => onChange(null)}
        className={cn(
          "shrink-0 rounded-full px-5 py-2 text-sm font-semibold uppercase tracking-wide transition-colors",
          active === null ? "bg-ink text-paper" : "bg-sand text-ink/60 hover:text-ink",
        )}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onChange(category)}
          className={cn(
            "shrink-0 rounded-full px-5 py-2 text-sm font-semibold uppercase tracking-wide transition-colors",
            active === category
              ? "bg-orange text-paper"
              : "bg-sand text-ink/60 hover:text-ink",
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
