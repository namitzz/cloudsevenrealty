import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Areas - Cloud Seven Realty",
  description: "Explore real estate opportunities in different areas",
};

const mockAreas = [
  {
    slug: "downtown",
    name: "Downtown",
    description: "Prime location with commercial and residential opportunities",
    projectCount: 5,
    propertyCount: 12
  },
  {
    slug: "suburbs",
    name: "Suburbs",
    description: "Peaceful residential areas with modern amenities",
    projectCount: 3,
    propertyCount: 8
  },
  {
    slug: "highway",
    name: "Highway",
    description: "Strategic locations near major highways",
    projectCount: 4,
    propertyCount: 10
  }
];

export default function AreasPage() {
  return (
    <>
      {/* Header */}
      <div className="bg-neutral-50 py-12 sm:py-16">
        <div className="container-custom">
          <div className="mb-4 text-sm text-neutral-600">
            <span>Home</span> <span className="mx-2">/</span> <span>Areas</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-4">
            Explore Areas
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl">
            Discover real estate opportunities across different locations
          </p>
        </div>
      </div>

      {/* Areas Grid */}
      <section className="py-12 sm:py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {mockAreas.map((area) => (
              <Link
                key={area.slug}
                href={`/areas/${area.slug}`}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 border border-neutral-200"
              >
                <h2 className="text-2xl font-serif font-bold mb-3">{area.name}</h2>
                <p className="text-neutral-600 mb-4">{area.description}</p>
                <div className="flex gap-4 text-sm text-neutral-600">
                  <span>{area.projectCount} Projects</span>
                  <span>•</span>
                  <span>{area.propertyCount} Properties</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
