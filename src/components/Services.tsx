"use client"

import React, { useState, useEffect } from "react"
import { Wifi, Server, Phone, Shield, Zap, Headphones, ArrowRight, ChevronRight, ChevronLeft } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"

interface ServiceProps {
  icon: React.ReactNode
  title: string
  description: string
  href: string
  image?: string
  category: string
  index: number
}

const ServiceCard = ({ icon, title, description, href, image, category, index }: ServiceProps) => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  return (
    <motion.div
      className={`group h-full ${isMobile && animationComplete ? 'mobile-hover' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        type: "spring",
        stiffness: 100, // Increased from 50 to 100
        damping: 15,    // Decreased from 20 to 15
        duration: 0.5,  // Decreased from 0.8 to 0.5
        delay: index * 0.05, // Decreased from 0.1 to 0.05
      }}
      onAnimationComplete={() => {
        // Set animation complete immediately without timeout
        setAnimationComplete(true);
      }}
    >
      <Link to={href} className="block h-full">
        <div
          className={`relative h-full bg-white rounded-2xl p-6 md:p-8 transition-all duration-500 hover:shadow-[0_0_50px_rgba(255,65,54,0.15)] border border-red-100/20 overflow-hidden ${
            isMobile && animationComplete ? 'shadow-[0_0_50px_rgba(255,65,54,0.15)]' : ''
          }`}
          style={{
            transformStyle: "preserve-3d",
            perspective: "1000px",
          }}
        >
          {/* Background gradient with image */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br from-red-50/90 to-white/90 transition-opacity duration-500 ${
              isMobile && animationComplete ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`} />
            <img
              src={image || "/placeholder.svg?height=400&width=600"}
              alt={title}
              className={`w-full h-full object-cover transition-opacity duration-500 ${
                isMobile && animationComplete ? 'opacity-20' : 'opacity-0 group-hover:opacity-20'
              }`}
              loading="lazy"
            />
          </div>

          {/* Content */}
          <div className="relative z-10">
            <span className={`inline-block px-3 py-1 text-xs font-medium bg-red-50 text-red-500 rounded-full mb-4 transition-all duration-300 ${
              isMobile && animationComplete ? 'bg-red-100 text-red-600' : 'group-hover:bg-red-100 group-hover:text-red-600'
            }`}>
              {category}
            </span>

            <div className="flex items-start justify-between">
              <motion.div
                className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-red-50 flex items-center justify-center text-red-500 mb-5 transition-all duration-500 ${
                  isMobile && animationComplete ? 'scale-110 bg-red-100 text-red-600' : 'group-hover:scale-110 group-hover:bg-red-100 group-hover:text-red-600'
                }`}
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
                animate={isMobile && animationComplete ? { rotate: [0, -10, 10, -10, 0] } : undefined}
              >
                {React.cloneElement(icon as React.ReactElement, { size: 28 })}
              </motion.div>
              <motion.div
                className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-red-400 transition-all duration-500 -translate-x-4 ${
                  isMobile && animationComplete ? 'opacity-100 translate-x-0' : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
                }`}
                animate={{ x: [0, 5, 0] }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              >
                <ArrowRight />
              </motion.div>
            </div>

            <h3 className={`text-xl md:text-2xl font-semibold text-gray-900 mb-3 transition-colors duration-500 line-clamp-2 ${
              isMobile && animationComplete ? 'text-red-600' : 'group-hover:text-red-600'
            }`}>
              {title}
            </h3>

            <p className={`text-sm md:text-base text-gray-600 leading-relaxed transition-colors duration-500 line-clamp-3 md:line-clamp-4 ${
              isMobile && animationComplete ? 'text-gray-700' : 'group-hover:text-gray-700'
            }`}>
              {description}
            </p>

            <div className={`mt-4 pt-4 border-t border-gray-100 flex items-center text-red-500 font-medium text-sm transition-all duration-300 transform ${
              isMobile && animationComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'
            }`}>
              Learn more
              <ChevronRight size={16} className="ml-1" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

const DesktopServiceSlider = ({ services }) => {
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 3
  const totalPages = Math.ceil(services.length / itemsPerPage)

  const nextPage = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1))
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1))
  }

  // Get the current page's services
  const currentServices = services.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)

  return (
    <div className="hidden md:block relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-3 gap-6 lg:gap-8"
        >
          {currentServices.map((service, index) => (
            <ServiceCard key={`${currentPage}-${index}`} {...service} index={index} />
          ))}

          {/* Add empty slots if needed to maintain grid */}
          {currentServices.length < itemsPerPage &&
            Array(itemsPerPage - currentServices.length)
              .fill(null)
              .map((_, i) => <div key={`empty-${i}`} className="hidden md:block" />)}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center items-center mt-10 space-x-4">
        <Button
          onClick={prevPage}
          variant="outline"
          size="icon"
          className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft size={20} />
        </Button>

        <div className="flex space-x-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                currentPage === index ? "bg-red-500 w-6" : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>

        <Button
          onClick={nextPage}
          variant="outline"
          size="icon"
          className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors"
          aria-label="Next page"
        >
          <ChevronRight size={20} />
        </Button>
      </div>
    </div>
  )
}

