import { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Course } from '@shared/schema';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import { EnrollButton } from './EnrollButton';

const enrollmentFormSchema = z.object({
  fullName: z.string().min(3, { message: 'Name must be at least 3 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
});

type EnrollmentFormValues = z.infer<typeof enrollmentFormSchema>;

interface EnrollmentModalProps {
  course: Course;
  isOpen: boolean;
  onClose: () => void;
}

const EnrollmentModal = ({ course, isOpen, onClose }: EnrollmentModalProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userDetails, setUserDetails] = useState<{id: number; isEnrolled: boolean} | null>(null);

  // Mock user authentication - in a real app, this would be from auth context
  const { data: userData } = useQuery({
    queryKey: ['user'],
    // This is a placeholder - in a real app, this would fetch the current authenticated user
    queryFn: async () => {
      // Simulate fetching user data from session/localStorage
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        return JSON.parse(storedUser);
      }
      // For demo purposes, return a mock user
      return { id: 1, username: 'demouser', email: 'demo@example.com' };
    }
  });

  // Check if user is enrolled in this course
  const { data: enrollmentStatus } = useQuery({
    queryKey: [`/api/courses/${course.id}/enrollment-status`, userData?.id],
    enabled: !!userData?.id,
    queryFn: async () => {
      // In a real app, this would be an API call to check enrollment status
      try {
        const response = await fetch(`/api/courses/${course.id}/enrollment-status?userId=${userData.id}`);
        if (!response.ok) return { isEnrolled: false };
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error checking enrollment status:', error);
        return { isEnrolled: false };
      }
    }
  });

  // Set user details once data is loaded
  useEffect(() => {
    if (userData && enrollmentStatus) {
      setUserDetails({
        id: userData.id,
        isEnrolled: enrollmentStatus.isEnrolled
      });
    }
  }, [userData, enrollmentStatus]);

  const form = useForm<EnrollmentFormValues>({
    resolver: zodResolver(enrollmentFormSchema),
    defaultValues: {
      fullName: userData?.username || '',
      email: userData?.email || '',
      phone: '',
      agreeToTerms: false,
    },
  });

  const onSubmit = async (data: EnrollmentFormValues) => {
    setIsSubmitting(true);
    
    // In a real app, we might update the user profile with this information
    try {
      // For demo purposes just log the data
      console.log('Enrollment form data:', data);
      
      // Update our local user data for the EnrollButton to use
      if (userData) {
        setUserDetails({
          id: userData.id,
          isEnrolled: false
        });
      }
      
      // Move to the payment or enrollment step
      toast({
        title: "Information Submitted",
        description: "Please continue with enrollment",
      });
      
      setIsSubmitting(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      toast({
        title: "Form Submission Failed",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            Enroll in {course.title}
          </DialogTitle>
          <DialogDescription>
            {!form.formState.isSubmitSuccessful ? 
              "Fill out the form below to enroll in this course." : 
              "Complete your enrollment by proceeding to payment."}
          </DialogDescription>
        </DialogHeader>

        {!form.formState.isSubmitSuccessful ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your@email.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 (555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="mt-4 border-t border-gray-200 pt-4">
                <FormField
                  control={form.control}
                  name="agreeToTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
                      <FormControl>
                        <Checkbox 
                          checked={field.value} 
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm">
                          I agree to the terms and conditions
                        </FormLabel>
                        <FormDescription className="text-xs">
                          By enrolling, you agree to our Terms of Service and Privacy Policy.
                        </FormDescription>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter className="pt-6">
                <Button
                  type="button"
                  variant="outline"
                  className="border-blue-200 text-blue-600 hover:bg-blue-50"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Continue'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        ) : (
          <div className="py-4">
            <div className="mb-6">
              <p className="text-gray-700 mb-2">Course: <span className="font-medium">{course.title}</span></p>
              <p className="text-gray-700 mb-2">Price: <span className="font-medium">${course.priceUsd} USD</span></p>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mb-4">
              <p className="text-sm text-gray-500 mb-4">
                {course.priceUsd === 0 
                  ? "This is a free course. You can enroll immediately without payment."
                  : "You'll be redirected to our secure payment page to complete your enrollment."}
              </p>
            </div>
            
            <DialogFooter>
              <Button
                variant="outline"
                className="border-blue-200 text-blue-600 hover:bg-blue-50"
                onClick={onClose}
              >
                Cancel
              </Button>
              
              {userDetails && (
                <EnrollButton 
                  course={course}
                  userId={userDetails.id}
                  isEnrolled={userDetails.isEnrolled}
                  onSuccess={onClose}
                />
              )}
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EnrollmentModal;