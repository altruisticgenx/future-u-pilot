import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ChevronDown, Zap, Shield, Activity, Users, TrendingUp, Target, BarChart3 } from "lucide-react";
import { AIChatbot } from "@/components/AIChatbot";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useSectorData } from "@/hooks/useSectorData";
import { MarketDataPanel } from "@/components/MarketDataPanel";
import { APIExplorer } from "@/components/APIExplorer";
import { ROIChart } from "@/components/ROIChart";
import { QuantumDashboard } from "@/components/QuantumDashboard";
import { Skeleton } from "@/components/ui/skeleton";

const sectorFocusData = [
  {
    id: "01",
    title: "Student Workforce",
    apiKey: "students",
    mission: "Build Your Quantum Career Core",
    icon: Users,
    color: "cyan",
    gist: "Stop waiting for tomorrow's jobs. Start mastering the code and concepts today—from your high school club to your college lab. We give you real quantum programming skills and hands-on experience—no PhD required. Secure your future and keep Pennsylvania talent at the forefront of innovation.",
  },
  {
    id: "02",
    title: "Energy",
    apiKey: "energy",
    mission: "Power Grid. Smarter. Safer.",
    icon: Zap,
    color: "green",
    gist: "Quantum computers are the ultimate energy managers. They help power companies balance electricity supply, predict outages before they happen, and prevent cyber-attacks. Early results show major benefits: up to 22% energy savings, cleaner air, and lower monthly energy bills for your family.",
  },
  {
    id: "03",
    title: "Healthcare",
    apiKey: "healthcare",
    mission: "Diagnostics & Discovery. Accelerated.",
    icon: Activity,
    color: "fuchsia",
    gist: "Quantum technology is the ultimate cheat code for medicine. It dramatically speeds up drug discovery, simulates complex protein folding, and powers deep genetic analysis. Advanced quantum sensors will improve diagnostics and allow for truly personalized treatments. The result: faster cures and healthier communities.",
  },
  {
    id: "04",
    title: "Government",
    apiKey: "governance",
    mission: "Policy Frameworks. Future-Ready.",
    icon: Shield,
    color: "orange",
    gist: "We work with state lawmakers to create practical rules and ethical guidelines that ensure Pennsylvania is the leader in quantum tech. This guarantees public safety, protects data privacy, and ensures fair access for everyone, all while promoting rapid innovation.",
  },
];

