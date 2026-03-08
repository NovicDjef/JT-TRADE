"use client";

import { motion } from "framer-motion";
import { Shield, Users, Clock, Award, Headphones, FileCheck } from "lucide-react";

const reasons = [
  { icon: Shield, title: "Cabinet agree", description: "Entreprise legalement enregistree et reconnue (JTTS SARL)" },
  { icon: Users, title: "Accompagnement personnalise", description: "Un suivi individuel de A a Z pour chaque client" },
  { icon: Clock, title: "Rapidite", description: "Traitement efficace de vos dossiers dans les meilleurs delais" },
  { icon: Award, title: "Expertise", description: "Des annees d'experience en immigration Canada et Europe" },
  { icon: Headphones, title: "Disponibilite", description: "Une equipe a votre ecoute pour repondre a toutes vos questions" },
  { icon: FileCheck, title: "Taux de reussite eleve", description: "La majorite de nos clients obtiennent leur visa avec succes" },
];

export default function WhyUs() {
  return (
    <section className="py-24 bg-gradient-to-br from-red-50 via-white to-red-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-red-100/40 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-blue-100/30 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">Pourquoi nous choisir</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900">Le meilleur choix pour votre destination de reve</h2>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="flex gap-4 p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-lg border border-gray-100/50 transition-shadow duration-300 group"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-red-50 to-red-100 rounded-xl flex items-center justify-center group-hover:from-red-100 group-hover:to-red-200 transition-all duration-300">
                <reason.icon className="text-red-600 group-hover:scale-110 transition-transform duration-300" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{reason.title}</h3>
                <p className="mt-1 text-gray-600 text-sm">{reason.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
