import { motion } from 'framer-motion';
import { Clock, TrendingUp, Activity } from 'lucide-react';
import { MarketData } from '@/types/quantum';

interface MarketDataPanelProps {
  data: MarketData;
  isLoading?: boolean;
}

export const MarketDataPanel = ({ data, isLoading }: MarketDataPanelProps) => {
  if (isLoading) {
    return (
      <div className="font-mono text-sm space-y-2 p-4 bg-terminal-surface/50 rounded-lg border border-terminal-border/30">
        <div className="animate-pulse space-y-2">
          <div className="h-4 bg-primary/20 rounded w-3/4" />
          <div className="h-4 bg-primary/20 rounded w-1/2" />
          <div className="h-4 bg-primary/20 rounded w-2/3" />
        </div>
      </div>
    );
  }

  const formatValue = (value: string | number): string => {
    if (typeof value === 'number') {
      return value.toLocaleString();
    }
    return value;
  };

  const entries = Object.entries(data).filter(([key]) => key !== 'lastUpdated');
  const lastUpdated = new Date(data.lastUpdated).toLocaleTimeString();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="font-mono text-sm space-y-3 p-4 bg-terminal-surface/50 rounded-lg border border-terminal-border/30"
    >
      <div className="flex items-center gap-2 text-cmd-info pb-2 border-b border-terminal-border/20">
        <Activity className="w-4 h-4" />
        <span className="font-bold">LIVE MARKET DATA</span>
      </div>

      <div className="space-y-2">
        {entries.map(([key, value], index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex justify-between items-center group"
          >
            <span className="text-terminal-text/70 group-hover:text-primary transition-colors">
              {key.replace(/([A-Z])/g, ' $1').trim()}:
            </span>
            <span className="text-primary font-bold flex items-center gap-1">
              {formatValue(value)}
              {typeof value === 'number' && value > 0 && (
                <TrendingUp className="w-3 h-3 text-cmd-success" />
              )}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center gap-2 text-xs text-terminal-text/50 pt-2 border-t border-terminal-border/20">
        <Clock className="w-3 h-3" />
        <span>Last updated: {lastUpdated}</span>
      </div>
    </motion.div>
  );
};
