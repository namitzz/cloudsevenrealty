"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";

export default function TrustStrip() {
  const facts = [
    {
      icon: "✓",
      title: "Verified Titles",
      description: "All properties legally verified",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: "👥",
      title: "On-Ground Team",
      description: "Local support for site visits",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: "💬",
      title: "WhatsApp in Minutes",
      description: "Quick response guaranteed",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: "🏆",
      title: "Trusted Partner",
      description: "100+ successful deals",
      color: "from-luxury-gold to-luxury-darkGold"
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-white via-luxury-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-luxury-gold/5 rounded-full blur-3xl -translate-y-1/2"></div>
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-luxury-gold/5 rounded-full blur-3xl -translate-y-1/2"></div>
      
      <div className="container-custom relative z-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10"
        >
          {facts.map((fact, index) => (
            <motion.div 
              key={index} 
              variants={fadeUp}
              className="group relative text-center p-8 rounded-2xl bg-white shadow-md hover:shadow-luxury transition-all duration-500 hover:scale-105 border border-luxury-gold/10 hover:border-luxury-gold/30"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${fact.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`}></div>
              
              <div className="relative z-10">
                {/* Icon container with gradient */}
                <div className={`inline-flex items-center justify-center w-20 h-20 mb-5 rounded-full bg-gradient-to-br ${fact.color} shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-4xl">{fact.icon}</span>
                </div>
                
                <h3 className="font-bold text-xl mb-2 text-luxury-navy group-hover:text-luxury-gold transition-colors duration-300">
                  {fact.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {fact.description}
                </p>
              </div>

              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className={`absolute top-3 right-3 w-2 h-2 rounded-full bg-gradient-to-br ${fact.color}`}></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
