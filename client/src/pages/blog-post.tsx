import { useQuery } from "@tanstack/react-query";
import { Link, useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Helmet } from "react-helmet";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import type { BlogPost } from "@shared/schema";

export default function BlogPostPage() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const postId = params.id;

  const { data: post, isLoading, isError } = useQuery<BlogPost>({
    queryKey: [`/api/blog/${postId}`],
    enabled: !!postId,
  });

  if (isError) {
    return (
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
        <p className="text-xl text-gray-600 mb-8">
          The blog post you're looking for doesn't exist or has been removed.
        </p>
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white" 
          onClick={() => setLocation("/blog")}
        >
          Back to Blog
        </Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post ? `${post.title} | SecurityElla Blog` : 'Loading Post... | SecurityElla Blog'}</title>
        <meta name="description" content={post?.content.substring(0, 150) || "Loading blog post..."} />
      </Helmet>

      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Button 
            variant="outline"
            className="mb-6 flex items-center gap-2 border-blue-200 text-blue-600 hover:bg-blue-50"
            onClick={() => setLocation("/blog")}
          >
            <ArrowLeft size={18} /> Back to All Posts
          </Button>

          {isLoading ? (
            <>
              <Skeleton className="h-8 w-3/4 mb-4" />
              <div className="flex gap-4 mb-8">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="w-full h-64 mb-8" />
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </>
          ) : post ? (
            <article className="max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
              
              <div className="flex flex-wrap gap-4 text-gray-600 mb-8">
                <span className="flex items-center">By {post.author}</span>
                <span className="flex items-center">
                  {post.createdAt && format(new Date(post.createdAt), 'MMMM dd, yyyy')}
                </span>
              </div>

              {post.imagePath && (
                <div className="w-full mb-8 rounded-lg overflow-hidden shadow-md">
                  <img 
                    src={post.imagePath} 
                    alt={post.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}

              <div className="prose prose-blue lg:prose-lg max-w-none">
                {post.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
              
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Share this article</h3>
                <div className="flex gap-4">
                  <Button 
                    variant="outline" 
                    className="border-blue-200 text-blue-600 hover:bg-blue-50"
                    onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank')}
                  >
                    Twitter
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-blue-200 text-blue-600 hover:bg-blue-50"
                    onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
                  >
                    LinkedIn
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-blue-200 text-blue-600 hover:bg-blue-50"
                    onClick={() => window.open(`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(`Check out this article: ${window.location.href}`)}`, '_blank')}
                  >
                    Email
                  </Button>
                </div>
              </div>
            </article>
          ) : null}
        </div>
      </div>
    </>
  );
}