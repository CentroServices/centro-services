import React from 'react';
import { motion } from 'framer-motion';
import { Radio, Signal, Building, ArrowRight, CheckCircle2 } from 'lucide-react';
import Breadcrumbs from '../../components/Breadcrumbs';
import { Button } from '../../components/ui/button';

const NetworkPlanningPage = () => {
  return (
    <div className="pt-20">
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8">
            <Breadcrumbs 
              items={[
                { label: 'Services', href: '/services' },
                { label: 'Network Planning & Optimization' }
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
              Network Planning & Optimization Services
            </h1>
            <p className="text-xl text-gray-600">
              Comprehensive network planning and optimization solutions to establish new networks and enhance existing infrastructure performance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Expert Network Planning Solutions
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Our network planning services cover all aspects of telecommunications infrastructure, from initial design to optimization and maintenance.
              </p>
              <ul className="space-y-4">
                {[
                  'Comprehensive coverage analysis',
                  'Capacity planning and optimization',
                  'Frequency allocation management',
                  'Network performance monitoring',
                  'Quality of service optimization'
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-primary-600 mr-3" />
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
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-200 rounded-lg" style={{ zIndex: 1 }}></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary-100 rounded-lg" style={{ zIndex: 1 }}></div>
              <div className="aspect-video rounded-xl overflow-hidden shadow-lg relative" style={{ zIndex: 2 }}>
                <img 
                  src="/src/assets/engineering-alt-1.jpg" 
                  alt="Network Planning" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {[
              {
                icon: <Radio className="w-8 h-8" />,
                title: 'Radio Network Planning',
                description: 'Comprehensive radio network planning including coverage analysis and capacity planning.'
              },
              {
                icon: <Signal className="w-8 h-8" />,
                title: 'Transmission Planning',
                description: 'End-to-end transmission network design and optimization solutions.'
              },
              {
                icon: <Building className="w-8 h-8" />,
                title: 'Indoor Solutions',
                description: 'Specialized indoor network planning for optimal coverage in buildings.'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 mb-4">
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
            className="bg-primary-50 rounded-2xl p-8 md:p-12"
          >
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Ready to Optimize Your Network?
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                Let our experts help you plan and optimize your network infrastructure for maximum performance and reliability.
              </p>
              <Button
                size="lg"
                className="bg-primary-600 hover:bg-primary-700"
                onClick={() => window.location.href = '/contact'}
              >
                Contact Our Experts
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default NetworkPlanningPage;