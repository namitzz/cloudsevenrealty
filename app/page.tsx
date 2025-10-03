import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";

export default function Home() {
  return (
    <>
      <Hero />
      <section className="py-16 sm:py-24">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">
              Featured Projects
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Explore our handpicked selection of premium real estate projects
            </p>
          </div>
          {/* Project cards will be added here */}
        </div>
      </section>
      <TrustStrip />
    </>
  );
}
