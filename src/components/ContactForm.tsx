import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";
import DOMPurify from 'dompurify';
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name required").max(100, "Name too long"),
  organization: z.string().trim().min(1, "Organization required").max(100, "Organization too long"),
  email: z.string().trim().email("Invalid email address").max(255, "Email too long"),
  sector: z.enum(["Government", "University/Research", "Enterprise", "Startup"], {
    errorMap: () => ({ message: "Please select a sector" }),
  }),
  interests: z.array(z.string()).min(0, "Select at least one interest"),
  timeline: z.enum(["ASAP", "1-3 months", "3-6 months", "Exploring"], {
    errorMap: () => ({ message: "Please select a timeline" }),
  }),
  message: z.string().trim().max(2000, "Message too long (max 2000 characters)"),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must agree to be contacted" }),
  }),
});

type ContactFormData = z.infer<typeof contactSchema>;

const sectors = ["Government", "University/Research", "Enterprise", "Startup"];
const interests = [
  "Education", 
  "Energy", 
  "Governance", 
  "Curiosity", 
  "AI Safety", 
  "Quantum Computing", 
  "Lobby", 
  "Business Automation"
];
const timelines = ["ASAP", "1-3 months", "3-6 months", "Exploring"];

export const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    sector: "",
    interests: [] as string[],
    timeline: "",
    message: "",
    consent: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    try {
      // Validate with zod
      const validatedData = contactSchema.parse(formData);
      
      // Sanitize inputs
      const sanitizedData = {
        ...validatedData,
        name: DOMPurify.sanitize(validatedData.name),
        organization: DOMPurify.sanitize(validatedData.organization),
        message: DOMPurify.sanitize(validatedData.message),
      };

      setIsSuccess(true);
      toast({
        title: "Success!",
        description: "We'll be in touch within 24 hours to discuss your pilot.",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
        });
        setErrors(fieldErrors);
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields correctly.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to send message. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-6 py-12"
      >
        <div className="inline-flex p-4 rounded-full bg-primary/10">
          <Send className="h-12 w-12 text-primary" />
        </div>
        <h3 className="text-3xl font-bold">Thank You!</h3>
        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          We've received your inquiry and will reach out within 24 hours to plan your next 8 weeks.
        </p>
        <Button
          variant="outline"
          onClick={() => setIsSuccess(false)}
          className="mt-4"
        >
          Submit Another Inquiry
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      onSubmit={handleSubmit}
      className="space-y-4 max-w-xl mx-auto"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">Name *</Label>
          <Input
            id="name"
            autoComplete="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className="h-12 text-base bg-card/60 border-2 border-ocean-light/30 focus:border-ocean-glow shadow-[4px_4px_0px_0px_hsl(var(--primary)/0.3)] hover:shadow-[6px_6px_0px_0px_hsl(var(--primary)/0.4)] transition-all"
            style={{ fontSize: '16px' }}
          />
          {errors.name && (
            <p id="name-error" className="text-xs text-destructive">
              {errors.name}
            </p>
          )}
        </div>

        {/* Organization */}
        <div className="space-y-2">
          <Label htmlFor="organization" className="text-sm font-medium">Organization *</Label>
          <Input
            id="organization"
            autoComplete="organization"
            value={formData.organization}
            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
            aria-invalid={!!errors.organization}
            aria-describedby={errors.organization ? "organization-error" : undefined}
            className="h-12 text-base bg-card/60 border-2 border-ocean-light/30 focus:border-ocean-glow shadow-[4px_4px_0px_0px_hsl(var(--accent)/0.3)] hover:shadow-[6px_6px_0px_0px_hsl(var(--accent)/0.4)] transition-all"
            style={{ fontSize: '16px' }}
          />
          {errors.organization && (
            <p id="organization-error" className="text-xs text-destructive">
              {errors.organization}
            </p>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">Email *</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className="h-12 text-base bg-card/60 border-2 border-ocean-light/30 focus:border-ocean-glow shadow-[4px_4px_0px_0px_hsl(var(--secondary)/0.3)] hover:shadow-[6px_6px_0px_0px_hsl(var(--secondary)/0.4)] transition-all"
          style={{ fontSize: '16px' }}
        />
        {errors.email && (
          <p id="email-error" className="text-xs text-destructive">
            {errors.email}
          </p>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {/* Sector */}
        <div className="space-y-1">
          <Label htmlFor="sector" className="text-xs">Sector *</Label>
          <Select value={formData.sector} onValueChange={(value) => setFormData({ ...formData, sector: value })}>
            <SelectTrigger id="sector" className="h-9 text-sm bg-card/60 border-2 shadow-[4px_4px_0px_0px_hsl(var(--primary)/0.2)]" aria-invalid={!!errors.sector}>
              <SelectValue placeholder="Select sector" />
            </SelectTrigger>
            <SelectContent>
              {sectors.map((sector) => (
                <SelectItem key={sector} value={sector}>
                  {sector}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.sector && (
            <p className="text-xs text-destructive">{errors.sector}</p>
          )}
        </div>

        {/* Timeline */}
        <div className="space-y-1">
          <Label htmlFor="timeline" className="text-xs">Timeline *</Label>
          <Select value={formData.timeline} onValueChange={(value) => setFormData({ ...formData, timeline: value })}>
            <SelectTrigger id="timeline" className="h-9 text-sm bg-card/60 border-2 shadow-[4px_4px_0px_0px_hsl(var(--accent)/0.2)]" aria-invalid={!!errors.timeline}>
              <SelectValue placeholder="Select timeline" />
            </SelectTrigger>
            <SelectContent>
              {timelines.map((timeline) => (
                <SelectItem key={timeline} value={timeline}>
                  {timeline}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.timeline && (
            <p className="text-xs text-destructive">{errors.timeline}</p>
          )}
        </div>
      </div>

      {/* Interests */}
      <div className="space-y-2">
        <Label className="text-xs">Areas of Interest</Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {interests.map((interest, index) => {
            const colors = [
              "shadow-[3px_3px_0px_0px_hsl(var(--primary)/0.4)]",
              "shadow-[3px_3px_0px_0px_hsl(var(--secondary)/0.4)]",
              "shadow-[3px_3px_0px_0px_hsl(var(--accent)/0.4)]",
              "shadow-[3px_3px_0px_0px_hsl(var(--chart-1)/0.4)]",
              "shadow-[3px_3px_0px_0px_hsl(var(--chart-2)/0.4)]",
              "shadow-[3px_3px_0px_0px_hsl(var(--chart-3)/0.4)]",
              "shadow-[3px_3px_0px_0px_hsl(var(--chart-4)/0.4)]",
              "shadow-[3px_3px_0px_0px_hsl(var(--chart-5)/0.4)]"
            ];
            return (
              <div key={interest} className={`flex items-center space-x-2 p-2 rounded border-2 ${colors[index % colors.length]} hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all bg-card/40`}>
                <Checkbox
                  id={interest}
                  checked={formData.interests.includes(interest)}
                  onCheckedChange={() => handleInterestToggle(interest)}
                />
                <label
                  htmlFor={interest}
                  className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {interest}
                </label>
              </div>
            );
          })}
        </div>
      </div>

      {/* Message */}
      <div className="space-y-1">
        <Label htmlFor="message" className="text-xs">Message</Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={3}
          placeholder="Tell us about your specific needs..."
          className="text-sm bg-card/60 resize-none border-2 shadow-[4px_4px_0px_0px_hsl(var(--muted)/0.3)]"
        />
      </div>

      {/* Consent */}
      <div className="flex items-start space-x-2 p-2 rounded border-2 shadow-[3px_3px_0px_0px_hsl(var(--primary)/0.2)] bg-card/40">
        <Checkbox
          id="consent"
          checked={formData.consent}
          onCheckedChange={(checked) => setFormData({ ...formData, consent: checked as boolean })}
          aria-invalid={!!errors.consent}
        />
        <label
          htmlFor="consent"
          className="text-xs leading-relaxed peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
        >
          I agree to be contacted regarding this inquiry *
        </label>
      </div>
      {errors.consent && (
        <p className="text-xs text-destructive">{errors.consent}</p>
      )}

      {/* Submit */}
      <Button
        type="submit"
        size="default"
        disabled={isSubmitting}
        className="w-full sm:w-auto shadow-[6px_6px_0px_0px_hsl(var(--primary)/0.5)] hover:shadow-[8px_8px_0px_0px_hsl(var(--primary)/0.6)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all border-2"
      >
        {isSubmitting ? (
          "Submitting..."
        ) : (
          <>
            Submit Inquiry
            <Send className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </motion.form>
  );
};
