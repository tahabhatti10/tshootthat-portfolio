export default function Navbar() {
  return (
    <nav>
      <div className="nav-logo">tshoot<span>that</span></div>
      <ul className="nav-links">
        <li><a href="#about">About</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#projects">Work</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <div className="nav-badge">
        <div className="status-dot"></div>Open to work
      </div>
    </nav>
  );
}
