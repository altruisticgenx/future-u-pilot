import { Card, CardContent } from "@/components/ui/card";
import { type LucideIcon, CheckCircle2 } from "lucide-react";

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
    <div className="h-full animate-fade-in hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300" style={{ animationDelay: `${index * 80}ms` }}>
      <Card className={`glass-card-3d h-full bg-gradient-to-br ${color} border border-primary/25 hover:border-primary/50 transition-all duration-300`}>
        <CardContent className="p-3 space-y-2">
          <div className="flex items-start gap-2">
            <div className="p-1.5 rounded-lg bg-primary/15 shrink-0 shadow-sm hover:rotate-180 transition-transform duration-500"
              aria-hidden="true"
            >
              <Icon className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-foreground leading-tight">{title}</h3>
              <p className="text-[10px] text-muted-foreground/80 italic mt-0.5">{subtitle}</p>
            </div>
          </div>
          
          <p className="text-[11px] text-foreground/75 leading-relaxed">
            {description}
          </p>

          <ul className="space-y-0.5 pt-0.5" role="list">
            {highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-1.5 text-[10px] text-foreground/70">
                <CheckCircle2 className="h-3 w-3 text-cmd-success mt-0.5 shrink-0" aria-hidden="true" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
