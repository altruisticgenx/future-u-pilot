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
    <section className="py-16 sm:py-24 border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Why It Matters</h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            From friction to forward momentum
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {points.map((point, index) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={point.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center space-y-4"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <motion.div 
                  className={`inline-flex p-4 rounded-2xl ${point.bg} mb-2`}
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className={`h-10 w-10 sm:h-12 sm:w-12 ${point.color}`} />
                </motion.div>
                
                <div className="space-y-2">
                  <p className="text-xs sm:text-sm font-bold uppercase tracking-wide text-muted-foreground">
                    {point.label}
                  </p>
                  <p className="text-base sm:text-lg font-medium text-foreground leading-relaxed">
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
