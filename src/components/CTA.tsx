"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-blue-900">
      {/* Animated decorative orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse-glow" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2 animate-pulse-glow" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-white/3 rounded-full animate-float-slow" />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            N&apos;hesitez plus, passez a l&apos;action et changez le cours de votre vie !
          </h2>
          <p className="mt-6 text-white/80 text-lg max-w-2xl mx-auto">
            Que vous ayez un diplome post-secondaire (BTS, Licence, Master, Doctorat), nous vous orientons et vous accompagnons dans ce processus de A a Z.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-500 shadow-xl shadow-black/10 hover:-translate-y-1 hover:scale-[1.02]"
            >
              Consultation gratuite
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <a
              href="tel:+237693761778"
              className="group inline-flex items-center justify-center gap-2 border-2 border-white/50 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 hover:border-white transition-all duration-500 hover:-translate-y-1"
            >
              <Phone size={20} className="group-hover:rotate-12 transition-transform duration-300" />
              Appelez-nous
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
