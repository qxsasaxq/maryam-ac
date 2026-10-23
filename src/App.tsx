import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SocialProof from "./components/SocialProof";
import Services from "./components/Services";
import Showcase from "./components/Showcase";
import Process from "./components/Process";
import Benefits from "./components/Benefits";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import Faq from "./components/Faq";
import Quote from "./components/Quote";
import Footer from "./components/Footer";
import FloatingActions from "./components/FloatingActions";

export default function App() {
  return (
    <div className="relative min-h-screen bg-paper">
      <Navbar />
      <main id="main">
        <Hero />
        <SocialProof />
        <Services />
        <Showcase />
        <Process />
        <Benefits />
        <Pricing />
        <Testimonials />
        <Faq />
        <Quote />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
