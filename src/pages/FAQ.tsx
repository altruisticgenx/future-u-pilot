import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, Shield, Users, Zap, Settings, ArrowRight, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

type FAQCategory = "security" | "workforce" | "benefits" | "implementation";

interface FAQItem {
  category: FAQCategory;
  question: string;
  answer: string;
  featured?: boolean;
}

const faqData: FAQItem[] = [
  {
    category: "security",
    question: "What is the quantum threat and why is it urgent?",
    answer: "Quantum computers will soon be powerful enough to break current public key encryption (PKE) that protects our digital lives—from emails to banking. Experts predict this will happen within 10-20 years. The danger is immediate because adversaries are using a 'harvest now, decrypt later' strategy, collecting encrypted data today to decrypt with quantum computers in the future. This threatens medical records, personal information, government intelligence, and industrial secrets.",
    featured: true
  },
  {
    category: "security",
    question: "What is Post-Quantum Encryption (PQE)?",
    answer: "Post-Quantum Encryption (PQE) refers to new cryptographic algorithms specifically designed to resist attacks from quantum computers. The National Institute of Standards and Technology (NIST) has already released the first three Post-Quantum Crypto Standards (FIPS 203, 204, and 205) in August 2024. Organizations must adopt these standards now to protect sensitive data and critical infrastructure like power grids, pipelines, and defense systems."
  },
  {
    category: "security",
    question: "What is Quantum Key Distribution (QKD)?",
    answer: "Quantum Key Distribution (QKD) is an advanced security method that uses quantum mechanics principles to create virtually unbreakable encryption keys. It has already demonstrated the ability to protect critical infrastructure like nuclear plants from cyber attacks, with the added benefit of easily detecting intrusion attempts. QKD may become a key networking tool once its development reaches a secure deployment stage."
  },
  {
    category: "workforce",
    question: "How will the Pennsylvania Quantum Initiative create jobs?",
    answer: "The initiative will create thousands of high-paying, high-tech jobs across multiple sectors. Building quantum computers will add to Pennsylvania's existing 10,000 semiconductor manufacturing jobs. Additional opportunities include quantum software development, system operation, mineral sourcing, networking infrastructure, and technical positions that don't require 4-year degrees. Without this initiative, these jobs will go to other states or countries, leaving Pennsylvania students without access to these career opportunities.",
    featured: true
  },
  {
    category: "workforce",
    question: "What education and training will be provided?",
    answer: "The Pennsylvania Quantum Initiative (PaQI) will train students and professionals at all levels: K-12 programs to build foundational skills, technical schools offering IT career pathways without 4-year degrees, community colleges developing computer science and advanced manufacturing skills, and university research programs for advanced study. The goal is to ensure quantum physics doesn't become an 'impassable gate' to careers in advanced computing. A shared access infrastructure program will give students hands-on experience with quantum computers."
  },
  {
    category: "benefits",
    question: "How will quantum computing improve healthcare?",
    answer: "Quantum computing will revolutionize medicine through: faster drug discovery using accurate molecular and protein folding simulations, dramatically reducing development time and costs; highly precise diagnostics including improved cancer detection; significantly enhanced MRI sensitivity and resolution for detecting early disease biomarkers; genetic analysis using algorithms like GAMA (developed at Carnegie Mellon) to provide early warnings for ailments; and potential Brain Computer Interfaces (BCIs) that collect data non-invasively. This will accelerate breakthroughs for diseases that currently have no cure.",
    featured: true
  },
  {
    category: "benefits",
    question: "What energy and environmental benefits does quantum computing offer?",
    answer: "Quantum computing can transform the energy sector by: managing the complexity of modern energy grids with distributed and variable production; optimizing placement of wind turbines, solar panels, hydroelectric, and gas plants; increasing solar panel efficiency (photosynthesis is a quantum process); improving natural gas efficiency and reducing emissions for cleaner air; making the gas pipeline network safer and more efficient; developing new, safer materials for nuclear and fusion power; and creating more efficient hydrogen, ethanol, and alternative fuels. It can also enhance climate models for better flood preparation and infrastructure readiness, and optimize ecosystems as carbon sinks."
  },
  {
    category: "benefits",
    question: "How will quantum computing help Pennsylvania manufacturing?",
    answer: "Pennsylvania's large manufacturing sector will benefit through: accelerated discovery of new materials with superior properties like greater durability or conductivity; more ethical sourcing of materials; reduced environmental impact; expanded recyclability; improved logistics and supply chain decisions; and development of cleaner, more efficient catalysts and processes. The quantum computing industry itself will create thousands of manufacturing jobs in building quantum computers and related components."
  },
  {
    category: "benefits",
    question: "What agricultural improvements can quantum computing provide?",
    answer: "Quantum computing offers long-term agricultural benefits including: development of cleaner and more efficient fertilizer production catalysts; less disruptive fertilizers and pesticides; crop design using quantum-assisted gene editing for more nutritious foods and reduced environmental impact; world models using solar and soil data to find optimal agricultural locations; improved wastewater management models; and enhanced ability to conserve native wildlife and restore plants harmed by disease."
  },
  {
    category: "implementation",
    question: "What is the Quantum Initiative Advisory Board?",
    answer: "The Quantum Initiative Advisory Board will be a key element of Pennsylvania's quantum strategy. It will include industry experts from life sciences, energy, and manufacturing sectors, with members appointed by both the governor's office and legislature. The board will draft annual or biannual plans based on initiative-defined goals, which must be approved by a majority in the legislature. This ensures balanced expertise and democratic oversight of the quantum initiative."
  },
  {
    category: "implementation",
    question: "What is the Quantum Ethics and Governance Commission?",
    answer: "The Quantum Ethics and Governance Commission will continuously review the ethical, legal, and social implications of new quantum technologies before deployment in government or state-regulated sectors. It will focus on: data privacy when deploying algorithms and quantum technology; right to explainability of data use; developmental autonomy for localities; economic rights and fair wages for workers; clear IP licensing rules for scientists; and protection of freedom of thought. This commission ensures quantum technologies serve the public good while protecting individual rights.",
    featured: true
  },
  {
    category: "implementation",
    question: "How will Pennsylvania remain competitive with other states?",
    answer: "Pennsylvania must act now because Maryland and New York are already advancing quickly with their quantum agendas. The initiative requires: strategic investment and ecosystem development; maximizing federal funding from the National Quantum Initiative; establishing a Quantum Seed Fund to move innovations from universities into businesses; upgrading networking with fiber optics and photonics; creating innovation funds and zones; and building public-private partnerships. Without this investment, Pennsylvania risks falling behind regionally, domestically, and globally in critical technology that may determine our future more than AI has."
  },
  {
    category: "workforce",
    question: "Why is technological sovereignty important?",
    answer: "Technological sovereignty means developing quantum capabilities domestically rather than becoming dependent on other states or rival nations. This ensures: protection of citizens' fundamental rights and economic security; control over critical infrastructure security; competitive advantages in advanced technologies; and the ability to support American values through economic and scientific strength. The National Quantum Initiative was started specifically to maintain U.S. leadership in this critical technology area."
  },
  {
    category: "security",
    question: "What infrastructure needs quantum protection immediately?",
    answer: "Critical infrastructure requiring immediate quantum protection includes: nuclear power plants and defense systems; the gas pipeline network fueling homes and industries; power grids and energy distribution systems; financial and banking systems; healthcare systems with decades of medical records; government systems containing classified intelligence; and any organization with data requiring long-term secrecy (personally identifiable information, industrial trade secrets). The window for proactive measures is closing rapidly."
  },
  {
    category: "implementation",
    question: "What are the key goals of the Pennsylvania Quantum Initiative?",
    answer: "Example goals include: leveling up K-12 and technical schools for IT career access without 4-year degrees; creating successful quantum computing programs for climate adaptation and environment; upgrading Pennsylvania's fiber optic and photonic networking; applying quantum computing to government functions like emergency vehicle placement and grid efficiency; developing novel manufacturing materials with higher efficiency and minimal environmental degradation; preparing for the quantum era with post-quantum encryption and quantum key distribution; and building internationally competitive quantum capabilities for medicine and life sciences."
  },
  {
    category: "benefits",
    question: "How can quantum computing benefit state government operations?",
    answer: "Quantum computing can improve Pennsylvania government efficiency through: enhanced data analysis capabilities; energy grid optimization; water grid optimization; optimal placement of emergency response vehicles; improved climate breakdown models for flood preparation, snow/ice response, and infrastructure readiness; and better resource allocation across multiple government functions. These improvements translate to cost savings and better public services."
  }
];

