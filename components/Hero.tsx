"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, fadeIn } from "@/lib/motion";

export default function Hero() {
  return (
    <section className="relative min-h-[600px] sm:min-h-[700px] flex items-center justify-center bg-neutral-900 text-white overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/Cloud 7.mp4" type="video/mp4" />
      </video>
      
      {/* Background overlay for better text readability */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Content */}
      <div className="relative z-20 container-custom text-center px-4">
        <motion.h1 
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-4 leading-tight"
        >
          Discover Smart Investment <br className="hidden sm:block" />
          & Better Living
        </motion.h1>
        
        <motion.p 
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.1 }}
          className="text-lg sm:text-xl text-neutral-200 mb-12 max-w-3xl mx-auto"
        >
          Premium real estate projects with verified titles and on-ground support
        </motion.p>

        {/* Search Bar */}
        <motion.div 
          variants={fadeIn}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.3 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search projects, developers, communities…"
              className="w-full px-6 py-4 pr-14 rounded-full text-foreground text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-accent shadow-lg"
              aria-label="Search properties"
            />
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-3 bg-accent text-white rounded-full hover:bg-accent/90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link 
            href="#projects"
            className="inline-flex flex-col items-center text-white/80 hover:text-white transition-colors group"
            aria-label="Scroll to projects"
          >
            <span className="text-sm mb-2">Scroll</span>
            <motion.svg 
              className="w-6 h-6"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </motion.svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
