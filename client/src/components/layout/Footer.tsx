import { useState } from "react";
import { Link } from "wouter";
import { apiRequest } from "@/lib/queryClient";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      return;
    }
    
    setSubmitting(true);
    
    try {
      // Simulate API call - in real world, this would submit to a newsletter service
      await new Promise(resolve => setTimeout(resolve, 500));
      setSubscribed(true);
      setEmail("");
    } catch (error) {
      console.error("Failed to subscribe to newsletter", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <span className="text-blue-600 font-['Poppins',sans-serif] font-bold text-2xl">
              Security<span className="text-gray-800">Ella</span>
            </span>
            <p className="mt-4 text-gray-600">
              Providing cutting-edge cybersecurity services and training to protect your digital assets and advance your career.
            </p>
            <div className="mt-6 flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors duration-300">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors duration-300">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors duration-300">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors duration-300">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors duration-300">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-gray-800 font-['Poppins',sans-serif] font-medium">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/">
                  <span className="text-gray-600 hover:text-blue-600 transition-colors duration-300 cursor-pointer">Home</span>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <span className="text-gray-600 hover:text-blue-600 transition-colors duration-300 cursor-pointer">Services</span>
                </Link>
              </li>
              <li>
                <Link href="/courses">
                  <span className="text-gray-600 hover:text-blue-600 transition-colors duration-300 cursor-pointer">Courses</span>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <span className="text-gray-600 hover:text-blue-600 transition-colors duration-300 cursor-pointer">About</span>
                </Link>
              </li>
              <li>
                <Link href="/login">
                  <span className="text-gray-600 hover:text-blue-600 transition-colors duration-300 cursor-pointer">Login</span>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-gray-800 font-['Poppins',sans-serif] font-medium">Contact Us</h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt text-blue-600 mt-1 mr-3"></i>
                <span className="text-gray-600">123 Cyber Street, Tech City, 12345</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone text-blue-600 mt-1 mr-3"></i>
                <span className="text-gray-600">+1 (123) 456-7890</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-envelope text-blue-600 mt-1 mr-3"></i>
                <span className="text-gray-600">info@securityella.com</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-gray-800 font-['Poppins',sans-serif] font-medium">Newsletter</h3>
            <p className="mt-4 text-gray-600">Subscribe to our newsletter for the latest updates.</p>
            <form className="mt-4" onSubmit={handleNewsletterSubmit}>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-grow w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-700"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={submitting || subscribed}
                  required
                />
                <button 
                  type="submit" 
                  className="flex-shrink-0 px-3 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 ease-in-out disabled:opacity-50"
                  disabled={submitting || subscribed}
                >
                  {subscribed ? (
                    <i className="fas fa-check"></i>
                  ) : submitting ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    <i className="fas fa-paper-plane"></i>
                  )}
                </button>
              </div>
              {subscribed && (
                <p className="mt-2 text-xs text-blue-600">
                  Thank you for subscribing to our newsletter!
                </p>
              )}
            </form>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} SecurityElla. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
