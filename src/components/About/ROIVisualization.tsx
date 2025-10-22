import { motion } from "framer-motion";
import { TrendingUp, DollarSign, Zap, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

const metrics = [
  { 
    label: "Total Investment", 
    value: 12500000, 
    suffix: "", 
    icon: DollarSign,
    color: "text-blue-500",
    prefix: "$"
  },
  { 
    label: "Projected ROI", 
    value: 430, 
    suffix: "%", 
    icon: TrendingUp,
    color: "text-green-500",
    prefix: ""
  },
  { 
    label: "Jobs Created", 
    value: 850, 
    suffix: "+", 
    icon: Target,
    color: "text-purple-500",
    prefix: ""
  },
  { 
    label: "Energy Saved", 
    value: 22, 
    suffix: "%", 
    icon: Zap,
    color: "text-yellow-500",
    prefix: ""
  },
];

const AnimatedCounter = ({ end, duration = 2000, suffix = "", prefix = "" }: { end: number; duration?: number; suffix?: string; prefix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - percentage, 3);
      setCount(Math.floor(end * easeOut));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return (
    <span>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

export const ROIVisualization = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Impact By The Numbers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real results from Pennsylvania's quantum initiatives—measured, verified, and growing
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="backdrop-blur-md bg-card/60 border-2 border-border/50 hover:border-primary/50 transition-all hover:shadow-2xl h-full">
                  <CardContent className="p-8 text-center space-y-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                      className="flex justify-center"
                    >
                      <div className={`p-4 rounded-2xl bg-primary/10 ${metric.color}`}>
                        <Icon className="h-8 w-8" />
                      </div>
                    </motion.div>

                    <div>
                      <motion.div
                        className="text-4xl sm:text-5xl font-bold mb-2"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                      >
                        <AnimatedCounter 
                          end={metric.value} 
                          duration={2000} 
                          suffix={metric.suffix}
                          prefix={metric.prefix}
                        />
                      </motion.div>
                      <div className="text-sm text-muted-foreground font-medium">
                        {metric.label}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground italic">
            * Data compiled from pilot programs (2024-2025). Projections based on current growth trajectories.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
