import React from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Course } from "@shared/schema";

interface CourseCardProps {
  course: Course;
  index: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, index }) => {
  return (
    <motion.div
      className="bg-[#1e1e1e] rounded-xl overflow-hidden shadow-lg transition duration-300 ease-in-out hover:shadow-[0_0_20px_rgba(100,255,218,0.2)] hover:transform hover:-translate-y-1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <div className="p-6">
        <span className="inline-block bg-[#172a46] text-[#64ffda] rounded-full px-3 py-1 text-sm font-medium mb-4">
          {course.level}
        </span>
        <h3 className="text-xl font-bold font-['Poppins',sans-serif] text-white">{course.title}</h3>
        <p className="mt-3 text-gray-300 line-clamp-3">{course.description}</p>
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
  );
};

export default CourseCard;
