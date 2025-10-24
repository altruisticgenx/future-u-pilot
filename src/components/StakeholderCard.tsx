import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon, CheckCircle2 } from "lucide-react";

interface StakeholderCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  color: string;
  index: number;
}

export const StakeholderCard = ({
  icon: Icon,
  title,
  subtitle,
  description,
  highlights,
  color,
  index,
}: StakeholderCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.01 }}
    >
      <Card className={`h-full bg-gradient-to-br ${color} border border-primary/30 hover:border-primary/60 transition-all duration-300 hover:shadow-[0_10px_40px_rgba(var(--primary-rgb),0.2)]`}>
        <CardContent className="p-5 space-y-4">
          <div className="flex items-start gap-3">
            <motion.div 
              className="p-2.5 rounded-xl bg-primary/20 shrink-0"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Icon className="h-6 w-6 text-primary" />
            </motion.div>
            <div>
              <h3 className="text-base font-bold text-foreground">{title}</h3>
              <p className="text-xs text-muted-foreground/80 italic">{subtitle}</p>
            </div>
          </div>
          
          <p className="text-sm text-foreground/80 leading-relaxed">
            {description}
          </p>

          <div className="space-y-1.5 pt-2">
            {highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm text-foreground/70">
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
