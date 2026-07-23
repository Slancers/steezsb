type Props = { data: unknown };

// Renders a JSON-LD <script> tag. Server component with no client JS overhead.
// Use one per structured-data type to keep validation in the Rich Results Test simple.
export function JsonLd({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
