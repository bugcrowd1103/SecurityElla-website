import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import ParticlesBackground from "@/components/ui/animations/ParticlesBackground";

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-b from-blue-50 to-white min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      <div className="max-w-4xl mx-auto text-center z-10">
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl font-bold font-['Poppins',sans-serif] tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="block text-gray-800">Master</span>
          <span className="block text-blue-600 mt-2">Cybersecurity</span>
          <span className="block text-gray-800 mt-2">with Experts</span>
        </motion.h1>
        
        <motion.p 
          className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          SecurityElla provides cutting-edge cybersecurity services and comprehensive training courses designed to protect your digital assets and advance your career.
        </motion.p>
        
        <motion.div 
          className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link href="/courses">
            <Button 
              className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1"
              size="lg"
            >
              Explore Courses
            </Button>
          </Link>
          
          <Link href="/services">
            <Button 
              variant="outline" 
              className="px-8 py-3 border border-blue-600 text-base font-medium rounded-md text-blue-600 bg-transparent hover:bg-blue-50 shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1"
              size="lg"
            >
              Our Services
            </Button>
          </Link>
        </motion.div>
      </div>
      
      {/* Animated scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <motion.a 
          href="#featured-courses" 
          className="text-blue-600 text-3xl"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('featured-courses')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <i className="fas fa-chevron-down"></i>
        </motion.a>
      </motion.div>
    </div>
  );
};

export default Hero;
