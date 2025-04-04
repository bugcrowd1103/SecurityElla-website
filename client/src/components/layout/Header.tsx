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
    <nav className="bg-[#0a192f] sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <span className="text-[#64ffda] font-['Poppins',sans-serif] font-bold text-2xl cursor-pointer">
                  Security<span className="text-[#38b2ff]">Ella</span>
                </span>
              </Link>
            </div>
            <div className="hidden sm:ml-10 sm:flex sm:items-center sm:space-x-8">
              <Link href="/">
                <a className={cn(
                  "px-3 py-2 text-gray-200 transition duration-300 ease-in-out font-medium",
                  isActive("/") ? "text-[#64ffda]" : "hover:text-[#64ffda]"
                )}>
                  Home
                </a>
              </Link>
              <Link href="/services">
                <a className={cn(
                  "px-3 py-2 text-gray-200 transition duration-300 ease-in-out font-medium",
                  isActive("/services") ? "text-[#64ffda]" : "hover:text-[#64ffda]"
                )}>
                  Services
                </a>
              </Link>
              <Link href="/courses">
                <a className={cn(
                  "px-3 py-2 text-gray-200 transition duration-300 ease-in-out font-medium",
                  isActive("/courses") ? "text-[#64ffda]" : "hover:text-[#64ffda]"
                )}>
                  Courses
                </a>
              </Link>
              <Link href="/about">
                <a className={cn(
                  "px-3 py-2 text-gray-200 transition duration-300 ease-in-out font-medium",
                  isActive("/about") ? "text-[#64ffda]" : "hover:text-[#64ffda]"
                )}>
                  About
                </a>
              </Link>
            </div>
          </div>
          
          <div className="hidden sm:flex sm:items-center">
            <Link href="/login">
              <Button 
                className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-[#0a192f] bg-[#64ffda] hover:bg-[#00c4a7] transition duration-300 ease-in-out"
              >
                Login
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-[#172a46] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#64ffda]"
              onClick={toggleMobileMenu}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>
      </div>
      
      <div className={`sm:hidden ${mobileMenuOpen ? '' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link href="/">
            <a 
              className={cn(
                "block px-3 py-2 text-gray-200 transition duration-300 ease-in-out font-medium",
                isActive("/") ? "text-[#64ffda]" : "hover:text-[#64ffda]"
              )}
              onClick={closeMobileMenu}
            >
              Home
            </a>
          </Link>
          <Link href="/services">
            <a 
              className={cn(
                "block px-3 py-2 text-gray-200 transition duration-300 ease-in-out font-medium",
                isActive("/services") ? "text-[#64ffda]" : "hover:text-[#64ffda]"
              )}
              onClick={closeMobileMenu}
            >
              Services
            </a>
          </Link>
          <Link href="/courses">
            <a 
              className={cn(
                "block px-3 py-2 text-gray-200 transition duration-300 ease-in-out font-medium",
                isActive("/courses") ? "text-[#64ffda]" : "hover:text-[#64ffda]"
              )}
              onClick={closeMobileMenu}
            >
              Courses
            </a>
          </Link>
          <Link href="/about">
            <a 
              className={cn(
                "block px-3 py-2 text-gray-200 transition duration-300 ease-in-out font-medium",
                isActive("/about") ? "text-[#64ffda]" : "hover:text-[#64ffda]"
              )}
              onClick={closeMobileMenu}
            >
              About
            </a>
          </Link>
          <Link href="/login">
            <a 
              className={cn(
                "block px-3 py-2 text-gray-200 transition duration-300 ease-in-out font-medium",
                isActive("/login") ? "text-[#64ffda]" : "hover:text-[#64ffda]"
              )}
              onClick={closeMobileMenu}
            >
              Login
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
