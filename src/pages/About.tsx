import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import { AIChatbot } from "@/components/AIChatbot";

const caseStudies = [
  {
    tag: "Governance & Policy",
    title: "Quantum Policy Sandbox",
    desc: "We helped a legislative task force simulate the effects of quantum-secure voting systems—translating theory into actionable frameworks that informed policy drafts now shaping state tech law.",
  },
  {
    tag: "Industry Innovation",
    title: "AI Readiness Index for SMEs",
    desc: "Built a national AI readiness index for 1,200+ small enterprises, identifying which could scale safely with minimal disruption—transforming government grant allocation efficiency by 3x.",
  },
  {
    tag: "Ethical Infrastructure",
    title: "Human-Centered AI Protocols",
    desc: "Developed a human-in-the-loop verification layer for generative AI, later adopted as a reference model in the European Trustworthy AI Charter.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="relative overflow-hidden">
        {/* Ambient Motion Light */}
        <div className="absolute inset-0 pointer-events-none ambient-light" />

        {/* Hero Section */}
        <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center space-y-8">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent"
          >
            Rethinking What "Responsible AI" Really Means
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
            className="max-w-3xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed"
          >
            AltruisticXAI helps governments, innovators, and businesses move beyond hype—turning
            quantum and AI potential into measurable, ethical, and human-centered progress.  
            We don't build products. We build understanding, frameworks, and readiness.
          </motion.p>

          {/* Learn More Button */}
          <motion.a
            href="#impact"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="btn-3d-gold inline-flex items-center gap-2 mt-8 btn-ripple press-scale"
          >
            Learn More <ArrowRight className="w-4 h-4" />
          </motion.a>
        </section>

        {/* Impact Section */}
        <section id="impact" className="relative z-10 py-24 bg-muted/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
            >
              Real Impact. Measurable Progress.
            </motion.h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
              {caseStudies.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: i * 0.15, 
                    duration: 0.6,
                    ease: [0.34, 1.56, 0.64, 1]
                  }}
                  className="relative card-3d-hover p-6 rounded-2xl glass-card-3d backdrop-blur-xl border border-border group overflow-hidden elevation-2 hover:elevation-4"
                >
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <span className="text-xs font-semibold uppercase text-accent tracking-widest block mb-2">
                      {item.tag}
                    </span>
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy / CTA Section */}
        <section className="relative z-10 py-24 text-center space-y-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-accent via-primary to-primary-glow bg-clip-text text-transparent"
            >
              Building the Future Ethically, Not Theoretically
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="max-w-3xl mx-auto text-muted-foreground text-base sm:text-lg leading-relaxed"
            >
              Our mission is to make advanced technologies—quantum, AI, and beyond—transparent,
              equitable, and useful. Every engagement we take on is grounded in measurable benefit 
              to both humans and institutions.
            </motion.p>

            <motion.a
              href="/faq"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="btn-3d-cyan inline-flex items-center gap-2 btn-ripple press-scale"
            >
              FAQs <ArrowRight className="w-4 h-4" />
            </motion.a>
          </div>
        </section>
      </div>

      <Footer />
      <AIChatbot />
    </div>
  );
};

export default About;
