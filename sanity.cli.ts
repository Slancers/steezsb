import { defineCliConfig } from "sanity/cli";

import { dataset, projectId } from "./sanity/env";

export default defineCliConfig({
  api: { projectId, dataset },
  // Enables the auto-updating studio if hosted at /studio.
  autoUpdates: true,
});
