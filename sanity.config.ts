import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { singletonTypes } from "./sanity/lib/singleton";
import { schemaTypes } from "./sanity/schemas";
import { structure } from "./sanity/structure";

export default defineConfig({
  name: "default",
  title: "WallRide Park",
  basePath: "/studio",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    // Don't offer "Create new" template for singletons in the global menu.
    templates: (prev) =>
      prev.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    // Disable duplicate/delete actions for singleton documents.
    actions: (input, { schemaType }) =>
      singletonTypes.has(schemaType)
        ? input.filter(
            ({ action }) => action !== "duplicate" && action !== "delete"
          )
        : input,
  },
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
