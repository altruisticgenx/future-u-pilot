import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2, Terminal, Zap, AlertTriangle, CheckCircle, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SimulationResult {
  scenario: string;
  risks: string[];
  opportunities: string[];
  recommendations: string[];
  complianceScore: number;
}

export default function QuantumNavigator() {
  const [prompt, setPrompt] = useState("");
  const [isSimulating, setIsSimulating] = useState(false);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const { toast } = useToast();

  const runSimulation = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Input Required",
        description: "Please describe your policy scenario or compliance challenge.",
        variant: "destructive",
      });
      return;
    }

    setIsSimulating(true);
    setResult(null);

    try {
      // Simulate AI processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock result for demonstration
      const mockResult: SimulationResult = {
        scenario: prompt,
        risks: [
          "Regulatory alignment gaps with EU AI Act Article 14",
          "Data residency requirements conflict with cloud architecture",
          "Quantum cryptography timeline risks",
        ],
        opportunities: [
          "Early adoption advantage in quantum-safe infrastructure",
          "Partnership potential with government research labs",
          "Competitive edge in privacy-preserving AI",
        ],
        recommendations: [
          "Establish cross-functional quantum readiness team",
          "Conduct crypto-agility assessment within 90 days",
          "Pilot federated learning architecture",
          "Engage with NIST PQC standardization process",
        ],
        complianceScore: 72,
      };

      setResult(mockResult);
      toast({
        title: "Simulation Complete",
        description: "Your quantum-AI scenario analysis is ready.",
      });
    } catch (error) {
      toast({
        title: "Simulation Failed",
        description: "Unable to process simulation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Terminal className="h-4 w-4 text-primary" />
            <span className="text-sm font-mono text-primary">QUANTUM_NAVIGATOR.EXE</span>
          </div>
          
          <h1 className="text-5xl font-bold">
            <span className="bg-gradient-to-r from-[hsl(var(--quantum-cyan))] via-[hsl(var(--accent))] to-[hsl(var(--primary-glow))] bg-clip-text text-transparent">
              Quantum Navigator
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            AI-powered policy simulation engine. Explore quantum-AI scenarios, forecast regulatory impacts, 
            and map your strategic roadmap—before committing resources.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Input Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Scenario Input
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Describe Your Policy Challenge or AI Deployment Scenario
                  </label>
                  <Textarea
                    placeholder="Example: We're a healthcare org deploying AI diagnostics in EU and US. Need to comply with GDPR, HIPAA, and upcoming AI Act. How do we structure our quantum-safe data pipeline?"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-[200px] font-mono text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Quick Templates:</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-primary/10"
                      onClick={() =>
                        setPrompt(
                          "Municipal government implementing AI-powered citizen services with quantum-safe authentication"
                        )
                      }
                    >
                      Municipal AI
                    </Badge>
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-primary/10"
                      onClick={() =>
                        setPrompt(
                          "Financial institution planning post-quantum cryptography migration while maintaining PCI-DSS compliance"
                        )
                      }
                    >
                      FinTech PQC
                    </Badge>
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-primary/10"
                      onClick={() =>
                        setPrompt(
                          "Research university deploying federated learning across international labs with sensitive data"
                        )
                      }
                    >
                      Academic Research
                    </Badge>
                  </div>
                </div>

                <Button
                  onClick={runSimulation}
                  disabled={isSimulating}
                  className="w-full"
                  size="lg"
                >
                  {isSimulating ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Simulating Scenario...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      Run AI Simulation
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-primary" />
                  Simulation Output
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!result && !isSimulating && (
                  <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                    <div className="text-center space-y-2">
                      <Terminal className="h-12 w-12 mx-auto opacity-20" />
                      <p>Awaiting scenario input...</p>
                    </div>
                  </div>
                )}

                {isSimulating && (
                  <div className="space-y-4 font-mono text-sm">
                    <div className="flex items-center gap-2 text-primary">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>&gt; Analyzing regulatory landscape...</span>
                    </div>
                    <div className="flex items-center gap-2 text-primary">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>&gt; Mapping compliance pathways...</span>
                    </div>
                    <div className="flex items-center gap-2 text-primary">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>&gt; Forecasting quantum risks...</span>
                    </div>
                  </div>
                )}

                {result && (
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">Compliance Score</h4>
                        <span className="text-2xl font-bold text-primary">{result.complianceScore}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${result.complianceScore}%` }}
                          transition={{ duration: 1, delay: 0.3 }}
                          className="bg-primary h-2 rounded-full"
                        />
                      </div>
                    </div>

                    <div className="space-y-4 max-h-[400px] overflow-y-auto">
                      <div>
                        <h4 className="font-semibold flex items-center gap-2 mb-2">
                          <AlertTriangle className="h-4 w-4 text-destructive" />
                          Key Risks
                        </h4>
                        <ul className="space-y-1">
                          {result.risks.map((risk, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-destructive mt-1">•</span>
                              <span>{risk}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold flex items-center gap-2 mb-2">
                          <Zap className="h-4 w-4 text-primary" />
                          Opportunities
                        </h4>
                        <ul className="space-y-1">
                          {result.opportunities.map((opp, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              <span>{opp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold flex items-center gap-2 mb-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Recommendations
                        </h4>
                        <ul className="space-y-1">
                          {result.recommendations.map((rec, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-green-500 mt-1">✓</span>
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid md:grid-cols-3 gap-6"
        >
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Scenario Forecasting</h3>
                <p className="text-sm text-muted-foreground">
                  Test policy decisions in simulated environments before real-world deployment.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Terminal className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">AI Audit Simulation</h3>
                <p className="text-sm text-muted-foreground">
                  Prepare for regulatory audits with AI-generated compliance checklists.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Strategic Roadmaps</h3>
                <p className="text-sm text-muted-foreground">
                  Generate actionable 8-week pilot plans tailored to your compliance landscape.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
