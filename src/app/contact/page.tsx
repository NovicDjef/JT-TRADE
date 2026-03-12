"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, CheckCircle, Loader2, AlertCircle } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", service: "", country: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://formspree.io/f/xpqydepo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _replyto: formData.email,
          phone: formData.phone,
          service: formData.service,
          country: formData.country,
          message: formData.message,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", service: "", country: "", message: "" });
      } else {
        setError("Une erreur est survenue. Veuillez reessayer.");
      }
    } catch {
      setError("Erreur de connexion. Veuillez reessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="bg-gradient-to-br from-red-600 to-blue-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />

        {/* SVG decorative drawings */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          {/* Envelope / mail icon outline */}
          <g transform="translate(12%, 40%)" opacity="0.06">
            <rect x="-30" y="-20" width="60" height="40" rx="4" fill="none" stroke="white" strokeWidth="1.5" />
            <polyline points="-30,-20 0,5 30,-20" fill="none" stroke="white" strokeWidth="1.5" />
          </g>

          {/* Phone icon outline */}
          <g transform="translate(88%, 60%)" opacity="0.05">
            <path d="M-8,-20 C-8,-20 -12,-8 -6,2 C0,12 10,18 10,18 L16,12 L8,0 L4,4 C4,4 -2,-4 -4,-10 L0,-14 Z" fill="none" stroke="white" strokeWidth="1.5" />
          </g>

          {/* Connection lines */}
          <path d="M0,30% Q30%,20% 60%,35% T100%,25%" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" className="geo-line" />
          <path d="M5%,75% Q40%,50% 80%,30%" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" strokeLinecap="round" className="flight-path-delayed" />

          {/* Signal waves from pin */}
          <circle cx="50%" cy="80%" r="15" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          <circle cx="50%" cy="80%" r="30" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          <circle cx="50%" cy="80%" r="45" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
          <circle cx="50%" cy="80%" r="3" fill="rgba(255,255,255,0.12)" />

          {/* Waypoints */}
          <circle cx="5%" cy="75%" r="2.5" fill="rgba(255,255,255,0.12)" />
          <circle cx="80%" cy="30%" r="2.5" fill="rgba(255,255,255,0.12)" />
        </svg>

        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl font-extrabold text-white">Contactez-Nous</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-4 text-white/80 text-lg max-w-2xl mx-auto">
            N&apos;hesitez pas a nous contacter pour toute question ou demande de consultation
          </motion.p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                <div>
                  <h2 className="text-2xl font-extrabold text-gray-900">Informations de Contact</h2>
                  <p className="mt-2 text-gray-600">Nous sommes disponibles pour repondre a toutes vos questions</p>
                </div>

                <div className="space-y-6">
                  <a href="mailto:contact@jttradeservices.com" className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-red-100 transition">
                      <Mail className="text-red-600" size={22} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Email</p>
                      <p className="text-gray-600">contact@jttradeservices.com</p>
                    </div>
                  </a>

                  <a href="tel:+237693761778" className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-green-100 transition">
                      <Phone className="text-green-600" size={22} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Telephone / WhatsApp</p>
                      <p className="text-gray-600">+237 693 76 17 78</p>
                    </div>
                  </a>

                  <a href="tel:+237686277680" className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition">
                      <Phone className="text-blue-900" size={22} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Telephone</p>
                      <p className="text-gray-600">+237 686 27 76 80</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-red-600" size={22} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Adresse</p>
                      <p className="text-gray-600">Makepe Vallee Hopital General<br />Douala, Cameroun</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="text-blue-900" size={22} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Horaires</p>
                      <p className="text-gray-600">Lundi - Vendredi : 8h00 - 18h00<br />Samedi : 9h00 - 14h00</p>
                    </div>
                  </div>
                </div>

                <a href="https://wa.me/237693761778?text=Bonjour%20JT%20TRADE%20AND%20SERVICES%2C%20je%20souhaite%20avoir%20des%20informations%20sur%20vos%20services." target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 bg-green-500 text-white py-4 px-6 rounded-xl font-bold hover:bg-green-600 transition-all duration-300 shadow-md hover:shadow-lg">
                  <MessageCircle size={22} /> Ecrire sur WhatsApp
                </a>
              </motion.div>
            </div>

            <div className="lg:col-span-3">
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900">Envoyez-nous un message</h3>
                <p className="mt-1 text-gray-600 text-sm">Remplissez le formulaire et nous vous repondrons dans les plus brefs delais</p>

                {submitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-8 text-center py-12">
                    <CheckCircle className="mx-auto text-green-500" size={64} />
                    <h4 className="mt-4 text-xl font-bold text-gray-900">Message envoye !</h4>
                    <p className="mt-2 text-gray-600">Nous vous repondrons dans les plus brefs delais.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet *</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition" placeholder="Votre nom" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition" placeholder="votre@email.com" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Telephone *</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition" placeholder="+237 6XX XXX XXX" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Service souhaite *</label>
                        <select name="service" value={formData.service} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition bg-white">
                          <option value="">Selectionnez un service</option>
                          <option value="Residence Permanente - Canada">Residence Permanente - Canada</option>
                          <option value="Visa Etudiant">Visa Etudiant</option>
                          <option value="Visa Tourisme">Visa Tourisme</option>
                          <option value="Cours TCF / TEF">Cours TCF / TEF</option>
                          <option value="Etudes en Allemagne">Etudes en Allemagne</option>
                          <option value="Autre">Autre</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pays de destination</label>
                      <select name="country" value={formData.country} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition bg-white">
                        <option value="">Selectionnez un pays</option>
                        <option value="Canada">Canada</option>
                        <option value="Allemagne">Allemagne</option>
                        <option value="France">France</option>
                        <option value="Belgique">Belgique</option>
                        <option value="Autre">Autre</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                      <textarea name="message" value={formData.message} onChange={handleChange} required rows={5} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition resize-none" placeholder="Decrivez votre projet ou votre question..." />
                    </div>

                    {error && (
                      <div className="flex items-center gap-2 p-4 bg-red-50 text-red-600 rounded-xl text-sm">
                        <AlertCircle size={18} /> {error}
                      </div>
                    )}

                    <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed">
                      {loading ? (<><Loader2 size={20} className="animate-spin" /> Envoi en cours...</>) : (<><Send size={20} /> Envoyer le message</>)}
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-extrabold text-gray-900">Notre Localisation</h2>
          <p className="mt-2 text-gray-600">Makepe Vallee Hopital General, Douala, Cameroun</p>
          <div className="mt-8 rounded-2xl overflow-hidden shadow-xl h-[400px]">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.8!2d9.7!3d4.08!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwMDQnNDguMCJOIDnCsDQyJzAwLjAiRQ!5e0!3m2!1sfr!2scm!4v1" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="JT Trade and Services - Localisation" />
          </div>
        </div>
      </section>
    </>
  );
}
