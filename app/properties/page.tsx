import type { Metadata } from "next";
import { Suspense } from "react";
import Filters from "@/components/Filters";
import PropertyCard from "@/components/PropertyCard";
import TrustStrip from "@/components/TrustStrip";

export const metadata: Metadata = {
  title: "Properties - Cloud Seven Realty",
  description: "Browse properties for buy, rent, and land with verified titles",
};

// Mock data - replace with Sanity CMS data
const mockProperties = [
  {
    slug: "luxury-villa-downtown",
    title: "Luxury Villa in Downtown",
    subtitle: "Spacious 4BHK villa with garden and parking",
    price: "2.5Cr",
    size: "3500 sqft",
    location: "Downtown",
    status: "Buy" as const,
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    features: ["4 BHK", "Garden", "Parking", "Modern amenities"]
  },
  {
    slug: "cozy-apartment-suburbs",
    title: "Cozy Apartment in Suburbs",
    subtitle: "2BHK furnished apartment ready to move in",
    price: "25K/month",
    size: "1200 sqft",
    location: "Suburbs",
    status: "Rent" as const,
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
    features: ["Furnished", "2 BHK", "Ready to move", "Near metro"]
  },
  {
    slug: "prime-land-highway",
    title: "Prime Land Near Highway",
    subtitle: "Agricultural land with road access and water supply",
    price: "35L",
    size: "2 kanal",
    location: "Highway",
    status: "Land" as const,
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
    features: ["Road access", "Water", "15 min to city", "Clear title"]
  }
];

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

export default function PropertiesPage() {
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
          resultCount={mockProperties.length}
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
            {mockProperties.map((property) => (
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
