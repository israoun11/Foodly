export function FoodSceneFallback() {
  return (
    <svg viewBox="0 0 500 500" className="h-full w-full" aria-hidden="true" role="presentation">
      <ellipse cx="250" cy="420" rx="170" ry="24" fill="#181611" opacity="0.06" />
      <circle cx="180" cy="200" r="70" fill="#FF5A1F" />
      <circle cx="310" cy="150" r="46" fill="#E5432B" />
      <ellipse cx="120" cy="320" rx="50" ry="58" fill="#6FA36B" />
      <circle cx="330" cy="290" r="54" fill="#F6C453" />
      <path d="M250 330 L300 420 L200 420 Z" fill="#D8440F" />
      <circle cx="380" cy="380" r="30" fill="#3F7D46" />
    </svg>
  );
}
