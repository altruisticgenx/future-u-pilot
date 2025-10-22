import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
    <section id="services" className="py-16 sm:py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Current Initiatives</h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Empowering Quantum & AI Literacy through active programs across education, government, energy, and enterprise sectors worldwide.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card 
                className={cn(
                  "group relative overflow-hidden transition-all duration-300 h-full",
                  "hover:shadow-[8px_8px_0px_0px_hsl(var(--primary)/0.2)] hover:-translate-y-1",
                  "border-2 shadow-[4px_4px_0px_0px_hsl(var(--border))]",
                  "bg-gradient-to-br backdrop-blur-sm",
                  service.color,
                  expandedCard === service.id ? "ring-2 ring-primary shadow-[8px_8px_0px_0px_hsl(var(--primary)/0.3)]" : ""
                )}
              >
                <CardHeader className="relative space-y-4 pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="p-2.5 sm:p-3 rounded-lg bg-background/80 backdrop-blur-sm w-fit border-2 shadow-[2px_2px_0px_0px_hsl(var(--border))]">
                      <service.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      <Badge 
                        variant={service.status === "Active" ? "default" : service.status === "Planning" ? "secondary" : "outline"}
                        className="text-xs font-semibold border-2 shadow-[2px_2px_0px_0px_hsl(var(--border))]"
                      >
                        {service.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs border-2 shadow-[2px_2px_0px_0px_hsl(var(--border))] bg-background/60">
                        {service.sector}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-lg sm:text-xl leading-tight">{service.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {service.shortDesc}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative space-y-4 pt-0">
                  <div className="grid grid-cols-2 gap-3 py-3 border-t-2 border-dashed border-border/50">
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Impact</span>
                      <p className="text-sm font-medium">{service.impact}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Timeline</span>
                      <p className="text-sm font-medium">{service.timeline}</p>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    className="w-full justify-between group/btn border-2 shadow-[2px_2px_0px_0px_hsl(var(--border))] hover:shadow-[3px_3px_0px_0px_hsl(var(--primary)/0.2)] hover:-translate-y-0.5 transition-all"
                    onClick={() => setExpandedCard(expandedCard === service.id ? null : service.id)}
                  >
                    <span className="font-semibold text-sm">Details</span>
                    {expandedCard === service.id ? (
                      <ChevronDown className="w-4 h-4 transition-transform" />
                    ) : (
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    )}
                  </Button>

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
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {service.fullDesc}
                          </p>
                          
                          <div className="space-y-3 p-4 rounded-lg bg-background/60 backdrop-blur-sm border-2 shadow-[2px_2px_0px_0px_hsl(var(--border))]">
                            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Key Deliverables</p>
                            <ul className="space-y-2">
                              {service.deliverables.map((deliverable, idx) => (
                                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
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
          <Button 
            size="lg"
            onClick={() => window.open('https://keen-hardboard-afe.notion.site/28cf142372ef8050ac86f4a3b4c813db?v=28cf142372ef8073b8cf000c0ebfca06&source=copy_link', '_blank', 'noopener,noreferrer')}
            className="group border-2 shadow-[4px_4px_0px_0px_hsl(var(--primary)/0.3)] hover:shadow-[6px_6px_0px_0px_hsl(var(--primary)/0.4)] hover:-translate-y-0.5 transition-all"
          >
            View All Initiatives
            <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
