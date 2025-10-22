import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, Clock, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PolicyDashboard = () => {
  const alerts = [
    { id: 1, type: "critical", title: "OSHA Update Required", date: "2025-01-15", status: "pending" },
    { id: 2, type: "warning", title: "EPA Compliance Review", date: "2025-01-18", status: "in-progress" },
    { id: 3, type: "info", title: "New NIST Guidelines", date: "2025-01-20", status: "completed" },
  ];

  const timeline = [
    { date: "2025-01-10", event: "Policy scan initiated", category: "system" },
    { date: "2025-01-12", event: "Federal Register sync completed", category: "sync" },
    { date: "2025-01-15", event: "Gap analysis generated", category: "analysis" },
    { date: "2025-01-18", event: "Compliance report drafted", category: "report" },
  ];

  const entities = [
    { name: "OSHA", count: 12, trend: "up" },
    { name: "EPA", count: 8, trend: "stable" },
    { name: "NIST", count: 15, trend: "up" },
    { name: "FedRAMP", count: 6, trend: "down" },
    { name: "HIPAA", count: 4, trend: "stable" },
  ];

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
              Policy Dashboard
            </h1>
            <p className="text-muted-foreground">
              AI-assisted regulation tracking and policy mapping
            </p>
          </div>

          <Tabs defaultValue="alerts" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="alerts">Alerts</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
              <TabsTrigger value="entities">Entities</TabsTrigger>
            </TabsList>

            <TabsContent value="alerts" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    Active Alerts
                  </CardTitle>
                  <CardDescription>
                    Policy updates requiring attention
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {alerts.map((alert) => (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        {alert.type === "critical" && (
                          <AlertTriangle className="h-5 w-5 text-destructive" />
                        )}
                        {alert.type === "warning" && (
                          <Clock className="h-5 w-5 text-amber-500" />
                        )}
                        {alert.type === "info" && (
                          <CheckCircle className="h-5 w-5 text-primary" />
                        )}
                        <div>
                          <h4 className="font-semibold">{alert.title}</h4>
                          <p className="text-sm text-muted-foreground">{alert.date}</p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          alert.status === "pending"
                            ? "destructive"
                            : alert.status === "in-progress"
                            ? "secondary"
                            : "default"
                        }
                      >
                        {alert.status}
                      </Badge>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="timeline" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Policy Activity Timeline</CardTitle>
                  <CardDescription>
                    Recent policy tracking events
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {timeline.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-4"
                      >
                        <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{item.event}</h4>
                            <Badge variant="outline">{item.category}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{item.date}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trends" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Policy Trend Analysis
                  </CardTitle>
                  <CardDescription>
                    Regulatory activity over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    <p>Chart visualization coming soon</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="entities" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Regulatory Entity Tag Cloud</CardTitle>
                  <CardDescription>
                    Most active regulatory bodies
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4">
                    {entities.map((entity) => (
                      <motion.div
                        key={entity.name}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg border bg-card cursor-pointer hover:bg-accent/10 transition-colors"
                      >
                        <span className="font-semibold text-lg">{entity.name}</span>
                        <Badge variant="secondary">{entity.count}</Badge>
                        {entity.trend === "up" && (
                          <TrendingUp className="h-4 w-4 text-primary" />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default PolicyDashboard;