const MobileServiceCarousel = ({ services }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === services.length - 1 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? services.length - 1 : prevIndex - 1))
  }

  return (
    <div className="relative md:hidden">
      <div className="overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <ServiceCard {...services[currentIndex]} index={0} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Enhanced mobile navigation */}
      <div className="mt-8 flex flex-col items-center">
        {/* Service indicator dots */}
        <div className="flex space-x-2 mb-4">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 ${
                currentIndex === index 
                  ? "w-6 h-2.5 bg-red-500 rounded-full" 
                  : "w-2.5 h-2.5 bg-gray-300 rounded-full hover:bg-gray-400"
              }`}
              aria-label={`Go to service ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation buttons with service name preview */}
        <div className="flex items-center justify-between w-full px-2 mt-2">
          <Button
            onClick={prevSlide}
            variant="outline"
            className="group flex items-center space-x-1 py-2 px-3 border border-gray-200 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors"
            aria-label="Previous service"
          >
            <ChevronLeft size={18} />
            <span className="max-w-[80px] truncate text-xs hidden group-hover:inline-block transition-all">
              {services[(currentIndex === 0 ? services.length - 1 : currentIndex - 1)].title}
            </span>
          </Button>

          <div className="text-sm font-medium text-gray-500">
            {currentIndex + 1} / {services.length}
          </div>

          <Button
            onClick={nextSlide}
            variant="outline"
            className="group flex items-center space-x-1 py-2 px-3 border border-gray-200 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors"
            aria-label="Next service"
          >
            <span className="max-w-[80px] truncate text-xs hidden group-hover:inline-block transition-all">
              {services[(currentIndex === services.length - 1 ? 0 : currentIndex + 1)].title}
            </span>
            <ChevronRight size={18} />
          </Button>
        </div>
      </div>
    </div>
  )
}

const Services = () => {
  const services = [
    {
      icon: <Wifi />,
      title: "Network Planning & Optimization",
      description:
        "We offer network planning services to establish new networks and optimize legacy networks. Major service activities are Radio Network Planning, Transmission Network Planning and Indoor Network Planning.",
      href: "/services/network-planning",
      image: "/assets/network-planning-and-optimization-services.jpg",
      category: "Engineering",
    },
    {
      icon: <Server />,
      title: "Fiber Network Rollout",
      description:
        "Cutting-edge Fiber Network Rollout Solutions Of Centro, With Robust Presence And Unparalleled Global Experience/Ability With Multi-Domain Capabilities.",
      href: "/services/fiber-network",
      image: "/assets/fiber-optic.jpg",
      category: "Engineering",
    },
    {
      icon: <Phone />,
      title: "Roll-Out Back Office",
      description:
        "Centro Roll-out Back Office Services, allows customers to reach their desired network quality or expansion targets with the installation of their networks (All-Gs) much faster and systematic, by reducing the number of site visits and speeding up the acceptance processes with Scoping, Material Management, Close Out Package preparation services.",
      href: "/services/roll-out-services",
      image: "/assets/roll-out-back-office-services-centro.jpg",
      category: "Engineering",
    },
    {
      icon: <Shield />,
      title: "PMO-as-a Service",
      description:
        "As a concept, CENTRO offers a PMO-as-a-Service (PMOaaS) solution for organizations in the Telco and IT industries that want to improve their communication, governance, controls, execution, and profitability of programs. Our solution accelerates the deployment of standard project management methodology, tools, processes, and procedures, helping partners quick starts in a highly cost efficient form and avoid common errors, challenges in new engagements.",
      href: "/services/pmo-service",
      image: "assets/pmo-as-a-service.jpg",
      category: "Solutions",
    },
    {
      icon: <Zap />,
      title: "Consultancy & Training",
      description:
        "Centro consultancy team consists of highly skilled and globally experienced, industry/domain-centric certified solution architects and subject matter experts with global experiences in critical technologies such as but not limited with vRAN, OCP Deployment and holding globally recognized certifications of Red Hat OpenShift and Containers stream, VMware DC Virtualization stream, CCNP, CCNA, CCIE-DC, CCIERS, CISSP and PMI stream.",
      href: "/services/consultancy",
      image: "/assets/consulting.png",
      category: "Consultancy",
    },
    {
      icon: <Headphones />,
      title: "Technical Support",
      description:
        "Round-the-clock expert technical support ensuring your telecommunication systems operate at peak performance.",
      href: "/contact",
      image: "/assets/technical-support.jpg",
      category: "Support",
    },
  ]

  return (
    <section id="services" className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-white to-red-50/30">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ff413610_1px,transparent_1px),linear-gradient(to_bottom,#ff413610_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-96 h-96 rounded-full bg-red-100/20 blur-3xl"
            animate={{
              y: [0, 100, 0],
              x: [0, 50, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 25 + i * 5,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 10,
              ease: "easeInOut",
            }}
            style={{
              top: `${20 + i * 30}%`,
              right: `${-10 + i * 20}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-20">
          <motion.span
            className="inline-block px-4 py-1.5 bg-red-50 text-red-500 rounded-full text-sm font-medium mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our Services
          </motion.span>

          <motion.h2
            className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 20,
              delay: 0.1,
            }}
          >
            Telecommunication Excellence
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-gray-600"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 20,
              delay: 0.2,
            }}
          >
            Comprehensive solutions tailored to transform your telecommunications infrastructure
          </motion.p>
        </div>

        <div className="space-y-12">
          {/* Mobile carousel for services */}
          <MobileServiceCarousel services={services} />

          {/* Desktop slider for services */}
          <DesktopServiceSlider services={services} />
        </div>

        {/* View all services button */}
        <motion.div
          className="mt-12 md:mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link
            to="/services"
            className="inline-flex items-center px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full font-medium transition-colors duration-300"
          >
            View All Services
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default Services
