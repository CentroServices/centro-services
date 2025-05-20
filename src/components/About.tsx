import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const StatBox = ({ title, value, suffix = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div 
      ref={ref} 
      className="p-5 bg-red-50 rounded-lg text-center"
      whileHover={{ 
        y: -4, // Reduced from -8 to -4 for a more subtle lift
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03)", // Lighter shadow
        transition: { type: "spring", stiffness: 300, damping: 15 } // Adjusted spring physics
      }}
    >
      <h3 className="text-2xl font-bold text-red-800 mb-2">
        {value}{suffix}
      </h3>
      <p className="text-gray-700">{title}</p>
    </motion.div>
  );
};

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ 
              type: "spring", 
              stiffness: 50, 
              damping: 20 
            }}
          >
            <div className="relative">
              <motion.div 
                className="absolute -bottom-6 -right-6 w-32 h-32 bg-red-200 rounded-lg"
                style={{ zIndex: 1 }}
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 0.95, 1]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 10,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="absolute -top-6 -left-6 w-24 h-24 bg-red-100 rounded-lg"
                style={{ zIndex: 1 }}
                animate={{ 
                  rotate: [0, -5, 5, 0],
                  scale: [1, 0.95, 1.05, 1]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 8,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="aspect-video rounded-xl overflow-hidden shadow-lg relative"
                style={{ zIndex: 2 }}
                whileHover={{ 
                  scale: 1.03,
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
              >
                <img 
                  src="https://images.pexels.com/photos/6893804/pexels-photo-6893804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Team working at Centro Service" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ 
              type: "spring", 
              stiffness: 50, 
              damping: 20,
              delay: 0.2 
            }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Building Turkey's Telecommunications Future
            </h2>
            
            <p className="text-lg text-gray-700 mb-5">
              At Centro Service, we've been at the forefront of telecommunications innovation in Turkey for over a decade. Our commitment to excellence and cutting-edge technology has established us as a trusted partner for businesses across the nation.
            </p>
            
            <p className="text-lg text-gray-700 mb-8">
              We combine deep industry expertise with innovative solutions to deliver reliable, scalable, and future-proof telecommunication systems that drive business growth and digital transformation.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <StatBox 
                title="Years of Experience"
                value="10"
                suffix="+"
              />
              
              <StatBox 
                title="Projects Completed"
                value="500"
                suffix="+"
              />
              
              <StatBox 
                title="Uptime Guarantee"
                value="99.9"
                suffix="%"
              />
              
              <StatBox 
                title="Technical Support"
                value="24"
                suffix="/7"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
