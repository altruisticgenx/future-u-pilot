import { lazy, Suspense } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { HeroSkeleton } from "@/components/LoadingSkeleton";
import { motion } from "framer-motion";

// Eager load critical above-the-fold components for better FCP
import { Hero } from "@/components/Hero";
import { LogoRow } from "@/components/LogoRow";

// Lazy load below-the-fold components
const ServiceCards = lazy(() => import("@/components/ServiceCards").then(m => ({ default: m.ServiceCards })));
const WhyNow = lazy(() => import("@/components/WhyNow").then(m => ({ default: m.WhyNow })));
const LabNotes = lazy(() => import("@/components/LabNotes").then(m => ({ default: m.LabNotes })));
const WhyItMatters = lazy(() => import("@/components/WhyItMatters").then(m => ({ default: m.WhyItMatters })));
const ContactForm = lazy(() => import("@/components/ContactForm").then(m => ({ default: m.ContactForm })));
const AIChatbot = lazy(() => import("@/components/AIChatbot").then(m => ({ default: m.AIChatbot })));

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <LogoRow />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <Suspense fallback={<div className="h-96 animate-pulse bg-primary/5" />}>
          <ServiceCards />
        </Suspense>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <Suspense fallback={<div className="h-64 animate-pulse bg-primary/5" />}>
          <WhyNow />
        </Suspense>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <Suspense fallback={<div className="h-64 animate-pulse bg-primary/5" />}>
          <LabNotes />
        </Suspense>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <Suspense fallback={<div className="h-64 animate-pulse bg-primary/5" />}>
          <WhyItMatters />
        </Suspense>
      </motion.div>
      
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
              Start Your 8-Week Pilot
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Tell us where you are and we'll propose a pilot that proves value—fast.
            </p>
          </motion.div>

          <Suspense fallback={<div className="h-96 animate-pulse bg-primary/5 rounded-2xl" />}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto glass-card-3d bg-card/70 border-2 border-primary/20 rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl"
            >
              <ContactForm />
            </motion.div>
          </Suspense>
        </div>
      </section>

      <Footer />
      
      {/* AI Chatbot - Load after interaction */}
      <Suspense fallback={null}>
        <AIChatbot />
      </Suspense>
    </div>
  );
};

export default Index;
