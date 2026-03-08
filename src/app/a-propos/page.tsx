"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Shield,
  Users,
  Target,
  Heart,
  ArrowRight,
  Award,
  Globe,
} from "lucide-react";

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-red-blue py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-extrabold text-white"
          >
            A Propos de Nous
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-white/80 text-lg max-w-2xl mx-auto"
          >
            Decouvrez JT TRADE AND SERVICES, votre partenaire de confiance pour
            l&apos;immigration
          </motion.p>
        </div>
      </section>

      {/* About section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/enseigne.jpeg"
                    alt="JT Trade and Services - Bureau"
                    width={600}
                    height={450}
                    className="object-cover w-full"
                  />
                </div>
                {/* Floating card */}
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl">
                  <div className="text-center">
                    <p className="text-3xl font-extrabold text-primary-500">JTTS</p>
                    <p className="text-sm text-gray-600 font-medium">SARL</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Immatricule a Douala
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">
                Qui sommes-nous
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900">
                JT TRADE AND SERVICES
              </h2>
              <p className="mt-6 text-gray-600 leading-relaxed text-lg">
                Nous sommes une agence specialisee dans l&apos;accompagnement
                personnalise pour toutes vos demarches d&apos;immigration. Que vous
                soyez a la recherche de nouvelles opportunites professionnelles,
                d&apos;une vie meilleure, ou poursuivre vos etudes au Canada ou en
                Allemagne, nous sommes le meilleur choix pour votre destination de
                reve.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Base a Douala, au Cameroun, notre cabinet d&apos;immigration est
                legalement enregistre sous le sigle JTTS SARL (NIU:
                M042517725853R). Nous mettons notre expertise et notre reseau au
                service de nos clients pour leur offrir les meilleures chances de
                succes.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { icon: Award, label: "Cabinet agree" },
                  { icon: Globe, label: "5+ pays couverts" },
                  { icon: Users, label: "500+ clients" },
                  { icon: Shield, label: "98% de reussite" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 p-3 bg-cream rounded-lg"
                  >
                    <item.icon className="text-primary-500" size={20} />
                    <span className="text-sm font-medium text-gray-700">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              Notre Mission & Nos Valeurs
            </h2>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Notre Mission",
                description:
                  "Accompagner chaque client dans la realisation de son projet d'immigration avec professionnalisme, transparence et efficacite. Nous croyons que chacun merite une chance de construire une meilleure vie.",
              },
              {
                icon: Heart,
                title: "Nos Valeurs",
                description:
                  "Integrite, professionnalisme, et engagement envers nos clients. Nous traitons chaque dossier avec le meme soin et la meme attention, car votre succes est notre fierte.",
              },
              {
                icon: Shield,
                title: "Notre Engagement",
                description:
                  "Un accompagnement transparent et honnete. Nous vous informons clairement des chances de succes, des couts et des delais. Pas de fausses promesses, juste du travail et des resultats.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="bg-white p-8 rounded-2xl shadow-sm text-center"
              >
                <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto">
                  <item.icon className="text-primary-500" size={32} />
                </div>
                <h3 className="mt-6 text-xl font-bold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Pret a commencer votre aventure ?
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            Contactez-nous des maintenant pour une consultation gratuite
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 bg-primary-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-primary-600 transition-all duration-300 shadow-lg hover:-translate-y-1"
          >
            Contactez-nous
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </>
  );
}
