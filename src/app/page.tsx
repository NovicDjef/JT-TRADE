import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Destinations from "@/components/Destinations";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";

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
