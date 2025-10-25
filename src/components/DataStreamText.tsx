import { motion } from "framer-motion";
import { useTypewriter } from "@/hooks/useTypewriter";
import { cn } from "@/lib/utils";

interface DataStreamTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  showCursor?: boolean;
}

export const DataStreamText = ({
  text,
  speed = 30,
  delay = 0,
  className,
  showCursor = true,
}: DataStreamTextProps) => {
  const { displayedText, isComplete } = useTypewriter(text, speed, delay);

  return (
    <span className={cn("font-mono", className)}>
      {displayedText}
      {!isComplete && showCursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="inline-block w-2 h-4 bg-primary ml-1"
        />
      )}
    </span>
  );
};
