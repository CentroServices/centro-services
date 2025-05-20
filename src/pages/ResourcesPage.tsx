import React from 'react';
import Resources from '../components/Resources';
import Breadcrumbs from '../components/Breadcrumbs';

const ResourcesPage = () => {
  return (
    <div className="pt-20">
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8">
            <Breadcrumbs 
              items={[
                { label: 'About Us', href: '/about' },
                { label: 'Resources' }
              ]} 
            />
          </div>
          <Resources />
        </div>
      </section>
    </div>
  );
};

export default ResourcesPage;