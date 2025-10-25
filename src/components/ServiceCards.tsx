import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { 
  GraduationCap, 
  Building2, 
  Users, 
  Briefcase,
  ChevronRight,
  ChevronDown,
  Zap,
  Shield,
  Sparkles,
  AlertTriangle,
  Scale
} from "lucide-react";

const services = [
  {
    id: "job-training",
    sector: "Careers",
    status: "Active Pilot",
    icon: GraduationCap,
    title: "IT Careers Without a 4-Year Degree",
    shortDesc: "High school and tech school students learn skills for real tech jobs—coding, cybersecurity, data analysis—without needing a bachelor's degree.",
    fullDesc: "Partners with local schools and employers to create 6-month intensive bootcamps. Students completing cybersecurity training are being hired at hospitals and banks. No college debt required—just hands-on skills employers actually need.",
    deliverables: [
      "6-month bootcamp programs",
      "Industry certification prep",
      "Paid apprenticeships",
      "Direct employer partnerships"
    ],
    impact: "Target: 500+ students yearly",
    timeline: "2024-2026",
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    id: "energy-bills",
    sector: "Cost Savings",
    status: "Active Pilot",
    icon: Zap,
    title: "Smarter Energy Grids = Lower Bills",
    shortDesc: "Using advanced computers to balance electricity supply and demand in real-time. Means fewer outages, cheaper rates, and cleaner air.",
    fullDesc: "Real-world pilots reduced peak-hour demand by 15%, saving households $120/year on average. Smart systems predict when demand will spike and adjust automatically—like having a really smart thermostat for the entire power grid.",
    deliverables: [
      "Real-time grid balancing",
      "Peak demand reduction",
      "Outage prediction systems",
      "Clean energy integration"
    ],
    impact: "Goal: 10% cost reduction at scale",
    timeline: "2024-2030",
    color: "from-green-500/20 to-emerald-500/20"
  },
  {
    id: "drug-discovery",
    sector: "Healthcare",
    status: "Active",
    icon: Users,
    title: "Getting New Medicines to Patients Faster",
    shortDesc: "Advanced computer simulations help scientists test millions of drug combinations virtually before making them in the lab. Cuts years off development time.",
    fullDesc: "Biotech companies are cutting early-stage testing from 18 months to 4 months using simulation tools. Instead of mixing chemicals in test tubes for months, computers can predict which combinations will work—faster medicine for patients who need it.",
    deliverables: [
      "Virtual drug testing",
      "Faster trial phases",
      "Cost reduction for startups",
      "Biotech partnerships"
    ],
    impact: "Target: 20+ companies by 2027",
    timeline: "2024-2027",
    color: "from-pink-500/20 to-rose-500/20"
  },
  {
    id: "appointments",
    sector: "Healthcare",
    status: "Active Pilot",
    icon: Building2,
    title: "No More Waiting Weeks for Appointments",
    shortDesc: "AI scheduling systems help hospitals and clinics fill cancellations instantly, predict busy periods, and match patients with the right specialist faster.",
    fullDesc: "Hospital pilots reduced specialist wait times from 6 weeks to 10 days. The system knows when doctors have openings, automatically texts patients on waitlists, and even predicts which days will be busiest so they can staff properly.",
    deliverables: [
      "Smart scheduling system",
      "Cancellation auto-fill",
      "Demand forecasting",
      "Patient-specialist matching"
    ],
    impact: "Goal: 40% wait time reduction",
    timeline: "2024-2026",
    color: "from-purple-500/20 to-pink-500/20"
  },
  {
    id: "small-biz-security",
    sector: "Security",
    status: "Active",
    icon: Shield,
    title: "Cybersecurity Small Businesses Can Afford",
    shortDesc: "New encryption tools that protect against future hacking threats—simple enough for a local bakery or machine shop to set up without hiring an IT person.",
    fullDesc: "Free security audit tool for businesses under 50 employees—already used by 200+ shops. One-click setup protects customer data, credit cards, and business records from both current hackers and future advanced threats.",
    deliverables: [
      "Free security audits",
      "One-click protection tools",
      "Future-proof encryption",
      "Small business workshops"
    ],
    impact: "Goal: 10,000+ businesses protected",
    timeline: "2024-2030",
    color: "from-red-500/20 to-orange-500/20"
  },
  {
    id: "clean-manufacturing",
    sector: "Manufacturing",
    status: "Active Pilot",
    icon: Briefcase,
    title: "Making Factories Cleaner & More Efficient",
    shortDesc: "Advanced simulations help manufacturers discover new materials that are stronger, cheaper, and produce less pollution. Keeps jobs local while improving air quality.",
    fullDesc: "Steel plants using new material design are cutting emissions by 12% while increasing output. Computer simulations test thousands of material combinations virtually—finding better metals without expensive physical testing.",
    deliverables: [
      "Material optimization",
      "Emissions reduction plans",
      "Cost savings analysis",
      "Manufacturer partnerships"
    ],
    impact: "Target: 50+ manufacturers by 2026",
    timeline: "2024-2026",
    color: "from-orange-500/20 to-amber-500/20"
  },
  {
    id: "rural-internet",
    sector: "Infrastructure",
    status: "Active",
    icon: Sparkles,
    title: "Fast Internet for Rural Communities",
    shortDesc: "Upgrading networks with fiber optic cables so rural communities get the same high-speed internet as cities. Essential for remote work and telehealth.",
    fullDesc: "Fiber expansion projects have connected 3,000+ homes—average speeds went from 5 Mbps to 1000 Mbps. That means kids can do homework online, parents can work remotely, and grandparents can video-chat with doctors instead of driving long distances.",
    deliverables: [
      "Fiber optic installation",
      "Rural community targeting",
      "Telehealth enablement",
      "Remote work infrastructure"
    ],
    impact: "Goal: 95% fiber access by 2028",
    timeline: "2024-2028",
    color: "from-teal-500/20 to-cyan-500/20"
  },
  {
    id: "government-services",
    sector: "Public Service",
    status: "Active Pilot",
    icon: Scale,
    title: "Government Services That Work Better",
    shortDesc: "Using data and AI to help agencies make faster decisions—placing ambulances where they're needed most, routing snowplows efficiently, processing permits quicker.",
    fullDesc: "Government pilots cut permit approval time from 45 days to 12 days using AI document review. The system reads applications, flags missing info automatically, and routes approvals to the right person—less waiting, less paperwork, faster results.",
    deliverables: [
      "Permit process automation",
      "Emergency response optimization",
      "Service delivery tracking",
      "Agency efficiency tools"
    ],
    impact: "Target: 30% faster across 10+ agencies",
    timeline: "2024-2027",
    color: "from-indigo-500/20 to-violet-500/20"
  }
];

