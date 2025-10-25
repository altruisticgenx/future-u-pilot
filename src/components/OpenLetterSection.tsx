import { motion } from "framer-motion";
import { openLetter } from "@/data/openLetter";
import { Mail, MapPin, Phone, ExternalLink, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const OpenLetterSection = () => {
  return (
    <div className="grid lg:grid-cols-[300px,1fr] gap-6">
      {/* Left: Contact Card */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="glass-card-3d rounded-xl p-5 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 border border-primary/30 h-fit"
      >
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 rounded bg-primary/20 border border-primary/40">
              <Mail className="w-4 h-4 text-primary" />
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-600/10 text-emerald-400 ring-1 ring-emerald-400/20">
              Live
            </span>
          </div>

          <div>
            <h3 className="text-sm font-bold text-foreground mb-1">
              {openLetter.organization}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {openLetter.contact.address}<br />
              {openLetter.contact.city}<br />
              {openLetter.contact.phone}<br />
              <a 
                href={`mailto:${openLetter.contact.email}`}
                className="text-primary hover:underline break-all"
              >
                {openLetter.contact.email}
              </a>
            </p>
          </div>

          <div className="pt-3 border-t border-primary/20">
            <p className="text-xs text-muted-foreground">
              Date: {openLetter.date}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Right: Letter Preview */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="glass-card-3d rounded-xl p-5 sm:p-6 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 border border-primary/20"
      >
        <div className="space-y-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-foreground mb-2">
              Public Letter to Pennsylvania Lawmakers
            </h3>
            <p className="text-xs text-muted-foreground">
              Addressed to lawmakers · {openLetter.date}
            </p>
          </div>

          {/* Letter Preview with Fade */}
          <div className="relative">
            <div className="space-y-3 text-xs sm:text-sm text-foreground/85 leading-relaxed">
              {openLetter.preview.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            {/* Fade out effect */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-card to-transparent" />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="btn-3d-primary flex-1">
                  Read Full Letter
                  <ExternalLink className="w-3 h-3 ml-2" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-xl">
                    Open Letter to Pennsylvania Lawmakers
                  </DialogTitle>
                  <DialogDescription>
                    {openLetter.organization} · {openLetter.date}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 text-sm leading-relaxed">
                  {openLetter.content.map((paragraph, index) => (
                    <p key={index} className="text-foreground/90">
                      {paragraph}
                    </p>
                  ))}
                  
                  <div className="pt-4 border-t">
                    <p className="text-foreground/90">{openLetter.signature}</p>
                    <p className="font-semibold mt-1">{openLetter.closing}</p>
                  </div>

                  <div className="pt-4 border-t text-xs text-muted-foreground space-y-1">
                    <p><strong>{openLetter.organization}</strong></p>
                    <p>{openLetter.contact.address}</p>
                    <p>{openLetter.contact.city}</p>
                    <p>{openLetter.contact.phone}</p>
                    <p>
                      <a 
                        href={`mailto:${openLetter.contact.email}`}
                        className="text-primary hover:underline"
                      >
                        {openLetter.contact.email}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="w-3 h-3 mr-2" />
                    Download PDF
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                    }}
                  >
                    Copy Link
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button 
              variant="outline" 
              className="sm:w-auto"
              asChild
            >
              <a 
                href="https://docs.google.com/document/d/1NlzqlnBLt_iWwqLGH3SUTUlASFIZBEaimJYq6MFXB8I/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                View All Documents
                <ExternalLink className="w-3 h-3 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
