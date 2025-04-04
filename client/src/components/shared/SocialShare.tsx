import React from 'react';
import { 
  Twitter, 
  Facebook, 
  Linkedin, 
  Mail, 
  MessageCircle, 
  Link as LinkIcon,
  Share2
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface SocialShareProps {
  title: string;
  text: string;
  url?: string;
  className?: string;
  variant?: 'default' | 'compact' | 'icon';
}

const SocialShare: React.FC<SocialShareProps> = ({ 
  title, 
  text, 
  url = window.location.href,
  className = '',
  variant = 'default'
}) => {
  const { toast } = useToast();
  
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);
  const encodedTitle = encodeURIComponent(title);
  
  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedText}%0A%0A${encodedUrl}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url).then(() => {
      toast({
        title: "Link copied!",
        description: "The link has been copied to your clipboard.",
        duration: 3000,
      });
    }).catch(() => {
      toast({
        title: "Failed to copy",
        description: "Could not copy the link to your clipboard.",
        variant: "destructive",
        duration: 3000,
      });
    });
  };
  
  const shareToSocialMedia = (platform: string) => {
    const link = shareLinks[platform as keyof typeof shareLinks];
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  if (variant === 'icon') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className={`rounded-full hover:bg-blue-50 hover:text-blue-600 ${className}`}
            aria-label="Share"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onClick={() => shareToSocialMedia('twitter')} className="cursor-pointer">
            <Twitter className="mr-2 h-4 w-4" /> Share on Twitter
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => shareToSocialMedia('facebook')} className="cursor-pointer">
            <Facebook className="mr-2 h-4 w-4" /> Share on Facebook
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => shareToSocialMedia('linkedin')} className="cursor-pointer">
            <Linkedin className="mr-2 h-4 w-4" /> Share on LinkedIn
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => shareToSocialMedia('whatsapp')} className="cursor-pointer">
            <MessageCircle className="mr-2 h-4 w-4" /> Share on WhatsApp
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => shareToSocialMedia('email')} className="cursor-pointer">
            <Mail className="mr-2 h-4 w-4" /> Share via Email
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCopyLink} className="cursor-pointer">
            <LinkIcon className="mr-2 h-4 w-4" /> Copy Link
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-1 ${className}`}>
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full hover:bg-blue-50 hover:text-blue-600" 
          onClick={() => shareToSocialMedia('twitter')}
          aria-label="Share on Twitter"
        >
          <Twitter className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full hover:bg-blue-50 hover:text-blue-600" 
          onClick={() => shareToSocialMedia('facebook')}
          aria-label="Share on Facebook"
        >
          <Facebook className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full hover:bg-blue-50 hover:text-blue-600" 
          onClick={() => shareToSocialMedia('linkedin')}
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full hover:bg-blue-50 hover:text-blue-600" 
          onClick={handleCopyLink}
          aria-label="Copy Link"
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <p className="text-sm font-medium text-gray-700">Share this achievement:</p>
      <div className="flex flex-wrap gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="rounded-full border-gray-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600" 
          onClick={() => shareToSocialMedia('twitter')}
        >
          <Twitter className="mr-2 h-4 w-4" /> Twitter
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="rounded-full border-gray-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600" 
          onClick={() => shareToSocialMedia('facebook')}
        >
          <Facebook className="mr-2 h-4 w-4" /> Facebook
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="rounded-full border-gray-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600" 
          onClick={() => shareToSocialMedia('linkedin')}
        >
          <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="rounded-full border-gray-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600" 
          onClick={() => shareToSocialMedia('whatsapp')}
        >
          <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="rounded-full border-gray-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600" 
          onClick={() => shareToSocialMedia('email')}
        >
          <Mail className="mr-2 h-4 w-4" /> Email
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="rounded-full border-gray-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600" 
          onClick={handleCopyLink}
        >
          <LinkIcon className="mr-2 h-4 w-4" /> Copy Link
        </Button>
      </div>
    </div>
  );
};

export default SocialShare;