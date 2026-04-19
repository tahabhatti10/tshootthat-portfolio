export default function Hero() {
  return (
    <div id="hero">
      <div className="hero-eyebrow">Creative Portfolio — 2026</div>
      <h1 className="hero-handle">
        <span className="pink">tshoot</span><br />
        <span className="stroke-text">that</span>
      </h1>
      <div className="hero-realname">Muhammad <span>Taha Abid</span></div>
      <div className="hero-roles">
        <span className="role-pill primary">UX/UI Designer</span>
        <span className="role-pill secondary">Marketing Lead</span>
        <span className="role-pill tertiary">Graphics Designer</span>
        <span className="role-pill tertiary">Video Editor</span>
        <span className="role-pill tertiary">Social Media</span>
      </div>
      <p className="hero-desc">
        A multi-disciplinary creative who shapes brands from the ground up — designing interfaces
        people love, crafting visuals that stop the scroll, and building digital experiences that
        convert curiosity into connection.
      </p>
      <div className="hero-cta">
        <a href="#projects" className="btn btn-primary">View My Work</a>
        <a href="#contact" className="btn btn-ghost">Let's Connect</a>
      </div>
    </div>
  );
}
