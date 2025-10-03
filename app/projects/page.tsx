import type { Metadata } from "next";
import { Suspense } from "react";
import Filters from "@/components/Filters";
import ProjectCard from "@/components/ProjectCard";
import TrustStrip from "@/components/TrustStrip";

export const metadata: Metadata = {
  title: "Projects - Cloud Seven Realty",
  description: "Browse our premium real estate projects with verified titles and on-ground support",
};

// Mock data - replace with Sanity CMS data
const mockProjects = [
  {
    slug: "sunrise-valley",
    title: "Sunrise Valley",
    subtitle: "Premium residential plots with all amenities and clear titles",
    price: "45L",
    size: "5-10 kanal",
    location: "Downtown",
    status: "Launching" as const,
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
    highlights: ["Gated community", "24/7 security", "Near highway"]
  },
  {
    slug: "green-heights",
    title: "Green Heights",
    subtitle: "Luxury apartments with modern facilities and scenic views",
    price: "75L",
    size: "2-3 BHK",
    location: "Suburbs",
    status: "Ready" as const,
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    highlights: ["Swimming pool", "Gym", "Kids play area"]
  },
  {
    slug: "royal-plaza",
    title: "Royal Plaza",
    subtitle: "Commercial spaces in prime location for businesses",
    price: "1.2Cr",
    size: "1000-2000 sqft",
    location: "Downtown",
    status: "Ready" as const,
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
    highlights: ["High footfall", "Parking", "Prime location"]
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

export default function ProjectsPage() {
  return (
    <>
      {/* Header */}
      <div className="bg-neutral-50 py-12 sm:py-16">
        <div className="container-custom">
          <div className="mb-4 text-sm text-neutral-600">
            <span>Home</span> <span className="mx-2">/</span> <span>Projects</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-4">
            Our Projects
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl">
            Discover premium real estate projects with verified titles and on-ground support
          </p>
        </div>
      </div>

      {/* Filters */}
      <Suspense fallback={<FiltersFallback />}>
        <Filters resultCount={mockProjects.length} />
      </Suspense>

      {/* Projects Grid */}
      <section className="py-12 sm:py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {mockProjects.map((project) => (
              <ProjectCard key={project.slug} {...project} />
            ))}
          </div>

          {/* Load More */}
          <div className="mt-12 text-center">
            <button className="btn btn-ghost px-8 py-3">
              Load More Projects
            </button>
          </div>
        </div>
      </section>

      <TrustStrip />
    </>
  );
}
