import Hero from "@/components/Hero";
import FeaturedProjects from "@/components/FeaturedProjects";
import Testimonials from "@/components/Testimonials";
import TrustStrip from "@/components/TrustStrip";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects id="projects" />
      <Testimonials />
      <TrustStrip />
    </>
  );
}
