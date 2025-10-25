import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AIChatbot } from "@/components/AIChatbot";
import { 
  GraduationCap, 
  Zap, 
  Heart, 
  Building, 
  ChevronDown,
  Target,
  BookOpen
} from "lucide-react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface StakeholderSection {
  icon: any;
  title: string;
  subtitle: string;
  description: string;
  keyHighlights: string;
  learnMore: string;
  color: string;
}

const stakeholders: StakeholderSection[] = [
  {
    icon: GraduationCap,
    title: "For Students",
    subtitle: "Tomorrow's Quantum Workforce",
    description: "Start building quantum skills today—from high school coding clubs to college labs. Learn real quantum programming and hands-on experiments without needing a PhD. Prepare for jobs that don't exist yet and keep Pennsylvania talent at home.",
    keyHighlights: "Explore quantum coding projects, internships, and hackathons for students.",
    learnMore: "Sign up for workshops, virtual labs, and free online courses.",
    color: "from-primary to-primary-glow"
  },
  {
    icon: Zap,
    title: "Energy",
    subtitle: "Smarter Grids & Safer Power",
    description: "Quantum computers help power companies balance electricity supply, predict outages, and prevent cyberattacks. Early pilots show up to 22% energy savings, cleaner air, and lower energy bills for families.",
    keyHighlights: "See how quantum simulates grids for efficiency and security.",
    learnMore: "Check out real-world case studies and energy innovation labs.",
    color: "from-accent to-warning"
  },
  {
    icon: Heart,
    title: "Healthcare",
    subtitle: "Better Medicine, Faster",
    description: "Quantum tech accelerates drug discovery, protein folding simulations, and genetic analysis. Advanced sensors improve diagnostics and personalize treatments. The result: faster cures, smarter health decisions, and healthier communities.",
    keyHighlights: "Discover how quantum speeds up research and disease detection.",
    learnMore: "Explore labs, internships, and healthcare innovation programs.",
    color: "from-error to-secondary"
  },
  {
    icon: Building,
    title: "Government",
    subtitle: "Policies That Work",
    description: "We help lawmakers craft practical rules and ethical guidelines so Pennsylvania leads in quantum tech. This ensures public safety, data privacy, and fair access while fostering innovation.",
    keyHighlights: "Learn how quantum influences policy and public planning.",
    learnMore: "See how students can contribute to civic tech and advisory boards.",
    color: "from-info to-primary"
  }
];

const roiData = [
  { sector: "Education", payback: "18 mo", roi: "4.3x" },
  { sector: "Energy", payback: "15 mo", roi: "3.8x" },
  { sector: "Healthcare", payback: "19 mo", roi: "3.2x" },
  { sector: "Governance", payback: "12 mo", roi: "5.1x" }
];

