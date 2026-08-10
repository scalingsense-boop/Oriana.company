import { useState } from 'react';
import Reveal from './Reveal.jsx';
import Divider from './Divider.jsx';
import TiltCard from './TiltCard.jsx';
import LazyBg from './LazyBg.jsx';
import Lightbox from './Lightbox.jsx';
import { galleryItems, galleryFilters } from '../data/gallery.js';

const photoItems = galleryItems.filter((g) => g.bg);

function bentoClass(i) {
  if (i % 7 === 0) return 'b-big';
  if (i % 5 === 3) return 'b-wide';
  return '';
}

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [liked, setLiked] = useState(() => galleryItems.map(() => false));
  const [popping, setPopping] = useState(() => galleryItems.map(() => false));
  const [lightboxIndex, setLightboxIndex] = useState(null);

  function toggleLike(i, e) {
    e.stopPropagation();
    setLiked((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      if (next[i]) {
        setPopping((p) => {
          const np = [...p];
          np[i] = true;
          return np;
        });
      }
      return next;
    });
  }

  function clearPop(i) {
    setPopping((p) => {
      const np = [...p];
      np[i] = false;
      return np;
    });
  }

  function openLightbox(item) {
    if (!item.bg) return;
    const idx = photoItems.indexOf(item);
    if (idx !== -1) setLightboxIndex(idx);
  }

  function navLightbox(delta) {
    setLightboxIndex((i) => (i + delta + photoItems.length) % photoItems.length);
  }

  return (
    <section className="section-pad" id="gallery">
      <Reveal className="section-head" as="div">
        <h2>Our Work Speaks for Itself</h2>
        <Divider />
        <p>Straight from our camera roll, the way it&apos;d show up on Instagram.</p>
      </Reveal>

      <Reveal className="filter-bar" delay={0.05}>
        {galleryFilters.map((f) => (
          <button
            key={f.value}
            className={`filter-btn${activeFilter === f.value ? ' active' : ''}`}
            onClick={() => setActiveFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </Reveal>

      <div className="gallery-grid">
        {galleryItems.map((item, i) => {
          const hidden = activeFilter !== 'all' && item.cat !== activeFilter;
          return (
            <Reveal key={i} delay={(i % 6) * 0.06} className={`${hidden ? 'hidden-item' : ''} ${bentoClass(i)}`.trim()}>
              <TiltCard className="gallery-item" liftY={-6} scaleAmt={1.015} maxTilt={5}>
                <LazyBg
                  src={item.bg}
                  alt={item.caption}
                  className={`post-media${item.gradient ? ` ${item.gradient}` : ''}${item.bg ? ' has-image' : ''}`}
                  onClick={() => openLightbox(item)}
                >
                  {item.icon && <span className="placeholder-icon">{item.icon}</span>}
                </LazyBg>
                <div className="post-footer">
                  <div className="post-row">
                    <div className="post-avatar">O</div>
                    <span className="post-handle">oriana.events</span>
                    <button
                      className={`post-heart${liked[i] ? ' liked' : ''}${popping[i] ? ' pop' : ''}`}
                      onClick={(e) => toggleLike(i, e)}
                      onAnimationEnd={() => clearPop(i)}
                    >
                      &#9829; <span className="heart-count">{item.likes + (liked[i] ? 1 : 0)}</span>
                    </button>
                  </div>
                  <p className="post-caption">{item.caption}</p>
                </div>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>

      <Reveal as="p" className="gallery-note" delay={0.1}>
        📸 More from behind the scenes on Instagram: <a href="https://instagram.com/orianaevents" target="_blank" rel="noopener">@orianaevents</a>
      </Reveal>

      <Lightbox items={photoItems} index={lightboxIndex} onClose={() => setLightboxIndex(null)} onNav={navLightbox} />
    </section>
  );
}
