export const cn = (...classNames: (string | 0 | boolean | null | undefined)[]): string | undefined => {
  const filtered = classNames.filter(Boolean);

  if (filtered.length === 0) return undefined;

  return filtered.join(' ').trimEnd();
};
