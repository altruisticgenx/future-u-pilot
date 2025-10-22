import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Building2, Shield, Users, Lightbulb, Rocket, TrendingUp } from "lucide-react";

const initiatives = [
  {
    id: 1,
    title: "Quantum Computing Education Program",
    sector: "Education",
    status: "Active",
    icon: GraduationCap,
    description: "Partnering with 15+ universities to integrate quantum computing curricula and provide hands-on quantum hardware access to students.",
    impact: "1,200+ students enrolled",
    timeline: "2024-2026",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    title: "AI Literacy for Public Sector",
    sector: "Government",
    status: "Active",
    icon: Building2,
    description: "Training government officials and public sector employees on AI fundamentals, ethical considerations, and practical applications.",
    impact: "500+ officials trained",
    timeline: "2024-2025",
    color: "from-violet-500 to-purple-500",
  },
  {
    id: 3,
    title: "K-12 Quantum Awareness Initiative",
    sector: "Education",
    status: "Launching Q2 2025",
    icon: Lightbulb,
    description: "Developing age-appropriate quantum mechanics content and interactive simulations for middle and high school students.",
    impact: "Targeting 50,000+ students",
    timeline: "2025-2027",
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: 4,
    title: "Organizational AI Readiness Assessment",
    sector: "Enterprise",
    status: "Active",
    icon: TrendingUp,
    description: "Helping organizations assess their AI maturity, identify quantum-safe cryptography needs, and develop transformation roadmaps.",
    impact: "45+ organizations assessed",
    timeline: "2024-2026",
    color: "from-orange-500 to-pink-500",
  },
  {
    id: 5,
    title: "Quantum-Safe Cryptography Transition",
    sector: "Security",
    status: "Active",
    icon: Shield,
    description: "Guiding organizations through the transition to post-quantum cryptographic standards to protect against future quantum threats.",
    impact: "12+ critical infrastructure partners",
    timeline: "2024-2030",
    color: "from-red-500 to-rose-500",
  },
  {
    id: 6,
    title: "Pennsylvania Quantum Public Lobby Group",
    sector: "Advocacy",
    status: "Active",
    icon: Users,
    description: "Grassroots advocacy initiative connecting scientists and academics to advance quantum computing policy and education in Pennsylvania. Focused on applying quantum solutions to current challenges through community engagement and legislative outreach.",
    impact: "Community-driven initiative",
    timeline: "2024-Present",
    color: "from-indigo-500 to-blue-500",
  },
  {
    id: 7,
    title: "Open Quantum Hardware Platform",
    sector: "Research",
    status: "Planning",
    icon: Rocket,
    description: "Creating accessible quantum computing testbeds for educational institutions and research organizations worldwide.",
    impact: "Global accessibility target",
    timeline: "2025-2028",
    color: "from-fuchsia-500 to-pink-500",
  },
];

const Initiatives = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]" />
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
              <span className="block text-foreground">Current Initiatives</span>
              <span className="block bg-gradient-hero bg-clip-text text-transparent mt-2">
                Empowering Quantum & AI Literacy
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Our active programs bring cutting-edge quantum computing and AI education to educational institutions, public organizations, and enterprises worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Initiatives Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {initiatives.map((initiative, index) => {
              const Icon = initiative.icon;
              return (
                <motion.div
                  key={initiative.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group"
                >
                  <Card className="h-full backdrop-blur-md bg-card/60 border-2 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 overflow-hidden relative">
                    {/* 3D Effect Layer */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Animated border glow */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-lg opacity-0 group-hover:opacity-20 blur-sm transition-all duration-300" />
                    
                    <CardHeader className="relative z-10">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <motion.div 
                          className={`p-3 rounded-xl bg-gradient-to-br ${initiative.color} shadow-lg`}
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Icon className="h-6 w-6 text-white" />
                        </motion.div>
                        <Badge 
                          variant={initiative.status === "Active" ? "default" : initiative.status.includes("Launching") ? "secondary" : "outline"}
                          className={
                            initiative.status === "Active"
                              ? "bg-green-500/10 text-green-500 border-green-500/20 animate-pulse-soft"
                              : initiative.status.includes("Launching")
                              ? "bg-orange-500/10 text-orange-500 border-orange-500/20"
                              : "bg-muted/50"
                          }
                        >
                          {initiative.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <Badge variant="outline" className="text-xs">
                          {initiative.sector}
                        </Badge>
                        <CardTitle className="text-lg sm:text-xl leading-tight group-hover:text-primary transition-colors">
                          {initiative.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="relative z-10 space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {initiative.description}
                      </p>
                      
                      <div className="pt-3 border-t border-border/50 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground font-medium">Impact:</span>
                          <span className="text-primary font-semibold">{initiative.impact}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground font-medium">Timeline:</span>
                          <span className="text-foreground font-semibold">{initiative.timeline}</span>
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

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl font-bold">Join Our Mission</h2>
            <p className="text-lg text-muted-foreground">
              Partner with us to bring quantum and AI literacy to your organization or community.
            </p>
            <motion.button
              onClick={() => {
                const contact = document.getElementById("contact");
                if (contact) contact.scrollIntoView({ behavior: "smooth" });
                else window.location.href = "/#contact";
              }}
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Involved
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Initiatives;