const StakeholderCard = ({ section, index }: { section: StakeholderSection; index: number }) => {
  const [highlightsOpen, setHighlightsOpen] = useState(false);
  const [learnMoreOpen, setLearnMoreOpen] = useState(false);
  const Icon = section.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="glass-card-3d rounded-2xl p-6 sm:p-8 border border-primary/20 overflow-hidden relative group"
    >
      {/* Animated gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
      
      <div className="relative z-10 space-y-4">
        {/* Icon & Title */}
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${section.color} shadow-lg`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl sm:text-2xl font-bold text-foreground">{section.title}</h3>
            <p className={`text-sm font-semibold bg-gradient-to-r ${section.color} bg-clip-text text-transparent`}>
              {section.subtitle}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-foreground/80 leading-relaxed">
          {section.description}
        </p>

        {/* Key Highlights - Expandable */}
        <div className="space-y-2">
          <button
            onClick={() => setHighlightsOpen(!highlightsOpen)}
            className="w-full flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group/btn"
          >
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              <span className="font-semibold text-sm text-foreground">Key Highlights</span>
            </div>
            <ChevronDown className={`w-4 h-4 text-primary transition-transform ${highlightsOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {highlightsOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 rounded-lg bg-primary/5 border border-primary/20"
            >
              <p className="text-sm text-foreground/90">{section.keyHighlights}</p>
            </motion.div>
          )}
        </div>

        {/* Learn More - Expandable */}
        <div className="space-y-2">
          <button
            onClick={() => setLearnMoreOpen(!learnMoreOpen)}
            className="w-full flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group/btn"
          >
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-accent" />
              <span className="font-semibold text-sm text-foreground">Learn More</span>
            </div>
            <ChevronDown className={`w-4 h-4 text-accent transition-transform ${learnMoreOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {learnMoreOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 rounded-lg bg-accent/5 border border-accent/20"
            >
              <p className="text-sm text-foreground/90">{section.learnMore}</p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
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
        <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center space-y-8">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent"
          >
            Empowering Pennsylvania's Quantum Future
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
            className="max-w-3xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed"
          >
            From students to industries to policymakers—we're building a quantum-ready future that's 
            practical, actionable, and designed for real people. No PhD required.
          </motion.p>
        </section>

        {/* Stakeholder Sections */}
        <section className="relative z-10 py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
                Who We Serve
              </h2>
              <p className="text-foreground/80 max-w-2xl mx-auto">
                Practical quantum solutions for every sector—from classrooms to power plants
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {stakeholders.map((section, index) => (
                <StakeholderCard key={index} section={section} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* ROI Section */}
        <section className="relative z-10 py-16 sm:py-24 bg-muted/30">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent mb-4">
                Return on Investment
              </h2>
              <p className="text-foreground/80 max-w-2xl mx-auto mb-8">
                Quantum investments pay off faster than traditional tech—real-world tests prove it
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="glass-card-3d rounded-2xl overflow-hidden border border-primary/20"
            >
              <Table>
                <TableHeader>
                  <TableRow className="bg-primary/10 hover:bg-primary/10">
                    <TableHead className="text-foreground font-bold">Sector</TableHead>
                    <TableHead className="text-foreground font-bold">Payback</TableHead>
                    <TableHead className="text-foreground font-bold">ROI</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roiData.map((row, index) => (
                    <TableRow key={index} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{row.sector}</TableCell>
                      <TableCell>{row.payback}</TableCell>
                      <TableCell className="font-bold text-primary">{row.roi}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="p-6 bg-muted/30 border-t border-primary/20">
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground mb-1">Key Highlights</p>
                    <p className="text-sm text-foreground/80">
                      Quantum technology accelerates learning, efficiency, and innovation.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 mt-4">
                  <BookOpen className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground mb-1">Learn More</p>
                    <p className="text-sm text-foreground/80">
                      See how each sector benefits from measurable results.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Our Vision Section */}
        <section className="relative z-10 py-16 sm:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-4">
                Our Vision
              </h2>
              <p className="text-xl text-foreground/90 font-semibold max-w-2xl mx-auto">
                Empower students, advance industries, and transform Pennsylvania.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                "Train the next generation of quantum innovators.",
                "Power smarter energy grids and secure infrastructure.",
                "Revolutionize medicine and healthcare delivery.",
                "Support evidence-based policies for a quantum-ready future."
              ].map((goal, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="glass-card-3d p-6 rounded-xl border border-primary/20 hover:border-primary/40 transition-colors group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">{index + 1}</span>
                    </div>
                    <p className="text-foreground/90 leading-relaxed group-hover:text-foreground transition-colors">
                      {goal}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-12 p-8 glass-card-3d rounded-2xl border border-accent/20 text-center"
            >
              <div className="flex items-start gap-3 mb-4">
                <Target className="w-5 h-5 text-primary flex-shrink-0 mt-1 mx-auto" />
                <div>
                  <p className="font-semibold text-foreground mb-1">Key Highlights</p>
                  <p className="text-sm text-foreground/80">
                    Hands-on learning, career pathways, and real-world impact.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-accent flex-shrink-0 mt-1 mx-auto" />
                <div>
                  <p className="font-semibold text-foreground mb-1">Learn More</p>
                  <p className="text-sm text-foreground/80">
                    Join programs, competitions, and mentorship networks.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
      <AIChatbot />
    </div>
  );
};

export default About;
