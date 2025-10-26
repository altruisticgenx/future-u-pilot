import { Card, CardContent } from "@/components/ui/card";
import { type LucideIcon, TrendingUp } from "lucide-react";

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
    <div className="animate-scale-in hover:-translate-y-1 hover:scale-105 transition-all duration-300" style={{ animationDelay: `${index * 80}ms` }}>
      <Card className="glass-card-3d bg-gradient-to-br from-primary/8 via-card to-accent/5 border border-primary/25 hover:border-primary/50 transition-all duration-300">
        <CardContent className="p-2.5 text-center space-y-1.5">
          <div className="flex justify-center">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary/15 to-accent/15 shadow-sm">
              <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
            </div>
          </div>
          <div>
            <h3 className="text-[10px] font-bold mb-1 text-foreground">{sector}</h3>
            <div className="space-y-0.5">
              <div className="flex items-center justify-center gap-1 text-[9px] text-muted-foreground">
                <TrendingUp className="h-2.5 w-2.5 text-cmd-success" aria-hidden="true" />
                <span>Payback: <strong className="text-foreground">{payback}</strong></span>
              </div>
              <div className="text-lg font-extrabold bg-gradient-hero bg-clip-text text-transparent">
                {roi}
              </div>
              <p className="text-[9px] text-muted-foreground/70">ROI</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
