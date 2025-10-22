import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Send, Calendar } from "lucide-react";

const sectors = ["Government", "University/Research", "Enterprise", "Startup"];
const interests = ["PolicyEngine", "QuantumShield", "AIConsultant", "PitchOptimizer"];
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
    
    // Simulate API call
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
      className="space-y-6 max-w-2xl mx-auto"
    >
      <div className="grid sm:grid-cols-2 gap-6">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className="bg-card/60"
          />
          {errors.name && (
            <p id="name-error" className="text-sm text-destructive">
              {errors.name}
            </p>
          )}
        </div>

        {/* Organization */}
        <div className="space-y-2">
          <Label htmlFor="organization">Organization *</Label>
          <Input
            id="organization"
            value={formData.organization}
            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
            aria-invalid={!!errors.organization}
            aria-describedby={errors.organization ? "organization-error" : undefined}
            className="bg-card/60"
          />
          {errors.organization && (
            <p id="organization-error" className="text-sm text-destructive">
              {errors.organization}
            </p>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className="bg-card/60"
        />
        {errors.email && (
          <p id="email-error" className="text-sm text-destructive">
            {errors.email}
          </p>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {/* Sector */}
        <div className="space-y-2">
          <Label htmlFor="sector">Sector *</Label>
          <Select value={formData.sector} onValueChange={(value) => setFormData({ ...formData, sector: value })}>
            <SelectTrigger id="sector" className="bg-card/60" aria-invalid={!!errors.sector}>
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
            <p className="text-sm text-destructive">{errors.sector}</p>
          )}
        </div>

        {/* Timeline */}
        <div className="space-y-2">
          <Label htmlFor="timeline">Timeline *</Label>
          <Select value={formData.timeline} onValueChange={(value) => setFormData({ ...formData, timeline: value })}>
            <SelectTrigger id="timeline" className="bg-card/60" aria-invalid={!!errors.timeline}>
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
            <p className="text-sm text-destructive">{errors.timeline}</p>
          )}
        </div>
      </div>

      {/* Interests */}
      <div className="space-y-3">
        <Label>Areas of Interest</Label>
        <div className="grid sm:grid-cols-2 gap-3">
          {interests.map((interest) => (
            <div key={interest} className="flex items-center space-x-2">
              <Checkbox
                id={interest}
                checked={formData.interests.includes(interest)}
                onCheckedChange={() => handleInterestToggle(interest)}
              />
              <label
                htmlFor={interest}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {interest}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={4}
          placeholder="Tell us about your specific needs..."
          className="bg-card/60 resize-none"
        />
      </div>

      {/* Consent */}
      <div className="flex items-start space-x-2">
        <Checkbox
          id="consent"
          checked={formData.consent}
          onCheckedChange={(checked) => setFormData({ ...formData, consent: checked as boolean })}
          aria-invalid={!!errors.consent}
        />
        <label
          htmlFor="consent"
          className="text-sm leading-relaxed peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
        >
          I agree to be contacted regarding this inquiry *
        </label>
      </div>
      {errors.consent && (
        <p className="text-sm text-destructive">{errors.consent}</p>
      )}

      {/* Submit */}
      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="w-full sm:w-auto shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all"
      >
        {isSubmitting ? (
          "Submitting..."
        ) : (
          <>
            Submit Inquiry
            <Send className="ml-2 h-5 w-5" />
          </>
        )}
      </Button>
    </motion.form>
  );
};
