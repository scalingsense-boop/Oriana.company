import { useEffect, useRef, useState } from 'react';

export default function LazyBg({ src, className, children, onClick, rootMargin = '300px 0px' }) {
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!src || loaded) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setLoaded(true);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.01, rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [src, loaded, rootMargin]);

  return (
    <div
      ref={ref}
      className={className}
      style={loaded ? { backgroundImage: `url('${src}')` } : undefined}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
