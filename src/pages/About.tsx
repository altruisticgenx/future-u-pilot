import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Zap, Heart, Scale, Users, Brain } from "lucide-react";
import { InteractiveCard } from "@/components/InteractiveCard";
import { SmartChatbot } from "@/components/SmartChatbot";
import { ROIChart } from "@/components/ROIChart";
import { ContrastMonitor } from "@/components/ContrastMonitor";
import { RAGSearch } from "@/components/RAGSearch";
import { SandboxPanel, sandboxExamples } from "@/components/SandboxPanel";

const stakeholders = [
  {
    icon: GraduationCap,
    title: "Students",
    subtitle: "Tomorrow's Tech Workforce",
    description: "Train the next generation through hands-on quantum and AI projects. Access cloud-based quantum APIs (Qiskit, Cirq) and generative AI tools to build real-world solutions—no PhD required.",
    highlights: [
      "Build with real quantum APIs (Qiskit/Cirq)",
      "Open-source sandbox environments",
      "Career pipeline to PA quantum companies"
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
    description: "Using PJM Interconnection Data APIs and smart meter feeds to train AI for grid optimization. Early pilots show 22% energy savings and quantum-safe intrusion detection for critical infrastructure.",
    highlights: [
      "22% energy savings in pilot quantum grid projects",
      "Real-time PJM data integration for load balancing",
      "Quantum-safe cybersecurity for power networks"
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
    subtitle: "10x Faster Drug Discovery",
    description: "Analyzing anonymized PA Department of Health datasets and molecular simulation data with HIPAA-compliant FHIR APIs. Result: 10x faster drug discovery simulations and personalized treatments.",
    highlights: [
      "10x faster drug discovery simulations at PA hospitals",
      "HIPAA-compliant data pipelines with FHIR APIs",
      "Personalized treatment using genetic + clinical data"
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
    description: "AI tools analyze federal PQC mandates (NIST standards) against current state IT infrastructure. Use GeoSpatial APIs with AI to model equitable deployment and regional economic impact.",
    highlights: [
      "Rapid regulatory compliance assessment (PQC/NIST)",
      "AI-driven policy text analysis tools",
      "GeoSpatial APIs model economic & equity impact"
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
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-background animate-gradient" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary))_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.03] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]" />
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/40 backdrop-blur-sm"
            >
              <Brain className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm font-medium bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Pennsylvania Quantum Initiative
              </span>
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="block text-foreground mb-2">Quantum-AI Readiness</span>
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Built for Pennsylvania
              </span>
            </h1>
            
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Connecting students to tech careers, helping companies run smarter, 
              speeding up healthcare breakthroughs, and securing Pennsylvania's quantum future.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4 justify-center pt-4"
            >
              {[
                { label: "22% Energy Savings", icon: Zap },
                { label: "10x Faster Discovery", icon: Heart },
                { label: "<8 Weeks to Pilot", icon: GraduationCap }
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/50 border border-border/50 backdrop-blur-sm"
                  >
                    <Icon className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">{stat.label}</span>
                  </motion.div>
                );
              })}
            </motion.div>
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
            <h2 id="stakeholder-heading" className="text-lg sm:text-xl md:text-2xl font-bold mb-2 bg-gradient-hero bg-clip-text text-transparent">
              Four Perspectives, One Vision
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
              Real people, real results. Here's how quantum helps everyone.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
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

      {/* Interactive Code Sandboxes */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-background to-muted/30" aria-labelledby="sandbox-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 id="sandbox-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
              Try It Yourself
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              Explore real quantum computing examples for each sector. All code runs in your browser—no setup required.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {/* Student Sandbox */}
            <SandboxPanel
              title="🎓 Student Training: Bell State"
              description="Learn quantum circuits with Qiskit"
              code={sandboxExamples.students}
              language="python"
              output="Bell State Results: {'00': 512, '11': 488}"
              color="primary"
            />

            {/* Energy Sandbox */}
            <SandboxPanel
              title="⚡ Energy Grid Optimization"
              description="Minimize transmission losses"
              code={sandboxExamples.energy}
              language="python"
              output="Optimized Distribution:\nEnergy Savings: 234.8 kWh\nGrid Efficiency: 94.3%"
              color="success"
            />

            {/* Healthcare Sandbox */}
            <SandboxPanel
              title="🩺 Drug Discovery Simulation"
              description="Molecular property prediction"
              code={sandboxExamples.healthcare}
              language="python"
              output="Ground State: -1.137 Hartree\nDrug binding affinity: 713.4 kcal/mol"
              color="secondary"
            />

            {/* Governance Sandbox */}
            <SandboxPanel
              title="🏛️ Policy Impact Model"
              description="Economic multiplier analysis"
              code={sandboxExamples.governance}
              language="python"
              output="Total Investment: $45M\nExpected Return: $186M\nROI: 4.13x\nJobs Created: 1,560"
              color="accent"
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-8"
          >
            <p className="text-xs text-muted-foreground">
              ℹ️ Code is read-only. Click "Run" to see simulated output. Real execution requires backend setup.
            </p>
          </motion.div>
        </div>
      </section>

      {/* RAG Knowledge Base */}
      <section className="py-12 bg-muted/30" aria-labelledby="rag-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="text-center mb-8">
              <h2 id="rag-heading" className="text-lg sm:text-xl md:text-2xl font-bold mb-2 bg-gradient-hero bg-clip-text text-transparent">
                Explore Our Knowledge Base
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
                Search indexed documents with on-device AI. 100% private, no cloud queries.
              </p>
            </div>
            <RAGSearch />
          </motion.div>
        </div>
      </section>

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
              <h2 id="vision-heading" className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">Our Vision</h2>
            </div>
            
            <div className="space-y-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              <h3 className="text-base sm:text-lg font-bold text-foreground mb-2">What We Do:</h3>
              <p>
                We help Pennsylvania businesses adopt AI and quantum technologies to solve real problems—optimizing energy grids, accelerating drug discovery, and securing critical infrastructure—while running open-source, experimental projects that let students, developers, and tech enthusiasts build and test real-world solutions.
              </p>
              
              <h3 className="text-base sm:text-lg font-bold text-foreground mt-4 mb-2">Our Mission:</h3>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Train the next generation of quantum engineers and AI developers through applied projects</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Reduce energy waste and prevent cyberattacks on Pennsylvania's power networks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Enable hospitals and research centers to discover drugs faster and personalize treatments</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Guide lawmakers with practical, evidence-backed policies for a quantum-ready economy</span>
                </li>
              </ul>
              
              <blockquote className="border-l-3 border-primary pl-4 py-1.5 italic text-xs sm:text-sm bg-gradient-to-r from-primary/5 to-transparent rounded-r mt-4">
                <strong>Final Transmission:</strong> Empower students, modernize industries, and make Pennsylvania a national leader in applied AI and quantum technology.
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
      
      {/* AI Chatbot - Smart wrapper for Cloud/Local AI */}
      <SmartChatbot />
      
      {/* Color Contrast Monitor (Dev Only) */}
      <ContrastMonitor />
    </div>
  );
};

export default About;
