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
      <Card className="glass-card-3d bg-gradient-to-br from-primary/8 via-card to-accent/5 border border-primary/25 hover:border-primary/50 transition-all duration-300">
        <CardContent className="p-3.5 text-center space-y-2">
          <div className="flex justify-center">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary/15 to-accent/15 shadow-sm">
              <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold mb-2 text-foreground tracking-tight">{sector}</h3>
            <div className="space-y-1.5">
              <div className="flex items-center justify-center gap-1.5 text-[10px] sm:text-xs text-muted-foreground/75">
                <TrendingUp className="h-3.5 w-3.5 text-cmd-success" aria-hidden="true" />
                <span>Payback: <strong className="text-foreground font-semibold">{payback}</strong></span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold bg-gradient-hero bg-clip-text text-transparent">
                {roi}
              </div>
              <p className="text-[10px] sm:text-xs text-muted-foreground/60 font-medium">ROI</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