const categoryConfig: Record<FAQCategory, { label: string; icon: any; color: string; gradient: string }> = {
  security: {
    label: "Security & Crypto",
    icon: Shield,
    color: "text-red-500",
    gradient: "from-red-500/20 to-red-600/10"
  },
  workforce: {
    label: "Workforce & Jobs",
    icon: Users,
    color: "text-blue-500",
    gradient: "from-blue-500/20 to-blue-600/10"
  },
  benefits: {
    label: "Benefits & Impact",
    icon: Zap,
    color: "text-green-500",
    gradient: "from-green-500/20 to-green-600/10"
  },
  implementation: {
    label: "Implementation",
    icon: Settings,
    color: "text-purple-500",
    gradient: "from-purple-500/20 to-purple-600/10"
  }
};

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<FAQCategory | "all">("all");
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const filteredFAQs = useMemo(() => {
    let filtered = faqData;

    if (activeCategory !== "all") {
      filtered = filtered.filter(faq => faq.category === activeCategory);
    }

    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(
        faq =>
          faq.question.toLowerCase().includes(search) ||
          faq.answer.toLowerCase().includes(search)
      );
    }

    return filtered;
  }, [searchTerm, activeCategory]);

  const toggleItem = (index: number) => {
    setExpandedItems(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const featuredFAQs = faqData.filter(faq => faq.featured);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          {/* Hero Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12 space-y-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Pennsylvania Quantum Initiative</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
              <span className="block text-foreground mb-2">Frequently Asked</span>
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Questions
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about quantum computing, AI, and Pennsylvania's quantum future
            </p>
          </motion.div>

          {/* Featured Questions */}
          {activeCategory === "all" && !searchTerm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-primary" />
                Featured Questions
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {featuredFAQs.map((faq, index) => {
                  const config = categoryConfig[faq.category];
                  const Icon = config.icon;
                  return (
                    <motion.button
                      key={index}
                      onClick={() => {
                        const fullIndex = faqData.indexOf(faq);
                        toggleItem(fullIndex);
                        // Scroll to the item
                        setTimeout(() => {
                          document.getElementById(`faq-${fullIndex}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }, 100);
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-6 rounded-xl bg-gradient-to-br ${config.gradient} border border-border hover:border-primary/50 transition-all text-left group`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg bg-background/50 ${config.color}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                            {faq.question}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {faq.answer.substring(0, 100)}...
                          </p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-8 relative"
          >
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors w-5 h-5 z-10" />
              <Input
                type="text"
                placeholder="Search for answers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-6 text-base bg-background/50 backdrop-blur-sm border-2 border-border focus:border-primary transition-all rounded-xl"
              />
            </div>
          </motion.div>

          {/* Category Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-3 mb-8 justify-center"
          >
            <Button
              onClick={() => setActiveCategory("all")}
              variant={activeCategory === "all" ? "default" : "outline"}
              className="rounded-full px-6"
              size="lg"
            >
              All Questions
            </Button>
            {(Object.keys(categoryConfig) as FAQCategory[]).map((category) => {
              const config = categoryConfig[category];
              const Icon = config.icon;
              return (
                <Button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  variant={activeCategory === category ? "default" : "outline"}
                  className="rounded-full px-6 flex items-center gap-2"
                  size="lg"
                >
                  <Icon className="w-4 h-4" />
                  {config.label}
                </Button>
              );
            })}
          </motion.div>

          {/* FAQ Grid */}
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredFAQs.length > 0 ? (
                filteredFAQs.map((faq, index) => {
                  const fullIndex = faqData.indexOf(faq);
                  const isExpanded = expandedItems.has(fullIndex);
                  const config = categoryConfig[faq.category];
                  const Icon = config.icon;

                  return (
                    <motion.div
                      id={`faq-${fullIndex}`}
                      key={fullIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className={`group rounded-xl border-2 transition-all overflow-hidden ${
                        isExpanded 
                          ? 'border-primary shadow-lg shadow-primary/20' 
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      {/* Question Button */}
                      <button
                        onClick={() => toggleItem(fullIndex)}
                        className="w-full p-6 text-left transition-colors hover:bg-primary/5"
                      >
                        <div className="flex items-start gap-4">
                          <div className={`p-2 rounded-lg bg-gradient-to-br ${config.gradient} ${config.color} flex-shrink-0`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <span className={`text-xs font-bold uppercase tracking-wider ${config.color}`}>
                                {config.label}
                              </span>
                              {faq.featured && (
                                <span className="px-2 py-0.5 text-xs font-bold bg-primary/20 text-primary rounded-full">
                                  Featured
                                </span>
                              )}
                            </div>
                            <p className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                              {faq.question}
                            </p>
                          </div>

                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex-shrink-0 mt-1"
                          >
                            <ChevronDown className={`w-6 h-6 ${isExpanded ? 'text-primary' : 'text-muted-foreground'}`} />
                          </motion.div>
                        </div>
                      </button>

                      {/* Answer */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6 pl-20">
                              <div className="prose prose-sm max-w-none">
                                <p className="text-muted-foreground leading-relaxed">
                                  {faq.answer}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <p className="text-xl text-muted-foreground">
                    No questions found matching "{searchTerm}"
                  </p>
                  <Button
                    onClick={() => setSearchTerm("")}
                    variant="outline"
                    className="mt-4"
                  >
                    Clear Search
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-primary/20 via-accent/10 to-background border-2 border-primary/50 text-center"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Still have questions?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We're here to help! Book a strategy session to discuss your quantum readiness, AI deployment, or policy compliance needs.
            </p>
            <Button
              onClick={() => window.location.href = "/#contact"}
              size="lg"
              className="btn-3d-primary"
            >
              Contact Us
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
