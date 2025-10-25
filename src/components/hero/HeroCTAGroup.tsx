import { motion } from "framer-motion";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { Calendar, Sparkles, Video } from "lucide-react";
import type { HeroCTAGroupProps } from "@/types/hero";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Hero CTA button group with accessibility enhancements
 * Includes screen reader announcements for user actions
 */
export const HeroCTAGroup = ({
  onBookStrategy,
  onAbout,
  onVideo,
  animationsReady,
  prefersReducedMotion
}: HeroCTAGroupProps) => {
  const [announcement, setAnnouncement] = useState("");
  const navigate = useNavigate();

  const springConfig = {
    type: "spring" as const,
    stiffness: 260,
    damping: 20,
    mass: 1,
  };

  const buttonVariants = {
    initial: prefersReducedMotion ? {} : { scale: 0, opacity: 0 },
    animate: prefersReducedMotion 
      ? { scale: 1, opacity: 1 }
      : { 
          scale: 1, 
          opacity: 1,
          transition: {
            ...springConfig,
            delay: 0.5,
          }
        },
    hover: prefersReducedMotion ? {} : {
      scale: 1.05,
      y: -2,
      transition: { duration: 0.2 }
    },
    tap: prefersReducedMotion ? {} : {
      scale: 0.98,
      y: 0,
      transition: { duration: 0.15 }
    }
  };

  const handleBookClick = () => {
    setAnnouncement("Navigating to contact form");
    onBookStrategy();
  };

  const handleAboutClick = () => {
    setAnnouncement("Opening about page");
    navigate('/about');
  };

  const handleVideoClick = () => {
    setAnnouncement("Opening introduction video");
    onVideo();
  };

  return (
    <>
      {/* Screen reader announcements */}
      <div 
        role="status" 
        aria-live="polite" 
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>

      <motion.div 
        className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center"
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
        animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        transition={prefersReducedMotion ? {} : { 
          delay: 0.6,
          staggerChildren: 0.1 
        }}
      >
        <motion.div
          variants={buttonVariants}
          initial="initial"
          animate="animate"
        >
          <InteractiveHoverButton
            onClick={handleBookClick}
            variant="3d-teal"
            size="xs"
            hasLighthouse
            icon={Calendar}
            className="w-full sm:w-auto shadow-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            data-analytics-id="cta_book_strategy"
            data-ph-capture-attribute-button-type="book"
            data-ph-capture-attribute-button-position="hero-primary"
            aria-label="Book a strategy session"
            tabIndex={0}
          >
            Book
          </InteractiveHoverButton>
        </motion.div>
        
        <motion.div
          variants={buttonVariants}
          initial="initial"
          animate="animate"
        >
          <InteractiveHoverButton
            onClick={handleAboutClick}
            variant="3d-purple"
            size="xs"
            hasLighthouse
            icon={Sparkles}
            className="w-full sm:w-auto shadow-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            data-ph-capture-attribute-button-type="about"
            data-ph-capture-attribute-button-position="hero-secondary"
            aria-label="Learn about our approach"
            tabIndex={0}
          >
            About
          </InteractiveHoverButton>
        </motion.div>

        <motion.div
          variants={buttonVariants}
          initial="initial"
          animate="animate"
        >
          <InteractiveHoverButton
            onClick={handleVideoClick}
            variant="3d-cyan"
            size="xs"
            hasLighthouse
            icon={Video}
            className="w-full sm:w-auto shadow-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            data-ph-capture-attribute-button-type="video"
            data-ph-capture-attribute-button-position="hero-tertiary"
            aria-label="Watch intro video"
            tabIndex={0}
          >
            Video
          </InteractiveHoverButton>
        </motion.div>
      </motion.div>
    </>
  );
};
