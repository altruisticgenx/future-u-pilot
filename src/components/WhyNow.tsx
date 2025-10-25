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
    <section className="py-12 sm:py-16 md:py-20 border-t border-primary/20 glass-card-3d bg-gradient-to-b from-muted/30 to-background relative overflow-hidden" aria-labelledby="why-now-heading">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center space-y-2 sm:space-y-3 mb-8 sm:mb-10 md:mb-12"
        >
          <h2 id="why-now-heading" className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">Why Now?</h2>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Quantum timelines are uncertain; preparedness isn't.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
          {/* Left - Challenges */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-3 sm:space-y-4 md:space-y-5"
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
                  whileHover={{ x: 5, scale: 1.02 }}
                  className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 md:p-5 rounded-xl glass-card-3d bg-card/50 border-2 border-primary/20 hover:border-primary/40 transition-all"
                  style={{ contain: 'layout style paint' }}
                >
                  <motion.div 
                    className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 shrink-0"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" aria-hidden="true" />
                  </motion.div>
                  <p className="text-xs sm:text-sm md:text-base text-foreground pt-0.5 sm:pt-1 leading-relaxed">
                    {challenge.text}
                  </p>
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
            <div className="p-4 sm:p-6 md:p-8 rounded-2xl glass-card-3d bg-card/70 border-2 border-primary/30">
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-6 sm:mb-8 text-center bg-gradient-hero bg-clip-text text-transparent">
                Evolution Timeline
              </h3>
              
              {/* Timeline bar */}
              <div className="relative h-28 sm:h-32">
                {/* Background line */}
                <motion.div 
                  className="absolute top-1/2 left-0 right-0 h-1 sm:h-1.5 bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  viewport={{ once: true }}
                />
                
                {/* Milestones */}
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.4 + index * 0.15,
                      type: "spring",
                      stiffness: 200
                    }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.2, y: -5 }}
                    className="absolute top-1/2 -translate-y-1/2"
                    style={{ left: `${milestone.position}%`, transform: `translateX(-50%) translateY(-50%)` }}
                  >
                    <div className="relative">
                      {/* Dot */}
                      <motion.div 
                        className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-primary border-2 sm:border-4 border-background shadow-lg"
                        animate={{ 
                          boxShadow: [
                            "0 0 10px hsl(var(--primary) / 0.5)",
                            "0 0 20px hsl(var(--primary) / 0.8)",
                            "0 0 10px hsl(var(--primary) / 0.5)"
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      
                      {/* Label */}
                      <div className="absolute top-6 sm:top-8 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
                        <p className="text-[10px] sm:text-xs md:text-sm font-bold text-primary">{milestone.year}</p>
                        <p className="text-[8px] sm:text-[10px] md:text-xs text-muted-foreground mt-0.5 sm:mt-1">
                          {milestone.label}
                        </p>
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
