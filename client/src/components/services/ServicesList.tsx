import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: "fas fa-shield-alt",
    title: "Security Assessment & Auditing",
    description: "Comprehensive evaluation of your organization's security posture through vulnerability assessments, penetration testing, and security audits to identify weaknesses.",
    features: [
      "Network vulnerability scanning",
      "Web application security testing",
      "Compliance auditing (ISO 27001, GDPR, etc.)"
    ]
  },
  {
    icon: "fas fa-fire-extinguisher",
    title: "Incident Response & Recovery",
    description: "Rapid and effective response to security incidents, containing breaches, mitigating damage, and restoring normal operations.",
    features: [
      "24/7 incident monitoring and alerting",
      "Breach containment and eradication",
      "Digital forensics and investigation"
    ]
  },
  {
    icon: "fas fa-users-cog",
    title: "Security Consulting & Strategy",
    description: "Expert guidance on developing comprehensive security strategies tailored to your organization's needs and risk profile.",
    features: [
      "Risk assessment and management",
      "Security policy development",
      "Security architecture design"
    ]
  },
  {
    icon: "fas fa-graduation-cap",
    title: "Security Training & Awareness",
    description: "Comprehensive training programs to develop your team's cybersecurity skills and improve organizational security awareness.",
    features: [
      "Employee security awareness training",
      "Phishing simulation exercises",
      "Specialized cybersecurity courses"
    ]
  }
];

const ServicesList = () => {
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
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <motion.h2 
          className="text-3xl font-bold font-['Poppins',sans-serif] text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Our Services
        </motion.h2>
        <motion.div 
          className="h-1 w-20 bg-[#64ffda] mx-auto mt-4 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: 80 }}
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
          We provide comprehensive cybersecurity solutions to protect your digital assets and strengthen your security posture.
        </motion.p>
      </div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-12"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {services.map((service, index) => (
          <motion.div key={index} className="flex items-start" variants={item}>
            <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-md bg-[#0a192f] text-[#64ffda] text-xl">
              <i className={service.icon}></i>
            </div>
            <div className="ml-6">
              <h3 className="text-xl font-bold font-['Poppins',sans-serif] text-white">{service.title}</h3>
              <p className="mt-2 text-gray-300">
                {service.description}
              </p>
              <ul className="mt-4 space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-300">
                    <i className="fas fa-check text-[#64ffda] mr-2"></i>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div 
        className="mt-16 bg-[#172a46] rounded-2xl p-8 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold font-['Poppins',sans-serif] text-white">Ready to strengthen your security posture?</h3>
          <p className="mt-4 text-gray-300">
            Our team of cybersecurity experts is ready to help you protect your digital assets and build a resilient security strategy.
          </p>
          <div className="mt-8">
            <Button 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-[#0a192f] bg-[#64ffda] hover:bg-[#00c4a7] transition duration-300"
            >
              Get a Free Consultation
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ServicesList;
