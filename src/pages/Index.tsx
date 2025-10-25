import { Hero } from "@/components/Hero";
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
      <section id="contact" className="py-16 sm:py-20 md:py-24 relative overflow-hidden" aria-labelledby="contact-heading">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.1),transparent_70%)]" />
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center space-y-2 sm:space-y-3 mb-8 sm:mb-12"
          >
            <h2 id="contact-heading" className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
              Let's Plan Your Next 8 Weeks
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Tell us where you are and we'll propose a pilot that proves value—fast.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto glass-card-3d bg-card/70 border-2 border-primary/20 rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl"
          >
            <ContactForm />
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
