import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { 
  GraduationCap, 
  Building2, 
  Users, 
  Briefcase,
  ChevronRight,
  ChevronDown,
  Zap,
  Shield,
  Sparkles,
  AlertTriangle,
  Scale
} from "lucide-react";

const services = [
  {
    id: "education",
    sector: "Education",
    status: "Active",
    icon: GraduationCap,
    title: "Quantum Computing Education Program",
    shortDesc: "Partnering with 15+ universities to integrate quantum computing curricula and provide hands-on quantum hardware access to students.",
    fullDesc: "We partner with educational institutions to build quantum-aware curricula, establish quantum computing labs, and train the next generation of quantum engineers and scientists. Our comprehensive approach includes curriculum development, faculty training, lab setup, and ongoing research support.",
    deliverables: [
      "Quantum curriculum development",
      "Faculty training programs",
      "Lab setup & hardware access",
      "Student research projects"
    ],
    impact: "1,200+ students enrolled",
    timeline: "2024-2026",
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    id: "government",
    sector: "Governance",
    status: "Active",
    icon: Building2,
    title: "AI Literacy for Public Sector",
    shortDesc: "Training government officials and public sector employees on AI fundamentals, ethical considerations, and practical applications.",
    fullDesc: "Empowering public sector leaders with AI knowledge and quantum-safe security practices. We provide comprehensive training programs that cover AI ethics, governance frameworks, and practical implementation strategies for government agencies.",
    deliverables: [
      "AI ethics & governance training",
      "Policy framework development",
      "Quantum-safe security protocols",
      "Implementation roadmaps"
    ],
    impact: "500+ officials trained",
    timeline: "2024-2025",
    color: "from-purple-500/20 to-pink-500/20"
  },
  {
    id: "energy",
    sector: "Energy",
    status: "Active",
    icon: Zap,
    title: "Quantum Grid Optimization",
    shortDesc: "Leveraging quantum computing for real-time energy grid management, renewable integration, and predictive maintenance.",
    fullDesc: "Transform energy infrastructure with quantum-powered optimization algorithms. We help utilities and energy providers implement quantum solutions for grid stability, renewable energy integration, and enhanced cybersecurity with quantum key distribution.",
    deliverables: [
      "Grid optimization algorithms",
      "Quantum Key Distribution setup",
      "Renewable energy forecasting",
      "Predictive maintenance systems"
    ],
    impact: "22% peak-hour reduction achieved",
    timeline: "2024-2030",
    color: "from-green-500/20 to-emerald-500/20"
  },
  {
    id: "enterprise",
    sector: "Business Automation",
    status: "Active",
    icon: Briefcase,
    title: "Business Automation & AI Readiness",
    shortDesc: "Helping organizations assess their AI maturity, identify quantum-safe cryptography needs, and develop transformation roadmaps.",
    fullDesc: "Accelerate digital transformation with AI-powered automation and quantum readiness assessments. We guide enterprises through the complexity of modern AI implementation while ensuring future-proof quantum-safe infrastructure.",
    deliverables: [
      "AI readiness assessment",
      "Process automation strategy",
      "Quantum-safe migration plan",
      "ROI optimization framework"
    ],
    impact: "45+ organizations assessed",
    timeline: "2024-2026",
    color: "from-orange-500/20 to-amber-500/20"
  },
  {
    id: "security",
    sector: "Quantum Computing",
    status: "Active",
    icon: Shield,
    title: "Quantum-Safe Cryptography Transition",
    shortDesc: "Guiding organizations through the transition to post-quantum cryptographic standards to protect against future quantum threats.",
    fullDesc: "Protect your organization from quantum computing threats with comprehensive post-quantum cryptography migration. We implement NIST-approved PQC algorithms and establish quantum-resistant security infrastructure.",
    deliverables: [
      "Crypto inventory & risk assessment",
      "PQC algorithm implementation",
      "Security architecture redesign",
      "Compliance verification"
    ],
    impact: "12+ critical infrastructure partners",
    timeline: "2024-2030",
    color: "from-red-500/20 to-rose-500/20"
  },
  {
    id: "advocacy",
    sector: "Lobby",
    status: "Active",
    icon: Scale,
    title: "Pennsylvania Quantum Public Lobby",
    shortDesc: "Grassroots advocacy initiative connecting scientists and academics to advance quantum computing policy and education in Pennsylvania.",
    fullDesc: "Community-driven advocacy for quantum technology advancement. We connect researchers, educators, policymakers, and industry leaders to shape quantum policy and expand educational opportunities across Pennsylvania.",
    deliverables: [
      "Legislative outreach programs",
      "Community engagement events",
      "Policy white papers",
      "Educational partnerships"
    ],
    impact: "Community-driven initiative",
    timeline: "2024-Present",
    color: "from-indigo-500/20 to-violet-500/20"
  },
  {
    id: "curiosity",
    sector: "Curiosity",
    status: "Planning",
    icon: Sparkles,
    title: "Open Quantum Hardware Platform",
    shortDesc: "Creating accessible quantum computing testbeds for educational institutions and research organizations worldwide.",
    fullDesc: "Democratizing quantum computing access through open-source hardware platforms. Our initiative aims to make quantum experimentation accessible to researchers and educators globally, fostering innovation and accelerating quantum literacy.",
    deliverables: [
      "Open-source quantum testbeds",
      "Cloud-based quantum simulators",
      "Educational resource library",
      "Global collaboration network"
    ],
    impact: "Global accessibility target",
    timeline: "2025-2028",
    color: "from-teal-500/20 to-cyan-500/20"
  },
  {
    id: "ai-safety",
    sector: "AI Safety",
    status: "Launching Q2 2025",
    icon: AlertTriangle,
    title: "Explainable AI Governance Framework",
    shortDesc: "Building transparent AI systems with robust safety protocols, ethical guidelines, and accountability mechanisms.",
    fullDesc: "Ensure AI systems are safe, transparent, and aligned with human values. We develop comprehensive governance frameworks that prioritize explainability, fairness, and ethical AI deployment across all sectors.",
    deliverables: [
      "AI ethics framework development",
      "Explainability tooling",
      "Bias detection & mitigation",
      "Safety compliance audits"
    ],
    impact: "Targeting 100+ AI systems audited",
    timeline: "2025-2027",
    color: "from-yellow-500/20 to-orange-500/20"
  }
];

