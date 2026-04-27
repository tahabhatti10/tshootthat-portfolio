import useReveal from '../hooks/useReveal';

export default function About() {
  const revealRef1 = useReveal();
  const revealRef2 = useReveal();
  const revealRef3 = useReveal();
  const revealRef4 = useReveal();

  return (
    <section id="about">
      <div className="section-label reveal" ref={revealRef1}>01 — About Me</div>
      <div className="section-title reveal" ref={revealRef2}>
        Where <span className="highlight">design</span><br />meets strategy.
      </div>
      <div className="about-grid">
        <div className="about-text reveal" ref={revealRef3}>
          <p>
            I'm <strong>Muhammad Taha Abid</strong> — a versatile creative professional who operates
            at the intersection of design, marketing, and storytelling. I go by <strong>tshootthat</strong>,
            and that name says it all: when there's a creative challenge, I shoot my shot and deliver.
          </p>
          <p>
            With a sharp eye for <strong>UI/UX design</strong> and deep expertise in{' '}
            <strong>visual communication</strong>, I craft digital experiences that are both
            aesthetically powerful and strategically sound. From pixel-perfect interfaces to compelling
            brand identities, my work is driven by one goal — making ideas impossible to ignore.
          </p>
          <p>
            Beyond design, I lead <strong>marketing initiatives</strong>, manage brand presence across
            social platforms, and produce <strong>video content</strong> that tells stories with impact.
            I also leverage <strong>generative AI</strong> to synthesize innovative visuals at scale, bringing
            a full-stack creative mindset to every project — from concept all the way through to execution.
          </p>
          <div className="about-tags">
            {['Figma', 'Photoshop', 'Illustrator', 'Canva Pro', 'Premiere Pro', 'CapCut', 'Midjourney', 'Meta Ads'].map(
              (tag) => (
                <span className="about-tag" key={tag}>{tag}</span>
              )
            )}
          </div>
        </div>
        <div className="reveal" ref={revealRef4}>
          <div className="about-stats">
            <div className="stat-box">
              <div className="stat-num">3+</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat-box">
              <div className="stat-num">20+</div>
              <div className="stat-label">Projects Delivered</div>
            </div>
            <div className="stat-box">
              <div className="stat-num">6</div>
              <div className="stat-label">Core Disciplines</div>
            </div>
            <div className="stat-box">
              <div className="stat-num">∞</div>
              <div className="stat-label">Creative Iterations</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
