import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import SEO from './components/SEO';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ResourcesPage from './pages/ResourcesPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import NewsPage from './pages/NewsPage';
import NewsDetailsPage from './pages/NewsDetailsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import ServicesPage from './pages/ServicesPage';
import NetworkPlanningPage from './pages/services/NetworkPlanningPage';
import FiberNetworkPage from './pages/services/FiberNetworkPage';
import RollOutServicesPage from './pages/services/RollOutServicesPage';
import PmoServicePage from './pages/services/PmoServicePage';
import ConsultancyPage from './pages/services/ConsultancyPage';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ScrollToTopButton from './components/ScrollToTopButton';
import CookieConsent from './components/CookieConsent';

function App() {

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.cookiehub.eu/c2/44aa996f.js';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      const cpm = {};
      if (window.cookiehub) {
        window.cookiehub.load(cpm);
      }
    };

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <SEO />
        <AnimatePresence>
          <motion.div
            className="min-h-screen overflow-x-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Header />
            <main className="overflow-x-hidden">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/services/network-planning" element={<NetworkPlanningPage />} />
                <Route path="/services/fiber-network" element={<FiberNetworkPage />} />
                <Route path="/services/roll-out-services" element={<RollOutServicesPage />} />
                <Route path="/services/pmo-service" element={<PmoServicePage />} />
                <Route path="/services/consultancy" element={<ConsultancyPage />} />
                <Route path="/resources" element={<ResourcesPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/news/:id" element={<NewsDetailsPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              </Routes>
            </main>
            <Footer />
            <CookieConsent />
            <ScrollToTopButton />
          </motion.div>
        </AnimatePresence>
      </Router>
    </HelmetProvider>
  );
}

export default App;