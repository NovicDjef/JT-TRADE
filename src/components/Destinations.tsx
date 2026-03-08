"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const destinations = [
  {
    country: "Canada",
    flag: "🇨🇦",
    image: "/images/residence-permanente.jpeg",
    services: ["Residence permanente", "Visa etudiant", "Visa tourisme"],
    description: "Immigrez au Canada en tant que resident permanent ou etudiant",
  },
  {
    country: "Allemagne",
    flag: "🇩🇪",
    image: "/images/etudier-allemagne.jpeg",
    services: ["Formation professionnelle", "Visa etudiant", "Aide financiere"],
    description: "Programmes de formation avec aide financiere du gouvernement",
  },
  {
    country: "France",
    flag: "🇫🇷",
    image: "/images/cours-tcf-tef.jpeg",
    services: ["Visa etudiant", "Visa tourisme"],
    description: "Poursuivez vos etudes ou voyagez en France",
  },
  {
    country: "Belgique",
    flag: "🇧🇪",
    image: "/images/nos-services.jpeg",
    services: ["Visa etudiant", "Visa tourisme"],
    description: "Etudes et tourisme en Belgique",
  },
];

export default function Destinations() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">
            Ou souhaitez-vous aller ?
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900">
            Nos Destinations
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            Decouvrez les pays vers lesquels nous pouvons vous accompagner
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest, index) => (
            <motion.div
              key={dest.country}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href="/contact"
                className="group block overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundImage: `url(${dest.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <span className="text-3xl">{dest.flag}</span>
                    <h3 className="text-white text-xl font-bold">{dest.country}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <p className="text-gray-600 text-sm">{dest.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {dest.services.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-1 bg-cream text-primary-500 text-xs rounded-md font-medium"
                      >
                        {s}
                      </span>
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
