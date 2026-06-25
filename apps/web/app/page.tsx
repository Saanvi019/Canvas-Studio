import Navbar from "../src/components/landing/Navbar";
import HeroSection from "../src/components/landing/Herosection";
import EditorPreview from "../src/components/landing/EditorPreview";
import FeaturesSection from "../src/components/landing/Features";
import TechStackSection from "../src/components/landing/TechStack";
import PricingSection from "../src/components/landing/Pricing";
import CTASection from "../src/components/landing/CTA";
import Footer from "../src/components/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <HeroSection />
      <EditorPreview />
      <FeaturesSection />
      <TechStackSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </main>
  );
}
