"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";

const testimonials = [
  {
    id: 1,
    quote: "Cloud Seven helped us find the perfect investment property. Their team's expertise and guidance made the entire process smooth and hassle-free.",
    name: "Rajesh Kumar",
    role: "Real Estate Investor",
  },
  {
    id: 2,
    quote: "Outstanding service and attention to detail. They understood our requirements and delivered beyond expectations. Highly recommend!",
    name: "Priya Sharma",
    role: "Property Owner",
  },
  {
    id: 3,
    quote: "From initial consultation to final handover, the Cloud Seven team was professional and transparent. Great experience overall!",
    name: "Amit Patel",
    role: "First-time Buyer",
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-20 sm:py-32 bg-neutral-900 text-white overflow-hidden">
      {/* Background Image - Replace with /public/Reviews.JPG when available */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920')" }}
      />
      
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/80 via-neutral-900/90 to-neutral-900/80" />

      <div className="relative z-10 container-custom">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <h2 className="text-sm sm:text-base font-semibold tracking-[0.2em] uppercase mb-4 text-[#facc15]">
            CLIENTS' SUCCESS STORIES
          </h2>
          <p className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold">
            What Our Clients Say
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={fadeUp}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:bg-white/10 transition-colors duration-300"
            >
              <svg
                className="w-10 h-10 mb-6 text-[#facc15] opacity-50"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              
              <p className="text-lg mb-6 text-neutral-200 leading-relaxed">
                "{testimonial.quote}"
              </p>
              
              <div className="border-t border-white/20 pt-6">
                <p className="font-semibold text-[#facc15] mb-1">
                  {testimonial.name}
                </p>
                <p className="text-sm text-neutral-400">
                  {testimonial.role}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
