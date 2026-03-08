"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  GraduationCap,
  Home,
  Plane,
  BookOpen,
  Globe,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Residence Permanente",
    description:
      "Obtenez votre residence permanente au Canada. Nous vous accompagnons de A a Z dans toutes les demarches pour immigrer avec ou sans votre famille.",
    lightColor: "bg-primary-50",
    textColor: "text-primary-500",
    countries: ["Canada"],
    href: "/services#residence-permanente",
  },
  {
    icon: GraduationCap,
    title: "Visa Etudiant",
    description:
      "Poursuivez vos etudes au Canada, en Allemagne, en France ou en Belgique. Nous vous aidons a trouver le programme ideal et a obtenir votre visa.",
    lightColor: "bg-secondary-50",
    textColor: "text-secondary-500",
    countries: ["Canada", "Allemagne", "France", "Belgique"],
    href: "/services#visa-etudiant",
  },
  {
    icon: Plane,
    title: "Visa Tourisme",
    description:
      "Voyagez sans stress. Nous preparons votre dossier de visa touristique pour le Canada et les pays europeens.",
    lightColor: "bg-primary-50",
    textColor: "text-primary-500",
    countries: ["Canada", "Europe"],
    href: "/services#visa-tourisme",
  },
  {
    icon: BookOpen,
    title: "Cours TCF / TEF",
    description:
      "Preparez-vous aux tests de francais TCF Canada et TEF avec nos cours preparatoires tous niveaux. Maximisez votre score pour votre dossier d'immigration.",
    lightColor: "bg-secondary-50",
    textColor: "text-secondary-500",
    countries: ["Tous niveaux"],
    href: "/services#cours-tcf-tef",
  },
  {
    icon: Globe,
    title: "Etudes en Allemagne",
    description:
      "Profitez des programmes de formation en Allemagne : assistant medical, electricien, mecanicien automobile, aide-soignant. Aide financiere incluse.",
    lightColor: "bg-primary-50",
    textColor: "text-primary-500",
    countries: ["Allemagne"],
    href: "/services#etudes-allemagne",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">
            Ce que nous offrons
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900">
            Nos Services
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            Un accompagnement complet et personnalise pour toutes vos demarches
            d&apos;immigration et de voyage
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={service.href}
                className="block h-full p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              >
                {/* Icon */}
                <div
                  className={`w-14 h-14 ${service.lightColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <service.icon className={service.textColor} size={28} />
                </div>

                {/* Content */}
                <h3 className="mt-6 text-xl font-bold text-gray-900 group-hover:text-primary-500 transition-colors">
                  {service.title}
                </h3>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  {service.description}
                </p>

                {/* Countries tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {service.countries.map((country) => (
                    <span
                      key={country}
                      className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium"
                    >
                      {country}
                    </span>
                  ))}
                </div>

                {/* Arrow */}
                <div className="mt-6 flex items-center gap-2 text-primary-500 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  En savoir plus <ArrowRight size={16} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
