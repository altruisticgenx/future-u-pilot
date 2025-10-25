import * as React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "3d-teal" | "3d-purple" | "3d-cyan" | "3d-gold" | "flat" | "ghost";
  size?: "xs" | "sm" | "default" | "lg";
  hasLighthouse?: boolean;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
}

const variantStyles = {
  "3d-teal": "btn-3d-teal",
  "3d-purple": "btn-3d-purple",
  "3d-cyan": "btn-3d-cyan",
  "3d-gold": "btn-3d-gold",
  flat: "bg-background border-2 text-foreground hover:bg-primary/10",
  ghost: "hover:bg-accent hover:text-accent-foreground",
};

const sizeStyles = {
  xs: "text-[10px] sm:text-xs px-3 py-2 min-w-[90px]",
  sm: "text-xs sm:text-sm px-4 py-2.5 min-w-[110px]",
  default: "text-sm px-6 py-3 min-w-[130px]",
  lg: "text-base px-8 py-4 min-w-[160px]",
};

export const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(
  (
    {
      children,
      className,
      variant = "3d-teal",
      size = "default",
      hasLighthouse = false,
      icon: Icon,
      iconPosition = "right",
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    return (
      <button
        ref={ref}
        className={cn(
          "group relative overflow-hidden rounded-full border-2 font-semibold",
          "transition-all duration-300 will-change-transform",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          "hover:scale-105 hover:-translate-y-0.5 active:scale-98",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {/* Lighthouse glow effect */}
        {hasLighthouse && isHovered && !prefersReducedMotion && (
          <div
            className="absolute inset-0 z-0 rounded-full animate-pulse"
            style={{
              background:
                "radial-gradient(circle at center, hsl(173 80% 60% / 0.4), transparent 70%)",
              filter: "blur(8px)",
              animation: "pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            }}
          />
        )}

        {/* Shimmer effect */}
        <div
          className={cn(
            "absolute inset-0 z-0 transition-transform duration-600",
            isHovered && !prefersReducedMotion && "animate-shimmer"
          )}
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
          }}
        />

        {/* Dot indicator */}
        <div
          className={cn(
            "absolute left-3 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-current z-10 transition-all duration-300",
            isHovered && !prefersReducedMotion && "scale-[8] opacity-0"
          )}
          style={{
            transition: isHovered
              ? "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s"
              : "transform 0.3s, opacity 0.3s",
          }}
        />

        {/* Primary content (slides out) */}
        <div
          className={cn(
            "flex items-center justify-center gap-2 relative z-10 transition-all duration-300",
            isHovered && !prefersReducedMotion && "translate-x-12 opacity-0"
          )}
        >
          {Icon && iconPosition === "left" && (
            <Icon className="h-3 w-3" aria-hidden="true" />
          )}
          <span>{children}</span>
          {Icon && iconPosition === "right" && (
            <Icon className="h-3 w-3" aria-hidden="true" />
          )}
        </div>

        {/* Secondary content (slides in with icon) */}
        <div
          className={cn(
            "absolute inset-0 z-20 flex items-center justify-center gap-2 transition-all duration-300",
            isHovered && !prefersReducedMotion
              ? "-translate-x-0 opacity-100"
              : "translate-x-12 opacity-0"
          )}
          style={{
            transitionDelay: isHovered ? "50ms" : "0ms",
          }}
        >
          <span>{children}</span>
          {Icon && (
            <Icon
              className={cn(
                "h-4 w-4",
                isHovered && !prefersReducedMotion && "animate-pulse"
              )}
              aria-hidden="true"
            />
          )}
        </div>
      </button>
    );
  }
);

InteractiveHoverButton.displayName = "InteractiveHoverButton";