export const ServiceCards = () => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  return (
    <section id="services" className="py-12 sm:py-16 md:py-20 relative overflow-hidden" aria-labelledby="services-heading">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-accent/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center space-y-2 sm:space-y-3 mb-8 sm:mb-10"
        >
          <h2 id="services-heading" className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">Solving Real Problems</h2>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto px-4">
            From faster healthcare to lower energy bills to better-paying jobs—here's what advanced technology means for families, businesses, and communities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5 mb-6 sm:mb-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
            >
              <Card 
                className={cn(
                  "group relative overflow-hidden transition-all duration-300 h-full",
                  "hover:shadow-[6px_6px_0px_0px_hsl(var(--primary)/0.25)] hover:-translate-y-1",
                  "border-2 shadow-[3px_3px_0px_0px_hsl(var(--border))]",
                  "glass-card-3d bg-gradient-to-br backdrop-blur-sm",
                  service.color,
                  expandedCard === service.id ? "ring-2 ring-primary shadow-[6px_6px_0px_0px_hsl(var(--primary)/0.35)]" : ""
                )}
                style={{ contain: 'layout style paint' }}
              >
                <CardHeader className="relative space-y-3 pb-3 sm:pb-4">
                  <div className="flex items-start justify-between gap-3 sm:gap-4">
                    <motion.div 
                      className="p-2 sm:p-2.5 rounded-lg bg-background/80 backdrop-blur-sm w-fit border-2 shadow-[2px_2px_0px_0px_hsl(var(--border))]"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <service.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary" aria-hidden="true" />
                    </motion.div>
                    <div className="flex flex-col gap-1.5 sm:gap-2 items-end">
                      <Badge 
                        variant={service.status === "Active" ? "default" : service.status === "Planning" ? "secondary" : "outline"}
                        className="text-[10px] sm:text-xs font-bold border-2 shadow-[2px_2px_0px_0px_hsl(var(--border))]"
                      >
                        {service.status}
                      </Badge>
                      <Badge variant="outline" className="text-[10px] sm:text-xs border-2 shadow-[2px_2px_0px_0px_hsl(var(--border))] bg-background/60">
                        {service.sector}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-sm sm:text-base md:text-lg leading-tight">{service.title}</CardTitle>
                  <CardDescription className="text-[11px] sm:text-xs md:text-sm leading-relaxed">
                    {service.shortDesc}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative space-y-4 pt-0">
                  <div className="grid grid-cols-2 gap-3 py-3 border-t-2 border-dashed border-border/50">
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Impact</span>
                      <p className="text-sm font-medium">{service.impact}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Timeline</span>
                      <p className="text-sm font-medium">{service.timeline}</p>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    className="w-full justify-between group/btn border-2 shadow-[2px_2px_0px_0px_hsl(var(--border))] hover:shadow-[3px_3px_0px_0px_hsl(var(--primary)/0.2)] hover:-translate-y-0.5 transition-all"
                    onClick={() => setExpandedCard(expandedCard === service.id ? null : service.id)}
                  >
                    <span className="text-xs sm:text-sm font-semibold">Details</span>
                    {expandedCard === service.id ? (
                      <ChevronDown className="w-4 h-4 transition-transform" />
                    ) : (
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    )}
                  </Button>

                  <AnimatePresence>
                    {expandedCard === service.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4 overflow-hidden"
                      >
                        <div className="pt-4 border-t-2 border-dashed border-border/50 space-y-4">
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {service.fullDesc}
                          </p>
                          
                          <div className="space-y-3 p-4 rounded-lg bg-background/60 backdrop-blur-sm border-2 shadow-[2px_2px_0px_0px_hsl(var(--border))]">
                            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Key Deliverables</p>
                            <ul className="space-y-2">
                              {service.deliverables.map((deliverable, idx) => (
                                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <ChevronRight className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                                  <span>{deliverable}</span>
                                </li>
                              ))}
                            </ul>
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button 
            size="lg"
            onClick={() => window.open('https://keen-hardboard-afe.notion.site/28cf142372ef8050ac86f4a3b4c813db?v=28cf142372ef8073b8cf000c0ebfca06&source=copy_link', '_blank', 'noopener,noreferrer')}
            className="group border-2 shadow-[4px_4px_0px_0px_hsl(var(--primary)/0.3)] hover:shadow-[6px_6px_0px_0px_hsl(var(--primary)/0.4)] hover:-translate-y-0.5 transition-all"
          >
            View All Initiatives
            <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
