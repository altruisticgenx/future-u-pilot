import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Search, AlertCircle, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const mockPolicies = [
  {
    id: 1,
    title: "OSHA Workplace Safety Standards",
    statute: "29 CFR 1910",
    status: "Mapped",
    gaps: 2,
  },
  {
    id: 2,
    title: "EPA Environmental Compliance",
    statute: "40 CFR Part 261",
    status: "Review Required",
    gaps: 5,
  },
  {
    id: 3,
    title: "GDPR Data Protection",
    statute: "EU Regulation 2016/679",
    status: "Mapped",
    gaps: 1,
  },
  {
    id: 4,
    title: "HIPAA Privacy Rules",
    statute: "45 CFR Part 164",
    status: "Gap Analysis",
    gaps: 3,
  },
];

const Demo = () => {
  const [showReport, setShowReport] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.history.back()}
                aria-label="Go back"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold">PolicyEngine Demo</h1>
                <p className="text-sm text-muted-foreground">
                  AI-assisted regulation tracking
                </p>
              </div>
            </div>
            <Badge className="bg-primary/10 text-primary border-primary/20">
              Demo Mode
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Controls */}
          <Card className="backdrop-blur-md bg-card/60">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search policies or regulations..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <Button
                  onClick={() => setShowReport(true)}
                  className="shadow-lg"
                  aria-label="Generate audit report"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Policy List */}
          <div className="grid gap-4">
            {mockPolicies.map((policy, index) => (
              <motion.div
                key={policy.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="backdrop-blur-md bg-card/60 hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-xl">{policy.title}</CardTitle>
                        <p className="text-sm text-muted-foreground font-mono">
                          {policy.statute}
                        </p>
                      </div>
                      <Badge
                        variant={policy.status === "Mapped" ? "default" : "secondary"}
                        className={
                          policy.status === "Mapped"
                            ? "bg-primary/10 text-primary border-primary/20"
                            : ""
                        }
                      >
                        {policy.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm">
                      <AlertCircle className="h-4 w-4 text-orange-500" />
                      <span className="text-muted-foreground">
                        {policy.gaps} {policy.gaps === 1 ? "gap" : "gaps"} identified
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>

      {/* Report Dialog */}
      <Dialog open={showReport} onOpenChange={setShowReport}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Audit-Ready Report Preview</DialogTitle>
            <DialogDescription>
              Evidence trace for compliance documentation
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-muted/50 border border-border">
              <h4 className="font-semibold mb-2">Policy Mapping Summary</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ 4 regulations tracked</li>
                <li>✓ 2 fully mapped to internal policies</li>
                <li>⚠ 11 total gaps requiring attention</li>
                <li>✓ Audit trail complete for all mappings</li>
              </ul>
            </div>
            
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <p className="text-sm">
                <strong>Evidence Chain:</strong> All policy mappings include timestamped
                decision records, responsible parties, and rationale documentation
                suitable for regulatory review.
              </p>
            </div>

            <Button onClick={() => setShowReport(false)} className="w-full">
              Close Preview
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Demo;
