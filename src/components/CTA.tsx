"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-red-blue" />
      <div className="absolute inset-0 bg-[url('/images/enseigne.jpeg')] bg-cover bg-center opacity-10" />

      {/* Decorative */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2" />

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            N&apos;hesitez plus, passez a l&apos;action et changez le cours de
            votre vie !
          </h2>
          <p className="mt-6 text-white/80 text-lg max-w-2xl mx-auto">
            Que vous ayez un diplome post-secondaire (BTS, Licence, Master,
            Doctorat), nous vous orientons et vous accompagnons dans ce
            processus de A a Z.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary-500 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg"
            >
              Consultation gratuite
              <ArrowRight size={20} />
            </Link>
            <a
              href="tel:+237693761778"
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all duration-300"
            >
              <Phone size={20} />
              Appelez-nous
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
