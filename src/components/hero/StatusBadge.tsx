import { motion } from "framer-motion";
import type { StatusBadgeProps } from "@/types/hero";

/**
 * Status badge component with spring animation
 * Shows current experiment/project status
 */
export const StatusBadge = ({
  status,
  animationsReady,
  prefersReducedMotion
}: StatusBadgeProps) => {
  const springConfig = {
    type: "spring" as const,
    stiffness: 260,
    damping: 20,
    mass: 1,
  };

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
      animate={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
      transition={prefersReducedMotion ? {} : { delay: 0.2, ...springConfig }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm animate-spring-bounce"
      role="status"
      aria-label={`Status: ${status}`}
    >
      <span
        className="w-2 h-2 rounded-full bg-primary animate-pulse-soft"
        aria-hidden="true"
      />
      <span className="text-sm font-medium text-primary">
        {status}
      </span>
    </motion.div>
  );
};
