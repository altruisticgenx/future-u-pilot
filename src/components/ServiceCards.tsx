import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, FileText, Brain, TrendingUp, ChevronRight } from "lucide-react";

const services = [
  {
    id: "policy-engine",
    tag: "PolicyEngine",
    icon: FileText,
    title: "AI-Assisted Regulation Tracking",
    description: "AI-assisted regulation trackers that map statutes to your internal policies—draft, compare, and trace decisions.",
    deliverables: ["Live policy map", "Gap analysis", "Audit-ready reports"],
    cta: "See Policy Demo",
    href: "#demo-policy",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "quantum-shield",
    tag: "QuantumShield",
    icon: Shield,
    title: "Quantum-Safe Infrastructure",
    description: "Prototype quantum-safe infrastructure and crypto agility before attackers do. Assess, plan, and pilot.",
    deliverables: ["Readiness matrix", "Crypto inventory", "Pilot roadmap"],
    cta: "Run Readiness Check",
    href: "#readiness",
    color: "from-violet-500 to-purple-500",
  },
  {
    id: "ai-consultant",
    tag: "AIConsultant",
    icon: Brain,
    title: "Explainable AI Workflows",
    description: "Design explainable AI workflows that your compliance team actually approves. Local-first options available.",
    deliverables: ["Explainability traces", "Privacy modes", "MLOps playbooks"],
    cta: "Explore Workflows",
    href: "#workflows",
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: "pitch-optimizer",
    tag: "PitchOptimizer",
    icon: TrendingUp,
    title: "Fundable Technical Narratives",
    description: "Turn technical breakthroughs into fundable narratives for grants, RFPs, and pilots.",
    deliverables: ["Proposal engine", "Impact receipts", "Reviewer Q&A"],
    cta: "Generate a Draft",
    href: "/demo",
    color: "from-orange-500 to-pink-500",
  },
];

export const ServiceCards = () => {
  const handleClick = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.getElementById(href.substring(1));
      element?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = href;
    }
  };

  return (
    <section id="services" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold">What We Help With</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Four core services designed to bridge quantum computing, policy, and applied AI—responsibly.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <Card className="group h-full backdrop-blur-md bg-card/60 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 overflow-hidden relative">
                  {/* Animated background shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 animate-shimmer" />
                  
                  <CardContent className="p-6 sm:p-8 space-y-4 sm:space-y-6 relative z-10">
                    {/* Tag */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                      <code className="text-xs font-mono text-primary">
                        &lt;{service.tag} /&gt;
                      </code>
                    </div>

                    {/* Icon */}
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${service.color} bg-opacity-10`}>
                      <Icon className="h-8 w-8 text-primary" />
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Deliverables */}
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-foreground">Deliverables:</p>
                      <ul className="space-y-1">
                        {service.deliverables.map((item) => (
                          <li key={item} className="text-sm text-muted-foreground flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-primary" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA */}
                    <Button
                      variant="ghost"
                      className="group/btn w-full justify-between hover:bg-primary/10"
                      onClick={() => handleClick(service.href)}
                      aria-label={service.cta}
                    >
                      <span>{service.cta}</span>
                      <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