export const ServiceCards = () => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  return (
    <section id="services" className="py-12 sm:py-16 md:py-20 relative overflow-hidden" aria-labelledby="services-heading">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-accent/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center space-y-2 sm:space-y-3 mb-8 sm:mb-10"
        >
          <h2 id="services-heading" className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">Current Initiatives</h2>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-foreground/80 max-w-3xl mx-auto px-4 font-medium">
            Empowering Quantum & AI Literacy through active programs across education, government, energy, and enterprise sectors worldwide.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5 mb-6 sm:mb-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
            >
              <Card 
                className={cn(
                  "group relative overflow-hidden transition-all duration-500 h-full",
                  "hover:shadow-[8px_8px_0px_0px_hsl(var(--primary)/0.3),0_10px_40px_hsl(var(--primary)/0.2)]",
                  "hover:-translate-y-2 hover:rotate-[0.5deg]",
                  "border-2 shadow-[4px_4px_0px_0px_hsl(var(--border))]",
                  "glass-card-3d bg-gradient-to-br backdrop-blur-sm",
                  "transform-gpu perspective-1000",
                  service.color,
                  expandedCard === service.id ? "ring-2 ring-primary shadow-[8px_8px_0px_0px_hsl(var(--primary)/0.4)] scale-[1.02]" : ""
                )}
                style={{ 
                  contain: 'layout style paint',
                  transformStyle: 'preserve-3d',
                  transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  minHeight: '320px',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                  willChange: 'transform, opacity'
                }}
              >
                <CardHeader className="relative space-y-3 pb-3 sm:pb-4">
                  <div className="flex items-start justify-between gap-3 sm:gap-4">
                    <motion.div 
                      className="p-2 sm:p-2.5 rounded-lg bg-background/80 backdrop-blur-sm w-fit border-2 shadow-[2px_2px_0px_0px_hsl(var(--border))]"
                      whileHover={{ 
                        rotate: [0, -10, 10, -10, 0],
                        scale: [1, 1.1, 1.1, 1.1, 1],
                        y: [0, -4, -4, -4, 0]
                      }}
                      transition={{ 
                        duration: 0.6,
                        times: [0, 0.2, 0.4, 0.6, 1]
                      }}
                      style={{
                        transformStyle: 'preserve-3d'
                      }}
                    >
                      <service.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary" aria-hidden="true" />
                    </motion.div>
                    <div className="flex flex-col gap-1.5 sm:gap-2 items-end">
                      <Badge 
                        variant={service.status === "Active" ? "default" : service.status === "Planning" ? "secondary" : "outline"}
                        className="text-[10px] sm:text-xs font-bold border-2 shadow-[2px_2px_0px_0px_hsl(var(--border))]"
                      >
                        {service.status}
                      </Badge>
                      <Badge variant="outline" className="text-[10px] sm:text-xs border-2 shadow-[2px_2px_0px_0px_hsl(var(--border))] bg-background/60">
                        {service.sector}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-sm sm:text-base md:text-lg leading-tight">{service.title}</CardTitle>
                  <CardDescription className="text-[11px] sm:text-xs md:text-sm leading-relaxed">
                    {service.shortDesc}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative space-y-4 pt-0">
                  <div className="grid grid-cols-2 gap-3 py-3 border-t-2 border-dashed border-border/50">
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-foreground/70 uppercase tracking-wider">Impact</span>
                      <p className="text-sm font-semibold">{service.impact}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-foreground/70 uppercase tracking-wider">Timeline</span>
                      <p className="text-sm font-semibold">{service.timeline}</p>
                    </div>
                  </div>

                  <InteractiveHoverButton
                    variant="flat"
                    size="sm"
                    icon={expandedCard === service.id ? ChevronDown : ChevronRight}
                    className="w-full shadow-[2px_2px_0px_0px_hsl(var(--border))] hover:shadow-[3px_3px_0px_0px_hsl(var(--primary)/0.2)]"
                    onClick={() => setExpandedCard(expandedCard === service.id ? null : service.id)}
                  >
                    Details
                  </InteractiveHoverButton>

                  <AnimatePresence>
                    {expandedCard === service.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4 overflow-hidden"
                      >
                        <div className="pt-4 border-t-2 border-dashed border-border/50 space-y-4">
                          <p className="text-sm text-foreground/80 leading-relaxed font-medium">
                            {service.fullDesc}
                          </p>
                          
                          <div className="space-y-3 p-4 rounded-lg bg-background/60 backdrop-blur-sm border-2 shadow-[2px_2px_0px_0px_hsl(var(--border))]">
                            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Key Deliverables</p>
                            <ul className="space-y-2">
                              {service.deliverables.map((deliverable, idx) => (
                                <li key={idx} className="text-sm text-foreground/80 flex items-start gap-2 font-medium">
                                  <ChevronRight className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                                  <span>{deliverable}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <InteractiveHoverButton
            size="lg"
            variant="3d-teal"
            hasLighthouse
            icon={ChevronRight}
            onClick={() => window.open('https://keen-hardboard-afe.notion.site/28cf142372ef8050ac86f4a3b4c813db?v=28cf142372ef8073b8cf000c0ebfca06&source=copy_link', '_blank', 'noopener,noreferrer')}
            className="border-2 shadow-[4px_4px_0px_0px_hsl(var(--primary)/0.3)]"
          >
            View All Initiatives
          </InteractiveHoverButton>
        </motion.div>
      </div>
    </section>
  );
};
