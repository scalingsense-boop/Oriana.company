import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal.jsx';
import Divider from './Divider.jsx';
import { testimonials } from '../data/testimonials.js';

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  function goTo(i) {
    setIndex((i + testimonials.length) % testimonials.length);
  }

  function resetAutoplay() {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
  }

  useEffect(() => {
    resetAutoplay();
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <section className="section-pad" id="testimonials">
      <Reveal className="section-head" as="div">
        <h2>What Our Clients Say</h2>
        <Divider />
        <p>Real messages from clients after their event, the way they actually reached us.</p>
      </Reveal>

      <Reveal
        className="testimonial-wrap"
        delay={0.05}
        onMouseEnter={() => clearInterval(timerRef.current)}
        onMouseLeave={resetAutoplay}
      >
        <div className="testimonial-track">
          <div className="wa-header">
            <div className="wa-avatar">O</div>
            <div>
              <div className="wa-name">Oriana Events</div>
              <div className="wa-status">Client chats</div>
            </div>
          </div>
          <div className="wa-body">
            <div className="testimonial-slides" style={{ transform: `translateX(-${index * 100}%)` }}>
              {testimonials.map((t, i) => (
                <div className="t-slide" key={i}>
                  <div className="t-card">
                    <div className="wa-bubble">
                      <div className="t-stars">★★★★★</div>
                      <p className="t-text">{t.text}</p>
                      <div className="t-meta">
                        <span className="t-author">{t.author}</span>
                        <span className="t-time">{t.time}</span>
                        <span className="t-ticks">✓✓</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="t-controls">
          <button className="t-arrow" onClick={() => { goTo(index - 1); resetAutoplay(); }}>‹</button>
          <div className="t-dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`t-dot${i === index ? ' active' : ''}`}
                onClick={() => { goTo(i); resetAutoplay(); }}
              />
            ))}
          </div>
          <button className="t-arrow" onClick={() => { goTo(index + 1); resetAutoplay(); }}>›</button>
        </div>
      </Reveal>
    </section>
  );
}
