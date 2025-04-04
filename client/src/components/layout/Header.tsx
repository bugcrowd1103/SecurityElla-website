import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Header = () => {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <span className="text-blue-600 font-['Poppins',sans-serif] font-bold text-2xl cursor-pointer">
                  Security<span className="text-gray-800">Ella</span>
                </span>
              </Link>
            </div>
            <div className="hidden sm:ml-10 sm:flex sm:items-center sm:space-x-8">
              <Link href="/">
                <span className={cn(
                  "px-3 py-2 transition duration-300 ease-in-out font-medium cursor-pointer",
                  isActive("/") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                )}>
                  Home
                </span>
              </Link>
              <Link href="/about">
                <span className={cn(
                  "px-3 py-2 transition duration-300 ease-in-out font-medium cursor-pointer",
                  isActive("/about") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                )}>
                  About
                </span>
              </Link>
              <Link href="/services">
                <span className={cn(
                  "px-3 py-2 transition duration-300 ease-in-out font-medium cursor-pointer",
                  isActive("/services") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                )}>
                  Services
                </span>
              </Link>
              <Link href="/courses">
                <span className={cn(
                  "px-3 py-2 transition duration-300 ease-in-out font-medium cursor-pointer",
                  isActive("/courses") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                )}>
                  Courses
                </span>
              </Link>
              <Link href="/blog">
                <span className={cn(
                  "px-3 py-2 transition duration-300 ease-in-out font-medium cursor-pointer",
                  isActive("/blog") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                )}>
                  Blog
                </span>
              </Link>
              <Link href="/contact">
                <span className={cn(
                  "px-3 py-2 transition duration-300 ease-in-out font-medium cursor-pointer",
                  isActive("/contact") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                )}>
                  Contact
                </span>
              </Link>
            </div>
          </div>
          
          <div className="hidden sm:flex sm:items-center">
            <Button 
              className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out"
              onClick={() => window.location.href = '/login'}
            >
              Login
            </Button>
          </div>
          
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-blue-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600"
              onClick={toggleMobileMenu}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>
      </div>
      
      <div className={`sm:hidden ${mobileMenuOpen ? '' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
          <Link href="/">
            <span 
              className={cn(
                "block px-3 py-2 transition duration-300 ease-in-out font-medium cursor-pointer",
                isActive("/") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
              )}
              onClick={closeMobileMenu}
            >
              Home
            </span>
          </Link>
          <Link href="/about">
            <span 
              className={cn(
                "block px-3 py-2 transition duration-300 ease-in-out font-medium cursor-pointer",
                isActive("/about") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
              )}
              onClick={closeMobileMenu}
            >
              About
            </span>
          </Link>
          <Link href="/services">
            <span 
              className={cn(
                "block px-3 py-2 transition duration-300 ease-in-out font-medium cursor-pointer",
                isActive("/services") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
              )}
              onClick={closeMobileMenu}
            >
              Services
            </span>
          </Link>
          <Link href="/courses">
            <span 
              className={cn(
                "block px-3 py-2 transition duration-300 ease-in-out font-medium cursor-pointer",
                isActive("/courses") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
              )}
              onClick={closeMobileMenu}
            >
              Courses
            </span>
          </Link>
          <Link href="/blog">
            <span 
              className={cn(
                "block px-3 py-2 transition duration-300 ease-in-out font-medium cursor-pointer",
                isActive("/blog") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
              )}
              onClick={closeMobileMenu}
            >
              Blog
            </span>
          </Link>
          <Link href="/contact">
            <span 
              className={cn(
                "block px-3 py-2 transition duration-300 ease-in-out font-medium cursor-pointer",
                isActive("/contact") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
              )}
              onClick={closeMobileMenu}
            >
              Contact
            </span>
          </Link>
          <Link href="/login">
            <span 
              className={cn(
                "block px-3 py-2 transition duration-300 ease-in-out font-medium cursor-pointer",
                isActive("/login") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
              )}
              onClick={closeMobileMenu}
            >
              Login
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
