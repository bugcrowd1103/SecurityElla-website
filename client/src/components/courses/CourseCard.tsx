import React from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Course } from "@shared/schema";
import { ArrowRight } from "lucide-react";

interface CourseCardProps {
  course: Course;
  index: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, index }) => {
  const [, setLocation] = useLocation();

  const handleCardClick = () => {
    setLocation(`/courses/${course.id}`);
  };

  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-lg transition duration-300 ease-in-out hover:shadow-xl hover:transform hover:-translate-y-1 cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onClick={handleCardClick}
    >
      {course.imagePath && (
        <div className="w-full h-40 overflow-hidden">
          <img 
            src={course.imagePath} 
            alt={course.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <span className="inline-block bg-blue-100 text-blue-600 rounded-full px-3 py-1 text-sm font-medium mb-4">
          {course.level}
        </span>
        <h3 className="text-xl font-bold font-['Poppins',sans-serif] text-gray-800">{course.title}</h3>
        <p className="mt-3 text-gray-600 line-clamp-3">{course.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <div>
            <span className="text-blue-600 font-bold text-lg">₹{course.priceInr.toLocaleString()}</span>
            <span className="text-gray-500 text-sm"> / ${course.priceUsd}</span>
          </div>
          <div className="text-blue-600 hover:text-blue-800 transition duration-300 flex items-center">
            View Details <ArrowRight className="ml-1" size={16} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
