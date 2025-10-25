import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useNavigate } from "react-router-dom";

export default function Storytelling() {
  const navigate = useNavigate();
  
  const scrollToContact = () => {
    navigate("/");
    setTimeout(() => {
      const contactSection = document.getElementById("contact");
      contactSection?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <Navigation />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl py-24 sm:py-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12"
        >
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.history.back()}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Storytelling
            </h1>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open('https://docs.google.com/document/d/1S9sKNnJqMfmpG6FWo28AJ8rmqYrBveNCgSsLQTKd4hs/edit?usp=sharing', '_blank')}
            className="gap-2 text-xs"
          >
            <FileText className="h-3.5 w-3.5" />
            Drafts
            <ExternalLink className="h-3 w-3" />
          </Button>
        </motion.div>

        {/* Main Story Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="p-8 sm:p-12 backdrop-blur-sm bg-card/95 border-border/50 shadow-xl">
            <article className="prose prose-slate dark:prose-invert max-w-none">
              <div className="space-y-6 text-base sm:text-lg leading-relaxed">
                <p className="text-foreground/90 first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:mr-1 first-letter:float-left">
                  Maya, a Pittsburgh high school student, dreams of joining Pennsylvania's innovator legacy. But her future—and our security—rests on a cracking foundation.
                </p>

                <div className="my-8 p-6 bg-primary/5 border-l-4 border-primary rounded-r-lg">
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
                    The Threat is Here Today
                  </h2>
                  <p className="text-foreground/90">
                    Quantum computers will break today's encryption in 10-20 years. Adversaries are stealing encrypted data now—medical records, secrets, personal info—planning to decrypt it later. This <span className="font-semibold text-primary">"harvest now, decrypt later"</span> strategy is active today.
                  </p>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mt-12 mb-6">
                  Three Critical Challenges:
                </h2>

                <div className="space-y-6">
                  <div className="border-l-4 border-accent pl-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      1. Security Crisis
                    </h3>
                    <ul className="text-foreground/90 space-y-1 list-disc list-inside">
                      <li>Medical records, trade secrets, infrastructure at risk</li>
                      <li>NIST released Post-Quantum standards (Aug 2024)</li>
                      <li>Must adopt PQE and QKD now for nuclear plants, pipelines, grids</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-accent pl-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      2. Workforce Opportunity
                    </h3>
                    <ul className="text-foreground/90 space-y-1 list-disc list-inside">
                      <li>Thousands of high-paying quantum jobs at stake</li>
                      <li>Training from K-12 to universities</li>
                      <li>Without action, Pennsylvania loses to other states</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-accent pl-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      3. Innovation Promise
                    </h3>
                    <ul className="text-foreground/90 space-y-1 list-disc list-inside">
                      <li>Revolutionary drug discovery via molecular simulation</li>
                      <li>Optimized energy grids = cleaner air, lower emissions</li>
                      <li>Solutions to deeply human problems</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-12 p-8 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
                  <p className="text-foreground/90 text-lg font-medium">
                    The Pennsylvania Quantum Initiative isn't just technology—it's <span className="font-bold text-primary">technological sovereignty</span>, protecting citizens' rights, health, and economic security while continuing our state's legacy of scientific firsts.
                  </p>
                </div>
              </div>
            </article>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <Card className="p-8 backdrop-blur-sm bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
              Want to Learn More?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Let's discuss how we can help your organization prepare for the quantum era.
            </p>
            <Button
              onClick={scrollToContact}
              size="lg"
              className="btn-3d-primary"
            >
              Book a Strategy Session
            </Button>
          </Card>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
