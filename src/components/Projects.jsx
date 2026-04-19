import { useCallback } from 'react';
import useReveal from '../hooks/useReveal';
import cricktopImg from '../assets/cricktop.jpg';

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
        {/* Featured Project */}
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

        {/* Coming Soon 1 */}
        <div className="project-card" onMouseMove={handleCardMouse}>
          <div className="project-num">02</div>
          <div className="project-name">Coming Soon</div>
          <p className="project-desc">
            Drop your next project details and this slot is yours — branding, social campaign,
            design system, whatever you've built.
          </p>
          <div className="project-footer">
            <span className="project-tag lime">Branding</span>
            <span className="project-tag purple">Identity</span>
            <div className="project-arrow">→</div>
          </div>
        </div>

        {/* Coming Soon 2 */}
        <div className="project-card" onMouseMove={handleCardMouse}>
          <div className="project-num">03</div>
          <div className="project-name">Coming Soon</div>
          <p className="project-desc">
            Another project slot waiting to be filled. Share your work and I'll build it into a
            proper showcase card.
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
