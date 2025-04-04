import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import type { BlogPost } from "@shared/schema";

export default function Blog() {
  const { data: blogPosts, isLoading, isError } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  return (
    <>
      <Helmet>
        <title>Blog | SecurityElla</title>
        <meta name="description" content="Read the latest cybersecurity insights, tips, and trends on the SecurityElla blog." />
      </Helmet>

      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">SecurityElla Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest cybersecurity insights, tips, and industry trends.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden flex flex-col h-full">
                <div className="w-full h-48 bg-gray-200">
                  <Skeleton className="w-full h-full" />
                </div>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent className="flex-grow">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-10 w-1/2" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-12">
            <h3 className="text-xl text-gray-700 mb-4">
              There was an error loading the blog posts.
            </h3>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        ) : blogPosts && blogPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden flex flex-col h-full border border-gray-200 transition duration-300 hover:shadow-lg">
                {post.imagePath && (
                  <div className="w-full h-48 overflow-hidden">
                    <img 
                      src={post.imagePath} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl text-blue-600">{post.title}</CardTitle>
                  <CardDescription>
                    <div className="flex justify-between mt-2 text-gray-500 text-sm">
                      <span>By {post.author}</span>
                      <span>{post.createdAt ? format(new Date(post.createdAt), 'MMMM dd, yyyy') : ''}</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-gray-700 line-clamp-3">
                    {post.content.substring(0, 150)}
                    {post.content.length > 150 ? '...' : ''}
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href={`/blog/${post.id}`}>
                    <Button 
                      variant="outline" 
                      className="text-blue-600 border-blue-600 hover:bg-blue-50"
                    >
                      Read More
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl text-gray-700 mb-4">
              No blog posts available at the moment.
            </h3>
            <p className="text-gray-600">
              Please check back later for new cybersecurity insights.
            </p>
          </div>
        )}
      </div>
    </>
  );
}