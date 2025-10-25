import { EnhancedContactForm } from "./EnhancedContactForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function FormExamples() {
  return (
    <section className="py-16 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Form Components</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive form examples with validation, accessibility, and security built-in.
          </p>
        </div>

        <Tabs defaultValue="contact" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-1 mb-8">
            <TabsTrigger value="contact">Enhanced Contact Form</TabsTrigger>
          </TabsList>
          
          <TabsContent value="contact" className="space-y-8">
            <div className="bg-card/30 rounded-lg p-8 border-2">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">
                  Enhanced Contact Form with Full Validation
                </h3>
                <p className="text-sm text-muted-foreground">
                  Features: React Hook Form + Zod validation, date picker, multi-select, 
                  real-time validation, and secure input handling.
                </p>
              </div>
              <EnhancedContactForm />
            </div>

            <div className="bg-muted/20 rounded-lg p-6 border">
              <h4 className="font-semibold mb-3">Key Features:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>
                    <strong>Zod Schema Validation:</strong> Type-safe validation with clear error messages
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>
                    <strong>React Hook Form:</strong> Efficient form state management with minimal re-renders
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>
                    <strong>Security:</strong> Input length limits, character validation, XSS prevention
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>
                    <strong>Accessibility:</strong> ARIA labels, keyboard navigation, screen reader support
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>
                    <strong>Date Picker:</strong> Shadcn calendar component with proper z-index and interactivity
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>
                    <strong>Multi-Select:</strong> Checkbox groups with validation
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>
                    <strong>Responsive Design:</strong> Mobile-first approach with proper touch targets
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-muted/20 rounded-lg p-6 border">
              <h4 className="font-semibold mb-3">Validation Rules:</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium mb-2">Name:</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Required field</li>
                    <li>• 1-100 characters</li>
                    <li>• Letters, spaces, hyphens, apostrophes only</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-2">Email:</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Required field</li>
                    <li>• Valid email format</li>
                    <li>• Max 255 characters</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-2">Organization:</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Required field</li>
                    <li>• Max 150 characters</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-2">Message:</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Optional field</li>
                    <li>• Max 1000 characters</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
