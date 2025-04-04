import { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ChevronRight, Loader2 } from 'lucide-react';

export default function PaymentSuccess() {
  const [, setLocation] = useLocation();
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const processPayment = async () => {
      try {
        // Get the payment_intent and payment_intent_client_secret from URL
        const urlParams = new URLSearchParams(window.location.search);
        const paymentIntentId = urlParams.get('payment_intent');
        
        if (!paymentIntentId) {
          setError("Payment information missing");
          setIsProcessing(false);
          return;
        }
        
        // Call API to process successful payment
        const response = await apiRequest("POST", "/api/payment-success", {
          paymentIntentId
        });
        
        const result = await response.json();
        
        if (!result.success) {
          setError(result.message || "Failed to process payment");
          toast({
            title: "Payment Processing Failed",
            description: "There was an issue completing your enrollment. Please contact support.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Payment Successful!",
            description: "You have been successfully enrolled in the course.",
          });
        }
      } catch (error) {
        console.error("Error processing payment:", error);
        setError("An error occurred while processing your payment");
        toast({
          title: "Payment Processing Error",
          description: "There was an issue with your payment. Please contact support.",
          variant: "destructive",
        });
      } finally {
        setIsProcessing(false);
      }
    };

    processPayment();
  }, [toast]);

  const handleViewCourses = () => {
    setLocation('/dashboard');
  };

  if (isProcessing) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-lg">Processing your payment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-red-600">Payment Processing Issue</CardTitle>
            <CardDescription>
              {error}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              There was a problem processing your payment. If you believe this is an error, 
              please contact our support team with your payment ID.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/courses">
              <Button>Return to Courses</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl text-green-700">Payment Successful!</CardTitle>
          <CardDescription className="text-lg">
            Thank you for your purchase
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-600 text-center">
              You have been successfully enrolled in the course. You can now access all the course materials.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button className="w-full" onClick={handleViewCourses}>
            View My Courses <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
          <Link href="/" className="w-full">
            <Button variant="outline" className="w-full">
              Return to Home
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}