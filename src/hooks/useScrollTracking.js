import { useEffect, useState } from 'react';

export function useScrollTracking() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [progress, setProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    let ticking = false;

    function update() {
      ticking = false;
      setScrolled(window.scrollY > 40);
      setShowScrollTop(window.scrollY > 300);

      let current = 'home';
      document.querySelectorAll('section[id]').forEach((sec) => {
        const top = sec.offsetTop - 140;
        if (window.scrollY >= top) current = sec.getAttribute('id');
      });
      setActiveSection(current);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0);
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return { scrolled, activeSection, progress, showScrollTop };
}
