import useReveal from '../hooks/useReveal';

export default function Contact() {
  const revealRef1 = useReveal();
  const revealRef2 = useReveal();

  return (
    <section id="contact">
      <div className="section-label reveal" ref={revealRef1}>04 — Contact</div>
      <div className="contact-inner reveal" ref={revealRef2}>
        <div className="contact-left">
          <h2>
            Let's make<br />
            <span className="grad">something</span><br />
            great.
          </h2>
          <p>
            Got a project, a brand to build, or an idea that needs a creative eye? I'm always up
            for a conversation. Reach out through any of the channels below.
          </p>
          <div className="contact-links">
            <a href="mailto:tah.bhati302@gmail.com" className="contact-link">
              <div className="contact-link-icon">@</div>
              <div className="contact-link-text">
                <span className="contact-link-label">Email</span>tah.bhati302@gmail.com
              </div>
            </a>
            <a href="https://www.linkedin.com/in/tshootthat" target="_blank" rel="noreferrer" className="contact-link">
              <div className="contact-link-icon">in</div>
              <div className="contact-link-text">
                <span className="contact-link-label">LinkedIn</span>linkedin.com/in/tshootthat
              </div>
            </a>
            <a href="https://www.behance.net/tshootthat" target="_blank" rel="noreferrer" className="contact-link">
              <div className="contact-link-icon">Be</div>
              <div className="contact-link-text">
                <span className="contact-link-label">Behance</span>behance.net/tshootthat
              </div>
            </a>
            <a href="https://www.instagram.com/tshootthat" target="_blank" rel="noreferrer" className="contact-link">
              <div className="contact-link-icon">IG</div>
              <div className="contact-link-text">
                <span className="contact-link-label">Instagram</span>instagram.com/tshootthat
              </div>
            </a>
            <a href="https://www.github.com/tshootthat" target="_blank" rel="noreferrer" className="contact-link">
              <div className="contact-link-icon">GH</div>
              <div className="contact-link-text">
                <span className="contact-link-label">GitHub</span>github.com/tshootthat
              </div>
            </a>
          </div>
        </div>
        <div className="contact-form">
          <div className="form-group">
            <label className="form-label">Name</label>
            <input type="text" className="form-input" placeholder="Your name" />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" className="form-input" placeholder="your@email.com" />
          </div>
          <div className="form-group">
            <label className="form-label">Message</label>
            <textarea className="form-textarea" placeholder="Tell me about your project..."></textarea>
          </div>
          <button className="form-submit">Send Message →</button>
        </div>
      </div>
    </section>
  );
}
