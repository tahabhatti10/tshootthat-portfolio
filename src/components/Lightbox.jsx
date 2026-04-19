import { useEffect, useCallback } from 'react';

export default function Lightbox({ src, onClose }) {
  const isActive = !!src;

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

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

  return (
    <div id="lightbox" className={isActive ? 'active' : ''} onClick={handleBackdropClick}>
      <button id="lightbox-close" onClick={onClose}>✕</button>
      <div id="lightbox-inner">
        <img id="lightbox-img" src={src || ''} alt="Project preview" />
      </div>
      <div id="lightbox-label"><span>✦</span> Scroll to explore all screens</div>
    </div>
  );
}
