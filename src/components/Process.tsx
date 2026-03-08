"use client";

import { motion } from "framer-motion";
import { MessageSquare, FileSearch, FileCheck, Plane } from "lucide-react";

const steps = [
  { icon: MessageSquare, step: "01", title: "Consultation", description: "Prenez rendez-vous pour une consultation gratuite. Nous evaluons votre profil et vos objectifs." },
  { icon: FileSearch, step: "02", title: "Etude du dossier", description: "Notre equipe analyse votre situation et identifie les meilleures options pour vous." },
  { icon: FileCheck, step: "03", title: "Constitution du dossier", description: "Nous preparons et soumettons votre dossier complet avec tous les documents requis." },
  { icon: Plane, step: "04", title: "Obtention du visa", description: "Vous recevez votre visa et nous vous accompagnons jusqu'a votre depart." },
];

export default function Process() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.5 }} className="text-center max-w-2xl mx-auto">
          <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">Comment ca marche</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900">Un processus simple en 4 etapes</h2>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-red-600 to-blue-900" />
          {steps.map((step, index) => (
            <motion.div key={step.step} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.5, delay: index * 0.15 }} className="text-center relative">
              <div className="relative inline-flex">
                <div className="w-20 h-20 bg-white border-2 border-red-600 rounded-full flex items-center justify-center shadow-lg relative z-10">
                  <step.icon className="text-red-600" size={32} />
                </div>
                <span className="absolute -top-2 -right-2 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold z-20">{step.step}</span>
              </div>
              <h3 className="mt-6 text-lg font-bold text-gray-900">{step.title}</h3>
              <p className="mt-2 text-gray-600 text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
