import React from 'react';
import Contact from '../components/Contact';
import Breadcrumbs from '../components/Breadcrumbs';

const ContactPage = () => {
  return (
    <div className="pt-20">
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8">
            <Breadcrumbs items={[{ label: 'Contact' }]} />
          </div>
          <Contact />
        </div>
      </section>
    </div>
  );
};

export default ContactPage;