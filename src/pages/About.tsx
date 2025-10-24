import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Zap, Heart, Scale, Users, Brain } from "lucide-react";
import { StakeholderCard } from "@/components/StakeholderCard";
import { MetricCard } from "@/components/MetricCard";

const stakeholders = [
  {
    icon: GraduationCap,
    title: "Students",
    subtitle: "Tomorrow's Tech Workforce",
    description: "Making quantum tech jobs accessible from high school through college. Learn coding for quantum computers without needing a PhD. Keep Pennsylvania talent in Pennsylvania.",
    highlights: [
      "Career paths anyone can follow",
      "Learn quantum without advanced degrees",
      "Good jobs close to home"
    ],
    color: "from-blue-500/15 via-cyan-500/10 to-blue-500/15"
  },
  {
    icon: Zap,
    title: "Energy",
    subtitle: "Smarter Grids & Security",
    description: "Quantum computers help power companies manage electricity better and protect against hackers. Early tests show 22% energy savings—meaning cleaner air and lower bills.",
    highlights: [
      "22% energy savings in real tests",
      "Protection from future cyber attacks",
      "Better control of power grids"
    ],
    color: "from-yellow-500/15 via-orange-500/10 to-yellow-500/15"
  },
  {
    icon: Heart,
    title: "Healthcare",
    subtitle: "Better Medicine, Faster",
    description: "Quantum tech speeds up drug discovery by testing molecules virtually. Better sensors mean better diagnoses. The result? Medicine tailored to each person.",
    highlights: [
      "Discover new drugs faster",
      "More accurate diagnoses",
      "Treatment plans just for you"
    ],
    color: "from-red-500/15 via-pink-500/10 to-red-500/15"
  },
  {
    icon: Scale,
    title: "Government",
    subtitle: "Policies That Work",
    description: "We help lawmakers create practical rules and guidelines that make Pennsylvania a leader in quantum tech while keeping the public safe and informed.",
    highlights: [
      "Advisory boards with real experts",
      "Clear ethics rules everyone understands",
      "Economic independence, not reliance"
    ],
    color: "from-purple-500/15 via-indigo-500/10 to-purple-500/15"
  }
];

const investmentMetrics = [
  { sector: "Education", payback: "18 months", roi: "4.3x", icon: GraduationCap },
  { sector: "Energy", payback: "15 months", roi: "3.8x", icon: Zap },
  { sector: "Healthcare", payback: "19 months", roi: "3.2x", icon: Heart },
  { sector: "Governance", payback: "12 months", roi: "5.1x", icon: Scale }
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-background animate-gradient" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary))_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.03] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]" />
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-5"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/40 backdrop-blur-sm"
            >
              <Brain className="w-3.5 h-3.5 text-primary animate-pulse" />
              <span className="text-xs font-medium bg-gradient-hero bg-clip-text text-transparent">
                Pennsylvania Quantum Initiative
              </span>
            </motion.div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              <span className="block text-foreground">The Quantum Leap</span>
              <span className="block bg-gradient-hero bg-clip-text text-transparent mt-1.5">
                Pennsylvania's Path Forward
              </span>
            </h1>
            
            <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We're connecting students to tech careers, helping companies run smarter, speeding up healthcare breakthroughs, and making policies that work—all with real pilots that show results fast.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stakeholder Perspectives */}
      <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2.5 bg-gradient-hero bg-clip-text text-transparent">
              Four Perspectives, One Vision
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              Real people, real results. Here's how quantum tech helps everyone.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            {stakeholders.map((stakeholder, index) => (
              <StakeholderCard
                key={index}
                {...stakeholder}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ROI Metrics */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2.5 bg-gradient-hero bg-clip-text text-transparent">
              Return on Investment
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              Real numbers from real tests—quantum pays back fast.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {investmentMetrics.map((metric, index) => (
              <MetricCard
                key={index}
                {...metric}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="py-16 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="text-center space-y-2.5">
              <Users className="h-9 w-9 text-primary mx-auto animate-pulse" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">Our Vision</h2>
            </div>
            
            <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              <p>
                Pennsylvania is ready to lead. We're connecting students to careers, companies to efficiency, healthcare to breakthroughs, and policy to practice. No buzzwords—just systems that work.
              </p>
              <p>
                With smart investment, clear rules, and hands-on training, Pennsylvania becomes a quantum leader—not just in tech, but in jobs, security, and quality of life.
              </p>
              <blockquote className="border-l-4 border-primary pl-5 py-2 italic text-base sm:text-lg bg-gradient-to-r from-primary/5 to-transparent rounded-r">
                "Quantum won't just compute—it will sense, simulate, and secure. Pennsylvania can build that future first."
              </blockquote>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Card className="bg-gradient-to-br from-primary/15 via-accent/10 to-primary/15 border border-primary/40 shadow-[0_10px_40px_rgba(var(--primary-rgb),0.2)]">
              <CardContent className="p-8 sm:p-10 space-y-5">
                <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                  Join Pennsylvania's Quantum Future
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
                  Whether you're in education, energy, healthcare, government, or business—Pennsylvania's quantum future needs you.
                </p>
                <motion.button
                  onClick={() => window.location.href = "/#contact"}
                  className="px-7 py-3.5 bg-primary text-primary-foreground rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all text-sm"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Get Involved Today
                </motion.button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
