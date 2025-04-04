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

const WhyChooseUs = () => {
  return (
    <div className="bg-gradient-to-b from-[#0a192f] to-[#172a46] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl font-bold font-['Poppins',sans-serif] text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Why Choose SecurityElla
          </motion.h2>
          <motion.div 
            className="h-1 w-20 bg-[#64ffda] mx-auto mt-4 rounded-full"
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
              className="bg-[#1e1e1e] rounded-xl p-6 shadow-lg text-center transition duration-300 hover:transform hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-[#64ffda] text-4xl mb-4">
                <i className={feature.icon}></i>
              </div>
              <h3 className="text-xl font-bold font-['Poppins',sans-serif] text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
