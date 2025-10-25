import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Image as ImageIcon, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const AIShowcase = () => {
  const [imagePrompt, setImagePrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);

  const [policyText, setPolicyText] = useState("");
  const [policyAnalysis, setPolicyAnalysis] = useState<string | null>(null);
  const [analysisType, setAnalysisType] = useState("compliance");
  const [policyLoading, setPolicyLoading] = useState(false);

  const { toast } = useToast();

  const generateImage = async () => {
    if (!imagePrompt.trim()) {
      toast({
        title: "Prompt required",
        description: "Please enter a description for the image",
        variant: "destructive",
      });
      return;
    }

    setImageLoading(true);
    setGeneratedImage(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-image-generator`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ prompt: imagePrompt }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to generate image");
      }

      const data = await response.json();
      setGeneratedImage(data.imageUrl);
      
      toast({
        title: "Success!",
        description: "Image generated successfully",
      });
    } catch (error) {
      console.error("Image generation error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate image",
        variant: "destructive",
      });
    } finally {
      setImageLoading(false);
    }
  };

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
          
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience our AI capabilities firsthand. Generate visualizations and analyze policies in real-time.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Tabs defaultValue="image" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="image" className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Image Generation
              </TabsTrigger>
              <TabsTrigger value="policy" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Policy Analysis
              </TabsTrigger>
            </TabsList>

            <TabsContent value="image" className="mt-8">
              <Card className="glass-card-3d">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-primary" />
                    AI Image Generator
                  </CardTitle>
                  <CardDescription>
                    Create custom visualizations for quantum concepts, infrastructure diagrams, or marketing materials
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    value={imagePrompt}
                    onChange={(e) => setImagePrompt(e.target.value)}
                    placeholder="Describe the image you want to generate... (e.g., 'A futuristic quantum computer in a clean lab environment with blue and teal lighting')"
                    className="min-h-24"
                    disabled={imageLoading}
                  />
                  
                  <Button
                    onClick={generateImage}
                    disabled={imageLoading || !imagePrompt.trim()}
                    className="btn-3d-teal w-full"
                  >
                    {imageLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate Image
                      </>
                    )}
                  </Button>

                  {generatedImage && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-6 rounded-xl overflow-hidden border-2 border-primary/20"
                    >
                      <img
                        src={generatedImage}
                        alt="AI Generated"
                        className="w-full h-auto"
                      />
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="policy" className="mt-8">
              <Card className="glass-card-3d">
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
                    <SelectTrigger>
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
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
};
