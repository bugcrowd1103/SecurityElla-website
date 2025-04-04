import { motion } from "framer-motion";

const CompanyInfo = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="prose prose-lg text-gray-300 max-w-none">
          <p className="mb-4">
            <span className="text-[#64ffda] font-bold">SecurityElla</span> is a leading cybersecurity company dedicated to providing cutting-edge security solutions and comprehensive training programs to individuals and organizations worldwide.
          </p>
          <p className="mb-4">
            Founded in 2015 by a team of cybersecurity experts with decades of combined experience, we've quickly established ourselves as an industry leader with a reputation for excellence and innovation.
          </p>
          <p className="mb-4">
            Our mission is to empower organizations to protect their digital assets and help individuals develop the skills needed to succeed in the rapidly evolving field of cybersecurity. We believe in making cybersecurity knowledge accessible to all, regardless of prior technical background.
          </p>
          <p>
            With a team of expert instructors and consultants who have real-world experience in the field, we pride ourselves on delivering practical, relevant training that prepares our students for the challenges they'll face in their cybersecurity careers.
          </p>
        </div>
        
        <div className="mt-8 flex space-x-6">
          <a href="#" className="text-gray-400 hover:text-[#64ffda] transition-colors duration-300">
            <i className="fab fa-linkedin text-2xl"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-[#64ffda] transition-colors duration-300">
            <i className="fab fa-twitter text-2xl"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-[#64ffda] transition-colors duration-300">
            <i className="fab fa-facebook text-2xl"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-[#64ffda] transition-colors duration-300">
            <i className="fab fa-instagram text-2xl"></i>
          </a>
        </div>
      </motion.div>
      
      <motion.div
        className="grid grid-cols-2 gap-4"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="rounded-lg overflow-hidden shadow-lg bg-[#1e1e1e]">
          <div className="w-full h-64 flex items-center justify-center bg-[#172a46] text-[#64ffda]">
            <i className="fas fa-users text-7xl"></i>
          </div>
        </div>
        <div className="rounded-lg overflow-hidden shadow-lg bg-[#1e1e1e]">
          <div className="w-full h-64 flex items-center justify-center bg-[#172a46] text-[#64ffda]">
            <i className="fas fa-chalkboard-teacher text-7xl"></i>
          </div>
        </div>
        <div className="rounded-lg overflow-hidden shadow-lg bg-[#1e1e1e]">
          <div className="w-full h-64 flex items-center justify-center bg-[#172a46] text-[#64ffda]">
            <i className="fas fa-shield-alt text-7xl"></i>
          </div>
        </div>
        <div className="rounded-lg overflow-hidden shadow-lg bg-[#1e1e1e]">
          <div className="w-full h-64 flex items-center justify-center bg-[#172a46] text-[#64ffda]">
            <i className="fas fa-laptop-code text-7xl"></i>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CompanyInfo;
