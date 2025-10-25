import { motion } from "framer-motion";
import { Microscope, Building2, Rocket, GraduationCap, Briefcase } from "lucide-react";

const logos = [
  { 
    name: "Research Lab", 
    icon: Microscope,
    color: "from-blue-500/25 to-cyan-500/20",
    shadowColor: "shadow-[0_6px_20px_rgba(14,165,233,0.3)]",
    hoverShadow: "hover:shadow-[0_10px_30px_rgba(14,165,233,0.5)]"
  },
  { 
    name: "Gov Agency", 
    icon: Building2,
    color: "from-purple-500/25 to-indigo-500/20",
    shadowColor: "shadow-[0_6px_20px_rgba(147,51,234,0.3)]",
    hoverShadow: "hover:shadow-[0_10px_30px_rgba(147,51,234,0.5)]"
  },
  { 
    name: "Tech Startup", 
    icon: Rocket,
    color: "from-emerald-500/25 to-teal-500/20",
    shadowColor: "shadow-[0_6px_20px_rgba(16,185,129,0.3)]",
    hoverShadow: "hover:shadow-[0_10px_30px_rgba(16,185,129,0.5)]"
  },
  { 
    name: "University", 
    icon: GraduationCap,
    color: "from-amber-500/25 to-orange-500/20",
    shadowColor: "shadow-[0_6px_20px_rgba(251,146,60,0.3)]",
    hoverShadow: "hover:shadow-[0_10px_30px_rgba(251,146,60,0.5)]"
  },
  { 
    name: "Enterprise", 
    icon: Briefcase,
    color: "from-rose-500/25 to-pink-500/20",
    shadowColor: "shadow-[0_6px_20px_rgba(244,63,94,0.3)]",
    hoverShadow: "hover:shadow-[0_10px_30px_rgba(244,63,94,0.5)]"
  },
];

const stats = [
  { label: "Avg. prototype → pilot", value: "< 8 weeks" },
  { label: "Security-first", value: "deployments" },
  { label: "Explainable, auditable", value: "workflows" },
];

export const LogoRow = () => {
  return (
    <section className="py-12 sm:py-16 border-y border-primary/20 glass-card-3d bg-gradient-to-b from-muted/40 to-background relative overflow-hidden" aria-labelledby="partners-heading">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center space-y-6 sm:space-y-8"
        >
          <h2 id="partners-heading" className="text-base sm:text-lg md:text-xl font-semibold text-muted-foreground">
            Trusted by innovators in government, research, and emerging tech
          </h2>

          {/* Unique 3D Animated Logo Cards */}
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-5">
            {logos.map((logo, index) => {
              const Icon = logo.icon;
              return (
                <motion.div
                  key={logo.name}
                  initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
                  whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.08, 
                    rotateY: 5,
                    rotateX: -5,
                    y: -5,
                    transition: { duration: 0.3 }
                  }}
                  className={`
                    w-28 sm:w-32 md:w-36 h-20 sm:h-24 rounded-xl
                    bg-gradient-to-br ${logo.color}
                    border-2 border-primary/30
                    ${logo.shadowColor} ${logo.hoverShadow}
                    transition-all duration-300 cursor-pointer
                    glass-card-3d
                    perspective-1000
                    group
                  `}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-3">
                    <motion.div
                      className="p-2 rounded-lg bg-background/60 backdrop-blur-sm border border-primary/20"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" aria-hidden="true" />
                    </motion.div>
                    <span className="text-[10px] sm:text-xs font-bold text-foreground text-center leading-tight">
                      {logo.name}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Stats - 3D Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 sm:pt-6 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
                className="space-y-2"
              >
                <motion.div 
                  className="glass-card-3d inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-primary/15 to-accent/15 border-2 border-primary/30"
                  whileHover={{ 
                    scale: 1.05, 
                    y: -3,
                    boxShadow: "0 8px 25px hsl(var(--primary) / 0.4)" 
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-xs sm:text-sm font-bold bg-gradient-hero bg-clip-text text-transparent">
                    {stat.value}
                  </span>
                </motion.div>
                <p className="text-[10px] sm:text-xs text-muted-foreground font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
