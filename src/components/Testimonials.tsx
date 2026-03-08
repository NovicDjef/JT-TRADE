"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Marie T.",
    role: "Residence permanente - Canada",
    content:
      "Grace a JT TRADE AND SERVICES, j'ai obtenu ma residence permanente au Canada en un temps record. L'equipe est tres professionnelle et disponible.",
    rating: 5,
  },
  {
    name: "Patrick N.",
    role: "Etudiant - Allemagne",
    content:
      "Ils m'ont aide a integrer un programme de formation en Allemagne. Aujourd'hui je suis electricien et je recois une aide financiere mensuelle du gouvernement.",
    rating: 5,
  },
  {
    name: "Christelle M.",
    role: "Visa etudiant - France",
    content:
      "Un accompagnement exceptionnel du debut a la fin. Mon dossier de visa etudiant pour la France a ete accepte du premier coup !",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">
            Temoignages
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900">
            Ce que disent nos clients
          </h2>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative"
            >
              <Quote
                className="absolute top-6 right-6 text-primary-100"
                size={40}
              />
              <div className="flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="mt-4 text-gray-600 leading-relaxed italic">
                &quot;{testimonial.content}&quot;
              </p>
              <div className="mt-6 pt-4 border-t border-gray-100">
                <p className="font-bold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-primary-500">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
