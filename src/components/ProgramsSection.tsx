import { motion } from 'framer-motion';
import { programs } from '@/data/programs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';

export default function ProgramsSection() {
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32" aria-labelledby="programs-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 id="programs-heading" className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            Programs{' '}
            <span className="text-muted-foreground">(Built with the Public in Mind)</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transparent charters, published minutes, measurable targets
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {programs.map((program: any, index: number) => {
            const Icon = program.icon;
            return (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem 
                    value={program.id}
                    className="border border-border/40 rounded-xl bg-card/50 backdrop-blur-sm overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/10"
                  >
                    <AccordionTrigger className="px-6 py-5 hover:no-underline [&[data-state=open]]:bg-muted/20">
                      <div className="flex items-start gap-4 text-left w-full">
                        <div className="mt-1 p-2 rounded-lg bg-primary/10">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-base sm:text-lg">
                              {program.title}
                            </h3>
                            <Badge 
                              variant={program.badge.variant === 'live' ? 'default' : 'secondary'}
                              className={program.badge.variant === 'live' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border-amber-500/30'}
                            >
                              {program.badge.text}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {program.summary}
                          </p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 pt-2">
                      <div className="prose prose-sm prose-invert max-w-none">
                        <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-line">
                          {program.details}
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
