import { useEffect, useCallback, useState } from 'react';

export default function Lightbox({ images, onClose }) {
  // images can be a single string or an array
  const imgArray = images ? (Array.isArray(images) ? images : [images]) : [];
  const isActive = imgArray.length > 0;
  const [current, setCurrent] = useState(0);

  // Reset to first image whenever lightbox opens
  useEffect(() => {
    if (isActive) setCurrent(0);
  }, [isActive, images]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowRight') setCurrent(c => (c + 1) % imgArray.length);
    if (e.key === 'ArrowLeft') setCurrent(c => (c - 1 + imgArray.length) % imgArray.length);
  }, [onClose, imgArray.length]);

  useEffect(() => {
    if (isActive) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isActive, handleKeyDown]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const prev = (e) => { e.stopPropagation(); setCurrent(c => (c - 1 + imgArray.length) % imgArray.length); };
  const next = (e) => { e.stopPropagation(); setCurrent(c => (c + 1) % imgArray.length); };

  return (
    <div id="lightbox" className={isActive ? 'active' : ''} onClick={handleBackdropClick}>
      <button id="lightbox-close" onClick={onClose}>✕</button>

      <div id="lightbox-inner">
        {imgArray[current] && imgArray[current].includes('instagram.com') ? (
          <iframe
            id="lightbox-iframe"
            src={imgArray[current]}
            style={{ width: '100%', minHeight: '650px', border: 'none', display: 'block', backgroundColor: '#fff' }}
            allowTransparency="true"
            scrolling="no"
          />
        ) : (
          <img
            id="lightbox-img"
            src={imgArray[current] || ''}
            alt={`Project preview ${current + 1}`}
          />
        )}
      </div>

      {imgArray.length > 1 && (
        <>
          <button className="lightbox-nav lightbox-prev" onClick={prev}>‹</button>
          <button className="lightbox-nav lightbox-next" onClick={next}>›</button>
          <div id="lightbox-label">
            <span>✦</span> {current + 1} / {imgArray.length} — use arrow keys or click to navigate
          </div>
          <div className="lightbox-dots">
            {imgArray.map((_, i) => (
              <button
                key={i}
                className={`lightbox-dot${i === current ? ' active' : ''}`}
                onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
              />
            ))}
          </div>
        </>
      )}

      {imgArray.length === 1 && (
        <div id="lightbox-label"><span>✦</span> Scroll to explore all screens</div>
      )}
    </div>
  );
}
