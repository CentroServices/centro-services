import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileSpreadsheet, ClipboardList, BarChart, ArrowRight, CheckCircle2 } from 'lucide-react';
import Breadcrumbs from '../../components/Breadcrumbs';
import { Button } from '../../components/ui/button';
import { useNavigate } from 'react-router-dom';

const RollOutServicesPage = () => {
  const navigate = useNavigate();
  
  const handleContactClick = () => {
    navigate('/contact');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="pt-20">
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8">
            <Breadcrumbs 
              items={[
                { label: 'Services', href: '/services' },
                { label: 'Roll-Out Back Office Services' }
              ]} 
            />
          </div>

          <motion.div 
            className="max-w-3xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Roll-Out Back Office Services
            </h1>
            <p className="text-xl text-gray-600">
              Streamline your network deployment with our comprehensive roll-out back office services.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Efficient Network Deployment
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Our roll-out back office services help you achieve network quality and expansion targets faster and more systematically.
              </p>
              <ul className="space-y-4">
                {[
                  'Systematic project documentation',
                  'Material management and tracking',
                  'Close-out package preparation',
                  'Quality assurance processes',
                  'Deployment timeline optimization'
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-red-600 mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative"
            >
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-red-200 rounded-lg" style={{ zIndex: 1 }}></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-red-100 rounded-lg" style={{ zIndex: 1 }}></div>
              <div className="aspect-video rounded-xl overflow-hidden shadow-lg relative" style={{ zIndex: 2 }}>
                <img 
                  src="/src/assets/engineering-alt-1.jpg" 
                  alt="Roll-Out Services" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {[
              {
                icon: <FileSpreadsheet className="w-8 h-8" />,
                title: 'Documentation',
                description: 'Comprehensive documentation and reporting for all network deployments.'
              },
              {
                icon: <ClipboardList className="w-8 h-8" />,
                title: 'Process Management',
                description: 'Streamlined processes for efficient network implementation.'
              },
              {
                icon: <BarChart className="w-8 h-8" />,
                title: 'Performance Tracking',
                description: 'Detailed tracking and analysis of deployment metrics.'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-red-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-red-50 rounded-2xl p-8 md:p-12"
          >
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Streamline Your Network Deployment
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                Let us help you optimize your network roll-out processes for faster and more efficient deployment.
              </p>
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700"
                onClick={handleContactClick}
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default RollOutServicesPage;