import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

type FAQCategory = "security" | "workforce" | "benefits" | "implementation";

interface FAQItem {
  category: FAQCategory;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    category: "security",
    question: "What is the quantum threat and why is it urgent?",
    answer: "Quantum computers will soon be powerful enough to break current public key encryption (PKE) that protects our digital lives—from emails to banking. Experts predict this will happen within 10-20 years. The danger is immediate because adversaries are using a 'harvest now, decrypt later' strategy, collecting encrypted data today to decrypt with quantum computers in the future. This threatens medical records, personal information, government intelligence, and industrial secrets."
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
    answer: "The initiative will create thousands of high-paying, high-tech jobs across multiple sectors. Building quantum computers will add to Pennsylvania's existing 10,000 semiconductor manufacturing jobs. Additional opportunities include quantum software development, system operation, mineral sourcing, networking infrastructure, and technical positions that don't require 4-year degrees. Without this initiative, these jobs will go to other states or countries, leaving Pennsylvania students without access to these career opportunities."
  },
  {
    category: "workforce",
    question: "What education and training will be provided?",
    answer: "The Pennsylvania Quantum Initiative (PaQI) will train students and professionals at all levels: K-12 programs to build foundational skills, technical schools offering IT career pathways without 4-year degrees, community colleges developing computer science and advanced manufacturing skills, and university research programs for advanced study. The goal is to ensure quantum physics doesn't become an 'impassable gate' to careers in advanced computing. A shared access infrastructure program will give students hands-on experience with quantum computers."
  },
  {
    category: "benefits",
    question: "How will quantum computing improve healthcare?",
    answer: "Quantum computing will revolutionize medicine through: faster drug discovery using accurate molecular and protein folding simulations, dramatically reducing development time and costs; highly precise diagnostics including improved cancer detection; significantly enhanced MRI sensitivity and resolution for detecting early disease biomarkers; genetic analysis using algorithms like GAMA (developed at Carnegie Mellon) to provide early warnings for ailments; and potential Brain Computer Interfaces (BCIs) that collect data non-invasively. This will accelerate breakthroughs for diseases that currently have no cure."
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
    answer: "The Quantum Ethics and Governance Commission will continuously review the ethical, legal, and social implications of new quantum technologies before deployment in government or state-regulated sectors. It will focus on: data privacy when deploying algorithms and quantum technology; right to explainability of data use; developmental autonomy for localities; economic rights and fair wages for workers; clear IP licensing rules for scientists; and protection of freedom of thought. This commission ensures quantum technologies serve the public good while protecting individual rights."
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

const categoryConfig: Record<FAQCategory, { bgClass: string; textClass: string; borderClass: string; glowClass: string }> = {
  security: { 
    bgClass: "bg-red-500/15", 
    textClass: "text-red-400", 
    borderClass: "border-red-400/40",
    glowClass: "shadow-lg shadow-red-500/30"
  },
  workforce: { 
    bgClass: "bg-cyan-500/15", 
    textClass: "text-cyan-400", 
    borderClass: "border-cyan-400/40",
    glowClass: "shadow-lg shadow-cyan-500/30"
  },
  benefits: { 
    bgClass: "bg-emerald-500/15", 
    textClass: "text-emerald-400", 
    borderClass: "border-emerald-400/40",
    glowClass: "shadow-lg shadow-emerald-500/30"
  },
  implementation: { 
    bgClass: "bg-amber-500/15", 
    textClass: "text-amber-400", 
    borderClass: "border-amber-400/40",
    glowClass: "shadow-lg shadow-amber-500/30"
  }
};

const categoryLabels: Record<FAQCategory, string> = {
  security: "Security",
  workforce: "Workforce",
  benefits: "Benefits",
  implementation: "Implementation"
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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 sm:mb-12 p-6 sm:p-8 lg:p-10 glass-light rounded-lg border border-primary/20 backdrop-blur-md"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-hero bg-clip-text text-transparent mb-3 tracking-tight">
              Pennsylvania Quantum Initiative
            </h1>
            <p className="text-base sm:text-lg font-bold text-foreground/90 tracking-wider">
              Frequently Asked Questions
            </p>
          </motion.header>

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-6 sm:mb-8 glass-card-3d p-4 sm:p-5 rounded-full border-2 border-primary/30 focus-within:border-primary focus-within:shadow-lg focus-within:shadow-primary/50 transition-all"
          >
            <div className="flex items-center gap-3">
              <Search className="text-primary w-5 h-5 flex-shrink-0" aria-hidden="true" />
              <Input
                type="text"
                placeholder="Search for answers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-sm sm:text-base font-semibold placeholder:text-muted-foreground/60"
                aria-label="Search FAQ"
              />
            </div>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-2 mb-6 sm:mb-8 justify-center"
          >
            <Button
              onClick={() => setActiveCategory("all")}
              variant={activeCategory === "all" ? "default" : "outline"}
              className={`min-h-[44px] text-xs sm:text-sm font-extrabold uppercase tracking-wide touch-manipulation transition-all duration-300 ${
                activeCategory === "all" ? "shadow-lg shadow-primary/50 scale-105" : "hover:scale-102 hover:shadow-md"
              }`}
              size="sm"
            >
              All Questions
            </Button>
            {(Object.keys(categoryLabels) as FAQCategory[]).map((category) => (
              <Button
                key={category}
                onClick={() => setActiveCategory(category)}
                variant={activeCategory === category ? "default" : "outline"}
                className={`min-h-[44px] text-xs sm:text-sm font-extrabold uppercase tracking-wide touch-manipulation transition-all duration-300 ${
                  activeCategory === category ? "shadow-lg shadow-primary/50 scale-105" : "hover:scale-102 hover:shadow-md"
                }`}
                size="sm"
              >
                {categoryLabels[category]}
              </Button>
            ))}
          </motion.div>

          {/* FAQ Items */}
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredFAQs.length > 0 ? (
                filteredFAQs.map((faq, index) => {
                  const isExpanded = expandedItems.has(index);
                  const categoryStyle = categoryConfig[faq.category];

                  return (
                    <motion.div
                      key={`${faq.category}-${index}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.05 }}
                      className="glass-card-3d rounded-lg border border-primary/30 overflow-hidden hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-300"
                    >
                      {/* Question */}
                      <button
                        onClick={() => toggleItem(index)}
                        className="w-full p-5 sm:p-6 text-left transition-colors hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset min-h-[44px] touch-manipulation"
                        aria-expanded={isExpanded}
                        aria-controls={`faq-answer-${index}`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <span
                              className={`inline-block px-3 py-1 rounded text-xs font-black uppercase tracking-wider mb-2 border ${categoryStyle.bgClass} ${categoryStyle.textClass} ${categoryStyle.borderClass} ${categoryStyle.glowClass}`}
                            >
                              {categoryLabels[faq.category]}
                            </span>
                            <p className="text-sm sm:text-base font-bold text-foreground leading-relaxed">
                              {faq.question}
                            </p>
                          </div>
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="flex-shrink-0 mt-1"
                          >
                            <ChevronDown className="w-5 h-5 text-primary" aria-hidden="true" />
                          </motion.div>
                        </div>
                      </button>

                      {/* Answer */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            id={`faq-answer-${index}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden border-t border-primary/10"
                          >
                            <div className="p-5 sm:p-6 bg-background/50">
                              <p className="text-sm sm:text-base text-foreground/90 leading-relaxed font-medium">
                                {faq.answer}
                              </p>
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
                  exit={{ opacity: 0 }}
                  className="text-center py-16 px-6 glass-light rounded-lg border-2 border-dashed border-primary/30"
                >
                  <p className="text-base sm:text-lg font-bold text-foreground uppercase tracking-wide">
                    No matching questions found. Try different keywords.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
