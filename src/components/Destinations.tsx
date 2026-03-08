"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const destinations = [
  { country: "Canada", flag: "\u{1F1E8}\u{1F1E6}", image: "/images/residence-permanente.jpeg", services: ["Residence permanente", "Visa etudiant", "Visa tourisme"], description: "Immigrez au Canada en tant que resident permanent ou etudiant" },
  { country: "Allemagne", flag: "\u{1F1E9}\u{1F1EA}", image: "/images/etudier-allemagne.jpeg", services: ["Formation professionnelle", "Visa etudiant", "Aide financiere"], description: "Programmes de formation avec aide financiere du gouvernement" },
  { country: "France", flag: "\u{1F1EB}\u{1F1F7}", image: "/images/cours-tcf-tef.jpeg", services: ["Visa etudiant", "Visa tourisme"], description: "Poursuivez vos etudes ou voyagez en France" },
  { country: "Belgique", flag: "\u{1F1E7}\u{1F1EA}", image: "/images/nos-services.jpeg", services: ["Visa etudiant", "Visa tourisme"], description: "Etudes et tourisme en Belgique" },
];

export default function Destinations() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">Ou souhaitez-vous aller ?</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900">Nos Destinations</h2>
          <p className="mt-4 text-gray-600 text-lg">Decouvrez les pays vers lesquels nous pouvons vous accompagner</p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest, index) => (
            <motion.div
              key={dest.country}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              whileHover={{ y: -8 }}
            >
              <Link href="/contact" className="group block overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-2xl transition-shadow duration-500">
                <div className="relative h-52 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${dest.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-45">
                    <ArrowUpRight size={18} className="text-white" />
                  </div>
                  <div className="absolute bottom-4 left-4 flex items-center gap-3">
                    <span className="text-4xl drop-shadow-lg">{dest.flag}</span>
                    <h3 className="text-white text-xl font-bold drop-shadow-lg">{dest.country}</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 text-sm">{dest.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {dest.services.map((s) => (
                      <span key={s} className="px-2.5 py-1 bg-red-50 text-red-600 text-xs rounded-full font-medium">{s}</span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
