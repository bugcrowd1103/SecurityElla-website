import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Helmet } from "react-helmet";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { BlogPost } from "@shared/schema";

export default function Blog() {
  const [, setLocation] = useLocation();

  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  const formatDate = (dateString: Date | string | null) => {
    if (!dateString) return 'Unknown date';
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <>
      <Helmet>
        <title>Blog | SecurityElla</title>
        <meta name="description" content="Latest articles and insights on cybersecurity, trends, threats, and best practices from SecurityElla experts." />
      </Helmet>

      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">SecurityElla Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Latest articles and insights on cybersecurity, trends, threats, and best practices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Skeleton loaders for blog posts
            Array(6)
              .fill(null)
              .map((_, i) => (
                <Card key={i} className="border-blue-100">
                  <Skeleton className="h-48 w-full rounded-t-lg" />
                  <CardContent className="p-6">
                    <div className="flex flex-wrap gap-3 mb-3">
                      <Skeleton className="h-5 w-24" />
                    </div>
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-2/3 mb-4" />
                    <div className="flex justify-between items-center mt-4">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-9 w-24" />
                    </div>
                  </CardContent>
                </Card>
              ))
          ) : posts && posts.length > 0 ? (
            posts.map((post, index) => (
              <Card 
                key={post.id} 
                className="border-blue-100 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg"
              >
                {post.imagePath && (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={post.imagePath} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                )}
                <CardContent className="p-6 flex-grow flex flex-col">
                  <div className="flex flex-wrap gap-3 mb-3">
                    <span className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full flex items-center">
                      <Calendar size={14} className="mr-1" /> {formatDate(post.createdAt)}
                    </span>
                    {post.readTime && (
                      <span className="text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full flex items-center">
                        <Clock size={14} className="mr-1" /> {post.readTime} min read
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">{post.summary || post.content.substring(0, 120) + '...'}</p>
                  <Button 
                    variant="outline"
                    className="mt-2 border-blue-200 text-blue-600 hover:bg-blue-50 self-start flex items-center"
                    onClick={() => setLocation(`/blog/${post.id}`)}
                  >
                    Read More <ArrowRight size={16} className="ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <h3 className="text-xl font-medium text-gray-700 mb-4">No blog posts found</h3>
              <p className="text-gray-600 mb-6">Check back soon for new content!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}