import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const AIShowcase = () => {
  const [policyText, setPolicyText] = useState("");
  const [policyAnalysis, setPolicyAnalysis] = useState<string | null>(null);
  const [analysisType, setAnalysisType] = useState("compliance");
  const [policyLoading, setPolicyLoading] = useState(false);

  const { toast } = useToast();

  const analyzePolicy = async () => {
    if (!policyText.trim()) {
      toast({
        title: "Text required",
        description: "Please enter policy text to analyze",
        variant: "destructive",
      });
      return;
    }

    setPolicyLoading(true);
    setPolicyAnalysis(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-policy-analyzer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ policyText, analysisType }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to analyze policy");
      }

      const data = await response.json();
      setPolicyAnalysis(data.analysis);
      
      toast({
        title: "Analysis Complete",
        description: "Policy analysis generated successfully",
      });
    } catch (error) {
      console.error("Policy analysis error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to analyze policy",
        variant: "destructive",
      });
    } finally {
      setPolicyLoading(false);
    }
  };

  return (
    <section className="py-20 relative overflow-hidden" id="ai-showcase">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-semibold text-primary">Powered by AI</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            AI-Powered Solutions
          </h2>
          
          <p className="text-foreground/80 max-w-2xl mx-auto font-medium">
            Experience our AI capabilities firsthand. Analyze policies in real-time for compliance, PQC migration, and security risks.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card className="glass-card-3d max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                AI Policy Analyzer
              </CardTitle>
              <CardDescription>
                Analyze policies for compliance gaps, PQC migration needs, or security risks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={analysisType} onValueChange={setAnalysisType}>
                <SelectTrigger aria-label="Select analysis type">
                  <SelectValue placeholder="Select analysis type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="compliance">Compliance Analysis</SelectItem>
                  <SelectItem value="pqc">PQC Migration Assessment</SelectItem>
                  <SelectItem value="risk">Risk Assessment</SelectItem>
                </SelectContent>
              </Select>

              <Textarea
                value={policyText}
                onChange={(e) => setPolicyText(e.target.value)}
                placeholder="Paste your policy text, system description, or security protocol here..."
                className="min-h-32"
                disabled={policyLoading}
              />
              
              <Button
                onClick={analyzePolicy}
                disabled={policyLoading || !policyText.trim()}
                className="btn-3d-purple w-full"
              >
                {policyLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Analyze Policy
                  </>
                )}
              </Button>

              {policyAnalysis && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-6 rounded-xl bg-muted border border-primary/20"
                >
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    Analysis Results
                  </h4>
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <pre className="whitespace-pre-wrap text-sm">{policyAnalysis}</pre>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
