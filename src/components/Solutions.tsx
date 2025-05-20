import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, GraduationCap, Zap } from 'lucide-react';

interface SolutionTabProps {
  icon: React.ReactNode;
  title: string;
  isActive: boolean;
  onClick: () => void;
}

const SolutionTab: React.FC<SolutionTabProps> = ({ icon, title, isActive, onClick }) => {
  return (
    <motion.button
      className={`flex items-center p-4 rounded-lg transition-all ${
        isActive 
          ? 'bg-red-600 text-white shadow-lg' 
          : 'bg-white text-gray-700 hover:bg-red-50'
      }`}
      onClick={onClick}
      whileHover={{ 
        scale: 1.03,
        transition: { type: "spring", stiffness: 400, damping: 10 }
      }}
      whileTap={{ scale: 0.97 }}
    >
      <div className={`mr-3 ${isActive ? 'text-white' : 'text-red-600'}`}>
        {icon}
      </div>
      <span className="font-medium">{title}</span>
    </motion.button>
  );
};

interface SolutionContentProps {
  title: string;
  description: string;
  features: string[];
  image: string;
  isActive: boolean;
}

const SolutionContent: React.FC<SolutionContentProps> = ({ title, description, features, image, isActive }) => {
  if (!isActive) return null;
  
  return (
    <motion.div 
      className="grid md:grid-cols-2 gap-8 mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 15,
        duration: 0.5 
      }}
    >
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
        <p className="text-lg text-gray-700 mb-6">{description}</p>
        
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <motion.li 
              key={index} 
              className="flex items-start"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center mt-1">
                <span className="text-xs">✓</span>
              </div>
              <span className="ml-3 text-gray-700">{feature}</span>
            </motion.li>
          ))}
        </ul>
      </div>
      
      <motion.div 
        className="rounded-xl overflow-hidden shadow-lg h-80"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
      </motion.div>
    </motion.div>
  );
};

const Solutions: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  const solutions = [
    {
      icon: <Building2 size={24} />,
      title: "Enterprise Solutions",
      description: "Comprehensive telecommunication solutions designed for large enterprises with complex connectivity needs.",
      features: [
        "Scalable network infrastructure",
        "Dedicated internet access with SLA guarantees",
        "Enterprise VoIP and unified communications",
        "Custom security protocols and monitoring",
        "Redundant systems for high availability"
      ],
      image: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      icon: <Users size={24} />,
      title: "SMB Solutions",
      description: "Cost-effective telecommunication packages tailored for small and medium-sized businesses.",
      features: [
        "Affordable internet connectivity options",
        "Cloud-based phone systems",
        "Easy-to-manage network solutions",
        "Simplified security measures",
        "Flexible scalability as your business grows"
      ],
      image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      icon: <GraduationCap size={24} />,
      title: "Education Solutions",
      description: "Specialized telecommunication infrastructure for educational institutions of all sizes.",
      features: [
        "High-density WiFi networks for campuses",
        "Content filtering and security",
        "Distance learning infrastructure",
        "Smart classroom connectivity",
        "Student and faculty communication systems"
      ],
      image: "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      icon: <Zap size={24} />,
      title: "Industrial Solutions",
      description: "Rugged and reliable telecommunication systems for industrial and manufacturing environments.",
      features: [
        "Industrial-grade networking equipment",
        "Machine-to-machine communication",
        "Remote monitoring systems",
        "High-reliability internet connections",
        "Customized industrial IoT solutions"
      ],
      image: "https://images.pexels.com/photos/236728/pexels-photo-236728.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  return (
    <section id="solutions" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ 
            type: "spring", 
            stiffness: 60, 
            damping: 20 
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Tailored Solutions for Every Industry
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We understand that different industries have unique telecommunication requirements.
            Our specialized solutions are designed to meet your specific needs.
          </p>
        </motion.div>
        
        <motion.div 
          className="bg-white rounded-xl shadow-md p-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ 
            type: "spring", 
            stiffness: 50, 
            damping: 20,
            delay: 0.2 
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {solutions.map((solution, index) => (
              <SolutionTab
                key={index}
                icon={solution.icon}
                title={solution.title}
                isActive={activeTab === index}
                onClick={() => setActiveTab(index)}
              />
            ))}
          </div>
          
          {solutions.map((solution, index) => (
            <SolutionContent
              key={index}
              title={solution.title}
              description={solution.description}
              features={solution.features}
              image={solution.image}
              isActive={activeTab === index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Solutions;
