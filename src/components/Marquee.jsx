import { Fragment } from 'react';

const words = ['Weddings', 'Mehndi', 'Nikkah', 'Barat', 'Cold Fire Entry', 'Photo Spotlight', 'Sound & DJ', 'Birthdays', 'Custom Decor'];

function MarqueeSet({ hidden = false }) {
  return (
    <span className="marquee-set" aria-hidden={hidden || undefined}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span>{w}</span>
          <span className="marquee-dot">✦</span>
        </Fragment>
      ))}
    </span>
  );
}

export default function Marquee() {
  return (
    <div className="marquee-band">
      <div className="marquee-track">
        <MarqueeSet />
        <MarqueeSet hidden />
      </div>
    </div>
  );
}
