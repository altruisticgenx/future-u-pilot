import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ChevronDown } from "lucide-react";
import { AIChatbot } from "@/components/AIChatbot";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const sectorFocusData = [
  {
    id: "01",
    title: "Student Workforce",
    mission: "Build Your Quantum Career Core",
    gist: "Stop waiting for tomorrow's jobs. Start mastering the code and concepts today—from your high school club to your college lab. We give you real quantum programming skills and hands-on experience—no PhD required. Secure your future and keep Pennsylvania talent at the forefront of innovation.",
    highlights: "Explore quantum coding projects, internships, and hackathons for students.",
    learnMore: "Sign up for workshops, virtual labs, and free online courses.",
  },
  {
    id: "02",
    title: "Energy",
    mission: "Power Grid. Smarter. Safer.",
    gist: "Quantum computers are the ultimate energy managers. They help power companies balance electricity supply, predict outages before they happen, and prevent cyber-attacks. Early results show major benefits: up to 22% energy savings, cleaner air, and lower monthly energy bills for your family.",
    highlights: "See how quantum simulates grids for efficiency and security.",
    learnMore: "Check out real-world case studies and energy innovation labs.",
  },
  {
    id: "03",
    title: "Healthcare",
    mission: "Diagnostics & Discovery. Accelerated.",
    gist: "Quantum technology is the ultimate cheat code for medicine. It dramatically speeds up drug discovery, simulates complex protein folding, and powers deep genetic analysis. Advanced quantum sensors will improve diagnostics and allow for truly personalized treatments. The result: faster cures and healthier communities.",
    highlights: "Discover how quantum speeds up research and disease detection.",
    learnMore: "Explore labs, internships, and healthcare innovation programs.",
  },
  {
    id: "04",
    title: "Government",
    mission: "Policy Frameworks. Future-Ready.",
    gist: "We work with state lawmakers to create practical rules and ethical guidelines that ensure Pennsylvania is the leader in quantum tech. This guarantees public safety, protects data privacy, and ensures fair access for everyone, all while promoting rapid innovation.",
    highlights: "Learn how quantum influences policy and public planning.",
    learnMore: "See how students can contribute to civic tech and advisory boards.",
  },
];

