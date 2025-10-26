import { motion } from 'framer-motion';
import { openLetter } from '@/data/openLetter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

export default function OpenLetterSection() {

  return (
    <section 
      id="open-letter" 
      className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-muted/30 to-background"
      aria-labelledby="letter-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 id="letter-heading" className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            Open Letter — Pennsylvania Quantum Public Lobby Group
          </h2>
          <p className="text-lg text-muted-foreground">
            Addressed to lawmakers · {openLetter.date}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24 p-6 rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm">
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-semibold text-lg">Contact</h3>
                <Badge variant="default" className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                  Live
                </Badge>
              </div>

              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-medium mb-1">{openLetter.organization}</p>
                  <div className="flex items-start gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <div>
                      {openLetter.contact.address.map((line: string, i: number) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                  </div>
                </div>

                <a 
                  href={`tel:${openLetter.contact.phone}`}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span>{openLetter.contact.phone}</span>
                </a>

                <a 
                  href={`mailto:${openLetter.contact.email}`}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors break-all"
                >
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <span>{openLetter.contact.email}</span>
                </a>

                <div className="pt-2 border-t border-border/40">
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="font-medium">{openLetter.date}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Letter Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="relative p-8 rounded-xl border border-border/40 bg-card/30 backdrop-blur-sm">
              <div className="prose prose-sm prose-invert max-w-none">
                {openLetter.content.slice(0, 3).map((paragraph: string, index: number) => (
                  <p key={index} className="text-foreground/90 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Fade out gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-card/80 to-transparent pointer-events-none" />

              <div className="relative z-10 mt-8 flex flex-wrap gap-3">
                <Button 
                  variant="default" 
                  size="lg"
                  asChild
                >
                  <a 
                    href="https://docs.google.com/document/d/1NlzqlnBLt_iWwqLGH3SUTUlASFIZBEaimJYq6MFXB8I/edit?usp=sharing" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Read Full Letter
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
