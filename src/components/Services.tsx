"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { GraduationCap, Home, Plane, BookOpen, Globe, ArrowRight } from "lucide-react";

const services = [
  { icon: Home, title: "Residence Permanente", description: "Obtenez votre residence permanente au Canada. Nous vous accompagnons de A a Z dans toutes les demarches pour immigrer avec ou sans votre famille.", countries: ["Canada"], href: "/services#residence-permanente", red: true },
  { icon: GraduationCap, title: "Visa Etudiant", description: "Poursuivez vos etudes au Canada, en Allemagne, en France ou en Belgique. Nous vous aidons a trouver le programme ideal et a obtenir votre visa.", countries: ["Canada", "Allemagne", "France", "Belgique"], href: "/services#visa-etudiant", red: false },
  { icon: Plane, title: "Visa Tourisme", description: "Voyagez sans stress. Nous preparons votre dossier de visa touristique pour le Canada et les pays europeens.", countries: ["Canada", "Europe"], href: "/services#visa-tourisme", red: true },
  { icon: BookOpen, title: "Cours TCF / TEF", description: "Preparez-vous aux tests de francais TCF Canada et TEF avec nos cours preparatoires tous niveaux. Maximisez votre score.", countries: ["Tous niveaux"], href: "/services#cours-tcf-tef", red: false },
  { icon: Globe, title: "Etudes en Allemagne", description: "Profitez des programmes de formation en Allemagne : assistant medical, electricien, mecanicien automobile, aide-soignant. Aide financiere incluse.", countries: ["Allemagne"], href: "/services#etudes-allemagne", red: true },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: i * 0.12,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export default function Services() {
  return (
    <section id="services" className="py-24 bg-white relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-red-400 to-blue-900 opacity-20" />

      {/* Geographic traces */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,30% Q25%,25% 50%,35% T100%,28%" fill="none" stroke="rgba(220,38,38,0.04)" strokeWidth="1" className="geo-line-slow" />
        <path d="M0,70% Q35%,65% 65%,75% T100%,68%" fill="none" stroke="rgba(30,58,138,0.03)" strokeWidth="1" className="geo-line-reverse" />
        <circle cx="20%" cy="25%" r="2" fill="rgba(220,38,38,0.08)" />
        <circle cx="80%" cy="70%" r="2" fill="rgba(30,58,138,0.08)" />
      </svg>

      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">Ce que nous offrons</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900">Nos Services</h2>
          <p className="mt-4 text-gray-600 text-lg">Un accompagnement complet et personnalise pour toutes vos demarches d&apos;immigration et de voyage</p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <Link
                href={service.href}
                className="block h-full p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 group relative overflow-hidden"
              >
                {/* Hover gradient overlay */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${service.red ? "bg-gradient-to-br from-red-50/50 to-transparent" : "bg-gradient-to-br from-blue-50/50 to-transparent"}`} />

                <div className="relative">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ${service.red ? "bg-red-50 group-hover:bg-red-100" : "bg-blue-50 group-hover:bg-blue-100"}`}>
                    <service.icon className={`${service.red ? "text-red-600" : "text-blue-900"} transition-transform duration-300`} size={28} />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300">{service.title}</h3>
                  <p className="mt-3 text-gray-600 leading-relaxed">{service.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {service.countries.map((country) => (
                      <span key={country} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium group-hover:bg-red-50 group-hover:text-red-600 transition-colors duration-300">{country}</span>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-red-600 font-semibold text-sm translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    En savoir plus <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
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
