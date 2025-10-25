import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Zap, Heart, Scale, Users, Brain } from "lucide-react";
import { InteractiveCard } from "@/components/InteractiveCard";
import { AIChatbot } from "@/components/AIChatbot";
import { ROIChart } from "@/components/ROIChart";
import { ContrastMonitor } from "@/components/ContrastMonitor";

const stakeholders = [
  {
    icon: GraduationCap,
    title: "Students",
    subtitle: "Tomorrow's Tech Workforce",
    description: "Train the next generation through hands-on quantum and AI projects using real cloud tools and open-source platforms.",
    highlights: [
      "Hands-on quantum projects",
      "Real cloud computing tools",
      "Direct job connections"
    ],
    detailedContent: `
      <h3>Building the Quantum Workforce</h3>
      <p>Students gain hands-on experience with non-proprietary cloud-based quantum APIs and public-facing generative AI tools, creating practical demos and staying local after graduation.</p>
      <h4>What We Offer:</h4>
      <ul>
        <li><strong>Open Quantum Sandbox:</strong> Build circuits using Qiskit/Cirq APIs and run experiments on real quantum processors</li>
        <li><strong>AI Energy Challenge:</strong> Optimize simulated grids using real-time PJM Interconnection data feeds</li>
        <li><strong>Community Programs:</strong> High school to college pathways with industry certifications</li>
        <li><strong>Career Placement:</strong> Direct pipeline to Pennsylvania quantum and AI companies</li>
      </ul>
      <p>Students build real solutions, not just theory—keeping Pennsylvania talent in Pennsylvania.</p>
    `,
    color: "from-blue-500/15 via-cyan-500/10 to-blue-500/15"
  },
  {
    icon: Zap,
    title: "Energy",
    subtitle: "Smarter Grids & Quantum Security",
    description: "Using real-time grid data and smart meter feeds to train AI for energy optimization and quantum-safe infrastructure protection.",
    highlights: [
      "Real energy grid optimization",
      "Smart power load balancing",
      "Quantum-safe cyber protection"
    ],
    detailedContent: `
      <h3>Quantum-Enhanced Energy Systems</h3>
      <p>Research uses real-world network topology data and encrypted control plane APIs to test quantum-safe intrusion detection systems while optimizing renewable energy distribution.</p>
      <h4>Real-World Applications:</h4>
      <ul>
        <li><strong>Grid Optimization:</strong> AI models trained on PJM Interconnection APIs reduce waste by 22%</li>
        <li><strong>Predictive Outages:</strong> Smart meter data feeds predict equipment failures before they happen</li>
        <li><strong>Post-Quantum Security:</strong> Encrypted APIs protect critical infrastructure from quantum threats</li>
        <li><strong>Load Balancing:</strong> Real-time renewable energy distribution using live grid data</li>
      </ul>
      <p>Pennsylvania energy companies pilot these solutions with measurable ROI and enhanced cybersecurity.</p>
    `,
    color: "from-yellow-500/15 via-orange-500/10 to-yellow-500/15"
  },
  {
    icon: Heart,
    title: "Healthcare",
    subtitle: "Accelerated Medical Innovation",
    description: "Analyzing anonymized health data and molecular simulations with secure APIs to enable faster drug discovery and personalized treatments.",
    highlights: [
      "Faster drug discovery",
      "Secure medical data systems",
      "Personalized treatments"
    ],
    detailedContent: `
      <h3>Quantum Healthcare Revolution</h3>
      <p>Develop HIPAA-compliant data pipelines and secure FHIR APIs to safely integrate clinical trial data with quantum simulation environments, unlocking patterns invisible to classical systems.</p>
      <h4>Key Benefits:</h4>
      <ul>
        <li><strong>Drug Discovery:</strong> Analyze anonymized PA Dept of Health data + molecular simulations 10x faster</li>
        <li><strong>Personalized Medicine:</strong> Integrate genetic data via secure FHIR APIs to tailor treatments</li>
        <li><strong>Early Detection:</strong> Quantum sensors identify disease biomarkers years before symptoms</li>
        <li><strong>Clinical Trials:</strong> Anonymized public registries optimize trial design and accelerate therapies</li>
      </ul>
      <p>Pennsylvania hospitals test predictive patient care models using real health data and quantum simulations.</p>
    `,
    color: "from-red-500/15 via-pink-500/10 to-red-500/15"
  },
  {
    icon: Scale,
    title: "Policy & Governance",
    subtitle: "Evidence-Backed Guidelines",
    description: "AI tools analyze federal quantum mandates against state infrastructure and model equitable tech deployment across Pennsylvania.",
    highlights: [
      "Quick compliance checks",
      "AI policy analysis",
      "Fair regional deployment"
    ],
    detailedContent: `
      <h3>Quantum Policy & Governance</h3>
      <p>Build AI tools that analyze new federal post-quantum cryptography (PQC) mandates against current state infrastructure policies, helping lawmakers craft practical, evidence-based guidelines.</p>
      <h4>Our Approach:</h4>
      <ul>
        <li><strong>Compliance Analysis:</strong> AI assesses NIST quantum-safe standards against PA IT systems</li>
        <li><strong>Policy Simulation Labs:</strong> Model economic impacts using GeoSpatial APIs (Census/Mapping data)</li>
        <li><strong>Ethical Frameworks:</strong> Clear guidelines for responsible quantum development</li>
        <li><strong>Regional Equity:</strong> AI models ensure equitable tech deployment across Pennsylvania</li>
      </ul>
      <p>Pennsylvania leads in quantum governance—practical, ethical, and economically sound with data-driven insights.</p>
    `,
    color: "from-purple-500/15 via-indigo-500/10 to-purple-500/15"
  }
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
                Pennsylvania's Path Forward
              </span>
            </h1>
            
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Connecting students to tech careers, helping companies run smarter, speeding up healthcare breakthroughs.
            </p>
      </motion.div>
    </div>
  </section>

  {/* What We Do & Mission - Condensed */}
  <section className="py-8 sm:py-10" aria-labelledby="mission-heading">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card-3d p-6 sm:p-8 rounded-xl bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 border border-primary/30"
      >
        <div className="flex items-center gap-2 mb-4">
          <Users className="h-5 w-5 text-primary animate-pulse" />
          <h2 id="mission-heading" className="text-base sm:text-lg font-bold bg-gradient-hero bg-clip-text text-transparent">
            What We Do & Why It Matters
          </h2>
        </div>

        <div className="space-y-3 text-xs sm:text-sm text-foreground/80 leading-relaxed">
          <p>
            <strong className="text-foreground">What We Do:</strong> Help Pennsylvania use AI and quantum tech to solve real problems—smarter energy grids, faster drug discovery, secure infrastructure—through open-source projects anyone can build with.
          </p>
          
          <p>
            <strong className="text-foreground">Our Mission:</strong> Train quantum engineers, cut energy waste, speed up medical breakthroughs, and guide practical tech policy that works.
          </p>

          <blockquote className="border-l-2 border-primary pl-3 py-1 italic text-xs bg-primary/5 rounded-r mt-3">
            Empower students. Modernize industries. Make Pennsylvania a quantum leader.
          </blockquote>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-end mt-4"
        >
          <motion.a
            href="/pa-lobby"
            className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-md border border-primary/40 bg-primary/5 hover:bg-primary/10 hover:scale-105 transition-all duration-200 text-foreground font-medium"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            PA Lobby →
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  </section>

  {/* Who We Help */}
  <section className="py-12 bg-gradient-to-b from-muted/30 to-background" aria-labelledby="stakeholder-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
        <h2 id="stakeholder-heading" className="text-base sm:text-lg md:text-xl font-bold mb-2 bg-gradient-hero bg-clip-text text-transparent">
          Who We Help
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
          Real solutions for students, businesses, hospitals, and government.
        </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 max-w-5xl mx-auto">
            {stakeholders.map((stakeholder, index) => (
              <InteractiveCard
                key={index}
                {...stakeholder}
                index={index}
                apiKey={stakeholder.title.toLowerCase().replace(/\s+/g, '')}
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
            <h2 id="roi-heading" className="text-lg sm:text-xl md:text-2xl font-bold mb-2 bg-gradient-hero bg-clip-text text-transparent">
              Return on Investment
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
              Real numbers from real tests—quantum pays back fast.
            </p>
          </motion.div>

          <ROIChart />
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
                <h2 id="cta-heading" className="text-xl sm:text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                  Join Pennsylvania's Quantum Future
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
                  Whether you're in education, energy, healthcare, government, or business—Pennsylvania's quantum future needs you.
                </p>
                <motion.a
                  href="https://docs.google.com/document/d/1NlzqlnBLt_iWwqLGH3SUTUlASFIZBEaimJYq6MFXB8I/edit?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block btn-3d-primary px-6 py-2.5 rounded-lg font-semibold text-xs sm:text-sm"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  aria-label="Get involved in Pennsylvania's Quantum Initiative"
                >
                  Get Involved Today
                </motion.a>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
      
      {/* AI Chatbot */}
      <AIChatbot />
      
      {/* Color Contrast Monitor (Dev Only) */}
      <ContrastMonitor />
    </div>
  );
};

export default About;
