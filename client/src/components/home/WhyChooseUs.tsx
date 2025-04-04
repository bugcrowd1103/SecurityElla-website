import { motion } from "framer-motion";

const features = [
  {
    icon: "fas fa-user-shield",
    title: "Expert Instructors",
    description: "Learn from industry professionals with real-world cybersecurity experience."
  },
  {
    icon: "fas fa-laptop-code",
    title: "Hands-on Learning",
    description: "Practical exercises and real-world scenarios to apply your knowledge."
  },
  {
    icon: "fas fa-certificate",
    title: "Industry Certifications",
    description: "Courses aligned with major cybersecurity certifications and standards."
  },
  {
    icon: "fas fa-headset",
    title: "Ongoing Support",
    description: "Access to community forums and instructor support during and after courses."
  }
];

const founderInfo = {
  name: "John Doe",
  title: "Founder & CEO",
  bio: "John is a former CISO with over 15 years of experience in information security and risk management. He founded SecurityElla in 2015 with a mission to make cybersecurity education accessible to all. His expertise spans across network security, penetration testing, and security architecture.",
  icon: "fas fa-user-tie"
};

const WhyChooseUs = () => {
  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl font-bold font-['Poppins',sans-serif] text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Why Choose SecurityElla
          </motion.h2>
          <motion.div 
            className="h-1 w-20 bg-blue-600 mx-auto mt-4 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-white border border-gray-100 rounded-xl p-6 shadow-lg text-center transition duration-300 hover:transform hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-blue-600 text-4xl mb-4">
                <i className={feature.icon}></i>
              </div>
              <h3 className="text-xl font-bold font-['Poppins',sans-serif] text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Founder Information Section */}
        <motion.div 
          className="mt-24 bg-gray-50 rounded-xl p-8 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-1 flex justify-center">
              <div className="w-48 h-48 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-6xl">
                <i className={founderInfo.icon}></i>
              </div>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold font-['Poppins',sans-serif] text-gray-800 mb-2">Meet Our Founder</h3>
              <h4 className="text-xl text-blue-600 mb-4">{founderInfo.name}, {founderInfo.title}</h4>
              <p className="text-gray-600">{founderInfo.bio}</p>
              <div className="mt-4 flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors duration-300">
                  <i className="fab fa-linkedin text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors duration-300">
                  <i className="fab fa-twitter text-xl"></i>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
