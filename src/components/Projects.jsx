import { useCallback } from 'react';
import useReveal from '../hooks/useReveal';
import cricktopImg from '../assets/cricktop.jpg';
import emploi1 from '../assets/emploi-1.png';
import emploi2 from '../assets/emploi-2.png';
import emploi3 from '../assets/emploi-3.png';

const emploiImages = [emploi1, emploi2, emploi3];

export default function Projects({ onOpenLightbox }) {
  const revealRef1 = useReveal();
  const revealRef2 = useReveal();
  const revealRef3 = useReveal();

  const handleCardMouse = useCallback((e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', ((e.clientX - rect.left) / rect.width * 100) + '%');
    el.style.setProperty('--my', ((e.clientY - rect.top) / rect.height * 100) + '%');
  }, []);

  return (
    <section id="projects">
      <div className="section-label reveal" ref={revealRef1}>03 — Selected Work</div>
      <div className="section-title reveal" ref={revealRef2}>
        Projects that<br /><span className="highlight">speak louder.</span>
      </div>
      <div className="projects-grid reveal" ref={revealRef3}>

        {/* Featured — CrickTop */}
        <div className="project-card featured" onMouseMove={handleCardMouse}>
          <div className="project-num">01 / <span>FEATURED</span></div>
          <div className="project-name">CrickTop</div>
          <div className="project-preview" onClick={() => onOpenLightbox(cricktopImg)}>
            <img src={cricktopImg} alt="CrickTop App UI Design" />
            <div className="project-preview-overlay"></div>
          </div>
          <p className="project-desc">
            A full-featured sports mobile app built around community and content. CrickTop lets users
            post, edit, and share short-form reels, DM friends, follow live match highlights across
            all major sports, and stay connected with a passionate fan community — all in one sleek,
            dark-themed experience.
          </p>
          <div className="project-footer">
            <span className="project-tag pink">Mobile App</span>
            <span className="project-tag purple">UX/UI Design</span>
            <span className="project-tag lime">Sports</span>
            <div className="project-arrow">→</div>
          </div>
        </div>

        {/* Emploi Rapide */}
        <div className="project-card" onMouseMove={handleCardMouse}>
          <div className="project-num">02</div>
          <div className="project-name">Emploi Rapide</div>
          <div className="project-preview" onClick={() => onOpenLightbox(emploiImages)}>
            <img src={emploi1} alt="Emploi Rapide UI Design" />
            <div className="project-preview-overlay"></div>
            <div className="project-preview-count">+{emploiImages.length} screens</div>
          </div>
          <p className="project-desc">
            A modern job-hunting platform designed to connect talent with opportunity — fast.
            Emploi Rapide features smart job search with filters, one-click applications,
            real-time application tracking, and a personalised dashboard with analytics,
            making the job hunt as frictionless as possible.
          </p>
          <div className="project-footer">
            <span className="project-tag lime">Web App</span>
            <span className="project-tag pink">UX/UI Design</span>
            <span className="project-tag purple">Product Design</span>
            <div className="project-arrow">→</div>
          </div>
        </div>

        {/* Coming Soon */}
        <div className="project-card" onMouseMove={handleCardMouse}>
          <div className="project-num">03</div>
          <div className="project-name">Coming Soon</div>
          <p className="project-desc">
            Another project slot waiting to be filled. Share your work and it'll be built
            into a proper showcase card.
          </p>
          <div className="project-footer">
            <span className="project-tag pink">Marketing</span>
            <span className="project-tag lime">Social</span>
            <div className="project-arrow">→</div>
          </div>
        </div>

      </div>
    </section>
  );
}
