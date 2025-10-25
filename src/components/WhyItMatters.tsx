import { motion } from "framer-motion";
import { AlertTriangle, TrendingDown, CheckCircle2 } from "lucide-react";

const points = [
  {
    icon: AlertTriangle,
    label: "Problem",
    text: "AI isn't explainable; infra isn't quantum-ready.",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    icon: TrendingDown,
    label: "Impact",
    text: "Compliance friction, stalled pilots, and security debt.",
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
  {
    icon: CheckCircle2,
    label: "Solution",
    text: "Bridge quantum computing, policy, and applied AI—responsibly.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
];

export const WhyItMatters = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 border-t border-primary/20 relative overflow-hidden" aria-labelledby="why-matters-heading">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center space-y-2 sm:space-y-3 mb-8 sm:mb-10 md:mb-12"
        >
          <h2 id="why-matters-heading" className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">Why It Matters</h2>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            From friction to forward momentum
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 max-w-5xl mx-auto">
          {points.map((point, index) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={point.label}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5, rotateZ: 1 }}
                className="text-center space-y-3 sm:space-y-4"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <motion.div 
                  className={`inline-flex p-3 sm:p-4 rounded-2xl ${point.bg} mb-2 glass-card-3d border-2 border-primary/20`}
                  whileHover={{ rotate: [0, -8, 8, -8, 0], scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon className={`h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 ${point.color}`} aria-hidden="true" />
                </motion.div>
                
                <div className="space-y-2">
                  <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {point.label}
                  </p>
                  <p className="text-xs sm:text-sm md:text-base font-medium text-foreground leading-relaxed px-2">
                    {point.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
