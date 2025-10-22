import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowLeft, ExternalLink } from "lucide-react";

const experiments = [
  {
    date: "2025-09-30",
    title: "Municipal Data Pilot",
    summary: "Quantum-safe crypto inventory completed; migration plan drafted.",
    status: "Completed",
    sector: "Government",
    details: "Partnered with a mid-sized municipality to audit existing cryptographic systems and develop a comprehensive quantum-safe migration roadmap. Delivered a prioritized implementation plan with risk assessments.",
  },
  {
    date: "2025-10-10",
    title: "University Lab",
    summary: "Explainable AI for grant compliance; 38% reviewer time saved.",
    status: "Completed",
    sector: "University/Research",
    details: "Implemented PolicyEngine to map NIH grant compliance requirements to lab protocols. The explainable AI system provided audit trails that streamlined the review process significantly.",
  },
  {
    date: "2025-10-18",
    title: "Civic Sandbox",
    summary: "PolicyBot prototype mapping OSHA/EPA updates to SOPs.",
    status: "Completed",
    sector: "Government",
    details: "Developed AI-assisted regulation tracker that automatically flags relevant OSHA and EPA updates and maps them to organizational standard operating procedures, with gap analysis.",
  },
  {
    date: "2025-11-02",
    title: "Enterprise Crypto Audit",
    summary: "Post-quantum readiness assessment for financial services firm.",
    status: "In Progress",
    sector: "Enterprise",
    details: "Conducting comprehensive cryptographic inventory and quantum threat modeling for a Fortune 500 financial institution. Pilot phase includes proof-of-concept quantum-resistant key exchange.",
  },
  {
    date: "2025-11-15",
    title: "Healthcare AI Explainability",
    summary: "Building explainable diagnostic AI for HIPAA compliance.",
    status: "In Progress",
    sector: "Enterprise",
    details: "Creating transparent AI decision-making framework for clinical diagnostic support system, with full audit trails and HIPAA-compliant privacy modes.",
  },
  {
    date: "2025-11-20",
    title: "Startup Pitch Optimization",
    summary: "PitchOptimizer demo for quantum computing startup seeking SBIR funding.",
    status: "Active",
    sector: "Startup",
    details: "Using PitchOptimizer to transform technical quantum computing research into fundable narrative for Small Business Innovation Research (SBIR) grant application.",
  },
];

const Experiments = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.history.back()}
              aria-label="Go back"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Living Lab Experiments</h1>
              <p className="text-sm text-muted-foreground">
                Real pilots with measurable outcomes
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Card className="backdrop-blur-md bg-card/60 border-primary/20">
              <CardContent className="p-6 text-center">
                <p className="text-4xl font-bold text-primary">{experiments.length}</p>
                <p className="text-sm text-muted-foreground mt-2">Total Experiments</p>
              </CardContent>
            </Card>
            <Card className="backdrop-blur-md bg-card/60 border-primary/20">
              <CardContent className="p-6 text-center">
                <p className="text-4xl font-bold text-primary">
                  {experiments.filter(e => e.status === "Completed").length}
                </p>
                <p className="text-sm text-muted-foreground mt-2">Completed</p>
              </CardContent>
            </Card>
            <Card className="backdrop-blur-md bg-card/60 border-primary/20">
              <CardContent className="p-6 text-center">
                <p className="text-4xl font-bold text-primary">
                  {experiments.filter(e => e.status !== "Completed").length}
                </p>
                <p className="text-sm text-muted-foreground mt-2">Active</p>
              </CardContent>
            </Card>
          </div>

          {/* Experiments List */}
          <div className="space-y-6">
            {experiments.map((experiment, index) => (
              <motion.div
                key={experiment.date + experiment.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="backdrop-blur-md bg-card/60 hover:border-primary/50 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between flex-wrap gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3 flex-wrap">
                            <h3 className="text-2xl font-bold text-foreground">
                              {experiment.title}
                            </h3>
                            <Badge
                              variant={experiment.status === "Completed" ? "default" : "secondary"}
                              className={
                                experiment.status === "Completed"
                                  ? "bg-primary/10 text-primary border-primary/20"
                                  : ""
                              }
                            >
                              {experiment.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <time dateTime={experiment.date}>
                                {new Date(experiment.date).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </time>
                            </div>
                            <Badge variant="outline">{experiment.sector}</Badge>
                          </div>
                        </div>
                      </div>

                      {/* Summary */}
                      <p className="text-lg text-foreground font-medium">
                        {experiment.summary}
                      </p>

                      {/* Details */}
                      <p className="text-muted-foreground leading-relaxed">
                        {experiment.details}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center pt-8"
          >
            <Card className="backdrop-blur-md bg-primary/5 border-primary/20">
              <CardContent className="p-8 space-y-4">
                <h3 className="text-2xl font-bold">Want to Start Your Own Pilot?</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Join our living lab and turn your quantum-AI challenges into practical, proven solutions.
                </p>
                <Button
                  size="lg"
                  onClick={() => {
                    window.location.href = "/#contact";
                  }}
                  aria-label="Book a strategy session"
                >
                  Book Strategy Session
                  <ExternalLink className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default Experiments;
