import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Search, AlertCircle, ArrowLeft, CheckCircle2, Clock, TrendingUp, BarChart3, Shield, Eye, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Navigation } from "@/components/Navigation";
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
    compliance: 85,
    lastUpdated: "2 days ago",
    priority: "medium",
    description: "Federal workplace safety and health regulations covering general industry standards.",
    requirements: ["Hazard Communication", "Personal Protective Equipment", "Emergency Action Plans"],
    affectedDepts: ["Operations", "Maintenance", "HR"],
  },
  {
    id: 2,
    title: "EPA Environmental Compliance",
    statute: "40 CFR Part 261",
    status: "Review Required",
    gaps: 5,
    compliance: 62,
    lastUpdated: "5 days ago",
    priority: "high",
    description: "Environmental Protection Agency regulations for hazardous waste identification and classification.",
    requirements: ["Waste Characterization", "Storage Requirements", "Disposal Documentation"],
    affectedDepts: ["Facilities", "Safety", "Legal"],
  },
  {
    id: 3,
    title: "GDPR Data Protection",
    statute: "EU Regulation 2016/679",
    status: "Mapped",
    gaps: 1,
    compliance: 94,
    lastUpdated: "1 day ago",
    priority: "low",
    description: "European Union data protection and privacy regulations for personal data processing.",
    requirements: ["Data Subject Rights", "Privacy by Design", "Breach Notification"],
    affectedDepts: ["IT", "Legal", "Customer Service"],
  },
  {
    id: 4,
    title: "HIPAA Privacy Rules",
    statute: "45 CFR Part 164",
    status: "Gap Analysis",
    gaps: 3,
    compliance: 78,
    lastUpdated: "3 days ago",
    priority: "high",
    description: "Health Insurance Portability and Accountability Act privacy and security standards.",
    requirements: ["Patient Consent", "Access Controls", "Audit Trails"],
    affectedDepts: ["Medical Records", "IT Security", "Compliance"],
  },
];

const Proposals = () => {
  const [showReport, setShowReport] = useState(false);
  const [expandedPolicy, setExpandedPolicy] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const avgCompliance = Math.round(
    mockPolicies.reduce((sum, p) => sum + p.compliance, 0) / mockPolicies.length
  );

  const filteredPolicies = mockPolicies.filter(
    (policy) =>
      policy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      policy.statute.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-16 sm:top-20 z-40 mt-16 sm:mt-20">
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
                <h1 className="text-2xl font-bold">Proposals</h1>
                <p className="text-sm text-muted-foreground">
                  AI-assisted regulation tracking and policy initiatives
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
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 sm:space-y-8"
        >
          {/* Stats Overview */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="backdrop-blur-md bg-card/60 border-primary/30">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <BarChart3 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground">Avg Compliance</p>
                      <p className="text-xl sm:text-2xl font-bold">{avgCompliance}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="backdrop-blur-md bg-card/60">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-accent/10">
                      <FileText className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground">Tracked</p>
                      <p className="text-xl sm:text-2xl font-bold">{mockPolicies.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="backdrop-blur-md bg-card/60">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-500/10">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground">Mapped</p>
                      <p className="text-xl sm:text-2xl font-bold">
                        {mockPolicies.filter((p) => p.status === "Mapped").length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="backdrop-blur-md bg-card/60">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-orange-500/10">
                      <AlertCircle className="h-5 w-5 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground">Total Gaps</p>
                      <p className="text-xl sm:text-2xl font-bold">
                        {mockPolicies.reduce((sum, p) => sum + p.gaps, 0)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Controls */}
          <Card className="backdrop-blur-md bg-card/60">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search policies or regulations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <Button
                  onClick={() => setShowReport(true)}
                  className="shadow-lg w-full sm:w-auto"
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
            {filteredPolicies.map((policy, index) => (
              <motion.div
                key={policy.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="backdrop-blur-md bg-card/60 hover:border-primary/50 transition-all duration-300 hover:shadow-lg overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                            <Shield className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-lg sm:text-xl break-words">{policy.title}</CardTitle>
                            <p className="text-xs sm:text-sm text-muted-foreground font-mono mt-1">
                              {policy.statute}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Badge
                          variant={policy.status === "Mapped" ? "default" : "secondary"}
                          className={
                            policy.status === "Mapped"
                              ? "bg-primary/10 text-primary border-primary/20"
                              : "bg-orange-500/10 text-orange-500 border-orange-500/20"
                          }
                        >
                          {policy.status}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={
                            policy.priority === "high"
                              ? "border-red-500/50 text-red-500"
                              : policy.priority === "medium"
                              ? "border-orange-500/50 text-orange-500"
                              : "border-blue-500/50 text-blue-500"
                          }
                        >
                          {policy.priority}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Compliance Progress */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-2">
                          <TrendingUp className="h-4 w-4" />
                          Compliance Score
                        </span>
                        <span className="font-semibold">{policy.compliance}%</span>
                      </div>
                      <Progress value={policy.compliance} className="h-2" />
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div className="flex items-center gap-2 text-sm">
                        <AlertCircle className="h-4 w-4 text-orange-500 shrink-0" />
                        <span className="text-muted-foreground truncate">
                          {policy.gaps} {policy.gaps === 1 ? "gap" : "gaps"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                        <span className="text-muted-foreground truncate">{policy.lastUpdated}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm col-span-2 sm:col-span-1">
                        <Eye className="h-4 w-4 text-muted-foreground shrink-0" />
                        <span className="text-muted-foreground truncate">
                          {policy.affectedDepts.length} depts
                        </span>
                      </div>
                    </div>

                    {/* Expandable Details */}
                    <Button
                      variant="ghost"
                      className="w-full justify-between text-sm hover:bg-primary/5"
                      onClick={() =>
                        setExpandedPolicy(expandedPolicy === policy.id ? null : policy.id)
                      }
                    >
                      <span>View Details</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          expandedPolicy === policy.id ? "rotate-180" : ""
                        }`}
                      />
                    </Button>

                    <AnimatePresence>
                      {expandedPolicy === policy.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-4 pt-4 border-t border-border/50 overflow-hidden"
                        >
                          <div>
                            <p className="text-sm font-semibold mb-2">Description</p>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {policy.description}
                            </p>
                          </div>

                          <div>
                            <p className="text-sm font-semibold mb-2">Key Requirements</p>
                            <ul className="space-y-1">
                              {policy.requirements.map((req) => (
                                <li
                                  key={req}
                                  className="text-sm text-muted-foreground flex items-start gap-2"
                                >
                                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                                  <span>{req}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <p className="text-sm font-semibold mb-2">Affected Departments</p>
                            <div className="flex flex-wrap gap-2">
                              {policy.affectedDepts.map((dept) => (
                                <Badge key={dept} variant="outline" className="text-xs">
                                  {dept}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
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
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                Evidence Chain
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Each policy mapping includes source regulation, internal policy document reference, 
                responsible department, compliance status, and audit timestamp. All evidence is 
                cryptographically signed and immutably stored.
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

export default Proposals;
