import Reveal from './Reveal.jsx';
import Divider from './Divider.jsx';
import TiltCard from './TiltCard.jsx';
import Btn from './Btn.jsx';
import { packages } from '../data/packages.js';
import { waLink } from '../constants.js';

function PackageBody({ pkg }) {
  return (
    <>
      {pkg.popular && <span className="popular-badge">Most Popular</span>}
      <div className="package-emoji">{pkg.emoji}</div>
      <h3>{pkg.name}</h3>
      <p className="package-best">{pkg.best}</p>
      <span className="price-badge">Custom Pricing, Ask on WhatsApp</span>
      <ul>
        {pkg.features.map((f) => <li key={f}>{f}</li>)}
      </ul>
      <Btn
        href={waLink(`Hello Oriana! I'm interested in the ${pkg.name} package. Please share details.`)}
        target="_blank"
        rel="noopener"
        className={pkg.popular ? 'btn-solid' : 'btn-outline'}
      >
        Get a Custom Quote
      </Btn>
    </>
  );
}

export default function Packages() {
  return (
    <section className="section-pad" id="packages">
      <Reveal className="section-head" as="div">
        <h2>Our Service Packages</h2>
        <Divider />
        <p>These are starting points, not fixed menus. Every quote is built around your venue, guest count, and budget.</p>
      </Reveal>

      <div className="packages-grid">
        {packages.map((pkg, i) => (
          <Reveal key={pkg.name} delay={i * 0.08}>
            {pkg.popular ? (
              <div className="package-card popular">
                <PackageBody pkg={pkg} />
              </div>
            ) : (
              <TiltCard className="package-card" liftY={-8} scaleAmt={1.015} maxTilt={5}>
                <PackageBody pkg={pkg} />
              </TiltCard>
            )}
          </Reveal>
        ))}
      </div>

      <Reveal as="p" className="packages-note" delay={0.2}>
        💬 Every package above is a starting point. Send us your venue size and guest count on WhatsApp and we&apos;ll put a real number together, usually within minutes.
      </Reveal>
    </section>
  );
}
