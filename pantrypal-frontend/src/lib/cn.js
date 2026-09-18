/**
 * Joins truthy class name fragments with a space. A lightweight
 * stand-in for the `clsx` package so we don't add a dependency for
 * one small utility.
 * @param  {...(string|false|null|undefined)} classes
 * @returns {string}
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
