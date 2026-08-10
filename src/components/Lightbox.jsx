import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Lightbox({ items, index, onClose, onNav }) {
  const open = index !== null;
  const item = open ? items[index] : null;

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    function onKeyDown(e) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNav(-1);
      if (e.key === 'ArrowRight') onNav(1);
    }
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose, onNav]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <button className="lightbox-close" aria-label="Close" onClick={onClose}>&times;</button>
          <button className="lightbox-arrow lightbox-prev" aria-label="Previous photo" onClick={() => onNav(-1)}>&lsaquo;</button>
          <div className="lightbox-content">
            <motion.img
              key={item.bg}
              className="lightbox-img"
              src={item.bg}
              alt=""
              initial={{ scale: 0.94 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.35, ease: [0.16, 0.84, 0.44, 1] }}
            />
            <p className="lightbox-caption">{item.caption}</p>
          </div>
          <button className="lightbox-arrow lightbox-next" aria-label="Next photo" onClick={() => onNav(1)}>&rsaquo;</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
