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
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -3, scale: 1.01 }}
      className="h-full"
    >
      <Card className={`glass-card-3d h-full bg-gradient-to-br ${color} border border-primary/25 hover:border-primary/50 transition-all duration-300`}>
        <CardContent className="p-4 space-y-3">
          <div className="flex items-start gap-2.5">
            <motion.div 
              className="p-2 rounded-lg bg-primary/15 shrink-0 shadow-sm"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              aria-hidden="true"
            >
              <Icon className="h-5 w-5 text-primary" />
            </motion.div>
            <div>
              <h3 className="text-sm font-bold text-foreground leading-tight">{title}</h3>
              <p className="text-[11px] text-muted-foreground/80 italic mt-0.5">{subtitle}</p>
            </div>
          </div>
          
          <p className="text-xs text-foreground/75 leading-relaxed">
            {description}
          </p>

          <ul className="space-y-1 pt-1" role="list">
            {highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-1.5 text-xs text-foreground/70">
                <CheckCircle2 className="h-3.5 w-3.5 text-cmd-success mt-0.5 shrink-0" aria-hidden="true" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
};
