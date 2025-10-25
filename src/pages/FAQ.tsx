import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "What services does AltruisticXAI offer?",
    answer: "We specialize in quantum computing readiness, AI deployment, policy compliance consulting, and post-quantum cryptography (PQC) migration. We help organizations navigate the intersection of emerging technologies and regulatory requirements."
  },
  {
    question: "How long does a typical pilot project take?",
    answer: "Our pilot projects typically run 8-12 weeks from initial assessment to deliverable. We focus on rapid prototyping and practical results that can be implemented immediately."
  },
  {
    question: "Who are your typical clients?",
    answer: "We work with government agencies, research institutions, municipalities, and forward-thinking enterprises preparing for quantum and AI transformation. Our clients range from public sector organizations to innovative startups."
  },
  {
    question: "What is post-quantum cryptography (PQC)?",
    answer: "Post-quantum cryptography refers to cryptographic algorithms that are secure against attacks from quantum computers. As quantum computing advances, current encryption methods will become vulnerable. PQC migration is essential for long-term data security."
  },
  {
    question: "Do you provide training for our team?",
    answer: "Yes! We offer hands-on training and knowledge transfer as part of every engagement. Our goal is to empower your team to continue the work after our pilot project concludes."
  },
  {
    question: "What makes your approach different?",
    answer: "We operate as a living laboratory—every project is an experiment that contributes to our evolving framework. We focus on practical, implementable solutions rather than theoretical consulting. We learn with you."
  },
  {
    question: "How do I get started?",
    answer: "Contact us through our booking form to schedule a strategy session. We'll discuss your needs, assess your readiness, and propose a tailored pilot project timeline."
  },
  {
    question: "What industries do you serve?",
    answer: "We work across government, healthcare, finance, defense, research institutions, and any sector facing quantum or AI compliance challenges. Our framework adapts to various industry requirements."
  }
];

const FAQ = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
          
          <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <HelpCircle className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary">Frequently Asked Questions</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Got Questions? We've Got Answers
              </h1>
              
              <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
                Find answers to common questions about our quantum-AI solutions, pilot projects, and consulting services.
              </p>
            </motion.div>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="py-12 pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <Accordion type="single" collapsible className="space-y-4">
                {faqData.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="glass-card-3d border border-primary/20 rounded-xl overflow-hidden"
                  >
                    <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-primary/5 transition-colors">
                      <span className="text-left font-semibold text-foreground">
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-foreground/80">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16 text-center space-y-6 p-8 glass-card-3d rounded-2xl border border-primary/20"
            >
              <h2 className="text-2xl font-bold text-foreground">
                Still have questions?
              </h2>
              <p className="text-foreground/80">
                Get in touch with our team and we'll help you find the right solution for your needs.
              </p>
              <button
                onClick={() => {
                  window.location.href = "/#contact";
                }}
                className="btn-3d-teal px-8 py-3 rounded-xl"
              >
                Contact Us
              </button>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQ;
