import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useRef } from 'react';

interface ROIChartProps {
  data: Array<{
    sector: string;
    payback: string;
    roi: string;
    roiValue: number;
  }>;
}

const SECTOR_COLORS = {
  Education: 'hsl(var(--cmd-info))',
  Energy: 'hsl(var(--cmd-success))',
  Healthcare: 'hsl(var(--secondary))',
  Governance: 'hsl(var(--accent))',
};

export const ROIChart = ({ data }: ROIChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(chartRef, { threshold: 0.3 });

  const chartData = data.map((item) => ({
    ...item,
    roiValue: isVisible ? item.roiValue : 0,
  }));

  return (
    <motion.div
      ref={chartRef}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-[400px] p-6 bg-terminal-surface/30 rounded-lg border border-terminal-border/30"
    >
      <h3 className="text-lg font-bold text-primary mb-4 font-mono">
        ROI MULTIPLIER ANALYSIS
      </h3>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--terminal-border) / 0.2)" />
          <XAxis
            dataKey="sector"
            stroke="hsl(var(--terminal-text) / 0.7)"
            tick={{ fill: 'hsl(var(--terminal-text) / 0.7)', fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis
            stroke="hsl(var(--terminal-text) / 0.7)"
            tick={{ fill: 'hsl(var(--terminal-text) / 0.7)', fontSize: 12 }}
            label={{
              value: 'ROI Multiplier',
              angle: -90,
              position: 'insideLeft',
              style: { fill: 'hsl(var(--primary))', fontSize: 12, fontWeight: 'bold' },
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--terminal-surface))',
              border: '1px solid hsl(var(--terminal-border))',
              borderRadius: '8px',
              fontFamily: 'monospace',
            }}
            labelStyle={{ color: 'hsl(var(--primary))' }}
            formatter={(value: number) => [`${value.toFixed(1)}x`, 'ROI']}
          />
          <Bar
            dataKey="roiValue"
            animationDuration={1500}
            animationBegin={0}
            radius={[8, 8, 0, 0]}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={SECTOR_COLORS[entry.sector as keyof typeof SECTOR_COLORS]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};
