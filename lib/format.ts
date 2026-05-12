export function formatINR(amount: number | undefined): string {
  if (typeof amount !== "number") return "—";
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function pluralize(
  count: number,
  singular: string,
  plural?: string
): string {
  return count === 1 ? singular : (plural ?? `${singular}s`);
}
