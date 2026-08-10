import Reveal from './Reveal.jsx';
import Divider from './Divider.jsx';
import TiltCard from './TiltCard.jsx';
import LazyBg from './LazyBg.jsx';
import Btn from './Btn.jsx';
import { services } from '../data/services.js';
import { waLink } from '../constants.js';

const tabs = [
  { label: 'All', value: 'all' },
  { label: 'Wedding', value: 'wedding' },
  { label: 'Nikkah', value: 'nikkah' },
  { label: 'Birthday', value: 'birthday' },
  { label: 'House', value: 'house' },
  { label: 'Tech', value: 'tech' },
];

export default function Services({ activeTab, onSelectTab }) {
  return (
    <section className="section-pad" id="services">
      <Reveal className="section-head" as="div">
        <h2>Our Signature Services</h2>
        <Divider />
        <p>Every service is fully customized to match your vision and budget.</p>
      </Reveal>

      <Reveal className="tabs" delay={0.05}>
        {tabs.map((t) => (
          <button
            key={t.value}
            className={`tab-btn${activeTab === t.value ? ' active' : ''}`}
            onClick={() => onSelectTab(t.value)}
          >
            {t.label}
          </button>
        ))}
      </Reveal>

      <div className="services-grid">
        {services.map((s, i) => {
          const hidden = activeTab !== 'all' && s.cat !== activeTab;
          const waMsg = `Hello Oriana! I'm interested in your ${s.name} service. Please share more details and pricing.`;
          return (
            <Reveal key={s.name} delay={(i % 6) * 0.06} className={hidden ? 'hidden-item' : ''}>
              <TiltCard className="service-card" liftY={-8} scaleAmt={1.02} maxTilt={6}>
                <LazyBg
                  src={s.img}
                  className={`service-media${s.gradient ? ` ${s.gradient}` : ''}`}
                >
                  {!s.img && <span className="placeholder-icon">{s.icon}</span>}
                </LazyBg>
                <div className="service-icon-badge">{s.icon}</div>
                <div className="service-body">
                  <h3>{s.name}</h3>
                  <p>{s.desc}</p>
                  <Btn href={waLink(waMsg)} target="_blank" rel="noopener" className="btn-outline btn-small">
                    Inquire Now
                  </Btn>
                </div>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
