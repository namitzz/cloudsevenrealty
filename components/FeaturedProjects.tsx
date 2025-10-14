"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";

const projects = [
  {
    id: 1,
    name: "Islands",
    location: "Premium Waterfront",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    badge: "Featured",
    href: "/projects/islands",
  },
  {
    id: 2,
    name: "Ocean Star",
    location: "Coastal Paradise",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    badge: "New Launch",
    href: "/projects/ocean-star",
  },
  {
    id: 3,
    name: "Terra Heights",
    location: "Mountain View Estate",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    badge: "Premium",
    href: "/projects/terra-heights",
  },
];

interface FeaturedProjectsProps {
  id?: string;
}

export default function FeaturedProjects({ id = "projects" }: FeaturedProjectsProps) {
  return (
    <section id={id} className="py-20 sm:py-28 bg-gradient-to-br from-background via-luxury-50 to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-luxury-gold/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-luxury-gold/5 rounded-full blur-3xl"></div>
      
      <div className="container-custom relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <span className="text-luxury-gold text-sm font-semibold tracking-[0.2em] uppercase">Premium Selection</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mb-6 bg-gradient-to-r from-luxury-navy via-luxury-slate to-luxury-navy bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Explore our handpicked selection of premium real estate projects, each offering exceptional value and luxury living
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
        >
          {projects.map((project, index) => (
            <motion.div key={project.id} variants={fadeUp}>
              <Link 
                href={project.href}
                className="group block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-luxury-lg transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:ring-offset-4 transform hover:-translate-y-2"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-neutral-200 to-neutral-100">
                  {/* Badge */}
                  <div className="absolute top-4 right-4 z-10 px-4 py-1.5 bg-luxury-gold text-white text-xs font-semibold rounded-full shadow-lg backdrop-blur-sm">
                    {project.badge}
                  </div>
                  
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index === 0}
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="p-7">
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-3 group-hover:text-luxury-gold transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-neutral-600 flex items-center text-base">
                    <svg className="w-5 h-5 mr-2 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {project.location}
                  </p>
                  <div className="mt-4 flex items-center text-luxury-gold font-medium text-sm group-hover:translate-x-2 transition-transform duration-300">
                    Explore Project 
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
