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
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      <Card className="bg-gradient-to-br from-primary/10 via-background to-accent/10 border border-primary/30 hover:border-primary/60 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(var(--primary-rgb),0.15)]">
        <CardContent className="p-5 text-center space-y-3">
          <div className="flex justify-center">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
              <Icon className="h-7 w-7 text-primary" />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold mb-2 text-foreground">{sector}</h3>
            <div className="space-y-1.5">
              <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                <TrendingUp className="h-3.5 w-3.5 text-green-500" />
                <span>Payback: <strong className="text-foreground">{payback}</strong></span>
              </div>
              <div className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                {roi}
              </div>
              <p className="text-xs text-muted-foreground/70">Return on Investment</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
