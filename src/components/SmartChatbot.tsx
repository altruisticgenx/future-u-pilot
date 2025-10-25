import { useLocalAI } from "@/contexts/LocalAIContext";
import { AIChatbot } from "./AIChatbot";
import { LocalAIChat } from "./LocalAIChat";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Smart wrapper that switches between Cloud AI and Local AI
 * based on user preference
 */
export const SmartChatbot = () => {
  const { mode } = useLocalAI();

  return (
    <AnimatePresence mode="wait">
      {mode === 'cloud' ? (
        <motion.div
          key="cloud"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <AIChatbot />
        </motion.div>
      ) : (
        <motion.div
          key="local"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <LocalAIChat />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
