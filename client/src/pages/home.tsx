import Hero from "@/components/home/Hero";
import FeaturedCourses from "@/components/home/FeaturedCourses";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>SecurityElla - Cybersecurity Services & Courses</title>
        <meta name="description" content="SecurityElla provides cutting-edge cybersecurity services and comprehensive training courses designed to protect your digital assets and advance your career." />
      </Helmet>
      <div>
        <Hero />
        <FeaturedCourses />
        <WhyChooseUs />
      </div>
    </>
  );
};

export default Home;
