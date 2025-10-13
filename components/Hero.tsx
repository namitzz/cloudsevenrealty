"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, fadeIn } from "@/lib/motion";

export default function Hero() {
  return (
    <section className="relative min-h-[700px] sm:min-h-[800px] lg:min-h-[90vh] flex items-center justify-center bg-luxury-navy text-white overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      >
        <source src="/Cloud 7.mp4" type="video/mp4" />
      </video>
      
      {/* Enhanced gradient overlays for depth and luxury feel */}
      <div className="absolute inset-0 bg-gradient-to-br from-luxury-navy/95 via-luxury-navy/80 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 container-custom text-center px-4">
        {/* Premium badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="inline-block px-6 py-2 bg-luxury-gold/20 backdrop-blur-md border border-luxury-gold/30 rounded-full text-luxury-gold text-sm font-medium tracking-wide">
            ✨ PREMIUM LUXURY REAL ESTATE
          </span>
        </motion.div>

        <motion.h1 
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 leading-[1.1] tracking-tight"
        >
          <span className="block bg-gradient-to-r from-white via-luxury-lightGold to-luxury-gold bg-clip-text text-transparent">
            Discover Smart Investment
          </span>
          <span className="block text-white mt-2">
            & Better Living
          </span>
        </motion.h1>
        
        <motion.p 
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.1 }}
          className="text-xl sm:text-2xl text-neutral-200 mb-16 max-w-4xl mx-auto font-light leading-relaxed"
        >
          Premium real estate projects with <span className="text-luxury-gold font-medium">verified titles</span> and dedicated <span className="text-luxury-gold font-medium">on-ground support</span>
        </motion.p>

        {/* Enhanced Search Bar */}
        <motion.div 
          variants={fadeIn}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.3 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-luxury-gold via-luxury-lightGold to-luxury-gold rounded-full opacity-25 blur-lg group-hover:opacity-40 transition duration-500"></div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search projects, developers, communities…"
                className="w-full px-8 py-5 pr-16 rounded-full text-foreground text-base sm:text-lg bg-white/95 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-luxury-gold shadow-luxury-lg border border-luxury-gold/20"
                aria-label="Search properties"
              />
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-4 bg-gradient-to-r from-luxury-gold to-luxury-darkGold text-white rounded-full hover:shadow-luxury transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-luxury-gold hover:scale-105"
                aria-label="Search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8"
        >
          <Link 
            href="#projects"
            className="inline-flex flex-col items-center text-luxury-lightGold/90 hover:text-luxury-gold transition-all duration-300 group"
            aria-label="Scroll to projects"
          >
            <span className="text-sm font-medium mb-3 tracking-wider">EXPLORE PROJECTS</span>
            <motion.div
              className="w-10 h-16 border-2 border-luxury-gold/40 rounded-full flex items-start justify-center p-2"
              animate={{ 
                borderColor: ["rgba(212, 175, 55, 0.4)", "rgba(212, 175, 55, 0.8)", "rgba(212, 175, 55, 0.4)"]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div 
                className="w-2 h-2 bg-luxury-gold rounded-full"
                animate={{ y: [0, 24, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
