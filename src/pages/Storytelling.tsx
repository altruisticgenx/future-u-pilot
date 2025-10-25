import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

export default function Storytelling() {
  const navigate = useNavigate();
  const { scrollToElement } = useSmoothScroll();
  
  const scrollToContact = () => {
    navigate('/');
    setTimeout(() => {
      scrollToElement('contact');
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
              onClick={() => navigate(-1)}
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
                  Imagine a high school student in Pittsburgh, Maya. She's studying computer science, dreaming of joining the proud lineage of Pennsylvania innovators who gave the world the ambulance, the polio vaccine, and the digital computer. But Maya's future, and the security of everyone in Pennsylvania, currently rests on a mathematical foundation that is visibly cracking.
                </p>

                <p className="text-foreground/90 font-semibold text-lg sm:text-xl">
                  This isn't a problem for the next generation to solve; the danger is already here today.
                </p>

                <div className="my-8 p-6 bg-primary/5 border-l-4 border-primary rounded-r-lg">
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
                    The Threat is Here Today
                  </h2>
                  <p className="text-foreground/90">
                    Our digital communications, secure emails, and banking transactions rely on public key encryption (PKE), secured by complex math problems. But quantum computing, which uses the properties of quantum physics, is advancing rapidly, projected to reach the power to break current PKE algorithms in the next 10 to 20 years. This threat isn't theoretical; it's an active strategy called <span className="font-semibold text-primary">"harvest now, decrypt later"</span>. Adversaries are currently capturing encrypted data—like trade secrets, sensitive justice information, and personal health information (PHI)—with the intent of holding onto it until a cryptographically-relevant quantum computer (CRQC) becomes available to decrypt it.
                  </p>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mt-12 mb-6">
                  This Poses a Critical Human Problem:
                </h2>

                <div className="space-y-8">
                  <div className="border-l-4 border-accent pl-6">
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      1. The Security of Our Sensitive Lives
                    </h3>
                    <p className="text-foreground/90">
                      For organizations handling data with a long secrecy lifetime—like medical records, PII, and industrial trade secrets—the vulnerability is urgent. We must adopt Post-Quantum Encryption (PQE) and methods like Quantum Key Distribution (QKD) to protect these systems, including critical infrastructure like nuclear plants and the gas pipeline network. The NIST has already selected the first three Post-Quantum Crypto Standards (FIPS 203, 204, and 205) and released final versions in August 2024, emphasizing that <span className="font-semibold">the time to transition is now, not later</span>.
                    </p>
                  </div>

                  <div className="border-l-4 border-accent pl-6">
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      2. The Opportunity for Our Workforce
                    </h3>
                    <p className="text-foreground/90">
                      If we fail to act, we become dependent on other states or rival nations for these fundamental technological advancements. This means Pennsylvania students like Maya won't have access to the thousands of good-paying jobs involved in building, developing, and operating quantum systems. The PaQI is designed to train this generation across all levels, from K-12 to technical schools and universities, ensuring that quantum physics isn't an "impassable gate" to careers in advanced computing.
                    </p>
                  </div>

                  <div className="border-l-4 border-accent pl-6">
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      3. The Promise of a Better Future
                    </h3>
                    <p className="text-foreground/90">
                      Beyond cybersecurity, quantum computing unlocks solutions to deeply human problems. It can revolutionize drug discovery by performing accurate molecular simulations, dramatically reducing the time and cost to develop new medicines. It can optimize our stressed energy grids, leading to increased efficiency, reduced emissions, and cleaner air, directly benefiting human health.
                    </p>
                  </div>
                </div>

                <div className="mt-12 p-8 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
                  <p className="text-foreground/90 text-lg font-medium">
                    If we embrace the Pennsylvania Quantum Initiative now, we are not just investing in technology; we are claiming <span className="font-bold text-primary">technological sovereignty</span> and ensuring that our citizens' rights, health, and economic security are protected in the coming quantum era, continuing our state's legacy of scientific firsts.
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
