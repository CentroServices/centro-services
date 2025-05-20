import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import { Network, Server, FileSpreadsheet, Building2, Users, ChevronRight } from 'lucide-react';

// Animation variants for smoother transitions
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1] // Cubic bezier for smoother motion
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const ServiceCard = ({ item, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      variants={fadeInUp}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link 
        to={item.href}
        className="block bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 md:p-8 h-full border border-gray-100"
      >
        <div className="flex flex-col md:flex-row md:items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 mb-4 md:mb-0 transform transition-transform duration-300">
            <motion.div
              animate={{ 
                scale: isHovered ? 1.1 : 1,
                rotate: isHovered ? 5 : 0
              }}
              transition={{ duration: 0.3 }}
            >
              {item.icon}
            </motion.div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
              {item.title}
            </h3>
            <p className="text-gray-600 mb-4">
              {item.description}
            </p>
            <div className="flex items-center text-primary-600 font-medium mt-auto">
              <span>Learn more</span>
              <motion.div
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronRight size={18} className="ml-1" />
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const ServiceCategory = ({ title, items }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-50px" }}
    variants={staggerContainer}
    className="mb-16"
  >
    <motion.h2 
      variants={fadeInUp}
      className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 flex items-center"
    >
      <div className="w-1.5 h-8 bg-primary-600 rounded-full mr-3"></div>
      {title}
    </motion.h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, index) => (
        <ServiceCard key={index} item={item} index={index} />
      ))}
    </div>
  </motion.div>
);

const ServicesPage = () => {
  const services = {
    engineering: {
      title: "Engineering Services",
      items: [
        {
          icon: <Network size={28} />,
          title: "Network Planning & Optimization Services",
          description: "We offer network planning services to establish new networks and optimize legacy networks. Major service activities are Radio Network Planning, Transmission Network Planning and Indoor Network Planning.",
          href: "#"
        },
        {
          icon: <Server size={28} />,
          title: "Fiber Network Rollout Services",
          description: "Cutting-edge Fiber Network Rollout Solutions Of Centro, With Robust Presence And Unparalleled Global Experience/Ability With Multi-Domain Capabilities",
          href: "#"
        },
        {
          icon: <FileSpreadsheet size={28} />,
          title: "Roll-Out Back Office Services",
          description: "Centro Roll-out Back Office Services, allows customers to reach their desired network quality or expansion targets with the installation of their networks (All-Gs) much faster and systematic.",
          href: "#"
        }
      ]
    },
    solutions: {
      title: "Solutions",
      items: [
        {
          icon: <Building2 size={28} />,
          title: "PMO as a Service",
          description: "As a concept, CENTRO offers a PMO-as-a-Service (PMOaaS) solution for organizations in the Telco and IT industries that want to improve their communication, governance, controls, execution, and profitability of programs.",
          href: "#"
        }
      ]
    },
    consultancy: {
      title: "Consultancy Services For Telco & IT Businesses",
      items: [
        {
          icon: <Users size={28} />,
          title: "Consultancy & Training",
          description: "Centro consultancy team consists of highly skilled and globally experienced, industry/domain-centric certified solution architects and subject matter experts with global experiences in critical technologies.",
          href: "#"
        }
      ]
    }
  };

  return (
    <div className="pt-20">
      <section className="py-12 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8">
            <Breadcrumbs items={[{ label: 'Services' }]} />
          </div>

          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.25, 0.1, 0.25, 1]
            }}
          >
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Services
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive telecommunications solutions tailored to meet the evolving needs of modern businesses
            </p>
          </motion.div>

          <div className="max-w-7xl mx-auto">
            <ServiceCategory {...services.engineering} />
            <ServiceCategory {...services.solutions} />
            <ServiceCategory {...services.consultancy} />
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-20 text-center"
          >
            <div className="bg-primary-50 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Need a custom solution?
              </h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Our team of experts is ready to help you design a telecommunications solution that perfectly fits your business requirements.
              </p>
              <Link 
                to="/contact" 
                className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors duration-300"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;