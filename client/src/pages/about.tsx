import { motion } from "framer-motion";
import CompanyInfo from "@/components/about/CompanyInfo";
import { Helmet } from "react-helmet";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us | SecurityElla</title>
        <meta name="description" content="SecurityElla is a leading cybersecurity company dedicated to providing cutting-edge security solutions and comprehensive training programs." />
      </Helmet>
      <section className="relative bg-gradient-to-b from-blue-50 to-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl font-bold font-['Poppins',sans-serif] text-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              About SecurityElla
            </motion.h2>
            <motion.div 
              className="h-1 w-20 bg-blue-600 mx-auto mt-4 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 80 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </div>
          
          <CompanyInfo />
        </div>
      </section>
    </>
  );
};

export default About;
