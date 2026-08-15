export default function LazyBg({ src, alt, className, children, onClick }) {
  return (
    <div className={className} onClick={onClick}>
      {src && <img src={src} alt={alt || ''} loading="lazy" decoding="async" />}
      {children}
    </div>
  );
}
