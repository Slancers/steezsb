import Image from "next/image";

import { KitViewTracker } from "@/components/analytics/KitViewTracker";
import { Card, CardContent } from "@/components/ui/card";
import { JsonLd } from "@/components/JsonLd";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { formatINR } from "@/lib/format";
import { breadcrumbJsonLd, buildMetadata, productJsonLd } from "@/lib/seo";
import { urlFor } from "@/sanity/lib/image";
import { getProducts } from "@/sanity/queries";

export const metadata = buildMetadata({
  title: "STEEZE Skate Kit",
  description:
    "Everything a new skater needs to start. Skateboard, helmet, pads — bundled and ready.",
  path: "/shop",
});

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <>
      <KitViewTracker />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Shop", path: "/shop" },
        ])}
      />
      {products.map((product) => (
        <JsonLd key={product._id} data={productJsonLd(product)} />
      ))}

      <section className="container py-12 md:py-16">
        <div className="max-w-3xl space-y-4">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Skate kit
          </h1>
          <p className="text-lg text-muted-foreground">
            Buying gear piecemeal is confusing. The STEEZE Skate Kit bundles
            everything a beginner needs at a transparent price.
          </p>
        </div>
      </section>

      <section className="container pb-12">
        {products.length === 0 ? (
          <div className="rounded-lg border border-dashed p-12 text-center text-muted-foreground">
            Product details will appear here once added in Sanity Studio.
            <div className="mt-4">
              <WhatsAppCTA intent="kit">WhatsApp about the kit</WhatsAppCTA>
            </div>
          </div>
        ) : (
          <div className="grid gap-12">
            {products.map((product) => (
              <Card key={product._id} className="overflow-hidden">
                <div className="grid md:grid-cols-2">
                  {product.images && product.images[0] ? (
                    <Image
                      src={urlFor(product.images[0]).width(800).height(800).url()}
                      alt={product.images[0].alt ?? product.title}
                      width={800}
                      height={800}
                      className="aspect-square w-full object-cover"
                    />
                  ) : (
                    <div className="aspect-square w-full bg-muted" />
                  )}

                  <CardContent className="space-y-6 p-8">
                    <div>
                      <h2 className="text-3xl font-bold tracking-tight">
                        {product.title}
                      </h2>
                      <p className="mt-2 text-3xl font-bold text-foreground">
                        {formatINR(product.priceINR)}
                      </p>
                    </div>

                    {product.description ? (
                      <p className="text-muted-foreground">
                        {product.description}
                      </p>
                    ) : null}

                    {product.includes && product.includes.length > 0 ? (
                      <div>
                        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide">
                          What&apos;s included
                        </h3>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          {product.includes.map((line, i) => (
                            <li key={i}>• {line}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    <WhatsAppCTA intent="kit" size="lg" className="w-full">
                      WhatsApp to buy
                    </WhatsAppCTA>
                  </CardContent>
                </div>

                {product.images && product.images.length > 1 ? (
                  <div className="grid grid-cols-3 gap-2 border-t p-4 md:grid-cols-6">
                    {product.images.slice(1, 7).map((img, i) => (
                      <Image
                        key={i}
                        src={urlFor(img).width(300).height(300).url()}
                        alt={img.alt ?? `${product.title} ${i + 2}`}
                        width={300}
                        height={300}
                        className="aspect-square rounded object-cover"
                      />
                    ))}
                  </div>
                ) : null}
              </Card>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
