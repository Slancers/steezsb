import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

// Public read-only client. Safe to import anywhere (server or browser).
// No write token. Cached at the edge via next-sanity's fetch integration.
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});
