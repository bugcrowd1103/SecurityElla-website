import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "John Doe",
    position: "Founder & CEO",
    bio: "Former CISO with 15+ years of experience in information security and risk management.",
    imageIcon: "fa-user-tie"
  },
  {
    name: "Jane Smith",
    position: "Chief Security Officer",
    bio: "Cybersecurity expert specializing in penetration testing and incident response.",
    imageIcon: "fa-user-shield"
  },
  {
    name: "David Chen",
    position: "Lead Instructor",
    bio: "Former ethical hacker with expertise in vulnerability assessment and exploit development.",
    imageIcon: "fa-user-graduate"
  },
  {
    name: "Sarah Johnson",
    position: "Security Consultant",
    bio: "Specialized in network security, cloud security, and compliance frameworks.",
    imageIcon: "fa-user-cog"
  }
];

const TeamMembers = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="mt-24">
      <div className="text-center mb-16">
        <motion.h3 
          className="text-2xl font-bold font-['Poppins',sans-serif] text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Meet Our Team
        </motion.h3>
        <motion.div 
          className="h-1 w-16 bg-[#64ffda] mx-auto mt-4 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: 64 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
        <motion.p 
          className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Our team of cybersecurity experts brings decades of combined experience from various sectors.
        </motion.p>
      </div>
      
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {teamMembers.map((member, index) => (
          <motion.div 
            key={index} 
            className="bg-[#1e1e1e] rounded-xl overflow-hidden shadow-lg"
            variants={item}
          >
            <div className="h-48 overflow-hidden bg-[#172a46] flex items-center justify-center">
              <i className={`fas ${member.imageIcon} text-[#64ffda] text-6xl`}></i>
            </div>
            <div className="p-6 text-center">
              <h4 className="font-bold font-['Poppins',sans-serif] text-white text-lg">{member.name}</h4>
              <p className="text-[#64ffda]">{member.position}</p>
              <p className="mt-2 text-gray-300 text-sm">{member.bio}</p>
              <div className="mt-4 flex justify-center space-x-4">
                <a href="#" className="text-gray-400 hover:text-[#64ffda] transition-colors duration-300">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-[#64ffda] transition-colors duration-300">
                  <i className="fab fa-twitter"></i>
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default TeamMembers;
