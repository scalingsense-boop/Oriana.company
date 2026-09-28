import { useState } from 'react';

export default function LazyBg({ src, alt, className, children, onClick }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`${className}${src && !loaded ? ' is-loading' : ''}`} onClick={onClick}>
      {src && (
        <img
          src={src}
          alt={alt || ''}
          loading="lazy"
          decoding="async"
          className={loaded ? 'is-loaded' : ''}
          onLoad={() => setLoaded(true)}
        />
      )}
      {children}
    </div>
  );
}
