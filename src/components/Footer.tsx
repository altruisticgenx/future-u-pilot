import { Mail, Github, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-muted/30 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              AltruisticXAI
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We're a small, senior team building explainable AI workflows and quantum-ready roadmaps with public-interest DNA.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <a
                href="#services"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Services
              </a>
              <a
                href="/policy-dashboard"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Policy Dashboard
              </a>
              <a
                href="/fedramp-sandbox"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                FedRAMP Sandbox
              </a>
              <a
                href="/pqc-module"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                PQC Module
              </a>
              <a
                href="/experiments"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Experiments
              </a>
              <a
                href="/demo"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Demo
              </a>
              <a
                href="#contact"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Connect</h4>
            <div className="flex gap-4">
              <a
                href="mailto:hello@altruisticxai.com"
                aria-label="Email us"
                className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
            <p className="text-xs text-muted-foreground pt-4">
              © {new Date().getFullYear()} AltruisticXAI. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
