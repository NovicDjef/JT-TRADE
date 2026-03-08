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
    <section className="py-24 bg-red-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.5 }} className="text-center max-w-2xl mx-auto">
          <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">Pourquoi nous choisir</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900">Le meilleur choix pour votre destination de reve</h2>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div key={reason.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.5, delay: index * 0.1 }} className="flex gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex-shrink-0 w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                <reason.icon className="text-red-600" size={24} />
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
