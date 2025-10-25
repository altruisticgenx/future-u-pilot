import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const experiments = [
  {
    date: "2025-09-30",
    title: "Municipal Data Pilot",
    summary: "Quantum-safe crypto inventory completed; migration plan drafted.",
  },
  {
    date: "2025-10-10",
    title: "University Lab",
    summary: "Explainable AI for grant compliance; 38% reviewer time saved.",
  },
  {
    date: "2025-10-18",
    title: "Civic Sandbox",
    summary: "PolicyBot prototype mapping OSHA/EPA updates to SOPs.",
  },
];

export const LabNotes = () => {
  const navigate = useNavigate();
  return (
    <section className="py-12 sm:py-16 md:py-20 relative overflow-hidden" aria-labelledby="lab-notes-heading">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(var(--accent)/0.1),transparent_60%)]" />
      
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center space-y-2 sm:space-y-3 mb-8 sm:mb-10 md:mb-12"
        >
          <h2 id="lab-notes-heading" className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">Living Lab Notes</h2>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Real experiments, measurable outcomes
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 mb-6 sm:mb-8">
          {experiments.map((experiment, index) => (
            <motion.div
              key={experiment.date}
              initial={{ opacity: 0, y: 20, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100 
              }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, y: -5, rotateY: 3 }}
              style={{ 
                transformStyle: 'preserve-3d',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                willChange: 'transform, opacity'
              }}
            >
              <Card 
                className="h-full glass-card-3d bg-card/70 border-2 border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-xl overflow-hidden relative group"
                style={{
                  minHeight: '220px',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardContent className="p-4 sm:p-5 md:p-6 space-y-3 relative z-10">
                  <motion.div 
                    className="flex items-center gap-2 text-[10px] sm:text-xs text-muted-foreground"
                    whileHover={{ x: 3 }}
                  >
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4" aria-hidden="true" />
                    <time dateTime={experiment.date}>
                      {new Date(experiment.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  </motion.div>
                  
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-foreground leading-tight">
                    {experiment.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {experiment.summary}
                  </p>
                  
                  <motion.div 
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/15 to-accent/15 border border-primary/30 text-primary text-[10px] sm:text-xs font-bold"
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Case Study
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button
            variant="outline"
            size="lg"
            className="btn-3d-primary text-xs sm:text-sm"
            onClick={() => navigate("/storytelling")}
            aria-label="View all experiments"
          >
            View All Experiments
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
