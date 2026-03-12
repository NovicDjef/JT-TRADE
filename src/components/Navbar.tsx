"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone, Mail, MapPin } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/services", label: "Services" },
    { href: "/a-propos", label: "A Propos" },
    { href: "/simulateur", label: "Simulateur" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <div className="bg-blue-900 text-white text-sm py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="mailto:contact@jttradeservices.com" className="flex items-center gap-2 hover:text-red-300 transition">
              <Mail size={14} />
              contact@jttradeservices.com
            </a>
            <span className="flex items-center gap-2">
              <MapPin size={14} />
              Makepe Vallee Hopital General, Douala
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+237693761778" className="flex items-center gap-2 hover:text-red-300 transition">
              <Phone size={14} />
              +237 693 76 17 78
            </a>
            <a href="tel:+237686277680" className="flex items-center gap-2 hover:text-red-300 transition">
              <Phone size={14} />
              +237 686 27 76 80
            </a>
          </div>
        </div>
      </div>

      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/images/logo.png" alt="JT Trade and Services Logo" width={60} height={60} className="object-contain" />
              <div>
                <h1 className="text-lg font-bold text-blue-900 leading-tight">JT TRADE AND SERVICES</h1>
                <p className="text-xs text-red-600 font-semibold tracking-wider">CABINET D&apos;IMMIGRATION</p>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-gray-700 hover:text-red-600 font-medium transition-colors duration-200 relative group">
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
              <Link href="/contact" className="bg-red-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                Consultation Gratuite
              </Link>
            </div>

            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-gray-700">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="block py-2 text-gray-700 hover:text-red-600 font-medium">
                  {link.label}
                </Link>
              ))}
              <Link href="/contact" onClick={() => setIsOpen(false)} className="block text-center bg-red-600 text-white px-6 py-3 rounded-full font-semibold">
                Consultation Gratuite
              </Link>
              <div className="pt-3 border-t space-y-2 text-sm text-gray-600">
                <a href="tel:+237693761778" className="flex items-center gap-2"><Phone size={14} /> +237 693 76 17 78</a>
                <a href="mailto:contact@jttradeservices.com" className="flex items-center gap-2"><Mail size={14} /> contact@jttradeservices.com</a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
