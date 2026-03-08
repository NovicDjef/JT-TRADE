import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "JT TRADE AND SERVICES | Cabinet d'Immigration - Canada & Europe",
  description:
    "JT TRADE AND SERVICES, votre cabinet d'immigration de confiance. Résidence permanente Canada, Visa étudiant, Études en Allemagne, Visa tourisme, Cours TCF/TEF. Basé à Douala, Cameroun.",
  keywords:
    "immigration canada, visa étudiant, résidence permanente, études allemagne, TCF, TEF, cabinet immigration douala, JT Trade and Services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} font-sans antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
