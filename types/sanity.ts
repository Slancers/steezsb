// Sanity content types. Mirrors the schemas defined in sanity/schemas/.

export type SanityImage = {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number; height: number; width: number };
  alt?: string;
};

export type SiteSettings = {
  siteName?: string;
  tagline?: string;
  whatsappNumber?: string;
  phoneNumber?: string;
  email?: string;
  address?: {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    pincode?: string;
  };
  geo?: { lat?: number; lng?: number };
  social?: {
    instagram?: string;
    youtube?: string;
  };
  openingHours?: string[];
  hero?: {
    title?: string;
    subtitle?: string;
    image?: SanityImage;
  };
  about?: {
    bio?: string;
    philosophy?: string;
    photo?: SanityImage;
  };
};

export type CoachingProgram = {
  _id: string;
  title: string;
  slug?: { current: string };
  type: "1on1" | "group";
  priceINR: number;
  sessionCount: number;
  sessionDurationMinutes: number;
  maxStudents: number;
  description?: string;
  learnings?: string[];
  order?: number;
};

export type PracticeTier = {
  _id: string;
  durationHours: number;
  priceINR: number;
  description?: string;
};

export type Product = {
  _id: string;
  title: string;
  slug?: { current: string };
  priceINR: number;
  description?: string;
  includes?: string[];
  images?: SanityImage[];
};

export type Location = {
  _id: string;
  name: string;
  type: "bowl" | "skatepark";
  address?: string;
  geo?: { lat?: number; lng?: number };
  photos?: SanityImage[];
  isPrimary?: boolean;
};

export type Testimonial = {
  _id: string;
  studentName?: string;
  parentName?: string;
  quote: string;
  photo?: SanityImage;
  date?: string;
  featured?: boolean;
};

export type Faq = {
  _id: string;
  question: string;
  answer: string;
  category?: "classes" | "practice" | "gear" | "general";
  order?: number;
};

export type MediaItem = {
  _id: string;
  caption?: string;
  image?: SanityImage;
  videoUrl?: string;
  tags?: string[];
  order?: number;
};

export type BlogPost = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  coverImage?: SanityImage;
  body?: Array<
    | import("@portabletext/types").PortableTextBlock
    | (SanityImage & { _key: string })
  >;
  publishedAt?: string;
  tags?: string[];
  metaTitle?: string;
  metaDescription?: string;
};

export type MediaBuzz = {
  _id: string;
  headline: string;
  slug: { current: string };
  publication: string;
  publishedAt?: string;
  excerpt?: string;
  coverImage?: SanityImage;
  sourceUrl: string;
  featured?: boolean;
};
