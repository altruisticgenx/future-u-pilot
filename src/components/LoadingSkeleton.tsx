export const HeroSkeleton = () => (
  <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/10 to-background animate-pulse">
    <div className="container mx-auto px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="h-12 bg-primary/20 rounded-lg w-3/4 mx-auto" />
        <div className="h-6 bg-primary/10 rounded-lg w-full" />
        <div className="h-6 bg-primary/10 rounded-lg w-5/6 mx-auto" />
        <div className="flex gap-4 justify-center mt-8">
          <div className="h-10 bg-primary/20 rounded-lg w-32" />
          <div className="h-10 bg-primary/20 rounded-lg w-32" />
        </div>
      </div>
    </div>
  </section>
);

export const SectionSkeleton = () => (
  <div className="py-20 animate-pulse">
    <div className="container mx-auto px-4">
      <div className="space-y-4">
        <div className="h-8 bg-primary/10 rounded w-1/3 mx-auto" />
        <div className="h-4 bg-primary/10 rounded w-2/3 mx-auto" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-primary/10 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  </div>
);
