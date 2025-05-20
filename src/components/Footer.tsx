import React from 'react';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 60, 
        damping: 20 
      }
    }
  };

  return (
    <footer className="bg-gradient-to-br from-red-900 to-red-800">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Company Info */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <RouterLink to="/">
              <img 
                src="/assets/logo/logo.svg" 
                alt="Centro Service Solutions" 
                className="h-12 w-auto brightness-0 invert"
              />
            </RouterLink>
            <p className="text-red-100 leading-relaxed">
              Leading telecommunications provider in Turkey, delivering innovative solutions for businesses of all sizes.
            </p>
            <div className="flex space-x-4">
              <motion.a 
                href="#" 
                className="w-10 h-10 rounded-full bg-red-800/30 flex items-center justify-center hover:bg-red-700/50 transition-colors duration-200 text-red-100 hover:text-white"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Facebook size={20} />
              </motion.a>
              <motion.a 
                href="#" 
                className="w-10 h-10 rounded-full bg-red-800/30 flex items-center justify-center hover:bg-red-700/50 transition-colors duration-200 text-red-100 hover:text-white"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Twitter size={20} />
              </motion.a>
              <motion.a 
                href="#" 
                className="w-10 h-10 rounded-full bg-red-800/30 flex items-center justify-center hover:bg-red-700/50 transition-colors duration-200 text-red-100 hover:text-white"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a 
                href="#" 
                className="w-10 h-10 rounded-full bg-red-800/30 flex items-center justify-center hover:bg-red-700/50 transition-colors duration-200 text-red-100 hover:text-white"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Instagram size={20} />
              </motion.a>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold text-white mb-6 border-b border-red-700 pb-2">Services</h4>
            <ul className="space-y-3">
              <motion.li whileHover={{ x: 5 }}>
                <RouterLink to="/services/network-planning" className="text-red-100 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 mr-2"></span>
                  Network Infrastructure
                </RouterLink>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <RouterLink to="/services/fiber-network" className="text-red-100 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 mr-2"></span>
                  Fiber Network
                </RouterLink>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <RouterLink to="/services/roll-out-services" className="text-red-100 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 mr-2"></span>
                  Roll-Out Services
                </RouterLink>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <RouterLink to="/services/pmo-service" className="text-red-100 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 mr-2"></span>
                  PMO as a Service
                </RouterLink>
              </motion.li>
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold text-white mb-6 border-b border-red-700 pb-2">Quick Links</h4>
            <ul className="space-y-3">
              <motion.li whileHover={{ x: 5 }}>
                <RouterLink to="/about" className="text-red-100 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 mr-2"></span>
                  About Us
                </RouterLink>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <RouterLink to="/resources" className="text-red-100 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 mr-2"></span>
                  Resources
                </RouterLink>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <RouterLink to="/contact" className="text-red-100 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 mr-2"></span>
                  Contact
                </RouterLink>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <RouterLink to="/privacy-policy" className="text-red-100 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 mr-2"></span>
                  Privacy Policy
                </RouterLink>
              </motion.li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold text-white mb-6 border-b border-red-700 pb-2">Contact Us</h4>
            <ul className="space-y-4">
              <motion.li 
                className="flex items-start"
                whileHover={{ x: 5 }}
              >
                <MapPin size={20} className="text-red-400 flex-shrink-0 mt-1 mr-3" />
                <span className="text-red-100">
                  Dijitalpark Teknokent, <br />
                  Eski Ankara Cd, No:4/3/6, <br />
                  Çekmeköy/Istanbul, Türkiye
                </span>
              </motion.li>
              <motion.li 
                className="flex items-center"
                whileHover={{ x: 5 }}
              >
                <Phone size={20} className="text-red-400 flex-shrink-0 mr-3" />
                <span className="text-red-100">+90 (216) 235 0762</span>
              </motion.li>
              <motion.li 
                className="flex items-center"
                whileHover={{ x: 5 }}
              >
                <Mail size={20} className="text-red-400 flex-shrink-0 mr-3" />
                <span className="text-red-100">info@centroservices.com</span>
              </motion.li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-red-700 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-red-200 text-sm">
              &copy; {new Date().getFullYear()} Centro Service. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <motion.a 
                href="#" 
                className="text-red-200 hover:text-white text-sm transition-colors duration-200"
                whileHover={{ y: -2 }}
              >
                Terms of Service
              </motion.a>
              <motion.div whileHover={{ y: -2 }}>
                <RouterLink to="/privacy-policy" className="text-red-200 hover:text-white text-sm transition-colors duration-200">
                  Privacy Policy
                </RouterLink>
              </motion.div>
              <motion.a 
                href="#" 
                className="text-red-200 hover:text-white text-sm transition-colors duration-200"
                whileHover={{ y: -2 }}
              >
                Cookie Policy
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
