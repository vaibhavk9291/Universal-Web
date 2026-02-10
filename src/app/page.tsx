import { Hero } from "@/components/sections/Hero";
import { TrustIndicators } from "@/components/sections/TrustIndicators";
import { Services } from "@/components/sections/Services";
import { PatientJourney } from "@/components/sections/PatientJourney";
import { BookingForm } from "@/components/sections/BookingForm";
import { Reviews } from "@/components/sections/Reviews";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-primary-white font-body selection:bg-soft-blue/20">
      <Hero />
      <TrustIndicators />
      <Services />
      <PatientJourney />
      {/* <BookingForm /> */}
      <Reviews />
      <Contact />
    </main>
  );
}
