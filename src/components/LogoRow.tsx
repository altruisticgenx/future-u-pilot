import { motion } from "framer-motion";

const logos = [
  { name: "Research Lab", width: "w-32" },
  { name: "Gov Agency", width: "w-28" },
  { name: "Tech Startup", width: "w-36" },
  { name: "University", width: "w-32" },
  { name: "Enterprise", width: "w-28" },
];

const stats = [
  { label: "Avg. prototype → pilot", value: "< 8 weeks" },
  { label: "Security-first", value: "deployments" },
  { label: "Explainable, auditable", value: "workflows" },
];

export const LogoRow = () => {
  return (
    <section className="py-16 sm:py-20 border-y border-border/50 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center space-y-8 sm:space-y-12"
        >
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-muted-foreground">
            Trusted by innovators in government, research, and emerging tech
          </h2>

          {/* Logo placeholders */}
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12">
            {logos.map((logo, index) => (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, rotate: [0, -2, 2, 0] }}
                className={`${logo.width} h-12 rounded-lg bg-muted/50 border border-border/50 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer`}
              >
                <span className="text-xs font-medium text-muted-foreground">
                  {logo.name}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 pt-6 sm:pt-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                viewport={{ once: true }}
                className="space-y-2"
                whileHover={{ y: -5 }}
              >
                <motion.div 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px hsl(var(--primary) / 0.3)" }}
                >
                  <span className="text-sm font-semibold text-primary">
                    {stat.value}
                  </span>
                </motion.div>
                <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
