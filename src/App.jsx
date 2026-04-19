import { useState } from 'react';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Lightbox from './components/Lightbox';

export default function App() {
  const [lightboxSrc, setLightboxSrc] = useState(null);

  return (
    <>
      {/* Background blobs */}
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>

      {/* Custom cursor */}
      <CustomCursor />

      {/* Navigation */}
      <Navbar />

      {/* Hero */}
      <Hero />

      {/* Marquee */}
      <Marquee />

      {/* About */}
      <About />

      <div className="section-divider"></div>

      {/* Skills */}
      <Skills />

      <div className="section-divider"></div>

      {/* Projects */}
      <Projects onOpenLightbox={(src) => setLightboxSrc(src)} />

      <div className="section-divider"></div>

      {/* Contact */}
      <Contact />

      {/* Footer */}
      <Footer />

      {/* Lightbox */}
      <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </>
  );
}
