import type { Metadata } from "next";
import Image from "next/image";
import Gallery from "@/components/Gallery";
import StickyEnquiry from "@/components/StickyEnquiry";

type Params = Promise<{ slug: string }>;

interface Props {
  params: Params;
}

export async function generateStaticParams() {
  // In production, fetch all property slugs from CMS
  return [
    { slug: 'luxury-villa-downtown' },
    { slug: 'cozy-apartment-suburbs' },
    { slug: 'prime-land-highway' }
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${slug} - Cloud Seven Realty`,
    description: "Premium property with verified title",
  };
}

// Mock data
const mockProperty = {
  name: "Luxury Villa Downtown",
  slug: "luxury-villa-downtown",
  tagline: "Spacious 4BHK villa with modern amenities",
  heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920",
  price: "₹2.5 Crores",
  size: "3500 sqft",
  location: "Downtown",
  status: "Ready to Move",
  features: [
    "4 Bedrooms + 4 Bathrooms",
    "Modular kitchen",
    "Private garden",
    "2 Car parking",
    "24/7 Security",
    "Power backup",
    "Water supply",
    "Near schools & hospitals"
  ],
  gallery: [
    { url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", alt: "Property view 1" },
    { url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800", alt: "Property view 2" },
    { url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800", alt: "Property view 3" },
    { url: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800", alt: "Property view 4" }
  ],
  specifications: {
    "Property Type": "Villa",
    "Total Area": "3500 sqft",
    "Bedrooms": "4",
    "Bathrooms": "4",
    "Floors": "2",
    "Parking": "2 Cars",
    "Furnishing": "Semi-furnished",
    "Age": "New construction"
  }
};

export default async function PropertyDetailPage({ params }: Props) {
  // In production, fetch property data based on params.slug
  const { slug } = await params;
  
  // TODO: Fetch actual property data using slug
  // const property = await fetchProperty(slug);
  
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] bg-neutral-900">
        <Image
          src={mockProperty.heroImage}
          alt={mockProperty.name}
          fill
          className="object-cover opacity-70"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="relative h-full flex items-end">
          <div className="container-custom pb-12 text-white">
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                {mockProperty.location}
              </span>
              <span className="px-3 py-1 bg-green-500 backdrop-blur-sm rounded-full text-sm">
                {mockProperty.status}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mb-4">
              {mockProperty.name}
            </h1>
            <p className="text-xl sm:text-2xl text-neutral-200 mb-6 max-w-2xl">
              {mockProperty.tagline}
            </p>
            <div className="flex flex-wrap gap-6 text-lg">
              <div>
                <div className="text-neutral-300 text-sm">Price</div>
                <div className="font-semibold">{mockProperty.price}</div>
              </div>
              <div>
                <div className="text-neutral-300 text-sm">Size</div>
                <div className="font-semibold">{mockProperty.size}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-custom py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Features */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-6">
                Property Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {mockProperty.features.map((feature, index) => (
                  <div key={index} className="flex items-center bg-neutral-50 rounded-lg px-4 py-3">
                    <span className="text-accent mr-3">✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Gallery */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-6">
                Gallery
              </h2>
              <Gallery images={mockProperty.gallery} />
            </section>

            {/* Specifications */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-6">
                Specifications
              </h2>
              <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
                <table className="w-full">
                  <tbody className="divide-y divide-neutral-200">
                    {Object.entries(mockProperty.specifications).map(([key, value], index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 text-neutral-600 font-medium w-1/2">{key}</td>
                        <td className="px-6 py-4">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Map Placeholder */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-6">
                Location
              </h2>
              <div className="bg-neutral-200 rounded-xl h-[400px] flex items-center justify-center">
                <div className="text-center text-neutral-600">
                  <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p>Map integration placeholder</p>
                  <p className="text-sm mt-1">{mockProperty.location}</p>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-neutral-50 rounded-xl p-6">
              <h3 className="font-semibold text-lg mb-4">Quick Info</h3>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-neutral-600">Status</dt>
                  <dd className="font-medium">{mockProperty.status}</dd>
                </div>
                <div>
                  <dt className="text-neutral-600">Location</dt>
                  <dd className="font-medium">{mockProperty.location}</dd>
                </div>
                <div>
                  <dt className="text-neutral-600">Size</dt>
                  <dd className="font-medium">{mockProperty.size}</dd>
                </div>
                <div>
                  <dt className="text-neutral-600">Price</dt>
                  <dd className="font-medium">{mockProperty.price}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <StickyEnquiry projectName={mockProperty.name} projectSlug={mockProperty.slug} />
    </>
  );
}
