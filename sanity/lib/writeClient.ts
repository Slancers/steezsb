import "server-only";

import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

// Server-only client with write permissions. Used by /api/lead to create lead docs.
// Crashes at import time if accidentally pulled into a client bundle.
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});
