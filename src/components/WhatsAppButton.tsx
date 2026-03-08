"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/237693761778?text=Bonjour%20JT%20TRADE%20AND%20SERVICES%2C%20je%20souhaite%20avoir%20des%20informations%20sur%20vos%20services."
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: "spring" }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-colors"
      aria-label="Contacter via WhatsApp"
    >
      <MessageCircle size={28} />
    </motion.a>
  );
}
