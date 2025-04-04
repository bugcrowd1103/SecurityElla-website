import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import CourseFilter from "@/components/courses/CourseFilter";
import CourseCard from "@/components/courses/CourseCard";
import CoursePagination from "@/components/courses/CoursePagination";
import { Course } from "@shared/schema";
import { Helmet } from "react-helmet";

const COURSES_PER_PAGE = 6;

const Courses = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [filters, setFilters] = useState({
    search: "",
    level: "",
    priceRange: "",
  });

  const { data: courses, isLoading, error } = useQuery<Course[]>({
    queryKey: ['/api/courses'],
  });

  // Apply filters and update filtered courses
  useEffect(() => {
    if (!courses) return;
    
    let result = [...courses];
    
    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        course => 
          course.title.toLowerCase().includes(searchLower) || 
          course.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply level filter
    if (filters.level && filters.level !== 'all') {
      result = result.filter(course => course.level === filters.level);
    }
    
    // Apply price range filter
    if (filters.priceRange && filters.priceRange !== 'all') {
      switch (filters.priceRange) {
        case "0-10000":
          result = result.filter(course => course.priceInr <= 10000);
          break;
        case "10000-15000":
          result = result.filter(course => course.priceInr > 10000 && course.priceInr <= 15000);
          break;
        case "15000+":
          result = result.filter(course => course.priceInr > 15000);
          break;
      }
    }
    
    setFilteredCourses(result);
    setCurrentPage(1); // Reset to page 1 when filters change
  }, [courses, filters]);

  // Total pages based on filtered courses
  const totalPages = Math.ceil((filteredCourses?.length || 0) / COURSES_PER_PAGE);

  // Get current page's courses
  const currentCourses = filteredCourses?.slice(
    (currentPage - 1) * COURSES_PER_PAGE,
    currentPage * COURSES_PER_PAGE
  );

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Helmet>
        <title>Our Courses | SecurityElla</title>
        <meta name="description" content="Advance your cybersecurity career with our comprehensive range of specialized courses." />
      </Helmet>
      <section id="courses-section" className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl font-bold font-['Poppins',sans-serif] text-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Our Courses
            </motion.h2>
            <motion.div 
              className="h-1 w-20 bg-blue-600 mx-auto mt-4 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 80 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
            <motion.p 
              className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Advance your cybersecurity career with our comprehensive range of specialized courses.
            </motion.p>
          </div>
          
          <CourseFilter onFilterChange={handleFilterChange} />
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden shadow-lg h-[250px] animate-pulse">
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                    <div className="h-8 bg-gray-200 rounded w-1/3 mt-4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center text-red-500">
              <p>Error loading courses. Please try again later.</p>
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="text-center text-gray-600 py-12">
              <i className="fas fa-search text-5xl mb-4 text-blue-600"></i>
              <h3 className="text-xl font-bold mb-2">No courses found</h3>
              <p>Try adjusting your search filters</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentCourses.map((course, index) => (
                  <CourseCard key={course.id} course={course} index={index} />
                ))}
              </div>
              
              <CoursePagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Courses;
