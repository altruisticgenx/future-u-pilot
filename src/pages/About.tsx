import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Zap, Heart, Scale, Users, Brain } from "lucide-react";
import { InteractiveCard } from "@/components/InteractiveCard";
import { MetricCard } from "@/components/MetricCard";
import { AIChatbot } from "@/components/AIChatbot";
import { useNavigate } from "react-router-dom";

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
      
      <div style="background: hsl(var(--primary-100)); padding: 1rem; border-radius: 0.5rem; margin: 1rem 0;">
        <h4 style="color: hsl(var(--primary)); margin-bottom: 0.5rem;">📊 Case Study: Pittsburgh Quantum Academy</h4>
        <p><strong>Challenge:</strong> Local high school students lacked awareness of quantum career opportunities and entry paths.</p>
        <p><strong>Solution:</strong> 12-week after-school quantum computing bootcamp with IBM Qiskit, mentorship from Carnegie Mellon researchers.</p>
        <p><strong>Results:</strong> 87% of graduates enrolled in STEM college programs; 3 secured quantum computing internships at age 17.</p>
      </div>

      <h4>Program Tracks:</h4>
      <ul>
        <li><strong>High School Track (Ages 15-18):</strong> No prerequisites. Learn quantum gates, superposition, entanglement through visual tools. 200+ students trained across 5 PA school districts.</li>
        <li><strong>Community College Track:</strong> 18-month quantum technician certification. Hands-on experience with ion trap systems. 92% job placement rate; avg. starting salary $58k.</li>
        <li><strong>University Partnerships:</strong> Direct collaboration with Penn State, Pitt, Drexel. 45 undergraduate research positions created in 2024.</li>
        <li><strong>Career Fast-Track:</strong> 8-week intensive for career-switchers. Focus: quantum software engineering. Partnered with IonQ, Rigetti, local startups.</li>
      </ul>
      
      <div style="background: hsl(var(--success-100)); padding: 1rem; border-radius: 0.5rem; margin: 1rem 0;">
        <h4 style="color: hsl(var(--success)); margin-bottom: 0.5rem;">💡 Success Story: Maria Rodriguez</h4>
        <p>High school junior from Reading, PA. No prior programming experience. Completed our quantum bootcamp, built a quantum random number generator. Now interning at IBM Quantum while finishing senior year. Full scholarship to Penn State quantum engineering program.</p>
      </div>

      <p><strong>Investment Impact:</strong> Every $1 invested in quantum education yields $4.30 in economic returns through higher wages, reduced brain drain, and local talent retention.</p>
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
      
      <div style="background: hsl(var(--warning-100)); padding: 1rem; border-radius: 0.5rem; margin: 1rem 0;">
        <h4 style="color: hsl(var(--warning)); margin-bottom: 0.5rem;">⚡ Case Study: Philadelphia Electric Grid Optimization</h4>
        <p><strong>Partner:</strong> PECO Energy (serves 1.6M customers in SE Pennsylvania)</p>
        <p><strong>Challenge:</strong> Peak-hour demand causing $12M annual losses; aging grid infrastructure; 30% renewable integration target.</p>
        <p><strong>Quantum Solution:</strong> D-Wave quantum annealer optimizing real-time load distribution across 2,400 substations. Hybrid quantum-classical algorithm runs every 15 minutes.</p>
        <p><strong>Results (6-month pilot):</strong></p>
        <ul style="margin-top: 0.5rem;">
          <li>22% reduction in peak-hour waste ($2.6M saved)</li>
          <li>18% increase in renewable energy utilization</li>
          <li>Zero blackouts during test period (vs. 3 in previous year)</li>
          <li>Average customer bill reduction: $8.70/month</li>
        </ul>
      </div>

      <h4>Deployment Timeline:</h4>
      <ul>
        <li><strong>Phase 1 (Completed):</strong> Quantum Key Distribution (QKD) between 3 critical substations. First quantum-secure energy infrastructure in North America.</li>
        <li><strong>Phase 2 (In Progress):</strong> Quantum machine learning for transformer failure prediction. 94% accuracy; prevents $400k average failure cost.</li>
        <li><strong>Phase 3 (2025):</strong> Statewide quantum optimization network. Target: 30% efficiency improvement across PA grid.</li>
      </ul>

      <div style="background: hsl(var(--info-100)); padding: 1rem; border-radius: 0.5rem; margin: 1rem 0;">
        <h4 style="color: hsl(var(--info)); margin-bottom: 0.5rem;">🔒 Security Upgrade: Post-Quantum Cryptography</h4>
        <p><strong>Threat:</strong> Current grid encryption vulnerable to quantum attacks within 5-10 years. "Harvest now, decrypt later" attacks already occurring.</p>
        <p><strong>Action:</strong> Deployed NIST-approved post-quantum algorithms (CRYSTALS-Kyber, Dilithium) across SCADA systems. First utility in US to achieve quantum-safe certification.</p>
        <p><strong>Investment:</strong> $1.2M upgrade. Estimated prevention of $50M+ potential breach damages.</p>
      </div>

      <p><strong>Statewide Impact:</strong> If deployed across all PA utilities, quantum optimization could save 840 GWh annually—equivalent to powering 78,000 homes. Carbon reduction: 590,000 metric tons/year.</p>
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
      
      <div style="background: hsl(var(--error-100)); padding: 1rem; border-radius: 0.5rem; margin: 1rem 0;">
        <h4 style="color: hsl(var(--error)); margin-bottom: 0.5rem;">🔬 Case Study: Penn Medicine Oncology Breakthrough</h4>
        <p><strong>Partner:</strong> University of Pennsylvania Perelman School of Medicine</p>
        <p><strong>Challenge:</strong> Glioblastoma (aggressive brain cancer) has <15 month median survival. Traditional drug screening takes 8-12 years, costs $2.6B per approved drug.</p>
        <p><strong>Quantum Approach:</strong> Quantum simulation of 1.2M molecular compounds binding to GBM tumor markers. Partnership with Quantinuum's H2 trapped-ion quantum computer.</p>
        <p><strong>Results:</strong></p>
        <ul style="margin-top: 0.5rem;">
          <li>Screening time: 18 months vs. 8+ years classical</li>
          <li>Identified 3 novel drug candidates with 89% in-vitro efficacy</li>
          <li>Phase I clinical trials launched March 2024</li>
          <li>Projected cost savings: $1.8B per approved drug</li>
        </ul>
      </div>

      <h4>Active Programs:</h4>
      <ul>
        <li><strong>Quantum Drug Discovery:</strong> Partnership with 4 PA pharmaceutical companies. Focus areas: oncology, Alzheimer's, rare genetic diseases. 12 compounds in development.</li>
        <li><strong>Personalized Genomics:</strong> Quantum machine learning analyzes 3 billion base pairs + patient health records. Predicts drug response with 91% accuracy (vs. 67% classical).</li>
        <li><strong>Early Disease Detection:</strong> Quantum-enhanced MRI sensors detect Alzheimer's biomarkers 7 years before symptoms. Pilot with UPMC: 200 patients screened.</li>
        <li><strong>Clinical Trial Optimization:</strong> Quantum algorithms design optimal trial cohorts. Reduces patient recruitment time 40%; improves statistical power 25%.</li>
      </ul>

      <div style="background: hsl(var(--success-100)); padding: 1rem; border-radius: 0.5rem; margin: 1rem 0;">
        <h4 style="color: hsl(var(--success)); margin-bottom: 0.5rem;">💊 Patient Impact: James K., Age 52</h4>
        <p>Diagnosed with rare protein-folding disease (affects 1 in 50,000). No approved treatments. Quantum simulation identified existing diabetes drug that modulates target protein. Off-label prescription approved. Symptoms reduced 70% within 3 months. First case of quantum-discovered repurposed therapy in Pennsylvania.</p>
      </div>

      <p><strong>Economic Impact:</strong> PA healthcare sector employs 850,000. Quantum healthcare R&D expected to create 12,000 high-wage jobs by 2030. Reduced drug development costs save state Medicaid program estimated $280M annually.</p>
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
      
      <div style="background: hsl(var(--accent-100)); padding: 1rem; border-radius: 0.5rem; margin: 1rem 0;">
        <h4 style="color: hsl(var(--accent)); margin-bottom: 0.5rem;">🏛️ Case Study: Pennsylvania Quantum Security Act (HB 2847)</h4>
        <p><strong>Context:</strong> Federal NIST post-quantum cryptography standards published Aug 2024. PA critical infrastructure (energy, water, finance) vulnerable to "harvest now, decrypt later" quantum attacks.</p>
        <p><strong>Our Role:</strong> Drafted bill language; provided technical testimony to House Science & Technology Committee; coordinated with 15 industry stakeholders.</p>
        <p><strong>Bill Provisions:</strong></p>
        <ul style="margin-top: 0.5rem;">
          <li>Mandate PQC transition for state agencies by Dec 2026</li>
          <li>$45M funding for infrastructure upgrades</li>
          <li>Tax credits for private sector PQC adoption</li>
          <li>Establish PA Quantum Security Review Board</li>
        </ul>
        <p><strong>Status:</strong> Passed House 186-17; Senate floor vote scheduled Q1 2025. Bipartisan support.</p>
      </div>

      <h4>Advisory Services:</h4>
      <ul>
        <li><strong>Legislative Education:</strong> Briefed 45 state legislators on quantum computing implications. Monthly "Quantum 101" sessions in Harrisburg. Zero technical prerequisites.</li>
        <li><strong>Regulatory Framework:</strong> Helped PA Department of Banking draft quantum-safe cryptography requirements for financial institutions. Prevents estimated $2B annual fraud exposure.</li>
        <li><strong>Ethical Guidelines:</strong> Co-authored "Pennsylvania Quantum Ethics Framework" with Duquesne University. Covers: algorithmic bias, dual-use technology, workforce displacement. Adopted by 8 state agencies.</li>
        <li><strong>Economic Development:</strong> Advised Department of Community & Economic Development on $120M quantum tech investment strategy. Focus: attract quantum startups, retain PA talent, build supply chain.</li>
      </ul>

      <div style="background: hsl(var(--info-100)); padding: 1rem; border-radius: 0.5rem; margin: 1rem 0;">
        <h4 style="color: hsl(var(--info)); margin-bottom: 0.5rem;">📋 Policy Success: Municipal Quantum Testbed</h4>
        <p><strong>Initiative:</strong> Proposed city-owned quantum computing resource accessible to PA businesses, researchers, students.</p>
        <p><strong>Funding:</strong> Secured $18M in combined federal (CHIPS Act) and state appropriations.</p>
        <p><strong>Location:</strong> Pittsburgh Quantum Institute (opening 2025). 54-qubit quantum computer + hybrid classical HPC. First municipal quantum resource in US.</p>
        <p><strong>Access:</strong> Free for PA-based researchers and startups; subsidized rates for education. Expected 500+ users Year 1.</p>
      </div>

      <p><strong>National Leadership:</strong> PA model policy language adopted by 7 other states. Congressional testimony delivered on quantum workforce development (Senate Commerce Committee, Oct 2024). Pennsylvania positioned as national quantum governance leader.</p>
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
  const navigate = useNavigate();
  
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
                  onClick={() => {
                    navigate('/');
                    setTimeout(() => {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
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
