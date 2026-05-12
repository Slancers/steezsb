import { randomUUID } from "node:crypto";

// Generate a Sanity document _id and a 6-char refCode derived from it.
// refCode = last 6 alphanumeric chars of _id, lowercased — matches PRD spec.
// We mint the _id ourselves (instead of letting Sanity auto-generate) so
// the doc write is atomic: refCode is known up front, no second update needed.
export function newLeadIds(): { id: string; refCode: string } {
  const id = randomUUID();
  const refCode = id.replace(/[^a-zA-Z0-9]/g, "").slice(-6).toLowerCase();
  return { id, refCode };
}
