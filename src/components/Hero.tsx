"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Hero() {
  return (
    <section className="relative min-h-[75vh] flex items-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-red-50 via-40% to-blue-50 animate-gradient" />

      {/* Decorative gradient orbs */}
      <div className="absolute top-10 right-[20%] w-[500px] h-[500px] bg-gradient-to-br from-red-400/15 to-orange-300/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-10 left-[10%] w-[400px] h-[400px] bg-gradient-to-tr from-blue-600/10 to-indigo-400/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 right-[5%] w-[300px] h-[300px] bg-gradient-to-bl from-red-500/8 to-pink-400/5 rounded-full blur-2xl animate-float-slow" />

      {/* Globe image */}
      <div className="absolute right-[-5%] top-1/2 -translate-y-1/2 w-[600px] h-[600px] lg:w-[700px] lg:h-[700px] opacity-[0.15]">
        <Image src="/images/globe-network.jpg" alt="" fill className="object-contain" priority />
      </div>

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

      <div className="relative max-w-7xl mx-auto px-4 py-14 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-5 py-2.5 rounded-full text-sm font-semibold text-blue-900 shadow-lg shadow-blue-900/5 border border-blue-100/50">
              <Sparkles size={16} className="text-red-500" />
              Cabinet d&apos;immigration agree
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </span>
          </motion.div>

          {/* Main heading with gradient text */}
          <motion.h1
            variants={itemVariants}
            className="mt-8 text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight"
          >
            <span className="text-gray-900">Votre destination de</span>{" "}
            <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
              reve
            </span>{" "}
            <br className="hidden sm:block" />
            <span className="text-gray-900">commence</span>{" "}
            <span className="bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent">
              ici
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl"
          >
            JT TRADE AND SERVICES vous accompagne dans toutes vos demarches
            d&apos;immigration vers le{" "}
            <strong className="text-red-600">Canada</strong>, l&apos;
            <strong className="text-blue-800">Allemagne</strong>, la{" "}
            <strong className="text-blue-800">France</strong>, la{" "}
            <strong className="text-blue-800">Belgique</strong> et bien plus
            encore.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/simulateur"
              className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-red-600/25 hover:shadow-2xl hover:shadow-red-600/30 transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02]"
            >
              Simuler votre score
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 bg-white/80 backdrop-blur-sm text-blue-900 px-8 py-4 rounded-full font-bold text-lg border-2 border-blue-900/20 hover:border-blue-900 hover:bg-blue-900 hover:text-white transition-all duration-500 hover:-translate-y-1"
            >
              Nos services
            </Link>
          </motion.div>

          {/* Stats with animated counters */}
          <motion.div
            variants={itemVariants}
            className="mt-16 grid grid-cols-3 gap-8 max-w-lg"
          >
            {[
              { number: "500+", label: "Clients satisfaits" },
              { number: "5+", label: "Pays couverts" },
              { number: "98%", label: "Taux de reussite" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 + i * 0.15, type: "spring", stiffness: 100 }}
              >
                <p className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                  {stat.number}
                </p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Country flags dispersed around the globe */}
      {[
        { flag: "\u{1F1E8}\u{1F1E6}", name: "Canada", top: "12%", right: "12%", duration: 3 },
        { flag: "\u{1F1E9}\u{1F1EA}", name: "Allemagne", top: "30%", right: "1%", duration: 3.5 },
        { flag: "\u{1F1EB}\u{1F1F7}", name: "France", top: "52%", right: "14%", duration: 4 },
        { flag: "\u{1F1E7}\u{1F1EA}", name: "Belgique", top: "72%", right: "3%", duration: 3.2 },
        { flag: "\u{1F1EA}\u{1F1FA}", name: "Europe", top: "45%", right: "22%", duration: 3.8 },
      ].map((d, i) => (
        <motion.div
          key={d.name}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 + i * 0.2, type: "spring", stiffness: 150 }}
          className="absolute hidden lg:flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-2 rounded-xl shadow-xl border border-gray-100/50 cursor-default z-20"
          style={{ top: d.top, right: d.right }}
        >
          <motion.div
            animate={{ y: [-5, 5, -5], x: [-2, 2, -2] }}
            transition={{ duration: d.duration, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center gap-2"
          >
            <span className="text-2xl">{d.flag}</span>
            <span className="text-xs font-semibold text-gray-700">{d.name}</span>
          </motion.div>
        </motion.div>
      ))}

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-xs text-gray-400 uppercase tracking-widest">Decouvrir</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 border-2 border-gray-300 rounded-full flex justify-center pt-1"
        >
          <div className="w-1 h-2 bg-gray-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
