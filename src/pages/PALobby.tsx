import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AIChatbot } from "@/components/AIChatbot";
import ContactCard from "@/components/quantum-lobby/ContactCard";
import LetterPanel from "@/components/quantum-lobby/LetterPanel";
import ActionPanel from "@/components/quantum-lobby/ActionPanel";
import MapPanel from "@/components/quantum-lobby/MapPanel";

export default function PALobby() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4 mb-12"
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
            
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Make it easy for lawmakers to understand — and for citizens to act.
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid lg:grid-cols-3 gap-6 mb-12"
          >
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <ContactCard />
              <ActionPanel />
            </div>
            
            {/* Letter */}
            <div className="lg:col-span-2">
              <LetterPanel />
            </div>
          </motion.div>

          {/* Live Map Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">
                Live PA Context
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base">
                Real-time overlays help staffers connect policy to on-the-ground reality (weather alerts, incidents, civic points of interest).
              </p>
            </div>
            <MapPanel />
          </motion.section>
        </div>
      </main>
      
      <Footer />
      <AIChatbot />
    </div>
  );
}
