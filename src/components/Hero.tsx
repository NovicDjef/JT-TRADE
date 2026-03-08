"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white">
      <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[700px] h-[700px] lg:w-[800px] lg:h-[800px] opacity-15">
        <Image src="/images/globe-network.jpg" alt="" fill className="object-contain" priority />
      </div>

      <div className="absolute top-20 right-10 w-72 h-72 bg-red-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-blue-900/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 py-20 w-full">
        <div className="max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-sm font-medium text-blue-900 shadow-md border border-blue-100">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Cabinet d&apos;immigration agree
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-8 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
            Votre destination de{" "}
            <span className="text-red-600">reve</span>{" "}
            commence{" "}
            <span className="text-blue-900">ici</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl">
            JT TRADE AND SERVICES vous accompagne dans toutes vos demarches d&apos;immigration vers le{" "}
            <strong className="text-red-600">Canada</strong>, l&apos;<strong className="text-blue-900">Allemagne</strong>, la{" "}
            <strong className="text-blue-900">France</strong>, la{" "}
            <strong className="text-blue-900">Belgique</strong> et bien plus encore.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }} className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-red-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
              Commencer maintenant <ArrowRight size={20} />
            </Link>
            <Link href="/services" className="inline-flex items-center justify-center gap-2 bg-white text-blue-900 px-8 py-4 rounded-full font-bold text-lg border-2 border-blue-900 hover:bg-blue-900 hover:text-white transition-all duration-300">
              Nos services
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }} className="mt-16 grid grid-cols-3 gap-8 max-w-lg">
            {[
              { number: "500+", label: "Clients satisfaits" },
              { number: "5+", label: "Pays couverts" },
              { number: "98%", label: "Taux de reussite" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-extrabold text-red-600">{stat.number}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 hidden lg:flex items-center gap-3">
        {[
          { flag: "\u{1F1E8}\u{1F1E6}", name: "Canada" },
          { flag: "\u{1F1E9}\u{1F1EA}", name: "Allemagne" },
          { flag: "\u{1F1EB}\u{1F1F7}", name: "France" },
          { flag: "\u{1F1E7}\u{1F1EA}", name: "Belgique" },
        ].map((d) => (
          <div key={d.name} className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-md">
            <span className="text-2xl">{d.flag}</span>
            <span className="text-sm font-medium text-gray-600">{d.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
