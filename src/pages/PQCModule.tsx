import { motion } from "framer-motion";
import { Download, CheckCircle, AlertCircle, FileText, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";

const PQCModule = () => {
  const checklistItems = [
    { id: 1, title: "Inventory current cryptographic systems", category: "assessment", completed: true },
    { id: 2, title: "Identify quantum-vulnerable algorithms", category: "assessment", completed: true },
    { id: 3, title: "Map NIST PQC algorithms to systems", category: "planning", completed: false },
    { id: 4, title: "Develop migration timeline", category: "planning", completed: false },
    { id: 5, title: "Test PQC implementations in sandbox", category: "testing", completed: false },
    { id: 6, title: "Deploy crypto-agile infrastructure", category: "deployment", completed: false },
    { id: 7, title: "Train security team on PQC protocols", category: "training", completed: false },
    { id: 8, title: "Establish monitoring for quantum threats", category: "monitoring", completed: false },
  ];

  const nistAlgorithms = [
    { name: "CRYSTALS-Kyber", type: "Key Encapsulation", status: "Standardized", nistId: "FIPS 203" },
    { name: "CRYSTALS-Dilithium", type: "Digital Signature", status: "Standardized", nistId: "FIPS 204" },
    { name: "SPHINCS+", type: "Digital Signature", status: "Standardized", nistId: "FIPS 205" },
    { name: "FALCON", type: "Digital Signature", status: "Under Review", nistId: "Draft" },
  ];

  const completedItems = checklistItems.filter((item) => item.completed).length;
  const progressPercentage = (completedItems / checklistItems.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-2">
              Post-Quantum Cryptography Module
            </h1>
            <p className="text-muted-foreground">
              Migration checklist and NIST algorithm mapping for quantum-safe infrastructure
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Migration Progress
                </CardTitle>
                <CardDescription>
                  {completedItems} of {checklistItems.length} steps completed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={progressPercentage} className="mb-4" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Overall Progress</span>
                  <span className="font-semibold text-primary">
                    {Math.round(progressPercentage)}%
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Quick Actions
                </CardTitle>
                <CardDescription>
                  Download resources and reports
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" size="lg">
                  <Download className="mr-2 h-4 w-4" />
                  Download PQC Migration Checklist (PDF)
                </Button>
                <Button variant="outline" className="w-full justify-start" size="lg">
                  <Download className="mr-2 h-4 w-4" />
                  Export NIST Algorithm Mapping (CSV)
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Migration Checklist</CardTitle>
                <CardDescription>
                  Step-by-step guide to quantum-safe infrastructure
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {checklistItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
                  >
                    <Checkbox
                      checked={item.completed}
                      className="mt-0.5"
                      aria-label={`Mark ${item.title} as ${item.completed ? 'incomplete' : 'complete'}`}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={`font-medium ${item.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {item.title}
                        </h4>
                        {item.completed ? (
                          <CheckCircle className="h-4 w-4 text-primary" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {item.category}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>NIST PQC Algorithms</CardTitle>
                <CardDescription>
                  Standardized quantum-resistant cryptographic algorithms
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {nistAlgorithms.map((algo, index) => (
                  <motion.div
                    key={algo.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-lg border bg-card"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{algo.name}</h3>
                      <Badge
                        variant={algo.status === "Standardized" ? "default" : "secondary"}
                      >
                        {algo.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{algo.type}</span>
                      <span className="font-mono text-xs bg-secondary px-2 py-1 rounded">
                        {algo.nistId}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PQCModule;
