import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import { useRef, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Calendar, Sparkles, Video } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import * as THREE from 'three';

function QuantumSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1, 100, 200]} scale={2.5}>
        <MeshDistortMaterial
          color="#14b8a6"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

function ParticleField() {
  const points = useRef<THREE.Points>(null);
  
  const particlesCount = 1000;
  const positions = new Float32Array(particlesCount * 3);
  
  for (let i = 0; i < particlesCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#0e7490"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#14b8a6" intensity={0.5} />
      <QuantumSphere />
      <ParticleField />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </>
  );
}

export const Hero3D = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    contactSection?.scrollIntoView({ behavior: "smooth" });
  };

  const navigateToAbout = () => {
    window.location.href = "/about";
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      role="region"
      aria-labelledby="hero-heading"
    >
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-background">
        <Suspense fallback={null}>
          <Canvas
            camera={{ position: [0, 0, 5], fov: 75 }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 2]}
          >
            <Scene />
          </Canvas>
        </Suspense>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary))_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.03] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]" />

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 sm:space-y-8"
          >
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">
                Experiment status: active
              </span>
            </motion.div>

            {/* Headline */}
            <div className="space-y-3 sm:space-y-4">
              <h1 
                id="hero-heading"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              >
                <span className="block text-foreground mb-2">
                  <TypeAnimation
                    sequence={[
                      'Quantum Computing',
                      2000,
                      'AI Deployment',
                      2000,
                      'Policy Compliance',
                      2000,
                      'Security Migration',
                      2000,
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                    className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
                  />
                </span>
                <span className="text-xl sm:text-2xl md:text-3xl text-muted-foreground">
                  That Actually Works
                </span>
              </h1>
              
              <motion.p 
                className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                We help governments, businesses, and policymakers deploy quantum and AI solutions—practical, bold, and ahead of the curve.
              </motion.p>
            </div>

            {/* CTAs */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                onClick={scrollToContact}
                className="btn-3d-primary text-sm px-6 py-6 font-semibold w-full sm:w-auto flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
                size="lg"
              >
                <Calendar className="h-4 w-4" />
                Book Strategy Session
              </Button>
              
              <Button
                onClick={navigateToAbout}
                variant="outline"
                className="text-sm px-6 py-6 font-semibold w-full sm:w-auto flex items-center justify-center gap-2 border-primary/50 hover:bg-primary/10"
                size="lg"
              >
                <Sparkles className="h-4 w-4" />
                Learn More
              </Button>

              <Button
                onClick={() => window.open('https://drive.google.com/file/d/1vuiN0NYOvToHIxkqjSSFFEYLitv-zyK7/view?usp=sharing', '_blank')}
                variant="ghost"
                className="text-sm px-6 py-6 font-semibold w-full sm:w-auto flex items-center justify-center gap-2"
                size="lg"
              >
                <Video className="h-4 w-4" />
                Watch Demo
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-3 gap-4 pt-8 border-t border-border/50"
            >
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary">{'<8'}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Weeks to Pilot</div>
              </div>
              <div className="text-center border-x border-border/50">
                <div className="text-2xl sm:text-3xl font-bold text-primary">22%</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Energy Savings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary">10x</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Faster Discovery</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right column - 3D visualization */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative h-[400px] sm:h-[500px] lg:h-[600px]"
          >
            {/* Decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
