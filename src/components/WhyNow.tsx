import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Clock } from "lucide-react";

const milestones = [
  { year: "2023", label: "AI Adoption Surge", position: 20 },
  { year: "2024", label: "PQC Standards", position: 50 },
  { year: "2025+", label: "Integrated Governance", position: 80 },
];

const challenges = [
  { icon: AlertCircle, text: "AI adoption outpaces policy" },
  { icon: Clock, text: "Post-quantum migration takes years" },
  { icon: CheckCircle2, text: "Explainability and auditability are table stakes" },
];

export const WhyNow = () => {
  return (
    <section className="py-24 border-t border-border/50 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold">Why Now?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Quantum timelines are uncertain; preparedness isn't.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Challenges */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {challenges.map((challenge, index) => {
              const Icon = challenge.icon;
              return (
                <motion.div
                  key={challenge.text}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 p-4 rounded-xl backdrop-blur-sm bg-card/40 border border-border/50 hover:border-primary/30 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-lg text-foreground pt-1">{challenge.text}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Right - Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="p-8 rounded-2xl backdrop-blur-md bg-card/60 border border-border/50">
              <h3 className="text-2xl font-bold mb-8 text-center">Evolution Timeline</h3>
              
              {/* Timeline bar */}
              <div className="relative h-32">
                {/* Background line */}
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end rounded-full" />
                
                {/* Milestones */}
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="absolute top-1/2 -translate-y-1/2"
                    style={{ left: `${milestone.position}%`, transform: `translateX(-50%) translateY(-50%)` }}
                  >
                    <div className="relative">
                      {/* Dot */}
                      <div className="w-4 h-4 rounded-full bg-primary border-4 border-background shadow-lg" />
                      
                      {/* Label */}
                      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
                        <p className="text-sm font-bold text-primary">{milestone.year}</p>
                        <p className="text-xs text-muted-foreground mt-1">{milestone.label}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
