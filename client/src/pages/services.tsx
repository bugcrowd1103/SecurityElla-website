import { motion } from "framer-motion";
import ServicesList from "@/components/services/ServicesList";
import { Helmet } from "react-helmet";

const Services = () => {
  return (
    <>
      <Helmet>
        <title>Our Services | SecurityElla</title>
        <meta name="description" content="We provide comprehensive cybersecurity solutions to protect your digital assets and strengthen your security posture." />
      </Helmet>
      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 min-h-screen">
        <ServicesList />
      </section>
    </>
  );
};

export default Services;
