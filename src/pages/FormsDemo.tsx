import { FormExamples } from "@/components/forms/FormExamples";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

const FormsDemo = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="pt-20"
      >
        <div className="container max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Form Components & Validation
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Production-ready form components with comprehensive validation, accessibility, 
              and security features using React Hook Form, Zod, and Shadcn UI.
            </p>
          </div>

          <FormExamples />

          <div className="mt-16 bg-muted/20 rounded-lg p-8 border">
            <h2 className="text-2xl font-bold mb-6">Implementation Guide</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">1. Install Dependencies</h3>
                <pre className="bg-black/50 p-4 rounded-md overflow-x-auto">
                  <code className="text-sm">
{`npm install react-hook-form zod @hookform/resolvers
npm install date-fns  # for date picker`}
                  </code>
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">2. Create Validation Schema</h3>
                <pre className="bg-black/50 p-4 rounded-md overflow-x-auto">
                  <code className="text-sm">
{`import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email").max(255),
  message: z.string().max(1000).optional(),
});`}
                  </code>
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">3. Setup Form with React Hook Form</h3>
                <pre className="bg-black/50 p-4 rounded-md overflow-x-auto">
                  <code className="text-sm">
{`import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const form = useForm({
  resolver: zodResolver(formSchema),
  defaultValues: {
    name: "",
    email: "",
    message: "",
  },
});`}
                  </code>
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">4. Security Best Practices</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <span>
                      <strong>Input Length Limits:</strong> Prevent buffer overflow attacks
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <span>
                      <strong>Character Validation:</strong> Use regex to restrict invalid characters
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <span>
                      <strong>XSS Prevention:</strong> Never use dangerouslySetInnerHTML with user input
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <span>
                      <strong>Server-Side Validation:</strong> Always validate on backend too
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <span>
                      <strong>Sanitization:</strong> Clean input before external API calls
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">5. Accessibility Features</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <span>ARIA labels for screen readers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <span>Keyboard navigation support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <span>Clear error messages</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <span>Proper focus management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <span>Color contrast compliance</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default FormsDemo;
