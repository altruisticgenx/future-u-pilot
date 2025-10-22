import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Gamepad2, 
  Play, 
  Trophy, 
  Users, 
  Shield, 
  FileText,
  Zap,
  Brain,
  Lock
} from "lucide-react";

interface Game {
  id: string;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  players: number;
  icon: any;
  status: "active" | "coming-soon";
}

const games: Game[] = [
  {
    id: "policy-puzzle",
    title: "Policy Puzzle",
    description: "Navigate conflicting regulations across jurisdictions. Build a compliant AI deployment path.",
    difficulty: "Intermediate",
    category: "Regulatory Strategy",
    players: 142,
    icon: FileText,
    status: "active",
  },
  {
    id: "quantum-fortress",
    title: "Quantum Fortress",
    description: "Defend your infrastructure against quantum attacks. Upgrade crypto systems before it's too late.",
    difficulty: "Advanced",
    category: "Cybersecurity",
    players: 89,
    icon: Shield,
    status: "active",
  },
  {
    id: "ethics-arena",
    title: "Ethics Arena",
    description: "Make real-time ethical decisions for AI systems. Balance stakeholder concerns and compliance.",
    difficulty: "Beginner",
    category: "AI Ethics",
    players: 231,
    icon: Brain,
    status: "active",
  },
  {
    id: "compliance-sprint",
    title: "Compliance Sprint",
    description: "Race against audit deadlines. Implement controls, gather evidence, and pass inspections.",
    difficulty: "Intermediate",
    category: "Audit Prep",
    players: 156,
    icon: Zap,
    status: "active",
  },
  {
    id: "fedramp-simulator",
    title: "FedRAMP Simulator",
    description: "Navigate the complete FedRAMP authorization process in a risk-free environment.",
    difficulty: "Advanced",
    category: "Government",
    players: 67,
    icon: Lock,
    status: "coming-soon",
  },
];

export default function Sandboxverse() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "Intermediate":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "Advanced":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-primary/10 text-primary border-primary/20";
    }
  };

  const launchGame = (game: Game) => {
    if (game.status === "coming-soon") {
      return;
    }
    setSelectedGame(game);
    // In production, this would launch the actual game interface
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Gamepad2 className="h-4 w-4 text-primary" />
            <span className="text-sm font-mono text-primary">SANDBOXVERSE.LOAD()</span>
          </div>
          
          <h1 className="text-5xl font-bold">
            <span className="bg-gradient-to-r from-[hsl(var(--quantum-magenta))] via-[hsl(var(--accent))] to-[hsl(var(--quantum-cyan))] bg-clip-text text-transparent">
              Sandboxverse Arcade
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn policy, quantum security, and AI ethics through interactive simulations. 
            Risk-free environments where failure teaches—and success builds real-world skills.
          </p>
        </motion.div>

        <Tabs defaultValue="all" className="mb-12">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-4">
            <TabsTrigger value="all">All Games</TabsTrigger>
            <TabsTrigger value="regulatory">Policy</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="ethics">Ethics</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {games.map((game, index) => {
                const Icon = game.icon;
                return (
                  <motion.div
                    key={game.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-300 hover:border-primary/50">
                      {game.status === "coming-soon" && (
                        <div className="absolute top-4 right-4 z-10">
                          <Badge variant="outline" className="bg-muted">
                            Coming Soon
                          </Badge>
                        </div>
                      )}
                      
                      <CardHeader>
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                            <Icon className="h-8 w-8 text-primary" />
                          </div>
                        </div>
                        <CardTitle className="group-hover:text-primary transition-colors">
                          {game.title}
                        </CardTitle>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">{game.description}</p>
                        
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={getDifficultyColor(game.difficulty)}>
                            {game.difficulty}
                          </Badge>
                          <Badge variant="outline">{game.category}</Badge>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span>{game.players} players</span>
                          </div>
                          
                          <Button
                            size="sm"
                            onClick={() => launchGame(game)}
                            disabled={game.status === "coming-soon"}
                            className="group/btn"
                          >
                            <Play className="h-4 w-4 mr-2 group-hover/btn:animate-pulse" />
                            {game.status === "coming-soon" ? "Soon" : "Launch"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="regulatory">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {games
                .filter((g) => g.category.includes("Regulatory") || g.category.includes("Audit") || g.category.includes("Government"))
                .map((game, index) => {
                  const Icon = game.icon;
                  return (
                    <motion.div key={game.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.1 }}>
                      <Card className="hover:shadow-xl transition-shadow">
                        <CardHeader>
                          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                            <Icon className="h-8 w-8 text-primary" />
                          </div>
                          <CardTitle>{game.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">{game.description}</p>
                          <Button onClick={() => launchGame(game)} disabled={game.status === "coming-soon"} className="w-full">
                            <Play className="h-4 w-4 mr-2" />
                            Launch Game
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
            </div>
          </TabsContent>

          <TabsContent value="security">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {games
                .filter((g) => g.category.includes("Cybersecurity"))
                .map((game) => {
                  const Icon = game.icon;
                  return (
                    <Card key={game.id} className="hover:shadow-xl transition-shadow">
                      <CardHeader>
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                          <Icon className="h-8 w-8 text-primary" />
                        </div>
                        <CardTitle>{game.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">{game.description}</p>
                        <Button onClick={() => launchGame(game)} className="w-full">
                          <Play className="h-4 w-4 mr-2" />
                          Launch Game
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          </TabsContent>

          <TabsContent value="ethics">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {games
                .filter((g) => g.category.includes("Ethics"))
                .map((game) => {
                  const Icon = game.icon;
                  return (
                    <Card key={game.id} className="hover:shadow-xl transition-shadow">
                      <CardHeader>
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                          <Icon className="h-8 w-8 text-primary" />
                        </div>
                        <CardTitle>{game.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">{game.description}</p>
                        <Button onClick={() => launchGame(game)} className="w-full">
                          <Play className="h-4 w-4 mr-2" />
                          Launch Game
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          </TabsContent>
        </Tabs>

        {/* Leaderboard Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                Global Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { rank: 1, name: "PolicyPro_89", score: 24580, badge: "🏆" },
                  { rank: 2, name: "QuantumDefender", score: 23120, badge: "🥈" },
                  { rank: 3, name: "EthicsChampion", score: 21450, badge: "🥉" },
                  { rank: 4, name: "ComplianceNinja", score: 19870, badge: "" },
                  { rank: 5, name: "RegulatoryMaster", score: 18930, badge: "" },
                ].map((player) => (
                  <div key={player.rank} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl w-8 text-center">{player.badge || `#${player.rank}`}</span>
                      <span className="font-mono font-semibold">{player.name}</span>
                    </div>
                    <span className="text-primary font-bold">{player.score.toLocaleString()} pts</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
