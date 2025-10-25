import { motion } from 'framer-motion';
import { openProjects } from '@/data/openProjects';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Users, ExternalLink } from 'lucide-react';

export default function OpenProjectsGrid() {
  const colorMap = {
    red: 'from-red-500/20 to-red-600/10 border-red-500/30',
    yellow: 'from-yellow-500/20 to-yellow-600/10 border-yellow-500/30',
    pink: 'from-pink-500/20 to-pink-600/10 border-pink-500/30',
    purple: 'from-purple-500/20 to-purple-600/10 border-purple-500/30'
  };

  return (
    <section className="py-16 sm:py-20 md:py-24" aria-labelledby="projects-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 id="projects-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Open Projects{' '}
            <span className="text-muted-foreground">(Contribute Today)</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real code, real pilots, real impact. All repositories are public.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {openProjects.map((project, index) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -3, scale: 1.01 }}
                className={`relative p-6 rounded-xl border bg-gradient-to-br backdrop-blur-sm transition-all ${colorMap[project.color]}`}
              >
                {project.status === 'active' && (
                  <div className="absolute top-4 right-4">
                    <Badge variant="default" className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-xs">
                      Live
                    </Badge>
                  </div>
                )}
                
                <div className="mb-4 p-3 rounded-lg bg-background/50 w-fit">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  {project.name}
                </h3>

                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.techStack.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5" />
                    <span>{project.stars}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    <span>{project.contributors}</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  asChild
                >
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    View Repo
                    <ExternalLink className="ml-2 h-3.5 w-3.5" />
                  </a>
                </Button>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" asChild>
            <a href="https://github.com/pa-quantum-lobby" target="_blank" rel="noopener noreferrer">
              See All Repos on GitHub
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