const SectorCard = ({ sector, index }: { sector: typeof sectorFocusData[0]; index: number }) => {
  const [highlightsOpen, setHighlightsOpen] = useState(false);
  const [learnMoreOpen, setLearnMoreOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="glass-card-3d backdrop-blur-xl border border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-300"
    >
      <h3 className="text-sm font-semibold uppercase text-accent tracking-widest mb-2">
        Sector Focus {sector.id}: {sector.title}
      </h3>
      <h4 className="text-2xl font-bold text-foreground mb-4">
        Mission: {sector.mission}
      </h4>
      <p className="text-muted-foreground leading-relaxed mb-6">
        <span className="font-semibold text-foreground">The Gist:</span> {sector.gist}
      </p>

      <div className="space-y-3">
        <Collapsible open={highlightsOpen} onOpenChange={setHighlightsOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
            <span className="font-semibold text-foreground">Key Highlights</span>
            <ChevronDown
              className={`h-5 w-5 text-primary transition-transform duration-300 ${
                highlightsOpen ? "rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 p-4 rounded-lg bg-card/50 border border-border">
            <p className="text-sm text-muted-foreground">{sector.highlights}</p>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible open={learnMoreOpen} onOpenChange={setLearnMoreOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg bg-accent/5 hover:bg-accent/10 transition-colors">
            <span className="font-semibold text-foreground">Learn More</span>
            <ChevronDown
              className={`h-5 w-5 text-accent transition-transform duration-300 ${
                learnMoreOpen ? "rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 p-4 rounded-lg bg-card/50 border border-border">
            <p className="text-sm text-muted-foreground">{sector.learnMore}</p>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </motion.div>
  );
};

const ROISection = () => {
  const [highlightsOpen, setHighlightsOpen] = useState(false);
  const [learnMoreOpen, setLearnMoreOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="glass-card-3d backdrop-blur-xl border border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-300"
    >
      <h3 className="text-sm font-semibold uppercase text-accent tracking-widest mb-2">
        Sector Focus 05: Return on Investment (ROI)
      </h3>
      <h4 className="text-2xl font-bold text-foreground mb-4">
        Core Metric: Exponential Payback
      </h4>
      <p className="text-muted-foreground leading-relaxed mb-6">
        Quantum investments deliver measurable, accelerated returns much faster than traditional 
        technology projects. These are not estimates; these are real-world results:
      </p>

      <div className="overflow-x-auto mb-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-3 font-semibold text-foreground">Sector</th>
              <th className="text-left p-3 font-semibold text-foreground">Payback Time</th>
              <th className="text-left p-3 font-semibold text-foreground">ROI Multiplier</th>
            </tr>
          </thead>
          <tbody>
            {[
              { sector: "Education", payback: "18 mo", roi: "4.3x" },
              { sector: "Energy", payback: "15 mo", roi: "3.8x" },
              { sector: "Healthcare", payback: "19 mo", roi: "3.2x" },
              { sector: "Governance", payback: "12 mo", roi: "5.1x" },
            ].map((row, i) => (
              <tr key={i} className="border-b border-border/50 hover:bg-primary/5 transition-colors">
                <td className="p-3 text-muted-foreground">{row.sector}</td>
                <td className="p-3 text-muted-foreground">{row.payback}</td>
                <td className="p-3 font-bold text-primary">{row.roi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-3">
        <Collapsible open={highlightsOpen} onOpenChange={setHighlightsOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
            <span className="font-semibold text-foreground">Key Highlights</span>
            <ChevronDown
              className={`h-5 w-5 text-primary transition-transform duration-300 ${
                highlightsOpen ? "rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 p-4 rounded-lg bg-card/50 border border-border">
            <p className="text-sm text-muted-foreground">
              Quantum technology accelerates learning, efficiency, and innovation.
            </p>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible open={learnMoreOpen} onOpenChange={setLearnMoreOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg bg-accent/5 hover:bg-accent/10 transition-colors">
            <span className="font-semibold text-foreground">Learn More</span>
            <ChevronDown
              className={`h-5 w-5 text-accent transition-transform duration-300 ${
                learnMoreOpen ? "rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 p-4 rounded-lg bg-card/50 border border-border">
            <p className="text-sm text-muted-foreground">
              See how each sector benefits from measurable results.
            </p>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </motion.div>
  );
};

const VisionCoreSection = () => {
  const [highlightsOpen, setHighlightsOpen] = useState(false);
  const [learnMoreOpen, setLearnMoreOpen] = useState(false);

  return (
    <section className="relative z-10 py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-8"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
            Vision Core: Pennsylvania 2.0
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-6 text-left">
            <p className="text-lg font-semibold text-foreground">We aim to:</p>
            <ol className="space-y-4 text-muted-foreground leading-relaxed">
              <li className="flex gap-3">
                <span className="font-bold text-primary">1.</span>
                <span>Train the next generation of quantum innovators—that's you.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary">2.</span>
                <span>Power smarter energy grids and secure our critical infrastructure.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary">3.</span>
                <span>Revolutionize medicine and healthcare delivery.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary">4.</span>
                <span>Support evidence-based policies for a quantum-ready future.</span>
              </li>
            </ol>

            <p className="text-xl font-bold text-center text-foreground pt-6">
              Final Transmission: Empower students, advance industries, and transform Pennsylvania.
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-3 pt-6">
            <Collapsible open={highlightsOpen} onOpenChange={setHighlightsOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
                <span className="font-semibold text-foreground">Key Highlights</span>
                <ChevronDown
                  className={`h-5 w-5 text-primary transition-transform duration-300 ${
                    highlightsOpen ? "rotate-180" : ""
                  }`}
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 p-4 rounded-lg bg-card/50 border border-border">
                <p className="text-sm text-muted-foreground">
                  Hands-on learning, career pathways, and real-world impact.
                </p>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible open={learnMoreOpen} onOpenChange={setLearnMoreOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 rounded-lg bg-accent/5 hover:bg-accent/10 transition-colors">
                <span className="font-semibold text-foreground">Learn More</span>
                <ChevronDown
                  className={`h-5 w-5 text-accent transition-transform duration-300 ${
                    learnMoreOpen ? "rotate-180" : ""
                  }`}
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 p-4 rounded-lg bg-card/50 border border-border">
                <p className="text-sm text-muted-foreground">
                  Join programs, competitions, and mentorship networks.
                </p>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="relative overflow-hidden">
        {/* Ambient Motion Light */}
        <div className="absolute inset-0 pointer-events-none ambient-light" />

        {/* Hero Section */}
        <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent"
          >
            Access Point: Quantum Future
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
            className="text-2xl sm:text-3xl font-semibold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent"
          >
            Pennsylvania Quantum Initiative
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
            className="max-w-3xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed"
          >
            This is an AI consultancy that helps local businesses grow while also running open-source, 
            experimental AI projects that let students and tech enthusiasts learn, build, and explore in 
            a hands-on way. They're blending real-world impact with community-driven innovation.
          </motion.p>
        </section>

        {/* Sector Focus Cards */}
        <section className="relative z-10 py-24 bg-muted/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            {sectorFocusData.map((sector, i) => (
              <SectorCard key={sector.id} sector={sector} index={i} />
            ))}

            {/* ROI Section */}
            <ROISection />
          </div>
        </section>

        {/* Vision Core Section */}
        <VisionCoreSection />
      </div>

      <Footer />
      <AIChatbot />
    </div>
  );
};

export default About;
