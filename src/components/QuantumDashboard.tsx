import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity, Users, Zap, Target } from 'lucide-react';
import { DashboardMetric } from '@/types/quantum';

const mockMetrics: DashboardMetric[] = [
  { label: 'Active Programs', value: 12, trend: 'up', change: '+3' },
  { label: 'Students Enrolled', value: 487, trend: 'up', change: '+89' },
  { label: 'Energy Savings', value: '22%', trend: 'up', change: '+5%' },
  { label: 'Pilot Projects', value: 8, trend: 'stable', change: '0' },
  { label: 'API Requests', value: '15.2K', trend: 'up', change: '+2.1K' },
  { label: 'Research Papers', value: 34, trend: 'up', change: '+7' },
];

const icons = [Users, Zap, Activity, Target, TrendingUp, Activity];

export const QuantumDashboard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {mockMetrics.map((metric, index) => {
        const Icon = icons[index % icons.length];
        return (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className="p-4 bg-terminal-surface/30 rounded-lg border border-terminal-border/30 hover:border-primary/50 transition-all"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              {metric.trend && (
                <div className={`flex items-center gap-1 text-xs font-mono ${
                  metric.trend === 'up' ? 'text-cmd-success' : 
                  metric.trend === 'down' ? 'text-cmd-error' : 
                  'text-terminal-text/70'
                }`}>
                  {metric.trend === 'up' && <TrendingUp className="w-3 h-3" />}
                  {metric.trend === 'down' && <TrendingDown className="w-3 h-3" />}
                  {metric.trend === 'stable' && <Activity className="w-3 h-3" />}
                  <span>{metric.change}</span>
                </div>
              )}
            </div>
            <div className="text-2xl font-bold text-primary font-mono mb-1">
              {metric.value}
            </div>
            <div className="text-sm text-terminal-text/70 font-mono">
              {metric.label}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
