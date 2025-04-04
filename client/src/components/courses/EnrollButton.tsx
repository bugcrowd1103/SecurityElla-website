import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Course } from '@shared/schema';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Loader2 } from 'lucide-react';

interface EnrollButtonProps {
  course: Course;
  userId: number | null;
  isEnrolled?: boolean;
  onSuccess?: () => void;
}

export function EnrollButton({ course, userId, isEnrolled = false, onSuccess }: EnrollButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleEnrollClick = () => {
    if (!userId) {
      toast({
        title: "Login Required",
        description: "Please log in to enroll in this course",
        variant: "destructive",
      });
      setLocation('/login');
      return;
    }

    setIsDialogOpen(true);
  };

  const handleFreeEnrollment = async () => {
    if (!userId) return;
    
    setIsLoading(true);
    try {
      // For free courses, directly enroll without payment
      const response = await apiRequest('POST', `/api/courses/${course.id}/enroll`, { userId });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to enroll");
      }
      
      toast({
        title: "Enrollment Successful!",
        description: `You have been enrolled in "${course.title}".`,
      });
      
      if (onSuccess) onSuccess();
      setIsDialogOpen(false);
    } catch (error: any) {
      toast({
        title: "Enrollment Failed",
        description: error.message || "An error occurred during enrollment",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaidEnrollment = () => {
    if (!userId) return;
    
    // For paid courses, redirect to checkout
    setIsDialogOpen(false);
    setLocation(`/checkout?courseId=${course.id}&userId=${userId}`);
  };

  if (isEnrolled) {
    return (
      <Button variant="outline" disabled className="w-full">
        Already Enrolled
      </Button>
    );
  }

  return (
    <>
      <Button 
        className="w-full" 
        onClick={handleEnrollClick}
      >
        Enroll Now
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enroll in {course.title}</DialogTitle>
            <DialogDescription>
              {course.priceUsd === 0 
                ? "This is a free course. You can enroll immediately." 
                : `The price for this course is $${course.priceUsd}. Proceed to payment?`}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <p className="text-sm text-gray-500">
              {course.priceUsd === 0 
                ? "By enrolling, you'll get immediate access to all course materials."
                : "You'll be redirected to our secure payment page. After payment, you'll get immediate access to all course materials."}
            </p>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            {course.priceUsd === 0 ? (
              <Button onClick={handleFreeEnrollment} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enrolling...
                  </>
                ) : (
                  "Enroll Now"
                )}
              </Button>
            ) : (
              <Button onClick={handlePaidEnrollment}>
                Proceed to Payment
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}