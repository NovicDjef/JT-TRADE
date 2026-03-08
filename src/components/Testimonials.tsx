"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  { name: "Marie T.", role: "Residence permanente - Canada", content: "Grace a JT TRADE AND SERVICES, j'ai obtenu ma residence permanente au Canada en un temps record. L'equipe est tres professionnelle et disponible.", rating: 5 },
  { name: "Patrick N.", role: "Etudiant - Allemagne", content: "Ils m'ont aide a integrer un programme de formation en Allemagne. Aujourd'hui je suis electricien et je recois une aide financiere mensuelle du gouvernement.", rating: 5 },
  { name: "Christelle M.", role: "Visa etudiant - France", content: "Un accompagnement exceptionnel du debut a la fin. Mon dossier de visa etudiant pour la France a ete accepte du premier coup !", rating: 5 },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-50/30 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">Temoignages</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900">Ce que disent nos clients</h2>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 40, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 relative group border border-gray-100/50"
            >
              {/* Gradient top border on hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 to-blue-900 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <Quote className="absolute top-6 right-6 text-red-100 group-hover:text-red-200 transition-colors duration-500" size={40} />
              <div className="flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.15 + i * 0.05, type: "spring", stiffness: 200 }}
                  >
                    <Star size={18} className="fill-yellow-400 text-yellow-400" />
                  </motion.div>
                ))}
              </div>
              <p className="mt-4 text-gray-600 leading-relaxed italic">&quot;{testimonial.content}&quot;</p>
              <div className="mt-6 pt-4 border-t border-gray-100">
                <p className="font-bold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-red-600 font-medium">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
