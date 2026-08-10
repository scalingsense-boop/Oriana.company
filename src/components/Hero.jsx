import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Btn from './Btn.jsx';
import { waLink } from '../constants.js';

function AnimatedStat({ target, suffix = '', label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let cur = 0;
    const step = Math.max(1, Math.ceil(target / 60));
    const interval = setInterval(() => {
      cur += step;
      if (cur >= target) {
        cur = target;
        clearInterval(interval);
      }
      setValue(cur);
    }, 25);
    return () => clearInterval(interval);
  }, [inView, target]);

  return (
    <div className="stat">
      <div className="num" ref={ref}>{value}{suffix}</div>
      <div className="label">{label}</div>
    </div>
  );
}

export default function Hero() {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const innerY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const innerOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  function handleMouseMove(e) {
    const el = heroRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--spot-x', `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty('--spot-y', `${((e.clientY - r.top) / r.height) * 100}%`);
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = heroRef.current;
    if (!canvas || !hero) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let running = false;
    let frameId;

    function resizeCanvas() {
      canvas.width = hero.offsetWidth;
      canvas.height = hero.offsetHeight;
    }
    function createParticles() {
      const count = window.innerWidth < 700 ? 16 : 70;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.8 + 0.6,
        speed: Math.random() * 0.5 + 0.15,
        drift: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.5 + 0.2,
      }));
    }
    function animate() {
      if (!running) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(221,165,32,${p.alpha})`;
        ctx.fill();
        p.y -= p.speed;
        p.x += p.drift;
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
      });
      frameId = requestAnimationFrame(animate);
    }

    resizeCanvas();
    createParticles();
    const onResize = () => { resizeCanvas(); createParticles(); };
    window.addEventListener('resize', onResize);

    let heroObserver;
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      heroObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !running) {
            running = true;
            animate();
          } else if (!entry.isIntersecting) {
            running = false;
          }
        });
      }, { threshold: 0 });
      heroObserver.observe(hero);
    }

    return () => {
      running = false;
      if (frameId) cancelAnimationFrame(frameId);
      window.removeEventListener('resize', onResize);
      if (heroObserver) heroObserver.disconnect();
    };
  }, []);

  return (
    <section className="hero" id="home" ref={heroRef} onMouseMove={handleMouseMove}>
      <canvas id="particles" ref={canvasRef}></canvas>
      <motion.div className="hero-inner" style={{ y: innerY, opacity: innerOpacity }}>
        <motion.span
          className="hero-eyebrow"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          Lahore, Pakistan
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          Decor for the Day<br />You&apos;ll Talk About for Years.
        </motion.h1>
        <motion.h2
          className="sub"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          Every setup is planned around your event, not picked off a shelf.
        </motion.h2>
        <motion.p
          className="desc"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
        >
          We&apos;re a Lahore-based decor team: stages, Mehndi nights, Nikkah setups, cold fire entrances, the works. Send us a few details on WhatsApp and we&apos;ll tell you straight away what&apos;s possible for your venue and budget.
        </motion.p>
        <motion.div
          className="hero-btns"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
        >
          <Btn href={waLink("Hello Oriana! I'd love to chat about decorating my event.")} target="_blank" rel="noopener" className="btn-solid" magnetic>
            Message Us on WhatsApp
          </Btn>
          <Btn href="#gallery" className="btn-outline">See Our Work</Btn>
        </motion.div>
        <motion.a
          href="#story"
          className="scroll-indicator"
          aria-label="Scroll to next section"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </motion.a>

        <div className="hero-stats">
          <AnimatedStat target={500} suffix="+" label="Events Styled" />
          <AnimatedStat target={13} suffix="" label="Services Offered" />
          <AnimatedStat target={7} suffix="" label="Days a Week Booking" />
        </div>
      </motion.div>
    </section>
  );
}
