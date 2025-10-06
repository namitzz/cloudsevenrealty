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
    image: "/Logo.jpg", // Using existing logo as placeholder
    href: "/projects/islands",
  },
  {
    id: 2,
    name: "Ocean Star",
    location: "Coastal Paradise",
    image: "/Logo.jpg", // Using existing logo as placeholder
    href: "/projects/ocean-star",
  },
  {
    id: 3,
    name: "Terra Heights",
    location: "Mountain View Estate",
    image: "/Logo.jpg", // Using existing logo as placeholder
    href: "/projects/terra-heights",
  },
];

interface FeaturedProjectsProps {
  id?: string;
}

export default function FeaturedProjects({ id = "projects" }: FeaturedProjectsProps) {
  return (
    <section id={id} className="py-16 sm:py-24 bg-background">
      <div className="container-custom">
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-4">
            Featured Projects
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto text-lg">
            Explore our handpicked selection of premium real estate projects
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div key={project.id} variants={fadeUp}>
              <Link 
                href={project.href}
                className="group block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index === 0}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-serif font-bold mb-2 group-hover:text-accent transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-neutral-600 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {project.location}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
