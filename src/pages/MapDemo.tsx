import { Map } from "@/components/Map";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Globe, MapPin, Zap } from "lucide-react";

const MapDemo = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-6 mb-16"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                Global <span className="bg-gradient-hero bg-clip-text text-transparent">Reach</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Our solutions scale from local pilots to worldwide deployments
              </p>
            </motion.div>

            {/* Map Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="w-full h-[600px] glass-card-3d rounded-2xl overflow-hidden"
            >
              <Map
                className="w-full h-full"
                style="mapbox://styles/mapbox/dark-v11"
                enableRotation={true}
              />
            </motion.div>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid md:grid-cols-3 gap-6 mt-16"
            >
              <div className="glass-card-3d p-6 rounded-xl text-center">
                <Globe className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Global Scale</h3>
                <p className="text-muted-foreground">
                  Deploy across continents with consistent performance
                </p>
              </div>

              <div className="glass-card-3d p-6 rounded-xl text-center">
                <MapPin className="w-12 h-12 mx-auto mb-4 text-accent" />
                <h3 className="text-xl font-semibold mb-2">Local Compliance</h3>
                <p className="text-muted-foreground">
                  Meet regional requirements while maintaining global standards
                </p>
              </div>

              <div className="glass-card-3d p-6 rounded-xl text-center">
                <Zap className="w-12 h-12 mx-auto mb-4 text-primary-glow" />
                <h3 className="text-xl font-semibold mb-2">Rapid Deployment</h3>
                <p className="text-muted-foreground">
                  From pilot to production in under 8 weeks
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default MapDemo;
