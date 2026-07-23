import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";

import { urlFor } from "@/sanity/lib/image";
import type { BlogPost, SanityImage } from "@/types/sanity";

const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: SanityImage }) => (
      <figure className="relative my-10 aspect-[16/10] overflow-hidden rounded-[0.2rem] bg-[#deded8]">
        <Image
          src={urlFor(value).width(1400).height(875).fit("max").url()}
          alt={value.alt ?? ""}
          fill
          sizes="(min-width: 1024px) 760px, 100vw"
          className="object-contain"
        />
      </figure>
    ),
  },
};

export function PortableArticle({ body }: { body: NonNullable<BlogPost["body"]> }) {
  return <PortableText value={body} components={components} />;
}
