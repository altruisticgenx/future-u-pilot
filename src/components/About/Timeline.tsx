import { motion } from "framer-motion";
import { CheckCircle2, Circle, Clock } from "lucide-react";

const milestones = [
  {
    year: "2024",
    quarter: "Q1",
    title: "Foundation Phase",
    status: "completed",
    description: "Established partnerships with 5 universities, launched first quantum literacy program",
    impact: "500+ students enrolled"
  },
  {
    year: "2024",
    quarter: "Q3",
    title: "Expansion Phase",
    status: "completed",
    description: "Deployed pilot smart grid projects, initiated healthcare collaborations",
    impact: "3 active pilots, 22% energy savings"
  },
  {
    year: "2025",
    quarter: "Q1",
    title: "Scale Phase",
    status: "in-progress",
    description: "Rolling out statewide K-12 quantum curriculum, expanding industry partnerships",
    impact: "Target: 50,000+ students"
  },
  {
    year: "2025",
    quarter: "Q3",
    title: "Innovation Phase",
    status: "planned",
    description: "Launch Pennsylvania Quantum Hub, establish research grants program",
    impact: "Goal: 100+ research projects"
  },
  {
    year: "2026",
    quarter: "Q1",
    title: "Leadership Phase",
    status: "planned",
    description: "Position Pennsylvania as national quantum leader, international collaborations",
    impact: "National recognition"
  },
];

export const Timeline = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Quantum Journey</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From inception to industry leadership—tracking Pennsylvania's quantum transformation
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary to-muted" />

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-20"
              >
                {/* Timeline dot */}
                <div className="absolute left-6 top-2 -ml-2.5 z-10">
                  {milestone.status === "completed" && (
                    <CheckCircle2 className="h-5 w-5 text-green-500 bg-background" />
                  )}
                  {milestone.status === "in-progress" && (
                    <Clock className="h-5 w-5 text-yellow-500 bg-background animate-pulse" />
                  )}
                  {milestone.status === "planned" && (
                    <Circle className="h-5 w-5 text-muted-foreground bg-background" />
                  )}
                </div>

                <motion.div
                  className="backdrop-blur-md bg-card/60 border-2 border-border/50 rounded-xl p-6 hover:border-primary/50 transition-all hover:shadow-xl"
                  whileHover={{ x: 8, y: -4 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-sm text-muted-foreground font-medium">
                        {milestone.year} {milestone.quarter}
                      </div>
                      <h3 className="text-xl font-bold mt-1">{milestone.title}</h3>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        milestone.status === "completed"
                          ? "bg-green-500/10 text-green-600"
                          : milestone.status === "in-progress"
                          ? "bg-yellow-500/10 text-yellow-600"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {milestone.status.replace("-", " ").toUpperCase()}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-3">{milestone.description}</p>
                  <div className="text-sm font-semibold text-primary">
                    Impact: {milestone.impact}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
