import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Helmet } from "react-helmet";
import { Calendar, Clock, ArrowLeft, User } from "lucide-react";
import type { BlogPost } from "@shared/schema";

export default function BlogPostPage() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const postId = params.id;

  const { data: post, isLoading, isError } = useQuery<BlogPost>({
    queryKey: [`/api/blog/${postId}`],
    enabled: !!postId,
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

  if (isError) {
    return (
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
        <p className="text-xl text-gray-600 mb-8">
          The article you're looking for doesn't exist or has been removed.
        </p>
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white" 
          onClick={() => setLocation("/blog")}
        >
          Return to Blog
        </Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post ? `${post.title} | SecurityElla Blog` : 'Loading Article... | SecurityElla Blog'}</title>
        <meta name="description" content={post?.summary || "Loading article..."} />
      </Helmet>

      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <Button 
          variant="outline"
          className="mb-6 flex items-center gap-2 border-blue-200 text-blue-600 hover:bg-blue-50"
          onClick={() => setLocation("/blog")}
        >
          <ArrowLeft size={18} /> Back to Blog
        </Button>

        {isLoading ? (
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-8 w-3/4 mb-4" />
            <div className="flex gap-4 mb-8">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-32" />
            </div>
            <Skeleton className="h-64 w-full mb-8 rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ) : post ? (
          <article className="max-w-4xl mx-auto">
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
                <div className="flex items-center">
                  <User size={16} className="mr-2 text-blue-600" />
                  <span>{post.author || "SecurityElla Team"}</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2 text-blue-600" />
                  <span>{formatDate(post.createdAt)}</span>
                </div>
                {post.readTime && (
                  <div className="flex items-center">
                    <Clock size={16} className="mr-2 text-blue-600" />
                    <span>{post.readTime} min read</span>
                  </div>
                )}
              </div>

              {post.imagePath && (
                <div className="mb-8 rounded-lg overflow-hidden shadow-md">
                  <img 
                    src={post.imagePath} 
                    alt={post.title} 
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}
            </header>

            <div className="prose prose-blue lg:prose-lg max-w-none">
              {post.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Share this article</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                  Share on Twitter
                </Button>
                <Button variant="outline" size="sm" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                  Share on LinkedIn
                </Button>
                <Button variant="outline" size="sm" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                  Share on Facebook
                </Button>
              </div>
            </div>
          </article>
        ) : null}
      </div>
    </>
  );
}