import { motion } from "framer-motion";
import { useState } from "react";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";
import DOMPurify from 'dompurify';

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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.organization.trim()) newErrors.organization = "Organization is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.sector) newErrors.sector = "Please select a sector";
    if (!formData.timeline) newErrors.timeline = "Please select a timeline";
    if (!formData.consent) newErrors.consent = "You must agree to be contacted";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sanitizeInput = (input: string) => DOMPurify.sanitize(input.trim(), { 
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: []
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Sanitize all inputs
    const sanitizedData = {
      name: sanitizeInput(formData.name),
      organization: sanitizeInput(formData.organization),
      email: sanitizeInput(formData.email),
      sector: formData.sector,
      timeline: formData.timeline,
      message: sanitizeInput(formData.message),
      interests: formData.interests,
      consent: formData.consent,
    };
    
    // Simulate API call with sanitized data
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      toast({
        title: "Success!",
        description: "We'll be in touch within 24 hours to discuss your pilot.",
      });
    }, 1000);
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
        <InteractiveHoverButton
          variant="3d-teal"
          size="default"
          onClick={() => setIsSuccess(false)}
          className="mt-4"
        >
          Submit Another Inquiry
        </InteractiveHoverButton>
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
      <div className="grid sm:grid-cols-2 gap-3">
        {/* Name */}
        <div className="space-y-1">
          <Label htmlFor="name" className="text-xs">Name *</Label>
          <Input
            id="name"
            autoComplete="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className="h-9 text-sm bg-card/60 border-2 shadow-[4px_4px_0px_0px_hsl(var(--primary)/0.3)] hover:shadow-[6px_6px_0px_0px_hsl(var(--primary)/0.4)] transition-shadow"
          />
          {errors.name && (
            <p id="name-error" className="text-xs text-destructive">
              {errors.name}
            </p>
          )}
        </div>

        {/* Organization */}
        <div className="space-y-1">
          <Label htmlFor="organization" className="text-xs">Organization *</Label>
          <Input
            id="organization"
            autoComplete="organization"
            value={formData.organization}
            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
            aria-invalid={!!errors.organization}
            aria-describedby={errors.organization ? "organization-error" : undefined}
            className="h-9 text-sm bg-card/60 border-2 shadow-[4px_4px_0px_0px_hsl(var(--accent)/0.3)] hover:shadow-[6px_6px_0px_0px_hsl(var(--accent)/0.4)] transition-shadow"
          />
          {errors.organization && (
            <p id="organization-error" className="text-xs text-destructive">
              {errors.organization}
            </p>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="space-y-1">
        <Label htmlFor="email" className="text-xs">Email *</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className="h-9 text-sm bg-card/60 border-2 shadow-[4px_4px_0px_0px_hsl(var(--secondary)/0.3)] hover:shadow-[6px_6px_0px_0px_hsl(var(--secondary)/0.4)] transition-shadow"
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
            <SelectContent className="bg-background border-2 z-50">
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
            <SelectContent className="bg-background border-2 z-50">
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
      <InteractiveHoverButton
        type="submit"
        variant="3d-teal"
        size="default"
        hasLighthouse
        icon={Send}
        disabled={isSubmitting}
        className="w-full sm:w-auto shadow-[6px_6px_0px_0px_hsl(var(--primary)/0.5)]"
      >
        {isSubmitting ? "Submitting..." : "Submit Inquiry"}
      </InteractiveHoverButton>
    </motion.form>
  );
};
