import Hero from "@/components/Hero";
import { LogoRow } from "@/components/LogoRow";
import { ServiceCards } from "@/components/ServiceCards";
import { WhyNow } from "@/components/WhyNow";
import { LabNotes } from "@/components/LabNotes";
import { WhyItMatters } from "@/components/WhyItMatters";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <LogoRow />
      <ServiceCards />
      <WhyNow />
      <LabNotes />
      <WhyItMatters />
      
      {/* Contact Section */}
      <section id="contact" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold">Let's Plan Your Next 8 Weeks</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tell us where you are and we'll propose a pilot that proves value—fast.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto backdrop-blur-md bg-card/60 border border-border/50 rounded-2xl p-8 shadow-2xl">
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
