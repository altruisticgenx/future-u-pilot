import { motion } from "framer-motion";
import { programs } from "@/data/programs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import DOMPurify from "dompurify";

export const ProgramsSection = () => {
  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible className="space-y-3">
        {programs.map((program, index) => {
          const Icon = program.icon;
          return (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <AccordionItem
                value={program.id}
                className="glass-card-3d rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 border border-primary/30 hover:shadow-[0_12px_48px_rgba(0,0,0,0.18)] transition-all duration-300"
              >
                <AccordionTrigger className="px-4 sm:px-5 py-4 hover:no-underline">
                  <div className="flex items-start gap-3 text-left w-full">
                    <div className="p-2 rounded-lg bg-primary/15 border border-primary/25 shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="text-sm sm:text-base font-bold text-foreground">
                          {program.title}
                        </h3>
                        <span className={`rounded-full text-xs px-2 py-0.5 shrink-0 ${
                          program.badge === 'Live' 
                            ? 'bg-emerald-600/10 text-emerald-400 ring-1 ring-emerald-400/20' 
                            : program.badge === 'Critical'
                            ? 'bg-red-600/10 text-red-400 ring-1 ring-red-400/20'
                            : program.badge === 'Independent'
                            ? 'bg-purple-600/10 text-purple-400 ring-1 ring-purple-400/20'
                            : 'bg-amber-600/10 text-amber-400 ring-1 ring-amber-400/20'
                        }`}>
                          {program.badge}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pr-4">
                        {program.summary}
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 sm:px-5 pb-4">
                  <div className="pt-3 border-t border-primary/20">
                    <div 
                      className="prose prose-sm dark:prose-invert max-w-none text-foreground/85"
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(program.details) }}
                    />
                    <Button
                      variant="outline"
                      className="mt-4 w-full sm:w-auto hover-3d-lift"
                      asChild
                    >
                      <a 
                        href={program.ctaLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2"
                      >
                        {program.ctaText}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          );
        })}
      </Accordion>
    </div>
  );
};
