import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  Users, 
  Shield, 
  Coins, 
  GraduationCap, 
  Zap, 
  Microscope, 
  Factory, 
  Sprout, 
  Lock, 
  Scale,
  TrendingUp,
  Target,
  CheckCircle2,
  Mail
} from "lucide-react";
import { motion } from "framer-motion";

interface QuantumLobbyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const QuantumLobbyModal = ({ open, onOpenChange }: QuantumLobbyModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Quantum Computing Lobby
          </DialogTitle>
          <DialogDescription className="text-base">
            Interactive policy blueprints and initiatives for the quantum-AI era
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="paqi" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="paqi">Pennsylvania Quantum Initiative</TabsTrigger>
            <TabsTrigger value="sme">SME AI Readiness</TabsTrigger>
          </TabsList>

          {/* PaQI Tab */}
          <TabsContent value="paqi" className="mt-4">
            <ScrollArea className="h-[60vh] pr-4">
              <div className="space-y-6">
                {/* Executive Context */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="border-primary/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Brain className="h-5 w-5 text-primary" />
                        The Pennsylvania Quantum Initiative (PaQI)
                      </CardTitle>
                      <p className="text-sm text-muted-foreground italic">
                        A Systems Blueprint for a Quantum-Ready Commonwealth
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="font-semibold">Executive Context</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Pennsylvania stands at the crossroads of history and computation. We once built the first digital computer, 
                          cured polio, and defined the modern ambulance — acts of courage that fused public purpose with engineering brilliance.
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Now, the next frontier is quantum: a convergence of physics, computation, ethics, and human imagination that will 
                          rewrite how economies, ecosystems, and governance interact.
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          The <strong>Pennsylvania Quantum Initiative (PaQI)</strong> is not a bill yet. It's a <em>prototype for governance</em> — 
                          a living, open-source experiment designed to demonstrate what a state-level quantum ecosystem could look like when driven 
                          by ethics, inclusion, and strategic foresight.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Core Framework */}
                <div className="grid md:grid-cols-3 gap-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Card className="h-full hover:border-primary/50 transition-colors">
                      <CardHeader>
                        <Users className="h-8 w-8 text-primary mb-2" />
                        <CardTitle className="text-lg">Advisory Board</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          A rotational network of domain architects from life sciences, energy, materials, computing, 
                          manufacturing, and ethics — appointed jointly by legislative and executive branches.
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Card className="h-full hover:border-primary/50 transition-colors">
                      <CardHeader>
                        <Shield className="h-8 w-8 text-primary mb-2" />
                        <CardTitle className="text-lg">Ethics Commission</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          A civic counterpart ensuring explainability, data dignity, and human autonomy as quantum systems 
                          enter healthcare, finance, and public infrastructure.
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Card className="h-full hover:border-primary/50 transition-colors">
                      <CardHeader>
                        <Coins className="h-8 w-8 text-primary mb-2" />
                        <CardTitle className="text-lg">Seed Fund</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          A $640K–$1M catalytic pool designed to attract matching federal and private capital while giving 
                          small Pennsylvania institutions access to shared quantum infrastructure.
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

                {/* Strategic Axes */}
                <Card>
                  <CardHeader>
                    <CardTitle>Strategic Axes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      {
                        icon: GraduationCap,
                        title: "Education and Workforce Development",
                        description: "Introduce quantum concepts early — as intuition, not intimidation. Bridge technical schools, community colleges, and research labs into a single 'quantum learning continuum.'"
                      },
                      {
                        icon: Zap,
                        title: "Energy and Climate Systems",
                        description: "Use quantum optimization for grid stability, load balancing, and energy forecasting. Deploy quantum key distribution (QKD) for cyber-resilient energy and water infrastructure."
                      },
                      {
                        icon: Microscope,
                        title: "Life Sciences and Health Intelligence",
                        description: "Quantum simulation of molecules, proteins, and gene interactions for accelerated drug discovery. Quantum sensing for noninvasive diagnostics with ethical guardrails."
                      },
                      {
                        icon: Factory,
                        title: "Manufacturing, Materials, and Industry 4.0",
                        description: "Accelerate materials discovery: superconductors, bioplastics, carbon-negative alloys. Quantum-logistics modeling for supply chain optimization and low-waste manufacturing."
                      },
                      {
                        icon: Sprout,
                        title: "Agriculture and Ecosystem Intelligence",
                        description: "Quantum-assisted fertilizer and soil models for sustainable farming. Predictive water and crop models using quantum-enhanced weather simulations."
                      },
                      {
                        icon: Lock,
                        title: "Cybersecurity and Technological Sovereignty",
                        description: "Mandate Post-Quantum Encryption (PQE) adoption across public data infrastructure. Expand photonic network backbones to ensure high-speed, quantum-secure communications."
                      },
                      {
                        icon: Scale,
                        title: "Ethics, Rights, and Cognitive Freedom",
                        description: "Draft a Quantum Bill of Rights safeguarding individuals from algorithmic exploitation and neuro-intrusion. Enforce explainability and auditability for all quantum and AI systems."
                      }
                    ].map((axis, index) => (
                      <div key={index} className="flex gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                        <axis.icon className="h-5 w-5 text-primary shrink-0 mt-1" />
                        <div>
                          <h5 className="font-semibold text-sm mb-1">{axis.title}</h5>
                          <p className="text-xs text-muted-foreground leading-relaxed">{axis.description}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Implementation Timeline */}
                <Card>
                  <CardHeader>
                    <CardTitle>Investment and Implementation</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <Badge className="shrink-0">1-2 years</Badge>
                        <div>
                          <p className="text-sm font-semibold mb-1">Near-Term</p>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            <li>• Launch the Quantum Blueprint Portal</li>
                            <li>• Establish the Quantum Seed Fund</li>
                            <li>• Pilot shared-access quantum systems with academic partners</li>
                          </ul>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Badge className="shrink-0">3-5 years</Badge>
                        <div>
                          <p className="text-sm font-semibold mb-1">Mid-Term</p>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            <li>• Formalize the Quantum Initiative Advisory Board by legislative act</li>
                            <li>• Deploy regional innovation hubs linked by fiber and photonic networks</li>
                            <li>• Integrate quantum curricula into K–12 and workforce programs statewide</li>
                          </ul>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Badge className="shrink-0">5-10 years</Badge>
                        <div>
                          <p className="text-sm font-semibold mb-1">Long-Term</p>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            <li>• Establish Pennsylvania as a North American node of quantum manufacturing</li>
                            <li>• Evolve the PaQI model into a Commonwealth Quantum Charter</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Vision */}
                <Card className="border-primary/30 bg-primary/5">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      The Vision
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      Quantum computing will not just compute. It will sense, simulate, and <em>understand</em>. 
                      It will extend our capacity to design materials, cure diseases, balance grids, and perceive 
                      ecosystems at planetary scale.
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      The goal is not domination — it's <strong>coherence</strong>: aligning human, environmental, 
                      and economic systems in resonance rather than competition. Pennsylvania can be the first to architect 
                      that coherence — not as a headline, but as a working system.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
          </TabsContent>

          {/* SME AI Readiness Tab */}
          <TabsContent value="sme" className="mt-4">
            <ScrollArea className="h-[60vh] pr-4">
              <div className="space-y-6">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="border-accent/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-accent" />
                        The SME AI Readiness Program
                      </CardTitle>
                      <p className="text-sm text-muted-foreground italic">
                        A Regional Blueprint for an AI-Literate Economy
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-semibold mb-1">Client</p>
                          <p className="text-muted-foreground">Regional Chamber of Commerce</p>
                        </div>
                        <div>
                          <p className="font-semibold mb-1">Timeline</p>
                          <p className="text-muted-foreground">November 1 – December 15, 2025</p>
                        </div>
                        <div>
                          <p className="font-semibold mb-1">Value</p>
                          <p className="text-muted-foreground">$12,500</p>
                        </div>
                        <div>
                          <p className="font-semibold mb-1">Status</p>
                          <Badge variant="secondary">Not Started</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Executive Context */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Executive Context</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Across every main street and manufacturing floor, small and mid-sized enterprises (SMEs) are quietly 
                      shaping the pulse of the regional economy. They build, ship, hire, and adapt — but when it comes to 
                      artificial intelligence, most are standing at the gate of the next revolution without a map.
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      The Regional Chamber of Commerce is launching the <strong>SME AI Readiness Program</strong>, a 45-day 
                      accelerator designed to translate the language of AI into the grammar of everyday business — where automation, 
                      analytics, and augmentation become tools of survival, not science fiction.
                    </p>
                  </CardContent>
                </Card>

                {/* Framework */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Structural Framework</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
                        <div className="p-2 rounded bg-primary/10 h-fit">
                          <Users className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm mb-1">Cohort Design</p>
                          <p className="text-xs text-muted-foreground">
                            Guided, multi-session workshop series where business leaders and teams engage in structured 
                            exploration of AI fundamentals, safe use, and applied use-case discovery.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
                        <div className="p-2 rounded bg-primary/10 h-fit">
                          <Target className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm mb-1">Practice Environments</p>
                          <p className="text-xs text-muted-foreground">
                            Hands-on labs simulate real-world conditions: document workflows, customer communication, and 
                            process optimization — all executed in sandboxed, transparent environments.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
                        <div className="p-2 rounded bg-primary/10 h-fit">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm mb-1">Learning Artifacts</p>
                          <p className="text-xs text-muted-foreground">
                            Interactive slide decks, annotated facilitator notes, four dataset-driven labs with walkthroughs, 
                            and organizational readiness rubric with maturity scoring framework.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Success Metrics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Impact and Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: "Businesses Trained", value: "25" },
                        { label: "Completion Rate", value: "≥ 80%" },
                        { label: "Follow-On Assessments", value: "≥ 10" },
                        { label: "Satisfaction (CSAT)", value: "≥ 4.5/5" }
                      ].map((metric, index) => (
                        <div key={index} className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                          <p className="text-xs text-muted-foreground mb-1">{metric.label}</p>
                          <p className="text-lg font-bold text-primary">{metric.value}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Vision Statement */}
                <Card className="border-accent/30 bg-accent/5">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-2">Vision Statement</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      AI won't replace businesses. But businesses that understand AI — its logic, its limits, its leverage — 
                      will define the next economy.
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      The SME AI Readiness Program is a working hypothesis for how regional chambers can move from passive observers 
                      to architects of intelligent local economies. This is how transformation begins: Not with grand declarations, 
                      but with 25 small businesses learning to think in algorithms and act in foresight.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>

        {/* Footer Actions */}
        <div className="flex justify-between items-center pt-4 border-t">
          <p className="text-xs text-muted-foreground">
            Contact us to learn more about these initiatives
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.location.href = "mailto:altruisticxai@gmail.com"}
          >
            <Mail className="h-4 w-4 mr-2" />
            Get in Touch
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
