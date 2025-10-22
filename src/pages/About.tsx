import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Heart, Zap, Users } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description: "Advancing quantum and AI literacy for public, educational, and organizational transformation.",
  },
  {
    icon: Heart,
    title: "Public Interest First",
    description: "Building solutions that serve communities, not just profit margins.",
  },
  {
    icon: Zap,
    title: "Innovation with Responsibility",
    description: "Cutting-edge technology balanced with ethical considerations and societal impact.",
  },
  {
    icon: Users,
    title: "Collaborative Approach",
    description: "Partnering with institutions, governments, and enterprises to create lasting change.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-primary/5" />
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
              <span className="block text-foreground">About</span>
              <span className="block bg-gradient-hero bg-clip-text text-transparent mt-2">
                AltruisticXAI
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We're a small, senior team building explainable AI workflows and quantum-ready roadmaps with public-interest DNA. Our mission is to empower organizations and communities with the knowledge and tools needed for the quantum-AI era.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-center mb-16"
          >
            Our Values
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <Card className="h-full backdrop-blur-md bg-card/60 border-2 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
                    <CardContent className="p-8 space-y-4">
                      <motion.div 
                        className="inline-flex p-4 rounded-xl bg-primary/10"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon className="h-8 w-8 text-primary" />
                      </motion.div>
                      <h3 className="text-2xl font-bold">{value.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6 text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold">Our Story</h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                AltruisticXAI was born from a simple belief: quantum computing and AI shouldn't be locked behind corporate walls or academic ivory towers.
              </p>
              <p>
                We bridge the gap between cutting-edge technology and practical, responsible implementation—helping governments, universities, and enterprises navigate the quantum-AI transition without the buzzword theater.
              </p>
              <p>
                From pilot programs to production systems, we're building the infrastructure for a future where advanced technology serves the public good.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
