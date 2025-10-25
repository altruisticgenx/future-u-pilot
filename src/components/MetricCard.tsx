import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon, TrendingUp } from "lucide-react";

interface MetricCardProps {
  icon: LucideIcon;
  sector: string;
  payback: string;
  roi: string;
  index: number;
}

export const MetricCard = ({
  icon: Icon,
  sector,
  payback,
  roi,
  index,
}: MetricCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -3, scale: 1.02 }}
    >
      <Card className="glass-card-3d hover-3d-lift bg-gradient-to-br from-primary/10 via-card to-accent/8 border border-primary/30 hover:border-primary/60 transition-all duration-300 shadow-lg hover:shadow-2xl">
        <CardContent className="p-3 text-center space-y-1.5">
          <div className="flex justify-center mb-1">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 shadow-md glow-pulse">
              <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
            </div>
          </div>
          <div>
            <h3 className="text-[10px] sm:text-xs font-bold mb-1.5 text-foreground tracking-tight uppercase">{sector}</h3>
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1 text-[9px] sm:text-[10px] text-muted-foreground/75">
                <TrendingUp className="h-3 w-3 text-cmd-success" aria-hidden="true" />
                <span>Payback: <strong className="text-foreground font-semibold">{payback}</strong></span>
              </div>
              <div className="text-xl sm:text-2xl font-extrabold bg-gradient-hero bg-clip-text text-transparent">
                {roi}
              </div>
              <p className="text-[9px] sm:text-[10px] text-muted-foreground/60 font-medium">ROI</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
