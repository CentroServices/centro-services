import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Testimonials from '../components/Testimonials';

const HomePage = () => {
  return (
    <>
      <Hero />
      <About />
      <div className="pt-20">
        <Services />
      </div>
      <Testimonials />
    </>
  );
};

export default HomePage;