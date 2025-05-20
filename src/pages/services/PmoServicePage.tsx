import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, Target, Users, TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react';
import Breadcrumbs from '../../components/Breadcrumbs';
import { Button } from '../../components/ui/button';

const PmoServicePage = () => {
  return (
    <div className="pt-20">
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8">
            <Breadcrumbs 
              items={[
                { label: 'Services', href: '/services' },
                { label: 'PMO-as-a Service' }
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
              PMO-as-a Service
            </h1>
            <p className="text-xl text-gray-600">
              Professional project management office services to ensure your telecommunications projects are delivered on time, within budget, and to the highest standards.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Streamline Your Project Management
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Our PMO service provides a structured approach to project management, ensuring consistent delivery of telecommunications infrastructure projects through standardized methodologies and best practices.
              </p>
              <ul className="space-y-4">
                {[
                  'Standardized project management methodologies',
                  'Resource optimization and allocation',
                  'Risk management and mitigation',
                  'Project portfolio management',
                  'Performance tracking and reporting'
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
                  src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg" 
                  alt="PMO Service" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {[
              {
                icon: <ClipboardList className="w-8 h-8" />,
                title: 'Project Planning',
                description: 'Comprehensive project planning and scheduling to ensure clear objectives and timelines.'
              },
              {
                icon: <Target className="w-8 h-8" />,
                title: 'Goal Alignment',
                description: 'Ensure all projects align with your organizational objectives and strategy.'
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: 'Resource Management',
                description: 'Optimal allocation and management of project resources and team members.'
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: 'Performance Tracking',
                description: 'Regular monitoring and reporting of project progress and performance metrics.'
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
                Ready to Transform Your Project Management?
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                Let us help you streamline your project management processes and deliver successful telecommunications projects.
              </p>
              <Button
                size="lg"
                className="bg-primary-600 hover:bg-primary-700"
                onClick={() => window.location.href = '/contact'}
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

export default PmoServicePage;