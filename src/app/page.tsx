import dynamic from "next/dynamic";
import Hero from "@/components/Hero";

const Services = dynamic(() => import("@/components/Services"));
const Destinations = dynamic(() => import("@/components/Destinations"));
const Process = dynamic(() => import("@/components/Process"));
const WhyUs = dynamic(() => import("@/components/WhyUs"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const CTA = dynamic(() => import("@/components/CTA"));

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Destinations />
      <Process />
      <WhyUs />
      <Testimonials />
      <CTA />
    </>
  );
}
