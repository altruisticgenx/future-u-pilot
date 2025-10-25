import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Zap, Heart, Scale, Users, Brain } from "lucide-react";
import { InteractiveCard } from "@/components/InteractiveCard";
import { MetricCard } from "@/components/MetricCard";
import { AIChatbot } from "@/components/AIChatbot";

const stakeholders = [
  {
    icon: GraduationCap,
    title: "Students",
    subtitle: "Tomorrow's Tech Workforce",
    description: "Making quantum tech jobs accessible from high school through college. Learn coding for quantum computers without needing a PhD. Keep Pennsylvania talent in Pennsylvania.",
    highlights: [
      "Career paths anyone can follow",
      "Learn quantum without advanced degrees",
      "Good jobs close to home"
    ],
    detailedContent: `
      <h3>Building the Quantum Workforce</h3>
      <p>Pennsylvania has a unique opportunity to train the next generation of quantum engineers, researchers, and technicians. Our programs bridge the gap between traditional education and emerging quantum technologies.</p>
      <h4>What We Offer:</h4>
      <ul>
        <li><strong>High School Programs:</strong> Introduction to quantum computing concepts without requiring advanced physics</li>
        <li><strong>Community College Tracks:</strong> Quantum technician certification programs with industry partnerships</li>
        <li><strong>University Partnerships:</strong> Research opportunities and internships with quantum labs</li>
        <li><strong>Career Placement:</strong> Direct pipeline to Pennsylvania-based quantum companies</li>
      </ul>
      <p>Investment in quantum education today means Pennsylvania-grown talent staying in Pennsylvania tomorrow.</p>
    `,
    color: "from-blue-500/15 via-cyan-500/10 to-blue-500/15"
  },
  {
    icon: Zap,
    title: "Energy",
    subtitle: "Smarter Grids & Security",
    description: "Quantum computers help power companies manage electricity better and protect against hackers. Early tests show 22% energy savings—meaning cleaner air and lower bills.",
    highlights: [
      "22% energy savings in real tests",
      "Protection from future cyber attacks",
      "Better control of power grids"
    ],
    detailedContent: `
      <h3>Quantum-Enhanced Energy Systems</h3>
      <p>The energy sector faces unprecedented challenges: aging infrastructure, renewable integration, and cybersecurity threats. Quantum computing offers practical solutions today.</p>
      <h4>Real-World Applications:</h4>
      <ul>
        <li><strong>Grid Optimization:</strong> Quantum algorithms reduce waste by 22% in pilot studies</li>
        <li><strong>Predictive Maintenance:</strong> Quantum sensors detect equipment failures before they happen</li>
        <li><strong>Post-Quantum Security:</strong> Protect critical infrastructure from quantum-enabled attacks</li>
        <li><strong>Load Balancing:</strong> Real-time optimization of renewable energy distribution</li>
      </ul>
      <p>Pennsylvania's energy companies are already piloting these solutions with measurable ROI.</p>
    `,
    color: "from-yellow-500/15 via-orange-500/10 to-yellow-500/15"
  },
  {
    icon: Heart,
    title: "Healthcare",
    subtitle: "Better Medicine, Faster",
    description: "Quantum tech speeds up drug discovery by testing molecules virtually. Better sensors mean better diagnoses. The result? Medicine tailored to each person.",
    highlights: [
      "Discover new drugs faster",
      "More accurate diagnoses",
      "Treatment plans just for you"
    ],
    detailedContent: `
      <h3>Quantum Healthcare Revolution</h3>
      <p>Healthcare is data-rich but insight-poor. Quantum computing and quantum sensing unlock patterns invisible to classical systems, accelerating discovery and improving patient outcomes.</p>
      <h4>Key Benefits:</h4>
      <ul>
        <li><strong>Drug Discovery:</strong> Simulate molecular interactions 1000x faster than traditional methods</li>
        <li><strong>Personalized Medicine:</strong> Analyze genetic data to tailor treatments to individual patients</li>
        <li><strong>Early Detection:</strong> Quantum sensors identify biomarkers years before symptoms appear</li>
        <li><strong>Clinical Trials:</strong> Optimize trial design and reduce time-to-market for new therapies</li>
      </ul>
      <p>Pennsylvania hospitals and research institutions are pioneering quantum healthcare applications.</p>
    `,
    color: "from-red-500/15 via-pink-500/10 to-red-500/15"
  },
  {
    icon: Scale,
    title: "Government",
    subtitle: "Policies That Work",
    description: "We help lawmakers create practical rules and guidelines that make Pennsylvania a leader in quantum tech while keeping the public safe and informed.",
    highlights: [
      "Advisory boards with real experts",
      "Clear ethics rules everyone understands",
      "Economic independence, not reliance"
    ],
    detailedContent: `
      <h3>Quantum Policy & Governance</h3>
      <p>Effective quantum policy requires balancing innovation with security, economic growth with ethical considerations. We help policymakers navigate this complex landscape.</p>
      <h4>Our Approach:</h4>
      <ul>
        <li><strong>Advisory Councils:</strong> Connect lawmakers with quantum experts for evidence-based policy</li>
        <li><strong>Ethical Frameworks:</strong> Clear guidelines for responsible quantum development</li>
        <li><strong>Economic Strategy:</strong> Build quantum industries in Pennsylvania, not offshore dependencies</li>
        <li><strong>Public Education:</strong> Transparent communication about quantum benefits and risks</li>
      </ul>
      <p>Pennsylvania can lead the nation in quantum governance—practical, ethical, and economically sound.</p>
    `,
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
                Pennsylvania's Path Forward
              </span>
            </h1>
            
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Connecting students to tech careers, helping companies run smarter, speeding up healthcare breakthroughs.
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
                <h2 id="cta-heading" className="text-xl sm:text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                  Join Pennsylvania's Quantum Future
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
                  Whether you're in education, energy, healthcare, government, or business—Pennsylvania's quantum future needs you.
                </p>
                <motion.button
                  onClick={() => window.location.href = "/#contact"}
                  className="btn-3d-primary px-6 py-2.5 rounded-lg font-semibold text-xs sm:text-sm"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  aria-label="Get involved in Pennsylvania's Quantum Initiative"
                >
                  Get Involved Today
                </motion.button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
      
      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  );
};

export default About;
