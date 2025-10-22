import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";

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
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
      
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Living Lab Notes</h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Real experiments, measurable outcomes
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {experiments.map((experiment, index) => (
            <motion.div
              key={experiment.date}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, y: -8 }}
            >
              <Card className="h-full backdrop-blur-md bg-card/60 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                <CardContent className="p-6 space-y-4 relative z-10">
                  <motion.div 
                    className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground"
                    whileHover={{ x: 5 }}
                  >
                    <Calendar className="h-4 w-4" />
                    <time dateTime={experiment.date}>
                      {new Date(experiment.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  </motion.div>
                  
                  <h3 className="text-lg sm:text-xl font-bold text-foreground">
                    {experiment.title}
                  </h3>
                  
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {experiment.summary}
                  </p>
                  
                  <motion.div 
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                    whileHover={{ scale: 1.1 }}
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
            className="group border-2 hover:scale-105 transition-transform"
            onClick={() => window.location.href = "/experiments"}
            aria-label="View all experiments"
          >
            View All Experiments
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
