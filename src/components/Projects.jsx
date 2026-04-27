import { useCallback } from 'react';
import useReveal from '../hooks/useReveal';
import cricktopIntro from '../assets/cricktop/intro.png';
import cricktopLogin from '../assets/cricktop/login.png';
import cricktopProfile from '../assets/cricktop/profile.png';
import cricktopEditProfile from '../assets/cricktop/edit-profile.png';
import cricktopDms from '../assets/cricktop/dms.png';
import cricktopNotifications from '../assets/cricktop/notifications.png';
import cricktopNoActivity from '../assets/cricktop/no-activity-prompt.png';
import emploi1 from '../assets/emploi-1.png';
import emploi2 from '../assets/emploi-2.png';
import emploi3 from '../assets/emploi-3.png';
import parhlaiCoverImg from '../assets/parhlai-cover.jpg';

const emploiImages = [emploi1, emploi2, emploi3];

const cricktopImages = [
  cricktopIntro,
  cricktopLogin,
  cricktopProfile,
  cricktopEditProfile,
  cricktopDms,
  cricktopNotifications,
  cricktopNoActivity
];

const parhlaiPosts = [
  'https://www.instagram.com/p/DQFIwgKjFF8/embed',
  'https://www.instagram.com/p/DPQ5TtOjvY-/embed',
  'https://www.instagram.com/p/DPTbrCfDDIm/embed',
  'https://www.instagram.com/p/DMDjppeoFD8/embed',
  'https://www.instagram.com/p/DMDjgMMI1Mw/embed',
  'https://www.instagram.com/p/DNAxWShIV7J/embed'
];

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
          <div className="project-preview" onClick={() => onOpenLightbox(cricktopImages)}>
            <img src={cricktopIntro} alt="CrickTop App UI Design" />
            <div className="project-preview-overlay"></div>
            <div className="project-preview-count">+{cricktopImages.length} screens</div>
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

        {/* Parhlai */}
        <div className="project-card" onMouseMove={handleCardMouse}>
          <div className="project-num">03</div>
          <div className="project-name">Parhlai</div>
          <div className="project-preview" onClick={() => onOpenLightbox(parhlaiPosts)}>
            <img src={parhlaiCoverImg} alt="Parhlai Social Media Posts" />
            <div className="project-preview-overlay"></div>
            <div className="project-preview-count">+{parhlaiPosts.length} posts</div>
          </div>
          <p className="project-desc">
            As the Marketing Lead and UI Designer at @parhlai, I conceptualized and designed the starting posts
            to establish a strong brand identity. I planned every post and formulated robust marketing strategies
            to drive initial engagement and growth, setting the visual and strategic foundation for the company.
          </p>
          <div className="project-footer">
            <span className="project-tag pink">Marketing</span>
            <span className="project-tag purple">UI Design</span>
            <span className="project-tag lime">Strategy</span>
            <div className="project-arrow">→</div>
          </div>
        </div>

      </div>
    </section>
  );
}
