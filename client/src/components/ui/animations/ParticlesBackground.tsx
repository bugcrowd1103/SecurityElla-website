import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
}

const ParticlesBackground = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  // Generate random particles
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    // Set initial dimensions
    updateDimensions();
    
    // Add resize listener
    window.addEventListener('resize', updateDimensions);
    
    // Generate particles
    const numParticles = Math.min(80, Math.floor(window.innerWidth * window.innerHeight / 8000));
    const newParticles: Particle[] = [];
    
    for (let i = 0; i < numParticles; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 3 + 1,
        color: Math.random() > 0.5 ? "#64ffda" : "#38b2ff",
        speedX: (Math.random() - 0.5) * 1,
        speedY: (Math.random() - 0.5) * 1
      });
    }
    
    setParticles(newParticles);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);
  
  // Animation loop
  useEffect(() => {
    if (particles.length === 0 || !dimensions.width) return;
    
    const animationId = requestAnimationFrame(() => {
      setParticles(particles.map(particle => {
        // Update position
        let newX = particle.x + particle.speedX;
        let newY = particle.y + particle.speedY;
        
        // Bounce off edges
        if (newX <= 0 || newX >= dimensions.width) {
          particle.speedX *= -1;
          newX = particle.x + particle.speedX;
        }
        
        if (newY <= 0 || newY >= dimensions.height) {
          particle.speedY *= -1;
          newY = particle.y + particle.speedY;
        }
        
        return {
          ...particle,
          x: newX,
          y: newY
        };
      }));
    });
    
    return () => cancelAnimationFrame(animationId);
  }, [particles, dimensions]);
  
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full z-0 opacity-20"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            x: particle.x,
            y: particle.y
          }}
          animate={{
            x: particle.x,
            y: particle.y
          }}
          transition={{
            duration: 0.5,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

export default ParticlesBackground;
