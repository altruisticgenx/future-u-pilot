/**
 * Type definitions for Hero component and related elements
 */

export interface HeroProps {
  /** Optional CSS class name */
  className?: string;
  /** Skip animations on initial render */
  skipInitialAnimation?: boolean;
}

export interface TerminalCommand {
  /** Command text to display */
  text: string;
  /** Command type for styling */
  type: 'command' | 'process' | 'success' | 'info';
}

export interface AnimationConfig {
  /** Duration in seconds */
  duration: number;
  /** Delay before animation starts */
  delay: number;
  /** Animation easing function */
  ease: string;
  /** Whether animation should repeat */
  repeat?: boolean | number;
}

export interface TerminalWindowProps {
  /** Current command index to display */
  cmdIndex: number;
  /** Array of terminal commands */
  commands: string[];
  /** Whether animations are ready */
  animationsReady: boolean;
  /** Whether user prefers reduced motion */
  prefersReducedMotion: boolean;
}

export interface StatusBadgeProps {
  /** Status text to display */
  status: string;
  /** Whether badge animation is ready */
  animationsReady: boolean;
  /** Whether user prefers reduced motion */
  prefersReducedMotion: boolean;
}

export interface HeroCTAGroupProps {
  /** Callback for book strategy button */
  onBookStrategy: () => void;
  /** Callback for about button */
  onAbout: () => void;
  /** Callback for video button */
  onVideo: () => void;
  /** Whether animations are ready */
  animationsReady: boolean;
  /** Whether user prefers reduced motion */
  prefersReducedMotion: boolean;
}

export interface PerformanceMetrics {
  /** First Contentful Paint in ms */
  fcp?: number;
  /** Largest Contentful Paint in ms */
  lcp?: number;
  /** Cumulative Layout Shift score */
  cls?: number;
  /** First Input Delay in ms */
  fid?: number;
}
