import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AIChatbot } from "@/components/AIChatbot";

export default function PALobby() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/40 glass-card-3d"
            >
              <span className="text-sm font-medium bg-gradient-hero bg-clip-text text-transparent">
                Pennsylvania Quantum Public Lobby Group
              </span>
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Building Pennsylvania's Quantum Future
            </h1>
            
            <div className="max-w-3xl mx-auto mt-12 p-8 glass-card-3d rounded-xl border border-primary/30">
              <p className="text-muted-foreground text-lg">
                Content coming soon...
              </p>
              <p className="text-sm text-muted-foreground/60 mt-4">
                This page is currently under construction. Check back soon for updates on Pennsylvania's quantum initiatives and lobbying efforts.
              </p>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
      <AIChatbot />
    </div>
  );
}
