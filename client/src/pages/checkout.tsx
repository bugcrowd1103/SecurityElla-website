import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useLocation, Link } from "wouter";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface CheckoutFormProps {
  courseTitle: string;
  courseId: number;
  userId: number;
}

const CheckoutForm = ({ courseTitle, courseId, userId }: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [, setLocation] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast({
        title: "Payment Error",
        description: "Stripe not loaded properly. Please refresh the page and try again.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin + `/payment-success?courseId=${courseId}&userId=${userId}`,
        },
        redirect: "if_required",
      });

      if (error) {
        console.error("Payment error:", error);
        toast({
          title: "Payment Failed",
          description: error.message || "An error occurred during payment",
          variant: "destructive",
        });
        setIsProcessing(false);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        // Payment succeeded without redirect
        toast({
          title: "Payment Successful!",
          description: `Thank you for enrolling in "${courseTitle}". You now have access to the course.`,
        });
        
        // Process successful payment on the server
        try {
          await apiRequest("POST", "/api/payment-success", { 
            paymentIntentId: paymentIntent.id 
          });
          
          // Redirect to success page with query params
          window.location.href = `/payment-success?courseId=${courseId}&userId=${userId}`;
        } catch (apiError) {
          console.error("Error processing payment success:", apiError);
          toast({
            title: "Enrollment Issue",
            description: "Payment successful, but we had trouble enrolling you. Please contact support.",
            variant: "destructive",
          });
          setIsProcessing(false);
        }
      }
    } catch (err: any) {
      console.error("Payment error:", err);
      toast({
        title: "Payment Error",
        description: err.message || "An unexpected error occurred",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      <PaymentElement />
      <Button 
        disabled={!stripe || isProcessing} 
        className="w-full"
        type="submit"
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          "Complete Payment"
        )}
      </Button>
    </form>
  );
};

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState("");
  const [course, setCourse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [location] = useLocation();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get course ID and user ID from URL params
        const params = new URLSearchParams(window.location.search);
        const courseId = params.get('courseId');
        const userId = params.get('userId');
        
        console.log("URL params:", { courseId, userId, fullUrl: window.location.href });
        
        if (!courseId || !userId) {
          setError("Missing course or user information");
          setIsLoading(false);
          return;
        }

        // Fetch course details
        const courseData = await apiRequest("GET", `/api/courses/${courseId}`);
        const courseJson = await courseData.json();
        setCourse(courseJson);
        
        // Create payment intent
        const paymentData = await apiRequest("POST", "/api/create-payment-intent", { 
          amount: courseJson.priceUsd,
          courseId: parseInt(courseId),
          userId: parseInt(userId),
        });
        
        const paymentJson = await paymentData.json();
        
        if (paymentJson.clientSecret) {
          setClientSecret(paymentJson.clientSecret);
        } else {
          setError("Could not initiate payment");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load checkout information");
        toast({
          title: "Error",
          description: "Failed to prepare checkout. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-lg">Preparing checkout...</p>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Card className="w-[450px]">
          <CardHeader>
            <CardTitle className="text-2xl">Checkout Error</CardTitle>
            <CardDescription>
              {error || "Could not load course information"}
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link href="/courses">
              <Button className="w-full">Return to Courses</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-lg">Setting up payment...</p>
        </div>
      </div>
    );
  }

  // Make SURE to wrap the form in <Elements> which provides the stripe context.
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Complete Your Purchase</CardTitle>
          <CardDescription>
            You're enrolling in <span className="font-bold">{course.title}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex justify-between items-center">
            <span className="text-sm text-gray-600">Course Price:</span>
            <span className="text-lg font-semibold">${course.priceUsd}</span>
          </div>
          
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm 
              courseTitle={course.title} 
              courseId={course.id} 
              userId={parseInt(new URLSearchParams(window.location.search).get('userId') || '0')} 
            />
          </Elements>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-4">
          <Link href="/courses">
            <Button variant="ghost">Cancel and Return to Courses</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}