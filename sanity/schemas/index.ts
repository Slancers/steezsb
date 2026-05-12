import type { SchemaTypeDefinition } from "sanity";

import { blogPost } from "./blogPost";
import { coachingProgram } from "./coachingProgram";
import { faq } from "./faq";
import { lead } from "./lead";
import { location } from "./location";
import { mediaItem } from "./mediaItem";
import { practiceTier } from "./practiceTier";
import { product } from "./product";
import { siteSettings } from "./siteSettings";
import { student } from "./student";
import { testimonial } from "./testimonial";

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettings,
  coachingProgram,
  practiceTier,
  product,
  location,
  testimonial,
  faq,
  mediaItem,
  blogPost,
  lead,
  student,
];
