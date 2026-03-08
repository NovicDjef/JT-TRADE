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
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      {/* Top bar */}
      <div className="bg-secondary-500 text-white text-sm py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a
              href="mailto:j2tandservices@gmail.com"
              className="flex items-center gap-2 hover:text-primary-200 transition"
            >
              <Mail size={14} />
              j2tandservices@gmail.com
            </a>
            <span className="flex items-center gap-2">
              <MapPin size={14} />
              Makepe Vallee Hopital General, Douala
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="tel:+237693761778"
              className="flex items-center gap-2 hover:text-primary-200 transition"
            >
              <Phone size={14} />
              +237 693 76 17 78
            </a>
            <a
              href="tel:+237686277680"
              className="flex items-center gap-2 hover:text-primary-200 transition"
            >
              <Phone size={14} />
              +237 686 27 76 80
            </a>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/logo.png"
                alt="JT Trade and Services Logo"
                width={60}
                height={60}
                className="object-contain"
              />
              <div>
                <h1 className="text-lg font-bold text-secondary-500 leading-tight">
                  JT TRADE AND SERVICES
                </h1>
                <p className="text-xs text-primary-500 font-semibold tracking-wider">
                  CABINET D&apos;IMMIGRATION
                </p>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 hover:text-primary-500 font-medium transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
              <Link
                href="/contact"
                className="bg-primary-500 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-primary-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Consultation Gratuite
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-gray-700"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {isOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-gray-700 hover:text-primary-500 font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="block text-center bg-primary-500 text-white px-6 py-3 rounded-full font-semibold"
              >
                Consultation Gratuite
              </Link>
              <div className="pt-3 border-t space-y-2 text-sm text-gray-600">
                <a href="tel:+237693761778" className="flex items-center gap-2">
                  <Phone size={14} /> +237 693 76 17 78
                </a>
                <a
                  href="mailto:j2tandservices@gmail.com"
                  className="flex items-center gap-2"
                >
                  <Mail size={14} /> j2tandservices@gmail.com
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
