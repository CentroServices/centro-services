import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import testimonialsData from '../data/testimonials.json';

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [autoplay, setAutoplay] = useState(true);
  
  const testimonials = testimonialsData.testimonials;
  const partners = testimonialsData.partners;

  const nextTestimonial = () => {
    setDirection('right');
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection('left');
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoplay) {
      interval = setInterval(() => {
        nextTestimonial();
      }, 8000);
    }
    return () => clearInterval(interval);
  }, [autoplay]);

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

  const slideVariants = {
    enter: (direction: 'left' | 'right') => ({
      x: direction === 'right' ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: 'left' | 'right') => ({
      zIndex: 0,
      x: direction === 'left' ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    })
  };

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
          <motion.button 
            onClick={() => {
              prevTestimonial();
              setAutoplay(false);
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white rounded-full p-2 md:p-3 shadow-lg text-red-600 hover:text-red-800 z-10 hover:scale-110 transition-all duration-200"
            aria-label="Previous testimonial"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={24} />
          </motion.button>
          
          <motion.button 
            onClick={() => {
              nextTestimonial();
              setAutoplay(false);
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white rounded-full p-2 md:p-3 shadow-lg text-red-600 hover:text-red-800 z-10 hover:scale-110 transition-all duration-200"
            aria-label="Next testimonial"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={24} />
          </motion.button>
          
          <div className="overflow-hidden relative min-h-[400px] md:min-h-[300px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              {testimonials.map((testimonial, index) => (
                index === activeIndex && (
                  <motion.div 
                    key={testimonial.id}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                      scale: { duration: 0.2 }
                    }}
                    className="absolute w-full"
                  >
                    <div className="bg-red-50 rounded-2xl p-6 md:p-10 shadow-lg relative">
                      <div className="absolute top-6 right-6 text-red-200">
                        <Quote size={40} />
                      </div>
                      
                      <div className="flex flex-col md:flex-row items-center gap-6">
                        <motion.div 
                          className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden flex-shrink-0 border-4 border-white shadow-lg"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.3 }}
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
                            transition={{ delay: 0.4 }}
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
                            transition={{ delay: 0.5 }}
                          >
                            "{testimonial.content}"
                          </motion.blockquote>
                          
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                          >
                            <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                            <p className="text-gray-600">{testimonial.position}, {testimonial.company}</p>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>
          
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <motion.button 
                key={index}
                onClick={() => {
                  setDirection(index > activeIndex ? 'right' : 'left');
                  setActiveIndex(index);
                  setAutoplay(false);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${
                  index === activeIndex ? 'bg-red-600 scale-125' : 'bg-gray-300'
                }`}
                whileHover={{ scale: 1.5 }}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
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
          
          <div className="scroller" data-speed="slow">
            <div className="scroller__inner flex gap-4">
              {partners.map((partner) => (
                <motion.div 
                  key={partner.id}
                  className="flex items-center justify-center h-32 w-48"
                  whileHover={{ 
                    scale: 1.1,
                    transition: { type: "spring", stiffness: 400, damping: 10 }
                  }}
                >
                  <img 
                    src={partner.logo || "/placeholder.svg"}
                    alt={partner.name}
                    className="h-28 w-auto object-contain transition-all duration-300"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
