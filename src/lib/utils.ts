export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function findLabel<T extends string>(
  options: { value: T; label: string }[],
  value: T | null | undefined
): string | undefined {
  return options.find((option) => option.value === value)?.label;
}
