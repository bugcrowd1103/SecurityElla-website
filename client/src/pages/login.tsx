import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  rememberMe: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const Login = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });
  
  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    
    try {
      // Simulated login API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Login Successful",
        description: "Welcome back to SecurityElla!",
      });
      
      // In a real app, we would store the user's session token and redirect
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <>
      <Helmet>
        <title>Login | SecurityElla</title>
        <meta name="description" content="Sign in to your SecurityElla account" />
      </Helmet>
      <section className="bg-[#121212] py-16 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="max-w-md mx-auto w-full">
          <motion.div 
            className="bg-[#1e1e1e] rounded-xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="px-6 py-8 sm:px-10">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold font-['Poppins',sans-serif] text-white">Welcome Back</h2>
                <p className="mt-2 text-gray-400">Sign in to your SecurityElla account</p>
              </div>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Email address</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="email" 
                            className="bg-[#121212] border-gray-700 text-gray-200 focus:ring-[#64ffda] focus:border-[#64ffda]" 
                            placeholder="Enter your email"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Password</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="password" 
                            className="bg-[#121212] border-gray-700 text-gray-200 focus:ring-[#64ffda] focus:border-[#64ffda]" 
                            placeholder="Enter your password"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex items-center justify-between">
                    <FormField
                      control={form.control}
                      name="rememberMe"
                      render={({ field }) => (
                        <div className="flex items-center">
                          <Checkbox 
                            id="remember-me" 
                            checked={field.value} 
                            onCheckedChange={field.onChange}
                            className="bg-[#121212] border-gray-700 text-[#64ffda] focus:ring-[#64ffda]"
                          />
                          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                            Remember me
                          </label>
                        </div>
                      )}
                    />
                    
                    <div className="text-sm">
                      <a href="#" className="font-medium text-[#38b2ff] hover:text-[#7ad1ff]">
                        Forgot your password?
                      </a>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#0a192f] bg-[#64ffda] hover:bg-[#00c4a7] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#64ffda] transition duration-300"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <i className="fas fa-spinner fa-spin mr-2"></i> Signing in...
                      </span>
                    ) : (
                      'Sign in'
                    )}
                  </Button>
                </form>
              </Form>
              
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-[#1e1e1e] text-gray-400">Or continue with</span>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Button variant="outline" className="w-full inline-flex justify-center py-2 px-4 border border-gray-700 rounded-md shadow-sm bg-[#1e1e1e] text-sm font-medium text-gray-300 hover:bg-[#172a46]">
                    <i className="fab fa-google text-lg"></i>
                  </Button>
                  
                  <Button variant="outline" className="w-full inline-flex justify-center py-2 px-4 border border-gray-700 rounded-md shadow-sm bg-[#1e1e1e] text-sm font-medium text-gray-300 hover:bg-[#172a46]">
                    <i className="fab fa-github text-lg"></i>
                  </Button>
                </div>
              </div>
              
              <div className="mt-6 text-center text-sm text-gray-400">
                Don't have an account?{' '}
                <a href="#" className="font-medium text-[#38b2ff] hover:text-[#7ad1ff]">
                  Sign up
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Login;
