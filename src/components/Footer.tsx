import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo.png"
                alt="JT Trade and Services Logo"
                width={50}
                height={50}
                className="object-contain"
              />
              <h3 className="text-xl font-bold">
                <span className="text-primary-500">JT</span> TRADE AND SERVICES
              </h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Cabinet d&apos;immigration specialise dans l&apos;accompagnement
              personnalise pour toutes vos demarches d&apos;immigration vers le
              Canada et l&apos;Europe.
            </p>
            <p className="mt-3 text-gray-500 text-xs">
              JTTS SARL - NIU: M042517725853R
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-4 text-lg">Services</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link
                  href="/services#residence-permanente"
                  className="hover:text-primary-400 transition"
                >
                  Residence Permanente
                </Link>
              </li>
              <li>
                <Link
                  href="/services#visa-etudiant"
                  className="hover:text-primary-400 transition"
                >
                  Visa Etudiant
                </Link>
              </li>
              <li>
                <Link
                  href="/services#visa-tourisme"
                  className="hover:text-primary-400 transition"
                >
                  Visa Tourisme
                </Link>
              </li>
              <li>
                <Link
                  href="/services#cours-tcf-tef"
                  className="hover:text-primary-400 transition"
                >
                  Cours TCF / TEF
                </Link>
              </li>
              <li>
                <Link
                  href="/services#etudes-allemagne"
                  className="hover:text-primary-400 transition"
                >
                  Etudes en Allemagne
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold mb-4 text-lg">Navigation</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/" className="hover:text-primary-400 transition">
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-primary-400 transition"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/a-propos"
                  className="hover:text-primary-400 transition"
                >
                  A Propos
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary-400 transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4 text-lg">Contact</h4>
            <div className="space-y-3 text-gray-400 text-sm">
              <a
                href="mailto:j2tandservices@gmail.com"
                className="flex items-center gap-3 hover:text-primary-400 transition"
              >
                <Mail size={16} className="flex-shrink-0" />
                j2tandservices@gmail.com
              </a>
              <a
                href="tel:+237693761778"
                className="flex items-center gap-3 hover:text-primary-400 transition"
              >
                <Phone size={16} className="flex-shrink-0" />
                +237 693 76 17 78
              </a>
              <a
                href="tel:+237686277680"
                className="flex items-center gap-3 hover:text-primary-400 transition"
              >
                <Phone size={16} className="flex-shrink-0" />
                +237 686 27 76 80
              </a>
              <p className="flex items-start gap-3">
                <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                Makepe Vallee Hopital General, Douala, Cameroun
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} JT TRADE AND SERVICES. Tous
            droits reserves.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-2xl">🇨🇦</span>
            <span className="text-2xl">🇩🇪</span>
            <span className="text-2xl">🇫🇷</span>
            <span className="text-2xl">🇧🇪</span>
            <span className="text-2xl">🇪🇺</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
