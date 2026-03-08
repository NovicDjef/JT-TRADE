"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Home, GraduationCap, Plane, BookOpen, Globe, ArrowRight, Check } from "lucide-react";

const services = [
  { id: "residence-permanente", icon: Home, title: "Residence Permanente - Canada", subtitle: "Programme 2025-2026", image: "/images/residence-permanente.jpeg", description: "Vous avez un diplome post-secondaire (BTS, Licence, Master, Doctorat, etc.) et souhaitez immigrer au Canada avec ou sans votre famille en qualite de resident permanent ? C'est possible ! Nous vous orientons et vous accompagnons dans ce processus de A a Z.", features: ["Evaluation gratuite de votre profil", "Preparation complete du dossier", "Accompagnement pour l'entree express", "Suivi personnalise jusqu'a l'obtention", "Immigration familiale possible", "Conseils pour l'installation au Canada"], red: true },
  { id: "visa-etudiant", icon: GraduationCap, title: "Visa Etudiant", subtitle: "Canada, France, Belgique", image: "/images/nos-services.jpeg", description: "Poursuivez vos etudes a l'etranger avec notre accompagnement. Que ce soit au Canada, en France ou en Belgique, nous vous aidons a choisir le bon programme et a constituer un dossier solide.", features: ["Orientation scolaire et universitaire", "Recherche d'etablissements partenaires", "Constitution du dossier de visa", "Preparation a l'entretien consulaire", "Aide pour la recherche de logement", "Suivi post-visa"], red: false },
  { id: "visa-tourisme", icon: Plane, title: "Visa Tourisme", subtitle: "Canada & Europe", image: "/images/enseigne.jpeg", description: "Voyagez sans tracas vers le Canada ou l'Europe. Notre equipe vous aide a preparer un dossier de visa touristique complet et convaincant.", features: ["Preparation du dossier de visa", "Lettre d'invitation si necessaire", "Reservation d'hotel et billet d'avion", "Assurance voyage", "Conseils pour l'entretien", "Suivi de la demande"], red: true },
  { id: "cours-tcf-tef", icon: BookOpen, title: "Cours Preparatoire TCF / TEF", subtitle: "Tous niveaux", image: "/images/cours-tcf-tef.jpeg", description: "Preparez-vous efficacement aux tests de competence en francais (TCF Canada et TEF). Nos cours couvrent tous les niveaux.", features: ["TCF Canada", "TEF (Test d'Evaluation de Francais)", "Cours pour tous les niveaux", "Exercices pratiques et simulations", "Professeurs experimentes", "Horaires flexibles"], red: false },
  { id: "etudes-allemagne", icon: Globe, title: "Etudier en Allemagne", subtitle: "Programme de formation 2025-2026", image: "/images/etudier-allemagne.jpeg", description: "Realisez vos reves avec les programmes de formation en Allemagne. Profitez de la reconnaissance mondiale des diplomes et d'une aide financiere mensuelle.", features: ["Assistant medical (Medizinische/r Fachangestellte/r)", "Electricien (Elektroniker/in)", "Mecanicien automobile (Kraftfahrzeugmechatroniker/in)", "Aide-soignant (Pflegefachmann/-frau)", "Aide financiere mensuelle du gouvernement", "Environnement multiculturel et convivial"], red: true },
];

export default function ServicesPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-red-600 to-blue-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />

        {/* SVG decorative drawings */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          {/* Globe outline */}
          <circle cx="85%" cy="50%" r="120" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
          <ellipse cx="85%" cy="50%" rx="120" ry="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          <ellipse cx="85%" cy="50%" rx="50" ry="120" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          <line x1="85%" y1="calc(50% - 120px)" x2="85%" y2="calc(50% + 120px)" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />

          {/* Flight path curves */}
          <path d="M5%,70% Q25%,20% 50%,40% T95%,25%" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" strokeLinecap="round" className="flight-path" />
          <path d="M0,40% Q30%,55% 60%,35% T100%,50%" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" className="geo-line" />

          {/* Waypoints */}
          <circle cx="5%" cy="70%" r="3" fill="rgba(255,255,255,0.15)" />
          <circle cx="95%" cy="25%" r="3" fill="rgba(255,255,255,0.15)" />
          <circle cx="50%" cy="40%" r="2" fill="rgba(255,255,255,0.1)" />

          {/* Compass rose at bottom-left */}
          <g transform="translate(80, 140)" opacity="0.07">
            <circle cx="0" cy="0" r="30" fill="none" stroke="white" strokeWidth="1" />
            <line x1="0" y1="-35" x2="0" y2="35" stroke="white" strokeWidth="1" />
            <line x1="-35" y1="0" x2="35" y2="0" stroke="white" strokeWidth="1" />
            <polygon points="0,-28 4,-8 -4,-8" fill="white" />
          </g>

          {/* Dotted latitude line */}
          <path d="M0,80% Q50%,75% 100%,82%" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="6 8" className="geo-line-reverse" />
        </svg>

        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl font-extrabold text-white">Nos Services</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-4 text-white/80 text-lg max-w-2xl mx-auto">
            Un accompagnement complet et personnalise pour realiser votre projet d&apos;immigration
          </motion.p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 space-y-24">
          {services.map((service, index) => (
            <motion.div key={service.id} id={service.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.5 }} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                  <Image src={service.image} alt={service.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-white font-semibold text-sm ${service.red ? "bg-red-600" : "bg-blue-900"}`}>
                      <service.icon size={18} /> {service.subtitle}
                    </span>
                  </div>
                </div>
              </div>
              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <h2 className="text-3xl font-extrabold text-gray-900">{service.title}</h2>
                <p className="mt-4 text-gray-600 leading-relaxed text-lg">{service.description}</p>
                <div className="mt-8 space-y-3">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${service.red ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-900"}`}>
                        <Check size={14} />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                <Link href="/contact" className={`mt-8 inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${service.red ? "bg-red-600 hover:bg-red-700" : "bg-blue-900 hover:bg-blue-800"}`}>
                  Demander un devis <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
