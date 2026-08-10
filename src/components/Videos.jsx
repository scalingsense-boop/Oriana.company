import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal.jsx';
import Divider from './Divider.jsx';
import TiltCard from './TiltCard.jsx';
import { videoItems } from '../data/videos.js';

function ReelItem({ item, delay }) {
  const videoRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setLoaded(true);
            video.play().catch(() => {});
          } else if (!video.paused) {
            video.pause();
          }
        });
      },
      { threshold: 0.15, rootMargin: '200px 0px' },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (loaded && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [loaded]);

  return (
    <Reveal delay={delay}>
      <TiltCard className="reel-item" liftY={-6} scaleAmt={1.02} maxTilt={5}>
        <video ref={videoRef} src={loaded ? item.src : undefined} aria-label={item.label} muted loop playsInline preload="none" />
        <div className="reel-top">
          <div className="reel-progress"><span></span><span></span><span></span></div>
          <div className="reel-who">
            <div className="reel-avatar">O</div>
            <span className="reel-handle">oriana.events</span>
          </div>
        </div>
        <div className="reel-mute">🔇</div>
        <div className="reel-label">{item.label}</div>
      </TiltCard>
    </Reveal>
  );
}

export default function Videos() {
  return (
    <section className="section-pad" id="videos">
      <Reveal className="section-head" as="div">
        <h2>Watch Our Events Come to Life</h2>
        <Divider />
        <p>Short clips straight from the same setups you just saw in photos, played on mute.</p>
      </Reveal>

      <div className="reel-grid">
        {videoItems.map((item, i) => (
          <ReelItem key={item.src} item={item} delay={(i % 4) * 0.06} />
        ))}
      </div>
    </section>
  );
}
