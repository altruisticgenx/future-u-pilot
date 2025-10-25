import { motion } from "framer-motion";
import { openProjects } from "@/data/openProjects";
import { Button } from "@/components/ui/button";
import { ExternalLink, Star, Users } from "lucide-react";

export const OpenProjectsGrid = () => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {openProjects.map((project, index) => {
        const Icon = project.icon;
        return (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -3, scale: 1.01 }}
            className="h-full"
          >
            <div className={`glass-card-3d rounded-xl p-4 h-full bg-gradient-to-br ${project.color} border border-primary/30 shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.18)] transition-all duration-300 flex flex-col`}>
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 rounded-lg bg-primary/15 border border-primary/25">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <span className={`rounded-full text-xs px-2 py-0.5 ${
                  project.status === 'active' 
                    ? 'bg-emerald-600/10 text-emerald-400 ring-1 ring-emerald-400/20' 
                    : project.status === 'pilot'
                    ? 'bg-blue-600/10 text-blue-400 ring-1 ring-blue-400/20'
                    : 'bg-purple-600/10 text-purple-400 ring-1 ring-purple-400/20'
                }`}>
                  {project.status}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-foreground mb-1">
                    {project.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary ring-1 ring-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    <span>{project.stars}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>{project.contributors}</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-4 hover-3d-lift"
                asChild
              >
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  View Repo
                  <ExternalLink className="w-3 h-3" />
                </a>
              </Button>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
