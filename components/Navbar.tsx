"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/events", label: "Events" },
    { href: "/blog", label: "Blog" },
  ];

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-luxury-gold/10">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20 sm:h-24">
          {/* Left: Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 rounded-lg text-luxury-navy hover:text-luxury-gold hover:bg-luxury-gold/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-luxury-gold"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls="slide-out-menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span className="ml-2 text-sm font-semibold hidden sm:inline">Menu</span>
          </button>

          {/* Center: Enhanced Logo */}
          <Link href="/" className="absolute left-1/2 transform -translate-x-1/2 group" aria-label="Home">
            <div className="relative">
              <Image 
                src="/logo.svg" 
                alt="Cloud Seven Realty" 
                width={160} 
                height={54} 
                priority 
                className="transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </Link>

          {/* Right: Contact CTA */}
          <Link 
            href="/contact" 
            className="btn btn-primary text-sm font-semibold shadow-md hover:shadow-luxury transition-all duration-300"
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* Slide-out Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-luxury-navy/60 backdrop-blur-md z-[60]"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Slide-out Panel */}
            <motion.div
              id="slide-out-menu"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="fixed left-0 top-0 h-full w-full sm:w-[420px] bg-gradient-to-br from-white to-luxury-50 z-[70] shadow-2xl overflow-y-auto"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              <div className="p-8">
                {/* Logo in menu */}
                <div className="mb-8 flex items-center justify-between">
                  <Image 
                    src="/logo.svg" 
                    alt="Cloud Seven Realty" 
                    width={140} 
                    height={47} 
                  />
                  {/* Close button */}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2.5 rounded-lg text-luxury-navy hover:text-luxury-gold hover:bg-luxury-gold/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                    aria-label="Close menu"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="space-y-1">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className="block px-5 py-4 text-xl font-semibold text-luxury-navy hover:text-luxury-gold hover:bg-luxury-gold/5 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-luxury-gold border border-transparent hover:border-luxury-gold/20"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Additional Info */}
                <div className="mt-12 p-6 bg-gradient-to-br from-luxury-gold/10 to-luxury-gold/5 rounded-xl border border-luxury-gold/20">
                  <p className="text-sm font-medium text-luxury-navy mb-2">Need assistance?</p>
                  <p className="text-xs text-neutral-600 mb-4">Our team is ready to help you find your dream property</p>
                  <Link
                    href="/contact"
                    className="block text-center py-3 bg-luxury-gold text-white rounded-lg font-semibold hover:bg-luxury-darkGold transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Get in Touch
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
