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
      className="bg-white rounded-xl overflow-hidden shadow-lg transition duration-300 ease-in-out hover:shadow-xl hover:transform hover:-translate-y-1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
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
          <Link href={`/courses/${course.id}`}>
            <a className="text-blue-600 hover:text-blue-800 transition duration-300 flex items-center">
              View Details <i className="fas fa-arrow-right ml-2"></i>
            </a>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
