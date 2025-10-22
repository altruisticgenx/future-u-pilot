import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Rocket, Clock } from "lucide-react";

const CaseStudies = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="relative pt-32 pb-32 overflow-hidden min-h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]" />
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="inline-flex p-6 rounded-full bg-primary/10"
            >
              <Rocket className="h-16 w-16 text-primary" />
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
              <span className="block text-foreground">Case Studies</span>
              <span className="block bg-gradient-hero bg-clip-text text-transparent mt-2">
                Coming Soon
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              We're documenting our success stories and impact metrics. Check back soon to see how we've helped organizations transform with quantum and AI technologies.
            </p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-2 text-sm text-muted-foreground pt-8"
            >
              <Clock className="h-4 w-4" />
              <span>Expected Launch: Q2 2025</span>
            </motion.div>
            
            <motion.button
              onClick={() => window.location.href = "/initiatives"}
              className="mt-8 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Current Initiatives
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CaseStudies;
