import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useROIData } from "@/hooks/useSectorData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Zap, Heart, Scale } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const iconMap = {
  GraduationCap,
  Zap,
  Heart,
  Scale,
};

export const ROIChart = () => {
  const { data: roiData, isLoading } = useROIData();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-48 rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {roiData?.map((item, index) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap] || GraduationCap;
          
          return (
            <motion.div
              key={item.sector}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="glass-card-3d h-full hover:shadow-lg transition-all duration-300 group">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "p-2 rounded-lg",
                      "bg-gradient-to-br from-primary/20 to-accent/20",
                      "group-hover:scale-110 transition-transform duration-300"
                    )}>
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-sm font-bold">
                      {item.sector}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">ROI Multiplier</div>
                    <div className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                      {item.roi}x
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-muted-foreground mb-2">
                      Expected Return
                    </div>
                    <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${item.color}, ${item.color}dd)`,
                          boxShadow: `0 0 10px ${item.color}`,
                        }}
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${(item.roi / 5.1) * 100}%` } : {}}
                        transition={{ duration: 1.5, delay: index * 0.1 + 0.3, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-border/50">
                    <div className="text-xs text-muted-foreground">Payback Period</div>
                    <div className="text-sm font-semibold mt-1">{item.payback}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="text-center text-xs text-muted-foreground"
      >
        Last updated: {new Date().toLocaleString()} • Live data from quantum pilot programs
      </motion.div>
    </div>
  );
};
