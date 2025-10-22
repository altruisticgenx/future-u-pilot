import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { 
  GraduationCap, 
  Building2, 
  Heart, 
  Zap, 
  ChevronDown,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

const services = [
  {
    id: "edu-quantum",
    sector: "Education",
    icon: GraduationCap,
    title: "Quantum Computing Education",
    shortDesc: "University partnerships for quantum curricula",
    fullDesc: "Partnering with 15+ universities to integrate quantum computing curricula and provide hands-on quantum hardware access to students.",
    deliverables: ["Curriculum design", "Hardware access", "Student training"],
    impact: "1,200+ students",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "biz-ai",
    sector: "Business",
    icon: Building2,
    title: "AI Readiness Assessment",
    shortDesc: "Enterprise AI maturity evaluation",
    fullDesc: "Helping organizations assess their AI maturity, identify quantum-safe cryptography needs, and develop transformation roadmaps.",
    deliverables: ["Maturity assessment", "Crypto inventory", "Transformation roadmap"],
    impact: "45+ organizations",
    color: "from-violet-500 to-purple-500",
  },
  {
    id: "health-ai",
    sector: "Healthcare",
    icon: Heart,
    title: "Healthcare AI Ethics",
    shortDesc: "Explainable AI for healthcare compliance",
    fullDesc: "Design explainable AI workflows that healthcare compliance teams approve. Local-first options for patient privacy.",
    deliverables: ["Explainability traces", "HIPAA compliance", "Privacy modes"],
    impact: "Coming Soon",
    color: "from-rose-500 to-pink-500",
  },
  {
    id: "energy-quantum",
    sector: "Energy",
    icon: Zap,
    title: "Quantum Grid Optimization",
    shortDesc: "Quantum computing for energy infrastructure",
    fullDesc: "Applying quantum algorithms to optimize energy grid management, reduce waste, and improve renewable integration.",
    deliverables: ["Grid simulation", "Optimization models", "Pilot deployment"],
    impact: "Coming Soon",
    color: "from-amber-500 to-orange-500",
  },
  {
    id: "edu-k12",
    sector: "Education",
    icon: GraduationCap,
    title: "K-12 Quantum Awareness",
    shortDesc: "Age-appropriate quantum content for youth",
    fullDesc: "Developing age-appropriate quantum mechanics content and interactive simulations for middle and high school students.",
    deliverables: ["Curriculum modules", "Interactive sims", "Teacher training"],
    impact: "50,000+ target",
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: "biz-lobby",
    sector: "Business",
    icon: Building2,
    title: "Policy & Advocacy",
    shortDesc: "Quantum computing policy advancement",
    fullDesc: "Grassroots advocacy connecting scientists and academics to advance quantum computing policy and education.",
    deliverables: ["Policy briefs", "Coalition building", "Legislative outreach"],
    impact: "Community-driven",
    color: "from-indigo-500 to-blue-500",
  },
];

export const ServiceCards = () => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const handleClick = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.getElementById(href.substring(1));
      element?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = href;
    }
  };

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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Solutions by Sector</h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Tailored quantum and AI programs for education, business, healthcare, and energy
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isExpanded = expandedCard === service.id;
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <Card className="h-full backdrop-blur-md bg-card/70 border-2 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 overflow-hidden relative">
                  {/* 3D Border Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-lg opacity-0 group-hover:opacity-30 blur-lg transition-all duration-500 group-hover:animate-pulse" />
                  
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent opacity-0 group-hover:opacity-100 animate-shimmer" />
                  
                  <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4 relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2">
                      <motion.div 
                        className={`p-2 sm:p-3 rounded-xl bg-gradient-to-br ${service.color} shadow-lg shrink-0`}
                        whileHover={{ rotate: 360, scale: 1.15 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      </motion.div>
                      
                      <Badge 
                        variant="outline" 
                        className="text-xs bg-background/80 backdrop-blur-sm"
                      >
                        {service.sector}
                      </Badge>
                    </div>

                    {/* Title */}
                    <div className="space-y-2">
                      <h3 className="text-base sm:text-lg font-bold group-hover:text-primary transition-colors leading-tight">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {service.shortDesc}
                      </p>
                    </div>

                    {/* Impact Badge */}
                    <div className="flex items-center justify-between">
                      <Badge 
                        className={`text-xs ${
                          service.impact === "Coming Soon"
                            ? "bg-orange-500/10 text-orange-500 border-orange-500/20"
                            : "bg-primary/10 text-primary border-primary/20"
                        }`}
                      >
                        {service.impact}
                      </Badge>
                      
                      <motion.button
                        onClick={() => setExpandedCard(isExpanded ? null : service.id)}
                        className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-medium"
                        whileHover={{ x: 3 }}
                      >
                        Details
                        <ChevronDown 
                          className={`h-3 w-3 transition-transform duration-300 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </motion.button>
                    </div>

                    {/* Expandable Details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 border-t border-border/50 space-y-3">
                            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                              {service.fullDesc}
                            </p>
                            
                            <div>
                              <p className="text-xs font-semibold mb-2">Deliverables:</p>
                              <ul className="space-y-1">
                                {service.deliverables.map((item) => (
                                  <li 
                                    key={item} 
                                    className="text-xs text-muted-foreground flex items-start gap-2"
                                  >
                                    <CheckCircle2 className="h-3 w-3 text-primary mt-0.5 shrink-0" />
                                    <span>{item}</span>
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
            );
          })}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            onClick={() => window.location.href = "/initiatives"}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Initiatives
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
