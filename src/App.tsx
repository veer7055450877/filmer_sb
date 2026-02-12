import React, { useEffect, useState, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import SilkyBackground from './components/ui/SilkyBackground';
import FilmLoader from './components/ui/FilmLoader';
import CustomCursor from './components/ui/CustomCursor';
import FloatingControls from './components/ui/ScrollProgressBtn';
import CookieConsent from './components/ui/CookieConsent';
import PromoPopup from './components/ui/PromoPopup';

// Lazy Load Pages
const Home = React.lazy(() => import('./pages/Home'));
const Portfolio = React.lazy(() => import('./pages/Portfolio'));
const Services = React.lazy(() => import('./pages/Services'));
const Packages = React.lazy(() => import('./pages/Packages'));
const About = React.lazy(() => import('./pages/About'));
const Contact = React.lazy(() => import('./pages/Contact'));
const AdminLogin = React.lazy(() => import('./pages/Admin/Login'));
const AdminDashboard = React.lazy(() => import('./pages/Admin/Dashboard'));

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cinematic-black">
      <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <HelmetProvider>
      <AnimatePresence>
        {loading && <FilmLoader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <Router>
          <ScrollToTop />
          <CustomCursor />
          <FloatingControls />
          <CookieConsent />
          <PromoPopup />
          
          <SilkyBackground />
          
          <div className="min-h-screen relative z-10 flex flex-col font-sans">
            <Navbar />
            <main className="flex-grow">
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/packages" element={<Packages />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  
                  {/* Admin Routes */}
                  <Route path="/admin" element={<AdminLogin />} />
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </Router>
      )}
    </HelmetProvider>
  );
}

export default App;
