import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, ChevronDown, ChevronRight, ArrowLeft, LayoutGrid, Info, Newspaper, Phone } from 'lucide-react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Link } from './ui/Link';
import { motion, AnimatePresence } from 'framer-motion';

const serviceCategories = [
  {
    title: 'Engineering Services',
    items: [
      { name: 'Network Planning & Optimization Services', href: '/services/network-planning' },
      { name: 'Fiber Network Rollout Services', href: '/services/fiber-network' },
      { name: 'Roll-Out Back Office Services', href: '/services/roll-out-services' }
    ]
  },
  {
    title: 'Solutions',
    items: [
      { name: 'PMO as a Service', href: '/services/pmo-service' }
    ]
  },
  {
    title: 'Consultancy Services For Telco & IT',
    items: [
      { name: 'Consultancy & Training', href: '/services/consultancy' }
    ]
  }
];

const aboutItems = [
  { name: 'About Us', href: '/about' },
  { name: 'Resources', href: '/resources' }
];

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'tr'>('en');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setExpandedSection(null);
  }, [location]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleLanguage = () => setLanguage(language === 'en' ? 'tr' : 'en');
  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const shouldInvertLogo = !isScrolled && location.pathname === '/' && !isMenuOpen;

  // Add a background color to the header when at the top of the homepage
  const headerBgClass = !isScrolled && location.pathname === '/' && !isMenuOpen 
    ? 'bg-black/30 backdrop-blur-sm' 
    : 'bg-white shadow-md';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled || location.pathname !== '/' || isMenuOpen ? 'bg-white shadow-md py-3' : `${headerBgClass} py-5`
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <RouterLink to="/" className="relative z-50">
            <img 
              src="/assets/logo/centrologo.png" 
              alt="Centro Service Solutions" 
              className={`h-12 w-auto transition-all duration-300 ${shouldInvertLogo ? 'brightness-0 invert' : ''}`}
            />
          </RouterLink>
          
          {/* Desktop Navigation - Unchanged */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-8">
              <div className="relative group">
                <RouterLink 
                  to="/services"
                  className={`flex items-center space-x-2 font-medium transition-colors duration-200 hover:text-red-500 ${
                    isScrolled || location.pathname !== '/' ? 'text-gray-800' : 'text-white'
                  }`}
                >
                  <LayoutGrid size={18} />
                  <span>{language === 'en' ? 'Services' : 'Hizmetler'}</span>
                  <ChevronDown size={16} className="transition-transform duration-200 group-hover:rotate-180" />
                </RouterLink>

                <div className="absolute left-0 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <motion.div 
                    className="w-[400px] bg-white rounded-lg shadow-lg p-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {serviceCategories.map((category, index) => (
                      <div key={index} className="mb-4 last:mb-0">
                        <h3 className="text-sm font-semibold text-gray-500 mb-2">{category.title}</h3>
                        {category.items.map((item, itemIndex) => (
                          <RouterLink
                            key={itemIndex}
                            to={item.href}
                            className="block px-4 py-2 text-sm text-gray-700 rounded-md hover:bg-red-50 hover:text-red-500"
                          >
                            {item.name}
                          </RouterLink>
                        ))}
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>

              <div className="relative group">
                <RouterLink 
                  to="/about"
                  className={`flex items-center space-x-2 font-medium transition-colors duration-200 hover:text-red-500 ${
                    isScrolled || location.pathname !== '/' ? 'text-gray-800' : 'text-white'
                  }`}
                >
                  <Info size={18} />
                  <span>{language === 'en' ? 'About' : 'Hakkımızda'}</span>
                  <ChevronDown size={16} className="transition-transform duration-200 group-hover:rotate-180" />
                </RouterLink>

                <div className="absolute left-0 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <motion.div 
                    className="min-w-[220px] bg-white rounded-lg shadow-lg p-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {aboutItems.map((item, index) => (
                      <RouterLink
                        key={index}
                        to={item.href}
                        className="block px-4 py-3 text-sm text-gray-700 rounded-md hover:bg-red-50 hover:text-red-500"
                      >
                        {item.name}
                      </RouterLink>
                    ))}
                  </motion.div>
                </div>
              </div>

              <RouterLink 
                to="/news"
                className={`flex items-center space-x-2 font-medium transition-colors duration-200 hover:text-red-500 ${
                  isScrolled || location.pathname !== '/' ? 'text-gray-800' : 'text-white'
                }`}
              >
                <Newspaper size={18} />
                <span>{language === 'en' ? 'News' : 'Haberler'}</span>
              </RouterLink>
              
              <RouterLink 
                to="/contact"
                className={`flex items-center space-x-2 font-medium transition-colors duration-200 hover:text-red-500 ${
                  isScrolled || location.pathname !== '/' ? 'text-gray-800' : 'text-white'
                }`}
              >
                <Phone size={18} />
                <span>{language === 'en' ? 'Contact' : 'İletişim'}</span>
              </RouterLink>
            </nav>
            
            <button 
              onClick={toggleLanguage}
              className={`flex items-center space-x-1 transition-colors duration-200 hover:text-red-500 ${
                isScrolled || location.pathname !== '/' ? 'text-gray-800' : 'text-white'
              }`}
            >
              <Globe size={18} />
              <span>{language === 'en' ? 'EN' : 'TR'}</span>
            </button>
          </div>
          
          {/* Mobile Menu Toggle Button - Enhanced */}
          <motion.button
            onClick={toggleMenu}
            className={`md:hidden relative z-50 p-2 rounded-full transition-all duration-300 ${
              isMenuOpen 
                ? 'bg-red-50 text-red-500' 
                : `${isScrolled || location.pathname !== '/' ? 'text-gray-800' : 'text-white'}`
            } hover:bg-red-50 hover:text-red-500`}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu - Enhanced */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 bg-white/95 backdrop-blur-sm z-40 md:hidden overflow-hidden flex flex-col"
          >
            <div className="flex-1 overflow-y-auto">
              <div className="min-h-screen flex flex-col pt-24 px-6">
                <AnimatePresence mode="wait">
                  {expandedSection ? (
                    <motion.div
                      key="expanded"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ type: "spring", stiffness: 300, damping: 26 }}
                      className="w-full"
                    >
                      <motion.button
                        onClick={() => setExpandedSection(null)}
                        className="flex items-center text-gray-600 mb-8 hover:text-red-500 transition-colors duration-200"
                        whileHover={{ x: -5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <ArrowLeft size={20} className="mr-2" />
                        <span>Back to Menu</span>
                      </motion.button>

                      {expandedSection === 'services' && (
                        <div className="space-y-8">
                          {serviceCategories.map((category, index) => (
                            <motion.div 
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">{category.title}</h3>
                              <div className="space-y-3 pl-2 border-l-2 border-red-100">
                                {category.items.map((item, itemIndex) => (
                                  <motion.div
                                    key={itemIndex}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: (index * 0.1) + (itemIndex * 0.05) }}
                                  >
                                    <RouterLink
                                      to={item.href}
                                      className="block py-2 pl-3 text-gray-800 hover:text-red-500 hover:bg-red-50 rounded-r-lg transition-all duration-200"
                                      onClick={toggleMenu}
                                    >
                                      {item.name}
                                    </RouterLink>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}

                      {expandedSection === 'about' && (
                        <div className="space-y-4 pl-2 border-l-2 border-red-100">
                          {aboutItems.map((item, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <RouterLink
                                to={item.href}
                                className="block py-3 pl-3 text-gray-800 hover:text-red-500 hover:bg-red-50 rounded-r-lg transition-all duration-200"
                                onClick={toggleMenu}
                              >
                                {item.name}
                              </RouterLink>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <motion.nav
                      key="main-menu"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full space-y-5"
                    >
                      {/* Main menu items with staggered animation */}
                      {[
                        { icon: <LayoutGrid size={22} />, text: language === 'en' ? 'Services' : 'Hizmetler', action: () => toggleSection('services'), hasSubmenu: true },
                        { icon: <Info size={22} />, text: language === 'en' ? 'About' : 'Hakkımızda', action: () => toggleSection('about'), hasSubmenu: true },
                        { icon: <Newspaper size={22} />, text: language === 'en' ? 'News' : 'Haberler', link: '/news' },
                        { icon: <Phone size={22} />, text: language === 'en' ? 'Contact' : 'İletişim', link: '/contact' }
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1, type: "spring", stiffness: 300, damping: 24 }}
                          className="overflow-hidden"
                        >
                          {item.link ? (
                            <RouterLink
                              to={item.link}
                              className="flex items-center justify-between w-full p-4 text-lg font-medium text-gray-800 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200"
                              onClick={toggleMenu}
                            >
                              <div className="flex items-center">
                                <span className="bg-red-50 p-2 rounded-lg mr-3 text-red-500">{item.icon}</span>
                                <span>{item.text}</span>
                              </div>
                            </RouterLink>
                          ) : (
                            <button
                              onClick={item.action}
                              className="flex items-center justify-between w-full p-4 text-lg font-medium text-gray-800 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200"
                            >
                              <div className="flex items-center">
                                <span className="bg-red-50 p-2 rounded-lg mr-3 text-red-500">{item.icon}</span>
                                <span>{item.text}</span>
                              </div>
                              {item.hasSubmenu && <ChevronRight size={20} className="text-gray-400" />}
                            </button>
                          )}
                        </motion.div>
                      ))}

                      {/* Language toggle */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, type: "spring", stiffness: 300, damping: 24 }}
                        className="pt-6 mt-6 border-t border-gray-100"
                      >
                        <button 
                          onClick={() => {
                            toggleLanguage();
                            toggleMenu();
                          }}
                          className="flex items-center space-x-3 mx-auto p-3 rounded-full bg-gray-50 text-gray-700 hover:bg-red-50 hover:text-red-500 transition-all duration-200"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Globe size={20} />
                          <span className="font-medium">{language === 'en' ? 'English' : 'Türkçe'}</span>
                        </button>
                      </motion.div>
                    </motion.nav>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
