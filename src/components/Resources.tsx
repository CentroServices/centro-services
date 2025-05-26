import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Shield, Award, Leaf, Scale, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';

const Resources = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15,
        duration: 0.6 
      }
    }
  };

  const documents = [
    {
      title: "Health and Safety Policy",
      description: "Our commitment to maintaining a safe and healthy workplace environment.",
      icon: <Shield className="w-6 h-6" />,
      downloadUrl: "/assets/documents/health-and-safety-policy.pdf",
      fileSize: "1.2 MB",
      lastUpdated: "2024-02-15"
    },
    {
      title: "Environment Policy",
      description: "Our environmental sustainability practices and commitments.",
      icon: <Leaf className="w-6 h-6" />,
      downloadUrl: "/assets/documents/environment-policy.pdf",
      fileSize: "1.1 MB",
      lastUpdated: "2024-02-10"
    },
    {
      title: "ISO 45001:2018 Certificate",
      description: "Occupational Health and Safety Management System certification.",
      icon: <Award className="w-6 h-6" />,
      downloadUrl: "/assets/documents/iso-45001-certificate.pdf",
      fileSize: "3.9 MB",
      lastUpdated: "2024-01-20"
    },
    {
      title: "ISO 14001:2015 Certificate",
      description: "Environmental Management System certification.",
      icon: <CheckCircle2 className="w-6 h-6" />,
      downloadUrl: "/assets/documents/iso-14001-certificate.pdf",
      fileSize: "3.3 MB",
      lastUpdated: "2024-01-15"
    },
    {
      title: "ISO 27001:2013 Certificate",
      description: "Information Security Management System certification.",
      icon: <Shield className="w-6 h-6" />,
      downloadUrl: "/assets/documents/iso-27001-certificate.pdf",
      fileSize: "2.7 MB",
      lastUpdated: "2024-01-10"
    },
    {
      title: "ISO 9001:2015 Certificate",
      description: "Quality Management System certification.",
      icon: <Award className="w-6 h-6" />,
      downloadUrl: "/assets/documents/iso-9001-certificate.pdf",
      fileSize: "4.1 MB",
      lastUpdated: "2024-01-05"
    },
    {
      title: "ISO 22301:2012 Certificate",
      description: "Business Continuity Management System certification.",
      icon: <Scale className="w-6 h-6" />,
      downloadUrl: "/assets/documents/iso-22301-certificate.pdf",
      fileSize: "3.7 MB",
      lastUpdated: "2024-01-01"
    }
  ];

  return (
    <div className="pt-20">
      <section className="py-20 bg-white">
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
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Resources & Documentation
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access our company policies, certifications, and important documents. All documents are available for download or viewing online.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {documents.map((doc, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-red-100"
                whileHover={{ 
                  y: -8,
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center text-red-500 flex-shrink-0">
                    {doc.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {doc.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {doc.description}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <FileText className="w-4 h-4 mr-2" />
                      <span className="mr-4">{doc.fileSize}</span>
                      <span>Updated: {doc.lastUpdated}</span>
                    </div>
                    <div className="flex space-x-3">
                      <Button
                        variant="default"
                        size="sm"
                        className="flex items-center bg-red-600 hover:bg-red-700"
                        onClick={() => window.open(doc.downloadUrl, '_blank')}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                        onClick={() => window.open(doc.downloadUrl, '_blank')}
                      >
                        View Online
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="mt-16 p-8 bg-red-50 rounded-xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              type: "spring", 
              stiffness: 50, 
              damping: 20,
              delay: 0.4 
            }}
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Need Additional Resources?
              </h2>
              <p className="text-gray-600 mb-6">
                Can't find what you're looking for? Our team is here to help you with any additional documentation or information you might need.
              </p>
              <Button
                variant="default"
                size="lg"
                className="bg-red-600 hover:bg-red-700"
                onClick={() => window.location.href = '/contact'}
              >
                Contact Support
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Resources;
