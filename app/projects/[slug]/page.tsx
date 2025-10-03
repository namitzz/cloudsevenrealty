import type { Metadata } from "next";
import Image from "next/image";
import Gallery from "@/components/Gallery";
import StickyEnquiry from "@/components/StickyEnquiry";

type Params = Promise<{ slug: string }>;

interface Props {
  params: Params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${slug} - Cloud Seven Realty`,
    description: "Premium real estate project with verified title and on-ground support",
  };
}

// Mock data - replace with Sanity CMS data
const mockProject = {
  name: "Sunrise Valley",
  slug: "sunrise-valley",
  tagline: "Premium residential plots in a gated community",
  heroImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920",
  price: "From ₹45 Lakhs",
  size: "5-10 kanal",
  location: "Downtown, Near Highway",
  status: "Launching Soon",
  highlights: [
    "Verified legal titles",
    "24/7 gated security",
    "All utilities connected",
    "15 minutes from city center",
    "Near schools and hospitals",
    "Wide roads and proper drainage"
  ],
  gallery: [
    { url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800", alt: "Project view 1" },
    { url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", alt: "Project view 2" },
    { url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800", alt: "Project view 3" },
    { url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800", alt: "Project view 4" },
    { url: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800", alt: "Project view 5" },
    { url: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800", alt: "Project view 6" }
  ],
  pricing: [
    { size: "5 kanal", price: "₹45 Lakhs", features: ["Road facing", "Corner plot"] },
    { size: "7 kanal", price: "₹60 Lakhs", features: ["Premium location", "Park facing"] },
    { size: "10 kanal", price: "₹85 Lakhs", features: ["Extra large", "Dual access"] }
  ],
  faqs: [
    {
      question: "What is the possession timeline?",
      answer: "Immediate possession available for ready plots. Under-construction plots will be ready in 12-18 months."
    },
    {
      question: "Are the titles verified?",
      answer: "Yes, all our properties come with verified legal titles and proper documentation."
    },
    {
      question: "What amenities are included?",
      answer: "24/7 security, wide roads, street lights, water connection, sewage system, and landscaped parks."
    },
    {
      question: "Is bank loan available?",
      answer: "Yes, we have tie-ups with major banks for easy loan processing."
    }
  ]
};

export default async function ProjectDetailPage({ params }: Props) {
  // In production, fetch project data based on params.slug
  const { slug } = await params;
  console.log("Project slug:", slug); // Acknowledge params usage
  
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] bg-neutral-900">
        <Image
          src={mockProject.heroImage}
          alt={mockProject.name}
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
                {mockProject.location}
              </span>
              <span className="px-3 py-1 bg-accent backdrop-blur-sm rounded-full text-sm">
                {mockProject.status}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mb-4">
              {mockProject.name}
            </h1>
            <p className="text-xl sm:text-2xl text-neutral-200 mb-6 max-w-2xl">
              {mockProject.tagline}
            </p>
            <div className="flex flex-wrap gap-6 text-lg">
              <div>
                <div className="text-neutral-300 text-sm">Price</div>
                <div className="font-semibold">{mockProject.price}</div>
              </div>
              <div>
                <div className="text-neutral-300 text-sm">Size</div>
                <div className="font-semibold">{mockProject.size}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-custom py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Highlights */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-6">
                Project Highlights
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {mockProject.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-accent text-xl mr-3">✓</span>
                    <span className="text-neutral-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Gallery */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-6">
                Gallery
              </h2>
              <Gallery images={mockProject.gallery} />
            </section>

            {/* Pricing */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-6">
                Plans & Pricing
              </h2>
              <div className="grid gap-4">
                {mockProject.pricing.map((plan, index) => (
                  <div key={index} className="bg-white border border-neutral-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex flex-wrap justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{plan.size}</h3>
                        <p className="text-2xl font-bold text-accent">{plan.price}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {plan.features.map((feature, idx) => (
                        <span key={idx} className="px-3 py-1 bg-neutral-100 rounded-full text-sm">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
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
                  <p className="text-sm mt-1">{mockProject.location}</p>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {mockProject.faqs.map((faq, index) => (
                  <details key={index} className="bg-white border border-neutral-200 rounded-xl p-6 group">
                    <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                      {faq.question}
                      <span className="text-accent group-open:rotate-180 transition-transform">
                        ▼
                      </span>
                    </summary>
                    <p className="mt-4 text-neutral-600">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-neutral-50 rounded-xl p-6">
              <h3 className="font-semibold text-lg mb-4">Quick Facts</h3>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-neutral-600">Status</dt>
                  <dd className="font-medium">{mockProject.status}</dd>
                </div>
                <div>
                  <dt className="text-neutral-600">Location</dt>
                  <dd className="font-medium">{mockProject.location}</dd>
                </div>
                <div>
                  <dt className="text-neutral-600">Size Range</dt>
                  <dd className="font-medium">{mockProject.size}</dd>
                </div>
                <div>
                  <dt className="text-neutral-600">Price Range</dt>
                  <dd className="font-medium">{mockProject.price}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <StickyEnquiry projectName={mockProject.name} projectSlug={mockProject.slug} />
    </>
  );
}