const SectorCard = ({ sector, index }: { sector: typeof sectorFocusData[0]; index: number }) => {
  const [highlightsOpen, setHighlightsOpen] = useState(false);
  const [learnMoreOpen, setLearnMoreOpen] = useState(false);
  const { data, isLoading } = useSectorData(sector.apiKey);
  const Icon = sector.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group glass-card-3d backdrop-blur-xl border border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 transform hover:scale-[1.02] will-change-transform"
      style={{ 
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
      }}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold uppercase text-accent tracking-widest mb-1">
            Sector Focus {sector.id}: {sector.title}
          </h3>
          <h4 className="text-2xl font-bold text-foreground">
            Mission: {sector.mission}
          </h4>
        </div>
      </div>
      <p className="text-base sm:text-lg text-muted-foreground/90 leading-loose mb-6">
        <span className="font-bold text-foreground">The Gist:</span> {sector.gist}
      </p>

      {/* Live Market Data */}
      {data && (
        <div className="mb-6">
          <MarketDataPanel data={data.marketData} isLoading={isLoading} />
        </div>
      )}

      <div className="space-y-3">
        <Collapsible open={highlightsOpen} onOpenChange={setHighlightsOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 min-h-[48px] rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors touch-manipulation">
            <span className="font-semibold text-foreground">Key Highlights</span>
            <ChevronDown
              className={`h-5 w-5 text-primary transition-transform duration-300 ${
                highlightsOpen ? "rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3 p-4 rounded-lg bg-card/50 border border-border">
            {isLoading ? (
              <Skeleton className="h-16 w-full" />
            ) : (
              <p className="text-sm sm:text-base text-muted-foreground/90 leading-relaxed">
                {data?.highlights}
              </p>
            )}
          </CollapsibleContent>
        </Collapsible>

        <Collapsible open={learnMoreOpen} onOpenChange={setLearnMoreOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 min-h-[48px] rounded-lg bg-accent/5 hover:bg-accent/10 transition-colors touch-manipulation">
            <span className="font-semibold text-foreground">Learn More & APIs</span>
            <ChevronDown
              className={`h-5 w-5 text-accent transition-transform duration-300 ${
                learnMoreOpen ? "rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3 p-4 rounded-lg bg-card/50 border border-border space-y-4">
            {isLoading ? (
              <Skeleton className="h-32 w-full" />
            ) : (
              <>
                <p className="text-sm sm:text-base text-muted-foreground/90 leading-relaxed">
                  {data?.learnMore}
                </p>
                {data?.apis && <APIExplorer apis={data.apis} />}
              </>
            )}
          </CollapsibleContent>
        </Collapsible>
      </div>
    </motion.div>
  );
};

const ROISection = () => {
  const [highlightsOpen, setHighlightsOpen] = useState(false);
  const [learnMoreOpen, setLearnMoreOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'chart'>('table');

  const roiData = [
    { sector: "Education", payback: "18 mo", roi: "4.3x", roiValue: 4.3 },
    { sector: "Energy", payback: "15 mo", roi: "3.8x", roiValue: 3.8 },
    { sector: "Healthcare", payback: "19 mo", roi: "3.2x", roiValue: 3.2 },
    { sector: "Governance", payback: "12 mo", roi: "5.1x", roiValue: 5.1 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="group glass-card-3d backdrop-blur-xl border border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 transform hover:scale-[1.02] will-change-transform"
      style={{ 
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
      }}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <TrendingUp className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold uppercase text-accent tracking-widest mb-1">
            Sector Focus 05: Return on Investment (ROI)
          </h3>
          <h4 className="text-2xl font-bold text-foreground">
            Core Metric: Exponential Payback
          </h4>
        </div>
      </div>
      <p className="text-base sm:text-lg text-muted-foreground/90 leading-loose mb-6">
        Quantum investments deliver measurable, accelerated returns much faster than traditional 
        technology projects. These are not estimates; these are real-world results:
      </p>

      {/* View Toggle */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => setViewMode('table')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all min-h-[44px] touch-manipulation ${
            viewMode === 'table'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted/50 text-muted-foreground hover:bg-muted'
          }`}
        >
          Table View
        </button>
        <button
          onClick={() => setViewMode('chart')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all min-h-[44px] touch-manipulation ${
            viewMode === 'chart'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted/50 text-muted-foreground hover:bg-muted'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          Chart View
        </button>
      </div>

      {viewMode === 'table' ? (
        <div className="overflow-x-auto mb-6 scrollbar-thin touch-pan-x">
          <table className="w-full border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="text-left p-3 sm:p-4 font-bold text-foreground font-cyber text-sm sm:text-base">Sector</th>
                <th className="text-left p-3 sm:p-4 font-bold text-foreground font-cyber text-sm sm:text-base">Payback Time</th>
                <th className="text-left p-3 sm:p-4 font-bold text-foreground font-cyber text-sm sm:text-base">ROI Multiplier</th>
              </tr>
            </thead>
            <tbody>
              {roiData.map((row, i) => (
                <tr key={i} className="border-b border-border/50 hover:bg-primary/5 transition-colors">
                  <td className="p-3 sm:p-4 text-muted-foreground/90 text-sm sm:text-base">{row.sector}</td>
                  <td className="p-3 sm:p-4 text-muted-foreground/90 text-sm sm:text-base">{row.payback}</td>
                  <td className="p-3 sm:p-4 font-bold text-primary text-sm sm:text-base">{row.roi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <ROIChart data={roiData} />
      )}

      <div className="space-y-4">
        <Collapsible open={highlightsOpen} onOpenChange={setHighlightsOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 min-h-[48px] rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors touch-manipulation">
            <span className="font-semibold text-foreground">Key Highlights</span>
            <ChevronDown
              className={`h-5 w-5 text-primary transition-transform duration-300 ${
                highlightsOpen ? "rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3 p-4 rounded-lg bg-card/50 border border-border">
            <p className="text-sm sm:text-base text-muted-foreground/90 leading-relaxed">
              Quantum technology accelerates learning, efficiency, and innovation.
            </p>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible open={learnMoreOpen} onOpenChange={setLearnMoreOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 min-h-[48px] rounded-lg bg-accent/5 hover:bg-accent/10 transition-colors touch-manipulation">
            <span className="font-semibold text-foreground">Learn More</span>
            <ChevronDown
              className={`h-5 w-5 text-accent transition-transform duration-300 ${
                learnMoreOpen ? "rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3 p-4 rounded-lg bg-card/50 border border-border">
            <p className="text-sm sm:text-base text-muted-foreground/90 leading-relaxed">
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

  return (
    <section className="relative z-10 py-20 sm:py-24 md:py-32">
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
            <p className="text-lg sm:text-xl font-bold text-foreground">We aim to:</p>
            <ol className="space-y-5 text-base sm:text-lg text-muted-foreground/90 leading-loose">
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

            <p className="text-xl sm:text-2xl font-bold text-center text-foreground pt-8">
              Final Transmission: Empower students, advance industries, and transform Pennsylvania.
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-4 pt-8">
            <Collapsible open={highlightsOpen} onOpenChange={setHighlightsOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 min-h-[48px] rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors touch-manipulation">
                <span className="font-semibold text-foreground">Key Highlights</span>
                <ChevronDown
                  className={`h-5 w-5 text-primary transition-transform duration-300 ${
                    highlightsOpen ? "rotate-180" : ""
                  }`}
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-3 p-4 rounded-lg bg-card/50 border border-border">
                <p className="text-sm sm:text-base text-muted-foreground/90 leading-relaxed">
                  Hands-on learning, career pathways, and real-world impact.
                </p>
              </CollapsibleContent>
            </Collapsible>

            <a
              href="https://docs.google.com/document/d/1NlzqlnBLt_iWwqLGH3SUTUlASFIZBEaimJYq6MFXB8I/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full p-4 min-h-[48px] rounded-lg bg-accent/5 hover:bg-accent/10 transition-colors font-semibold text-foreground hover:text-accent touch-manipulation"
            >
              See Proposal
            </a>
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
        <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 md:py-32 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4"
            style={{ 
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              willChange: 'transform, opacity',
            }}
          >
            <Target className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">System Online</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent"
            style={{ 
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              willChange: 'transform, opacity',
            }}
          >
            Access Point: Quantum Future
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
            className="text-2xl sm:text-3xl md:text-4xl font-semibold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent"
            style={{ 
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
            }}
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

        {/* Live Dashboard Section */}
        <section className="relative z-10 py-20 sm:py-24 md:py-32 bg-muted/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-center bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent mb-4">
                Live System Metrics
              </h2>
              <p className="text-center text-muted-foreground/90 max-w-2xl mx-auto mb-8">
                Real-time data from Pennsylvania's quantum initiatives
              </p>
              <QuantumDashboard />
            </motion.div>
          </div>
        </section>

        {/* Sector Focus Cards */}
        <section className="relative z-10 py-20 sm:py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
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
