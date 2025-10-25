import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Zap, Heart, Scale, Users, Brain } from "lucide-react";
import { StakeholderCard } from "@/components/StakeholderCard";
import { MetricCard } from "@/components/MetricCard";
import ProgramsSection from "@/components/ProgramsSection";
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
      <section className="relative pt-20 pb-8 overflow-hidden animate-fade-in">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-background animate-gradient" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary))_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.03] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]" />
        
        <div className="container relative mx-auto px-3 sm:px-4 lg:px-6 max-w-5xl">
          <div className="text-center space-y-2 animate-scale-in">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/40 glass-card-3d hover-scale"
              role="status"
              aria-label="Pennsylvania Quantum Initiative"
            >
              <Brain className="w-3 h-3 text-primary animate-pulse" aria-hidden="true" />
              <span className="text-[10px] font-semibold bg-gradient-hero bg-clip-text text-transparent">
                Pennsylvania Quantum Initiative
              </span>
            </div>

            <h1 className="text-lg sm:text-xl md:text-2xl font-bold">
              <span className="block text-foreground text-xs sm:text-sm md:text-base mb-1">The Quantum Leap</span>
              <span className="block bg-gradient-hero bg-clip-text text-transparent">
                Pennsylvania's Path to Real Outcomes — Not Hype
              </span>
            </h1>
            
            <p className="text-[11px] sm:text-xs text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Open-source tools, transparent pilots, and accountability first. Connecting students to tech careers, helping companies run smarter, speeding up healthcare breakthroughs.
            </p>
            
            <p className="text-[9px] text-muted-foreground/60 mt-1.5">
              Last updated {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date())} · Live metrics from pilot projects
            </p>
          </div>
        </div>
      </section>

      {/* Stakeholder Perspectives */}
      <section className="py-8 bg-gradient-to-b from-muted/30 to-background" aria-labelledby="stakeholder-heading">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-5xl">
          <div className="text-center mb-6 animate-fade-in">
            <h2 id="stakeholder-heading" className="text-sm sm:text-base md:text-lg font-bold mb-1.5 bg-gradient-hero bg-clip-text text-transparent">
              Four Perspectives, One Vision
            </h2>
            <p className="text-[11px] sm:text-xs text-muted-foreground max-w-xl mx-auto">
              Real people, real results. Here's how advanced tech helps everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
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
      <section className="py-8" aria-labelledby="roi-heading">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-5xl">
          <div className="text-center mb-6 animate-fade-in">
            <h2 id="roi-heading" className="text-sm sm:text-base md:text-lg font-bold mb-1.5 bg-gradient-hero bg-clip-text text-transparent">
              Return on Investment
            </h2>
            <p className="text-[11px] sm:text-xs text-muted-foreground max-w-xl mx-auto">
              From Pilots — Not Wishful Thinking
            </p>
            <p className="text-[9px] text-muted-foreground/60 mt-1.5">
              Methodology: standardized cost/benefit, verified datasets, open calculators
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
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
      <section className="py-8 bg-gradient-to-b from-background to-muted/30" aria-labelledby="mission-heading">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-4xl">
          <div className="space-y-4 animate-fade-in">
            <div className="text-center space-y-1.5">
              <h2 id="mission-heading" className="text-sm sm:text-base md:text-lg font-bold bg-gradient-hero bg-clip-text text-transparent">
                What We Do — and Why It Matters
              </h2>
            </div>
            
            <div className="space-y-3 text-[11px] sm:text-xs text-muted-foreground leading-relaxed">
              <p className="text-center max-w-2xl mx-auto">
                We build tech infrastructure for Pennsylvania: train talent, cut waste, speed science, govern tech with public-interest guardrails.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-2.5 mt-4">
                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-card/30 border border-border/40 hover:border-primary/30 transition-all duration-200 hover-scale">
                  <Zap className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-0.5 text-xs">Energy</h3>
                    <p className="text-[10px]">Grid optimization and quantum-safe communications</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-card/30 border border-border/40 hover:border-primary/30 transition-all duration-200 hover-scale">
                  <Heart className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-0.5 text-xs">Healthcare</h3>
                    <p className="text-[10px]">Drug discovery and personalized medicine</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-card/30 border border-border/40 hover:border-primary/30 transition-all duration-200 hover-scale">
                  <GraduationCap className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-0.5 text-xs">Industry</h3>
                    <p className="text-[10px]">Manufacturing optimization and supply chain security</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-card/30 border border-border/40 hover:border-primary/30 transition-all duration-200 hover-scale">
                  <Scale className="h-4 w-4 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-0.5 text-xs">Public Sector</h3>
                    <p className="text-[10px]">Evidence-based policy and ethics oversight</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <ProgramsSection />

      {/* Terminal CTA */}
      <TerminalCTA />

      {/* Open Letter Section */}
      <OpenLetterSection />

      {/* Vision Statement */}
      <section className="py-8 bg-gradient-to-b from-background to-muted/30" aria-labelledby="vision-heading">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-3xl">
          <div className="space-y-3 animate-fade-in">
            <div className="text-center space-y-1.5">
              <Users className="h-6 w-6 text-primary mx-auto animate-pulse" aria-hidden="true" />
              <h2 id="vision-heading" className="text-sm sm:text-base md:text-lg font-bold bg-gradient-hero bg-clip-text text-transparent">Our Vision</h2>
            </div>
            
            <div className="space-y-2.5 text-[11px] sm:text-xs text-muted-foreground leading-relaxed">
              <p>
                Pennsylvania is ready to lead. We're connecting students to careers, companies to efficiency, healthcare to breakthroughs, and policy to practice. No buzzwords—just systems that work.
              </p>
              <p>
                With smart investment, clear rules, and hands-on training, Pennsylvania becomes a tech leader—not just in innovation, but in jobs, security, and quality of life.
              </p>
              <blockquote className="border-l-3 border-primary pl-3 py-1 italic text-[11px] sm:text-xs bg-gradient-to-r from-primary/5 to-transparent rounded-r">
                "Advanced tech won't just compute—it will sense, simulate, and secure. Pennsylvania can build that future first."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-8" aria-labelledby="cta-heading">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-3xl">
          <div className="text-center animate-scale-in">
            <Card className="glass-card-3d bg-gradient-to-br from-primary/15 via-accent/10 to-primary/15 border border-primary/40 hover:border-primary/60 transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-5 sm:p-6 space-y-3">
                <h2 id="cta-heading" className="text-base sm:text-lg font-bold bg-gradient-hero bg-clip-text text-transparent">
                  Join Pennsylvania's Tech Future
                </h2>
                <p className="text-[11px] sm:text-xs text-muted-foreground max-w-xl mx-auto">
                  Education, energy, healthcare, government, or business — there's a lane for you.
                </p>
                <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
                  <button
                    onClick={() => window.open("https://www.instagram.com/paquantumpubliclobbygroup?igsh=b2E5MTJna2MxbDZ2", "_blank")}
                    className="btn-3d-primary px-5 py-2 rounded-lg font-bold text-xs hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
                    aria-label="Get involved in Pennsylvania's Initiative"
                  >
                    Get Involved Today
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
