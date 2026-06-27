import { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import CustomCursor from './components/CustomCursor';
import DotGrid from './components/DotGrid';
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
  const [lightboxImages, setLightboxImages] = useState(null);

  return (
    <>
      <DotGrid />
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>
      <CustomCursor />
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <div className="section-divider"></div>
      <Skills />
      <div className="section-divider"></div>
      <Projects onOpenLightbox={(imgs) => setLightboxImages(imgs)} />
      <div className="section-divider"></div>
      <Contact />
      <Footer />
      <Lightbox images={lightboxImages} onClose={() => setLightboxImages(null)} />
      <Analytics />
    </>
  );
}
