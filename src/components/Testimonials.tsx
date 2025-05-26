import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import testimonialsData from '../data/testimonials.json';
import { Button } from "./ui/button";
import { useNavigate } from 'react-router-dom';

const TestimonialCard = ({ testimonial, index }) => {
  return (
    <div className="bg-red-50 rounded-2xl p-6 md:p-10 shadow-lg relative">
      <div className="absolute top-6 right-6 text-red-200">
        <Quote size={40} />
      </div>
      
      <div className="flex flex-col md:flex-row items-center gap-6">
        <motion.div 
          className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden flex-shrink-0 border-4 border-white shadow-lg"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <img 
            src={testimonial.image || "/placeholder.svg"} 
            alt={testimonial.name} 
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        <div className="flex-1 text-center md:text-left">
          <motion.div 
            className="flex items-center justify-center md:justify-start mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={18} 
                className={i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"} 
              />
            ))}
          </motion.div>
          
          <motion.blockquote 
            className="text-lg md:text-xl text-gray-700 italic mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            "{testimonial.content}"
          </motion.blockquote>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
            <p className="text-gray-600">{testimonial.position}, {testimonial.company}</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const DesktopTestimonialSlider = ({ testimonials }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 1;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  // Get the current page's testimonial
  const currentTestimonial = testimonials[currentPage];

  return (
    <div className="hidden md:block relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          <TestimonialCard testimonial={currentTestimonial} index={0} />
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center items-center mt-10 space-x-4">
        <Button
          onClick={prevPage}
          variant="outline"
          size="icon"
          className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors"
          aria-label="Previous testimonial"
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
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <Button
          onClick={nextPage}
          variant="outline"
          size="icon"
          className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors"
          aria-label="Next testimonial"
        >
          <ChevronRight size={20} />
        </Button>
      </div>
    </div>
  );
};

const MobileTestimonialCarousel = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

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
            <TestimonialCard testimonial={testimonials[currentIndex]} index={0} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Enhanced mobile navigation */}
      <div className="mt-8 flex flex-col items-center">
        {/* Testimonial indicator dots */}
        <div className="flex space-x-2 mb-4">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 ${
                currentIndex === index 
                  ? "w-6 h-2.5 bg-red-500 rounded-full" 
                  : "w-2.5 h-2.5 bg-gray-300 rounded-full hover:bg-gray-400"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation buttons with testimonial name preview */}
        <div className="flex items-center justify-between w-full px-2 mt-2">
          <Button
            onClick={prevSlide}
            variant="outline"
            className="group flex items-center py-2 px-3 border border-gray-200 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={18} />
          </Button>

          <div className="text-sm font-medium text-gray-500">
            {currentIndex + 1} / {testimonials.length}
          </div>

          <Button
            onClick={nextSlide}
            variant="outline"
            className="group flex items-center py-2 px-3 border border-gray-200 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const testimonials = testimonialsData.testimonials;
  const partners = testimonialsData.partners;
  const navigate = useNavigate();

  useEffect(() => {
    const addAnimation = () => {
      const scrollers = document.querySelectorAll(".scroller");
      scrollers.forEach((scroller) => {
        scroller.setAttribute("data-animated", "true");
        
        const scrollerInner = scroller.querySelector(".scroller__inner");
        if (scrollerInner) {
          const scrollerContent = Array.from(scrollerInner.children);
          scrollerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true);
            if (duplicatedItem instanceof Element) {
              duplicatedItem.setAttribute("aria-hidden", "true");
              scrollerInner.appendChild(duplicatedItem);
            }
          });
        }
      });
    };

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      addAnimation();
    }
  }, []);

  return (
    <section className="py-20 bg-white overflow-hidden">
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
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about our telecommunications solutions.
          </p>
        </motion.div>
        
        <div className="relative max-w-4xl mx-auto mb-20">
          <DesktopTestimonialSlider testimonials={testimonials} />
          <MobileTestimonialCarousel testimonials={testimonials} />
        </div>
        
        <motion.div 
          className="mt-20 pt-20 border-t border-gray-100"
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
          <h3 className="text-center text-xl font-semibold text-gray-700 mb-10">
            Trusted by Leading Companies in Turkey
          </h3>
          
          {/* Enhanced Partners Slider */}
          <div className="relative overflow-hidden py-6 px-2">
            {/* Gradient overlays for better visual effect */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10"></div>
            
            <div className="scroller" data-speed="slow">
              <div className="scroller__inner flex gap-8 items-center">
                {partners.map((partner) => (
                  <motion.div 
                    key={partner.id}
                    className="flex items-center justify-center h-32 w-48 px-4 filter grayscale hover:grayscale-0 transition-all duration-700"
                    whileHover={{ 
                      scale: 1.15,
                      filter: "grayscale(0)",
                      transition: { 
                        type: "spring", 
                        stiffness: 300, 
                        damping: 15,
                        duration: 1.2
                      }
                    }}
                  >
                    <img 
                      src={partner.logo || "/placeholder.svg"}
                      alt={partner.name}
                      className="h-28 w-auto object-contain transition-all duration-500 hover:shadow-lg"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Add partner description section */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 max-w-3xl mx-auto">
              We collaborate with industry leaders to deliver cutting-edge telecommunications solutions that meet the highest standards of quality and reliability.
            </p>
            <motion.button
              className="mt-6 px-6 py-2 bg-red-50 text-red-600 rounded-full font-medium hover:bg-red-100 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 17 
              }}
              onClick={handlePartnerClick}
            >
              Become a Partner
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;

const handlePartnerClick = () => {
  // Smooth transition to contact page
  navigate('/contact', { 
    state: { 
      fromPartners: true,
      partnerSection: true 
    } 
  });
};
