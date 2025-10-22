import { motion } from "framer-motion";
import { Shield, Lock, Activity, User, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FedRAMPSandbox = () => {
  const auditLogs = [
    { id: 1, user: "admin@example.com", action: "Created test environment", timestamp: "2025-01-20 14:32:15", level: "info" },
    { id: 2, user: "dev@example.com", action: "Modified RBAC policy", timestamp: "2025-01-20 13:15:42", level: "warning" },
    { id: 3, user: "security@example.com", action: "Ran compliance scan", timestamp: "2025-01-20 12:08:33", level: "info" },
    { id: 4, user: "admin@example.com", action: "Updated encryption keys", timestamp: "2025-01-20 11:22:19", level: "critical" },
  ];

  const environments = [
    { name: "Development", status: "active", users: 5, compliance: 92 },
    { name: "Staging", status: "active", users: 3, compliance: 98 },
    { name: "Production", status: "locked", users: 2, compliance: 100 },
  ];

  const rbacRoles = [
    { role: "Admin", permissions: ["read", "write", "delete", "manage"], users: 2 },
    { role: "Developer", permissions: ["read", "write"], users: 8 },
    { role: "Auditor", permissions: ["read", "audit"], users: 3 },
    { role: "Viewer", permissions: ["read"], users: 12 },
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
              FedRAMP Sandbox
            </h1>
            <p className="text-muted-foreground">
              Isolated environment with RBAC gating and comprehensive audit logging
            </p>
          </div>

          <Tabs defaultValue="environments" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="environments">Environments</TabsTrigger>
              <TabsTrigger value="rbac">RBAC</TabsTrigger>
              <TabsTrigger value="audit">Audit Log</TabsTrigger>
            </TabsList>

            <TabsContent value="environments" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Sandbox Environments
                  </CardTitle>
                  <CardDescription>
                    Manage isolated testing environments with FedRAMP compliance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {environments.map((env) => (
                    <motion.div
                      key={env.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-4 rounded-lg border bg-card"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <Shield className="h-6 w-6 text-primary" />
                          <div>
                            <h3 className="font-semibold text-lg">{env.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {env.users} active users
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant={env.status === "active" ? "default" : "secondary"}
                        >
                          {env.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            Compliance Score:
                          </span>
                          <span className="font-semibold text-primary">
                            {env.compliance}%
                          </span>
                        </div>
                        <Button variant="outline" size="sm">
                          Manage
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rbac" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-primary" />
                    Role-Based Access Control
                  </CardTitle>
                  <CardDescription>
                    Manage user permissions and access policies
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {rbacRoles.map((item) => (
                    <motion.div
                      key={item.role}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-4 rounded-lg border bg-card"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <User className="h-5 w-5 text-primary" />
                          <h3 className="font-semibold">{item.role}</h3>
                        </div>
                        <Badge variant="secondary">{item.users} users</Badge>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {item.permissions.map((perm) => (
                          <Badge key={perm} variant="outline">
                            {perm}
                          </Badge>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="audit" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    Audit Log
                  </CardTitle>
                  <CardDescription>
                    Comprehensive event tracking and compliance monitoring
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {auditLogs.map((log) => (
                      <motion.div
                        key={log.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-start gap-4 p-3 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
                      >
                        <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">{log.action}</span>
                            <Badge
                              variant={
                                log.level === "critical"
                                  ? "destructive"
                                  : log.level === "warning"
                                  ? "secondary"
                                  : "outline"
                              }
                            >
                              {log.level}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{log.user}</p>
                          <p className="text-xs text-muted-foreground">{log.timestamp}</p>
                        </div>
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

export default FedRAMPSandbox;
