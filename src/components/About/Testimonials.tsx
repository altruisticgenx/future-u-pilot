import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";
import { useState, useEffect } from "react";

const testimonials = [
  {
    name: "Dr. Sarah Chen",
    role: "Professor of Quantum Physics, Penn State",
    quote: "The quantum education initiative has transformed how we teach. Our students now have hands-on access to real quantum hardware.",
    rating: 5,
  },
  {
    name: "Michael Rodriguez",
    role: "CTO, Pennsylvania Energy Corp",
    quote: "The grid optimization pilot delivered 22% energy savings in just 6 months. This is the future of infrastructure management.",
    rating: 5,
  },
  {
    name: "Rep. Lisa Thompson",
    role: "Pennsylvania State Legislature",
    quote: "This initiative proves that quantum computing isn't just theory—it's creating jobs and economic opportunity right here in Pennsylvania.",
    rating: 5,
  },
  {
    name: "Dr. James Foster",
    role: "Director of Research, Healthcare Innovation Lab",
    quote: "Quantum-accelerated drug discovery is cutting our research timelines by 40%. Lives will be saved because of this work.",
    rating: 5,
  },
];

export const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">What Our Partners Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from the educators, innovators, and leaders driving Pennsylvania's quantum future
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{
                opacity: index === activeIndex ? 1 : 0,
                scale: index === activeIndex ? 1 : 0.95,
                display: index === activeIndex ? "block" : "none",
              }}
              transition={{ duration: 0.5 }}
            >
              <Card className="backdrop-blur-md bg-card/80 border-2 border-primary/20 shadow-2xl">
                <CardContent className="p-8 sm:p-12 space-y-6">
                  <div className="flex justify-center">
                    <Quote className="h-12 w-12 text-primary/30" />
                  </div>

                  <p className="text-xl sm:text-2xl text-center leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>

                  <div className="flex justify-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>

                  <div className="text-center">
                    <div className="font-bold text-lg">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === activeIndex ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
