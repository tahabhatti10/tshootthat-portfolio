const items = [
  'UX/UI Design', 'Brand Identity', 'Marketing Strategy',
  'Motion & Video', 'Social Media', 'Design Systems', 'AI Generation'
];

export default function Marquee() {
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <span className="marquee-item" key={i}>
            {item} <span>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
