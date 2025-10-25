import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Zap, Heart, Scale, Users, Brain } from "lucide-react";
import { StakeholderCard } from "@/components/StakeholderCard";
import { MetricCard } from "@/components/MetricCard";
import ProgramsSection from "@/components/ProgramsSection";
import OpenProjectsGrid from "@/components/OpenProjectsGrid";
import TerminalCTA from "@/components/TerminalCTA";
import OpenLetterSection from "@/components/OpenLetterSection";

const stakeholders = [
  {
    icon: GraduationCap,
    title: "Students",
    subtitle: "Tomorrow's Tech Workforce (Live)",
    description: "Making quantum tech jobs accessible from K-12 through community college. Learn quantum computing, cryptography, and sensing without needing a PhD. Paid fellowships, open lab time, and career-ready repositories.",
    highlights: [
      "Paid fellowships · Open lab time · Career-ready repos",
      "K-12 through community college pathways",
      "Keep Pennsylvania talent in Pennsylvania"
    ],
    color: "from-blue-500/15 via-cyan-500/10 to-blue-500/15"
  },
  {
    icon: Zap,
    title: "Energy",
    subtitle: "Smarter Grids & Quantum Security (Live)",
    description: "Quantum optimization for demand shaping, photonic networking pilots, and post-quantum cryptography (PQC) migration for grid operators. Real tests show 22% energy savings and quantum-safe communications.",
    highlights: [
      "Demand shaping · PQC migration · Incident drills",
      "22% energy savings in real tests",
      "Quantum Key Distribution (QKD) pilots"
    ],
    color: "from-yellow-500/15 via-orange-500/10 to-yellow-500/15"
  },
  {
    icon: Heart,
    title: "Healthcare",
    subtitle: "Accelerated Medical Innovation (Live)",
    description: "Quantum molecular simulation for drug discovery, GAMA algorithm (Carnegie Mellon) for treatment optimization, and de-identified data pipelines with model cards for traceable, explainable results.",
    highlights: [
      "De-identified pipelines · Model cards · Traceable results",
      "GAMA algorithm for personalized treatment",
      "Quantum sensors for better diagnostics"
    ],
    color: "from-red-500/15 via-pink-500/10 to-red-500/15"
  },
  {
    icon: Scale,
    title: "Policy & Governance",
    subtitle: "Evidence, Not Vibes (Live)",
    description: "Regulatory diffing tools track policy changes, impact scoring for small businesses, plain-language briefs for lawmakers, and Quantum Ethics & Governance Commission oversight for AI/quantum applications.",
    highlights: [
      "Regulatory diffing · Impact scoring · Plain-language briefs",
      "Quantum Ethics & Governance Commission",
      "Evidence-based policy, not buzzwords"
    ],
    color: "from-purple-500/15 via-indigo-500/10 to-purple-500/15"
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
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-background animate-gradient" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary))_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.03] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]" />
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-3"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/40 glass-card-3d"
              role="status"
              aria-label="Pennsylvania Quantum Initiative"
            >
              <Brain className="w-3 h-3 text-primary animate-pulse" aria-hidden="true" />
              <span className="text-[11px] font-medium bg-gradient-hero bg-clip-text text-transparent">
                Pennsylvania Quantum Initiative
              </span>
            </motion.div>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
              <span className="block text-foreground text-sm sm:text-base md:text-lg mb-1">The Quantum Leap</span>
              <span className="block bg-gradient-hero bg-clip-text text-transparent">
                Pennsylvania's Path to Real Outcomes — Not Hype
              </span>
            </h1>
            
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Open-source tools, transparent pilots, and accountability first. Connecting students to tech careers, helping companies run smarter, speeding up healthcare breakthroughs.
            </p>
            
            <p className="text-[10px] text-muted-foreground/60 mt-2">
              Last updated {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date())} · Live metrics from pilot projects
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stakeholder Perspectives */}
      <section className="py-12 bg-gradient-to-b from-muted/30 to-background" aria-labelledby="stakeholder-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 id="stakeholder-heading" className="text-base sm:text-lg md:text-xl font-bold mb-2 bg-gradient-hero bg-clip-text text-transparent">
              Four Perspectives, One Vision
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
              Real people, real results. Here's how quantum helps everyone.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            {stakeholders.map((stakeholder, index) => (
              <StakeholderCard
                key={index}
                {...stakeholder}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ROI Metrics */}
      <section className="py-12" aria-labelledby="roi-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 id="roi-heading" className="text-base sm:text-lg md:text-xl font-bold mb-2 bg-gradient-hero bg-clip-text text-transparent">
              Return on Investment
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
              From Pilots — Not Wishful Thinking
            </p>
            <p className="text-[10px] text-muted-foreground/60 mt-2">
              Methodology: standardized cost/benefit, verified datasets, open calculators
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {investmentMetrics.map((metric, index) => (
              <MetricCard
                key={index}
                {...metric}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-12 bg-gradient-to-b from-background to-muted/30" aria-labelledby="mission-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <h2 id="mission-heading" className="text-base sm:text-lg md:text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                What We Do — and Why It Matters
              </h2>
            </div>
            
            <div className="space-y-4 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              <p className="text-center max-w-2xl mx-auto">
                We build quantum-ready infrastructure for Pennsylvania: train talent, cut waste, speed science, govern tech with public-interest guardrails.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-3 mt-6">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-card/30 border border-border/40">
                  <Zap className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Energy</h3>
                    <p className="text-xs">Grid optimization and quantum-safe communications</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-card/30 border border-border/40">
                  <Heart className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Healthcare</h3>
                    <p className="text-xs">Drug discovery and personalized medicine</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-card/30 border border-border/40">
                  <GraduationCap className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Industry</h3>
                    <p className="text-xs">Manufacturing optimization and supply chain security</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-card/30 border border-border/40">
                  <Scale className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Public Sector</h3>
                    <p className="text-xs">Evidence-based policy and ethics oversight</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Programs Section */}
      <ProgramsSection />

      {/* Open Projects Section */}
      <OpenProjectsGrid />

      {/* Terminal CTA */}
      <TerminalCTA />

      {/* Open Letter Section */}
      <OpenLetterSection />

      {/* Vision Statement */}
      <section className="py-12 bg-gradient-to-b from-background to-muted/30" aria-labelledby="vision-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="text-center space-y-2">
              <Users className="h-7 w-7 text-primary mx-auto animate-pulse" aria-hidden="true" />
              <h2 id="vision-heading" className="text-base sm:text-lg md:text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">Our Vision</h2>
            </div>
            
            <div className="space-y-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              <p>
                Pennsylvania is ready to lead. We're connecting students to careers, companies to efficiency, healthcare to breakthroughs, and policy to practice. No buzzwords—just systems that work.
              </p>
              <p>
                With smart investment, clear rules, and hands-on training, Pennsylvania becomes a quantum leader—not just in tech, but in jobs, security, and quality of life.
              </p>
              <blockquote className="border-l-3 border-primary pl-4 py-1.5 italic text-xs sm:text-sm bg-gradient-to-r from-primary/5 to-transparent rounded-r">
                "Quantum won't just compute—it will sense, simulate, and secure. Pennsylvania can build that future first."
              </blockquote>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12" aria-labelledby="cta-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Card className="glass-card-3d bg-gradient-to-br from-primary/15 via-accent/10 to-primary/15 border border-primary/40">
              <CardContent className="p-6 sm:p-8 space-y-4">
                <h2 id="cta-heading" className="text-lg sm:text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                  Join Pennsylvania's Quantum Future
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
                  Education, energy, healthcare, government, or business — there's a lane for you.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <motion.button
                    onClick={() => window.location.href = "/#contact"}
                    className="btn-3d-primary px-6 py-2.5 rounded-lg font-semibold text-xs sm:text-sm"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    aria-label="Get involved in Pennsylvania's Quantum Initiative"
                  >
                    Get Involved Today
                  </motion.button>
                  <motion.button
                    onClick={() => window.location.href = "mailto:paquantumpubliclobbygroup@gmail.com"}
                    className="px-6 py-2.5 rounded-lg font-semibold text-xs sm:text-sm border border-primary/40 hover:bg-primary/10 transition-colors"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    aria-label="Partner with Pennsylvania Quantum Initiative"
                  >
                    Partner With Us
                  </motion.button>
                </div>
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
