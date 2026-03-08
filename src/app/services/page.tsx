"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Home,
  GraduationCap,
  Plane,
  BookOpen,
  Globe,
  ArrowRight,
  Check,
} from "lucide-react";

const services = [
  {
    id: "residence-permanente",
    icon: Home,
    title: "Residence Permanente - Canada",
    subtitle: "Programme 2025-2026",
    image: "/images/residence-permanente.jpeg",
    description:
      "Vous avez un diplome post-secondaire (BTS, Licence, Master, Doctorat, etc.) et souhaitez immigrer au Canada avec ou sans votre famille en qualite de resident permanent ? C'est possible ! Nous vous orientons et vous accompagnons dans ce processus de A a Z.",
    features: [
      "Evaluation gratuite de votre profil",
      "Preparation complete du dossier",
      "Accompagnement pour l'entree express",
      "Suivi personnalise jusqu'a l'obtention",
      "Immigration familiale possible",
      "Conseils pour l'installation au Canada",
    ],
    color: "primary",
  },
  {
    id: "visa-etudiant",
    icon: GraduationCap,
    title: "Visa Etudiant",
    subtitle: "Canada, France, Belgique",
    image: "/images/nos-services.jpeg",
    description:
      "Poursuivez vos etudes a l'etranger avec notre accompagnement. Que ce soit au Canada, en France ou en Belgique, nous vous aidons a choisir le bon programme et a constituer un dossier solide pour maximiser vos chances d'obtenir votre visa etudiant.",
    features: [
      "Orientation scolaire et universitaire",
      "Recherche d'etablissements partenaires",
      "Constitution du dossier de visa",
      "Preparation a l'entretien consulaire",
      "Aide pour la recherche de logement",
      "Suivi post-visa",
    ],
    color: "secondary",
  },
  {
    id: "visa-tourisme",
    icon: Plane,
    title: "Visa Tourisme",
    subtitle: "Canada & Europe",
    image: "/images/enseigne.jpeg",
    description:
      "Voyagez sans tracas vers le Canada ou l'Europe. Notre equipe vous aide a preparer un dossier de visa touristique complet et convaincant pour que votre demande soit acceptee.",
    features: [
      "Preparation du dossier de visa",
      "Lettre d'invitation si necessaire",
      "Reservation d'hotel et billet d'avion",
      "Assurance voyage",
      "Conseils pour l'entretien",
      "Suivi de la demande",
    ],
    color: "primary",
  },
  {
    id: "cours-tcf-tef",
    icon: BookOpen,
    title: "Cours Preparatoire TCF / TEF",
    subtitle: "Tous niveaux",
    image: "/images/cours-tcf-tef.jpeg",
    description:
      "Preparez-vous efficacement aux tests de competence en francais (TCF Canada et TEF). Nos cours couvrent tous les niveaux et vous donnent les outils pour obtenir le meilleur score possible, essentiel pour votre dossier d'immigration.",
    features: [
      "TCF Canada",
      "TEF (Test d'Evaluation de Francais)",
      "Cours pour tous les niveaux",
      "Exercices pratiques et simulations",
      "Professeurs experimentes",
      "Horaires flexibles",
    ],
    color: "secondary",
  },
  {
    id: "etudes-allemagne",
    icon: Globe,
    title: "Etudier en Allemagne",
    subtitle: "Programme de formation 2025-2026",
    image: "/images/etudier-allemagne.jpeg",
    description:
      "Realisez vos reves avec les programmes de formation en Allemagne. Profitez de la reconnaissance mondiale des diplomes, d'une excellente qualite de vie, d'opportunites de travail apres les etudes, et d'une aide financiere versee tous les mois par le gouvernement.",
    features: [
      "Assistant medical (Medizinische/r Fachangestellte/r)",
      "Electricien (Elektroniker/in)",
      "Mecanicien automobile (Kraftfahrzeugmechatroniker/in)",
      "Aide-soignant (Pflegefachmann/-frau)",
      "Aide financiere mensuelle du gouvernement",
      "Environnement multiculturel et convivial",
    ],
    color: "primary",
  },
];

export default function ServicesPage() {
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
            Nos Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-white/80 text-lg max-w-2xl mx-auto"
          >
            Un accompagnement complet et personnalise pour realiser votre
            projet d&apos;immigration
          </motion.p>
        </div>
      </section>

      {/* Services detail */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 space-y-24">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              id={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <div
                className={`${index % 2 === 1 ? "lg:order-2" : ""}`}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-white font-semibold text-sm ${
                        service.color === "primary"
                          ? "bg-primary-500"
                          : "bg-secondary-500"
                      }`}
                    >
                      <service.icon size={18} />
                      {service.subtitle}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                <h2 className="text-3xl font-extrabold text-gray-900">
                  {service.title}
                </h2>
                <p className="mt-4 text-gray-600 leading-relaxed text-lg">
                  {service.description}
                </p>

                <div className="mt-8 space-y-3">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <div
                        className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${
                          service.color === "primary"
                            ? "bg-primary-100 text-primary-500"
                            : "bg-secondary-100 text-secondary-500"
                        }`}
                      >
                        <Check size={14} />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/contact"
                  className={`mt-8 inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                    service.color === "primary"
                      ? "bg-primary-500 hover:bg-primary-600"
                      : "bg-secondary-500 hover:bg-secondary-600"
                  }`}
                >
                  Demander un devis
                  <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
