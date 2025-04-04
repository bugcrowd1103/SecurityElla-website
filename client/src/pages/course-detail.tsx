import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet";
import { ArrowLeft, Clock, DollarSign, Layers, Award, Flag } from "lucide-react";
import type { Course } from "@shared/schema";

export default function CourseDetail() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const courseId = params.id;

  const { data: course, isLoading, isError } = useQuery<Course>({
    queryKey: [`/api/courses/${courseId}`],
    enabled: !!courseId,
  });

  if (isError) {
    return (
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Course Not Found</h1>
        <p className="text-xl text-gray-600 mb-8">
          The course you're looking for doesn't exist or has been removed.
        </p>
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white" 
          onClick={() => setLocation("/courses")}
        >
          Browse All Courses
        </Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{course ? `${course.title} | SecurityElla Courses` : 'Loading Course... | SecurityElla Courses'}</title>
        <meta name="description" content={course?.description || "Loading course details..."} />
      </Helmet>

      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <Button 
          variant="outline"
          className="mb-6 flex items-center gap-2 border-blue-200 text-blue-600 hover:bg-blue-50"
          onClick={() => setLocation("/courses")}
        >
          <ArrowLeft size={18} /> Back to All Courses
        </Button>

        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Skeleton className="h-8 w-3/4 mb-4" />
              <Skeleton className="h-6 w-1/2 mb-6" />
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
            <div className="lg:col-span-1">
              <Skeleton className="h-80 w-full rounded-lg" />
            </div>
          </div>
        ) : course ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{course.title}</h1>
              
              <div className="flex flex-wrap gap-3 mb-6">
                <Badge variant="outline" className="flex items-center gap-1 bg-blue-50 text-blue-700 border-blue-200 px-3 py-1">
                  <Layers size={16} /> {course.level}
                </Badge>
                {course.duration && (
                  <Badge variant="outline" className="flex items-center gap-1 bg-green-50 text-green-700 border-green-200 px-3 py-1">
                    <Clock size={16} /> {course.duration}
                  </Badge>
                )}
                {course.featured && (
                  <Badge variant="outline" className="flex items-center gap-1 bg-amber-50 text-amber-700 border-amber-200 px-3 py-1">
                    <Award size={16} /> Featured Course
                  </Badge>
                )}
              </div>

              <div className="prose prose-blue lg:prose-lg max-w-none mb-10">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Course Overview</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {course.description}
                </p>

                <h2 className="text-2xl font-semibold text-gray-900 mb-4">What You'll Learn</h2>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="bg-blue-100 rounded-full p-1 mr-3 mt-1">
                      <Flag className="h-4 w-4 text-blue-600" />
                    </span>
                    <span>Understand fundamental cybersecurity concepts and terminology</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 rounded-full p-1 mr-3 mt-1">
                      <Flag className="h-4 w-4 text-blue-600" />
                    </span>
                    <span>Learn about common threats and vulnerabilities in modern systems</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 rounded-full p-1 mr-3 mt-1">
                      <Flag className="h-4 w-4 text-blue-600" />
                    </span>
                    <span>Master defensive techniques and security best practices</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 rounded-full p-1 mr-3 mt-1">
                      <Flag className="h-4 w-4 text-blue-600" />
                    </span>
                    <span>Gain practical skills through hands-on exercises and real-world scenarios</span>
                  </li>
                </ul>

                <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">Course Requirements</h2>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="bg-blue-100 rounded-full p-1 mr-3 mt-1">
                      <Flag className="h-4 w-4 text-blue-600" />
                    </span>
                    <span>Basic understanding of computer systems and networks</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 rounded-full p-1 mr-3 mt-1">
                      <Flag className="h-4 w-4 text-blue-600" />
                    </span>
                    <span>Access to a computer with internet connection</span>
                  </li>
                  {course.level === "Intermediate" || course.level === "Advanced" ? (
                    <li className="flex items-start">
                      <span className="bg-blue-100 rounded-full p-1 mr-3 mt-1">
                        <Flag className="h-4 w-4 text-blue-600" />
                      </span>
                      <span>Prior knowledge of basic cybersecurity principles is recommended</span>
                    </li>
                  ) : null}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24 border-blue-100 overflow-hidden">
                {course.imagePath && (
                  <div className="w-full h-48 overflow-hidden">
                    <img 
                      src={course.imagePath} 
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardContent className="pt-6">
                  <div className="mb-6">
                    <p className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                      <DollarSign className="h-6 w-6 text-green-600" /> {course.priceUsd}
                      <span className="text-lg text-gray-500 font-normal">USD</span>
                    </p>
                    <p className="text-lg text-gray-600 mt-1">
                      ₹{course.priceInr} INR
                    </p>
                  </div>

                  <div className="space-y-4">
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => {
                        // In a real app, this would redirect to enrollment page or open a modal
                        alert('Enrollment functionality will be implemented in the future!');
                      }}
                    >
                      Enroll Now
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full border-blue-200 text-blue-600 hover:bg-blue-50"
                      onClick={() => {
                        // In a real app, this would add the course to user's wishlist
                        alert('Wishlist functionality will be implemented in the future!');
                      }}
                    >
                      Add to Wishlist
                    </Button>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-3">Course Includes:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center text-sm text-gray-600">
                        <span className="bg-blue-100 rounded-full p-1 mr-3">
                          <Clock className="h-3 w-3 text-blue-600" />
                        </span>
                        {course.duration || "Self-paced learning"}
                      </li>
                      <li className="flex items-center text-sm text-gray-600">
                        <span className="bg-blue-100 rounded-full p-1 mr-3">
                          <Layers className="h-3 w-3 text-blue-600" />
                        </span>
                        {course.level} level
                      </li>
                      <li className="flex items-center text-sm text-gray-600">
                        <span className="bg-blue-100 rounded-full p-1 mr-3">
                          <Award className="h-3 w-3 text-blue-600" />
                        </span>
                        Completion certificate
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}