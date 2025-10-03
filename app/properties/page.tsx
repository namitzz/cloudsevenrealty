import type { Metadata } from "next";
import { Suspense } from "react";
import Filters from "@/components/Filters";
import PropertyCard from "@/components/PropertyCard";
import TrustStrip from "@/components/TrustStrip";
import { getProperties } from "@/lib/googleSheets";

export const metadata: Metadata = {
  title: "Properties - Cloud Seven Realty",
  description: "Browse properties for buy, rent, and land with verified titles",
};

function FiltersFallback() {
  return (
    <div className="bg-white border-b border-neutral-200 py-4 sticky top-16 sm:top-20 z-40">
      <div className="container-custom">
        <div className="flex items-center gap-3">
          <div className="h-10 w-32 bg-neutral-200 rounded-full animate-pulse" />
          <div className="h-10 w-32 bg-neutral-200 rounded-full animate-pulse" />
          <div className="h-10 w-32 bg-neutral-200 rounded-full animate-pulse" />
          <div className="h-10 w-32 bg-neutral-200 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default async function PropertiesPage() {
  const properties = await getProperties();
  
  return (
    <>
      {/* Header */}
      <div className="bg-neutral-50 py-12 sm:py-16">
        <div className="container-custom">
          <div className="mb-4 text-sm text-neutral-600">
            <span>Home</span> <span className="mx-2">/</span> <span>Properties</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-4">
            Properties
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl">
            Find your perfect property for buy, rent, or investment
          </p>
        </div>
      </div>

      {/* Filters */}
      <Suspense fallback={<FiltersFallback />}>
        <Filters 
          resultCount={properties.length}
          statusOptions={[
            { label: "All Status", value: "" },
            { label: "Buy", value: "buy" },
            { label: "Rent", value: "rent" },
            { label: "Land", value: "land" }
          ]}
        />
      </Suspense>

      {/* Properties Grid */}
      <section className="py-12 sm:py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {properties.map((property) => (
              <PropertyCard key={property.slug} {...property} />
            ))}
          </div>

          {/* Load More */}
          <div className="mt-12 text-center">
            <button className="btn btn-ghost px-8 py-3">
              Load More Properties
            </button>
          </div>
        </div>
      </section>

      <TrustStrip />
    </>
  );
}
