import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Zap, Heart, Scale, TrendingUp, Users, Brain, Shield } from "lucide-react";

const stakeholders = [
  {
    icon: GraduationCap,
    title: "Students",
    name: "Tomorrow's Quantum Workforce",
    description: "We're making quantum careers accessible from K-12 through university. Students learn quantum programming without needing a PhD, and Pennsylvania keeps its talent instead of losing it to Silicon Valley.",
    highlights: [
      "Real career paths, not just theory",
      "Quantum programming made accessible",
      "High-paying jobs without leaving PA"
    ],
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    icon: Zap,
    title: "Energy Companies",
    name: "Smarter Grids, Secure Infrastructure",
    description: "Quantum computing helps manage power grids in real-time and secure critical infrastructure against future cyber threats. Pilot studies show 22% energy savings—cleaner air, lower costs.",
    highlights: [
      "22% energy savings proven in pilots",
      "Future-proof security against quantum hackers",
      "Real-time grid optimization"
    ],
    color: "from-yellow-500/20 to-orange-500/20"
  },
  {
    icon: Heart,
    title: "Healthcare",
    name: "Faster Breakthroughs, Better Care",
    description: "Quantum computing accelerates drug discovery by simulating molecules faster than traditional computers. It also improves diagnostics through quantum sensors and enables truly personalized medicine.",
    highlights: [
      "Faster drug discovery through simulation",
      "Better diagnostics with quantum sensors",
      "Personalized treatment plans"
    ],
    color: "from-red-500/20 to-pink-500/20"
  },
  {
    icon: Scale,
    title: "Government & Policy",
    name: "Smart Frameworks That Work",
    description: "We help legislative bodies create practical policies—advisory boards, ethics guidelines, seed funding—that position Pennsylvania as a quantum leader while protecting public interest.",
    highlights: [
      "Advisory boards that actually advise",
      "Ethics frameworks that make sense",
      "Economic sovereignty, not dependency"
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
              Pennsylvania is building a quantum-ready future. We're connecting students to quantum careers, helping energy companies optimize grids, accelerating healthcare breakthroughs, and crafting policy frameworks that actually work—all through hands-on pilots that prove value fast.
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
              Real people, real sectors, real results—here's how Pennsylvania's quantum initiative impacts everyone from students to policymakers.
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
              Real numbers from real pilots—quantum implementation pays back fast across all sectors.
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
                Pennsylvania is ready to lead. We're connecting students to careers, energy to efficiency, healthcare to breakthroughs, and policy to practice. This isn't about buzzwords—it's about building systems that work.
              </p>
              <p>
                With smart investment, clear ethics, and practical training, Pennsylvania becomes a quantum leader—not just in technology, but in jobs, security, and quality of life.
              </p>
              <blockquote className="border-l-4 border-primary pl-6 italic text-xl">
                "Quantum won't just compute—it will sense, simulate, and secure. Pennsylvania can architect that future first."
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
                  Whether you're in education, energy, healthcare, government, or business—Pennsylvania's quantum future needs you.
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
