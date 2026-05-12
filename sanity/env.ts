export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "production"
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "placeholder"
);

export const useCdn = false;

function assertValue<T>(v: T | undefined, fallback: T): T {
  if (v === undefined || v === "") {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        `[sanity] Missing env var, using fallback "${fallback}". Set values in .env.local to connect to a real project.`
      );
    }
    return fallback;
  }
  return v;
}
