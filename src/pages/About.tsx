import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Zap, Heart, Scale, TrendingUp, Users, Brain, Shield } from "lucide-react";

const stakeholders = [
  {
    icon: GraduationCap,
    title: "Student Perspective",
    name: "The Next Generation",
    description: "Opening quantum career pathways from K-12 to industry, demystifying quantum programming, and empowering Pennsylvania students to build high-value careers without leaving the state.",
    highlights: [
      "Career pathways beyond traditional degrees",
      "Accessible quantum programming curricula",
      "Retention of talent within Pennsylvania"
    ],
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    icon: Zap,
    title: "Energy Sector",
    name: "Grid Optimization Specialist",
    description: "Leveraging quantum computing for real-time grid management, distributed energy resources, and quantum key distribution to safeguard critical infrastructure against cyber threats.",
    highlights: [
      "22% energy savings in pilot studies",
      "Quantum-secure infrastructure protection",
      "Cleaner air through optimized emissions"
    ],
    color: "from-yellow-500/20 to-orange-500/20"
  },
  {
    icon: Heart,
    title: "Healthcare Innovation",
    name: "Medical Research",
    description: "Accelerating drug discovery through quantum molecular simulation, enhancing diagnostics with quantum sensing, and enabling personalized medicine through genetic analysis.",
    highlights: [
      "Rapid protein and molecular simulation",
      "Non-invasive quantum imaging (MRI)",
      "Individualized healthcare solutions"
    ],
    color: "from-red-500/20 to-pink-500/20"
  },
  {
    icon: Scale,
    title: "Governance & Policy",
    name: "Legislative Framework",
    description: "Establishing advisory structures, ethics commissions, and seed funding to position Pennsylvania as a leader while ensuring innovation serves the public good.",
    highlights: [
      "Quantum Initiative Advisory Board",
      "Ethics and Governance Commission",
      "Economic rights and technological sovereignty"
    ],
    color: "from-purple-500/20 to-indigo-500/20"
  }
];

const investmentMetrics = [
  { sector: "Education", payback: "18 months", roi: "4.3x", icon: GraduationCap },
  { sector: "Energy", payback: "15 months", roi: "3.8x", icon: Zap },
  { sector: "Healthcare", payback: "19 months", roi: "3.2x", icon: Heart },
  { sector: "Governance", payback: "12 months", roi: "5.1x", icon: Scale }
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]" />
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm"
            >
              <Brain className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Pennsylvania Quantum Initiative
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
              <span className="block text-foreground">The Quantum Leap</span>
              <span className="block bg-gradient-hero bg-clip-text text-transparent mt-2">
                Pennsylvania's Roadmap to a Quantum Future
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Pennsylvania stands on the brink of a quantum revolution that unites education, energy, healthcare, and governance for statewide transformation. We're building robust pipelines from K-12 classrooms to quantum industry jobs, driving energy optimization, advancing healthcare diagnostics, and securing Pennsylvania's economic future through policy innovation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stakeholder Perspectives */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Four Perspectives, One Vision
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Pennsylvania's quantum ecosystem connects students, energy experts, healthcare innovators, and policymakers in a unified transformation strategy.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {stakeholders.map((stakeholder, index) => {
              const Icon = stakeholder.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <Card className={`h-full backdrop-blur-md bg-gradient-to-br ${stakeholder.color} border-2 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl`}>
                    <CardContent className="p-8 space-y-6">
                      <div className="flex items-start gap-4">
                        <motion.div 
                          className="p-4 rounded-xl bg-primary/10 shrink-0"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Icon className="h-8 w-8 text-primary" />
                        </motion.div>
                        <div>
                          <h3 className="text-2xl font-bold mb-1">{stakeholder.title}</h3>
                          <p className="text-sm text-muted-foreground italic">{stakeholder.name}</p>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground leading-relaxed">
                        {stakeholder.description}
                      </p>

                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-foreground">Key Highlights:</p>
                        <ul className="space-y-2">
                          {stakeholder.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <Shield className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ROI Metrics */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Projected Return on Investment
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Economic models and case study data demonstrate robust, sector-specific ROI for quantum implementation across Pennsylvania's key sectors.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {investmentMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="backdrop-blur-md bg-card/60 border-2 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
                    <CardContent className="p-6 text-center space-y-4">
                      <div className="flex justify-center">
                        <div className="p-3 rounded-xl bg-primary/10">
                          <Icon className="h-8 w-8 text-primary" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">{metric.sector}</h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                            <TrendingUp className="h-4 w-4 text-green-500" />
                            <span>Payback: <strong className="text-foreground">{metric.payback}</strong></span>
                          </div>
                          <div className="text-2xl font-bold text-primary">
                            {metric.roi}
                          </div>
                          <p className="text-xs text-muted-foreground">Return on Investment</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <Users className="h-12 w-12 text-primary mx-auto" />
              <h2 className="text-3xl sm:text-4xl font-bold">Our Vision</h2>
            </div>
            
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Pennsylvania stands at the intersection of tradition and transformation. By connecting the perspectives of students, energy experts, healthcare innovators, and policymakers—and tying their ambitions to both proven frameworks and visionary quantum agendas—the state can become a true leader in quantum-driven economic and societal growth.
              </p>
              <p>
                With sustained investment, ethical governance, and ongoing educational reform, this quantum leap promises not only technological advance but a more competitive, equitable, and resilient future for all Pennsylvanians.
              </p>
              <blockquote className="border-l-4 border-primary pl-6 italic text-xl">
                "Quantum computing will not just compute—it will sense, simulate, and understand. Pennsylvania can be the first to architect that coherence."
              </blockquote>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-8"
          >
            <Card className="backdrop-blur-md bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/30">
              <CardContent className="p-12 space-y-6">
                <h2 className="text-3xl sm:text-4xl font-bold">
                  Join Pennsylvania's Quantum Future
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Whether you're an educator, researcher, policymaker, or industry leader—there's a place for you in Pennsylvania's quantum ecosystem.
                </p>
                <motion.button
                  onClick={() => window.location.href = "#contact"}
                  className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold shadow-xl hover:shadow-2xl transition-all"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Involved Today
                </motion.button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
