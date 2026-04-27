import { useCallback } from 'react';
import useReveal from '../hooks/useReveal';

const skillsData = [
  {
    icon: '🎨', color: 'pink', name: 'UX/UI Design',
    desc: 'Crafting high-fidelity, user-centred interfaces rooted in research and elevated by meticulous visual craft. From wireframes to polished prototypes.',
    tags: [
      { label: 'Figma', color: 'pink' }, { label: 'Prototyping', color: 'pink' },
      { label: 'User Research', color: 'neutral' }, { label: 'Design Systems', color: 'neutral' },
    ],
  },
  {
    icon: '📣', color: 'purple', name: 'Marketing Lead',
    desc: 'Strategising and executing multi-channel campaigns that grow audiences, build brand authority, and drive measurable business results.',
    tags: [
      { label: 'Campaign Strategy', color: 'purple' }, { label: 'Meta Ads', color: 'purple' },
      { label: 'Analytics', color: 'neutral' }, { label: 'Growth', color: 'neutral' },
    ],
  },
  {
    icon: '✏️', color: 'lime', name: 'Graphics Design',
    desc: 'Building visual identities, social graphics, and branded materials — with Canva as the primary tool, backed by Adobe for complex work.',
    tags: [
      { label: 'Canva Pro', color: 'lime' }, { label: 'Photoshop', color: 'lime' },
      { label: 'Illustrator', color: 'neutral' }, { label: 'Typography', color: 'neutral' },
    ],
  },
  {
    icon: '🎬', color: 'pink', name: 'Video Editing',
    desc: 'Producing polished video content — from reels and short-form clips to full brand films — with smooth pacing, sharp cuts, and clean colour grading.',
    tags: [
      { label: 'CapCut', color: 'pink' }, { label: 'Premiere Pro', color: 'pink' },
      { label: 'Colour Grading', color: 'neutral' }, { label: 'Reels & Shorts', color: 'neutral' },
    ],
  },
  {
    icon: '📱', color: 'purple', name: 'Social Media',
    desc: 'Managing brand presence across platforms — developing content calendars, creating scroll-stopping visuals, and growing engaged communities.',
    tags: [
      { label: 'Instagram', color: 'purple' }, { label: 'Content Strategy', color: 'purple' },
      { label: 'Community', color: 'neutral' }, { label: 'Analytics', color: 'neutral' },
    ],
  },
  {
    icon: '⚡', color: 'lime', name: 'Brand Identity',
    desc: 'End-to-end brand systems — logo design, colour palettes, typography, and guidelines that ensure a consistent, memorable presence everywhere.',
    tags: [
      { label: 'Logo Design', color: 'lime' }, { label: 'Style Guides', color: 'lime' },
      { label: 'Visual Identity', color: 'neutral' }, { label: 'Canva Pro', color: 'neutral' },
    ],
  },
  {
    icon: '🤖', color: 'pink', name: 'AI Generation',
    desc: 'Harnessing cutting-edge generative AI to conceptualise and synthesize stunning, high-fidelity imagery and dynamic content. Blending human creativity with machine intelligence to push the boundaries of digital artistry.',
    tags: [
      { label: 'Generative AI', color: 'pink' }, { label: 'Prompt Engineering', color: 'pink' },
      { label: 'Midjourney', color: 'neutral' }, { label: 'Content Synthesis', color: 'neutral' },
    ],
  },
];

export default function Skills() {
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
    <section id="skills">
      <div className="section-label reveal" ref={revealRef1}>02 — Expertise</div>
      <div className="section-title reveal" ref={revealRef2}>
        What I <span className="highlight">bring</span><br />to the table.
      </div>
      <div className="skills-grid reveal" ref={revealRef3}>
        {skillsData.map((s) => (
          <div className="skill-card" key={s.name} onMouseMove={handleCardMouse}>
            <div className={`skill-icon-wrap ${s.color}`}>{s.icon}</div>
            <div className="skill-name">{s.name}</div>
            <div className="skill-desc">{s.desc}</div>
            <div className="skill-tags">
              {s.tags.map((t) => (
                <span className={`stag ${t.color}`} key={t.label}>{t.label}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
