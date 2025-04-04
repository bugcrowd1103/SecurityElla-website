import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Course } from "@shared/schema";

const FeaturedCourses = () => {
  const { toast } = useToast();
  
  const { data: courses, isLoading, error } = useQuery<Course[]>({
    queryKey: ['/api/courses/featured'],
  });
  
  if (error) {
    toast({
      title: "Error loading courses",
      description: "Please try again later",
      variant: "destructive",
    });
  }
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div id="featured-courses" className="bg-[#121212] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl font-bold font-['Poppins',sans-serif] text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Featured Courses
          </motion.h2>
          <motion.div 
            className="h-1 w-20 bg-[#64ffda] mx-auto mt-4 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          <motion.p 
            className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Start your cybersecurity journey with our most popular courses designed for all skill levels.
          </motion.p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-[#1e1e1e] rounded-xl overflow-hidden shadow-lg h-[350px] animate-pulse">
                <div className="h-48 bg-gray-700"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
                  <div className="h-8 bg-gray-700 rounded w-1/3 mt-4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {courses?.map((course) => (
              <motion.div 
                key={course.id} 
                className="bg-[#1e1e1e] rounded-xl overflow-hidden shadow-lg transition duration-300 ease-in-out hover:shadow-[0_0_20px_rgba(100,255,218,0.2)] hover:transform hover:-translate-y-1"
                variants={item}
              >
                <div className="h-48 overflow-hidden bg-[#2d2d2d]">
                  {/* Course image would go here in a real implementation */}
                  <div className="w-full h-full flex items-center justify-center text-[#64ffda] text-6xl">
                    <i className={
                      course.title.includes("Ethical") ? "fas fa-user-secret" :
                      course.title.includes("Penetration") ? "fas fa-laptop-code" :
                      "fas fa-shield-alt"
                    }></i>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold font-['Poppins',sans-serif] text-white">
                      {course.title}
                    </h3>
                    <span className="bg-[#172a46] text-[#64ffda] rounded-full px-3 py-1 text-sm font-medium">
                      {course.level}
                    </span>
                  </div>
                  <p className="mt-3 text-gray-300 line-clamp-2">{course.description}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <div>
                      <span className="text-[#64ffda] font-bold text-lg">₹{course.priceInr.toLocaleString()}</span>
                      <span className="text-gray-400 text-sm"> / ${course.priceUsd}</span>
                    </div>
                    <Link href={`/courses/${course.id}`}>
                      <a className="text-[#38b2ff] hover:text-[#7ad1ff] transition duration-300 flex items-center">
                        View Details <i className="fas fa-arrow-right ml-2"></i>
                      </a>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        <div className="text-center mt-10">
          <Link href="/courses">
            <Button 
              variant="outline"
              className="inline-block px-8 py-3 border border-[#64ffda] text-base font-medium rounded-md text-[#64ffda] bg-transparent hover:bg-[#172a46] shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
            >
              View All Courses
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCourses;
