import Reveal from './Reveal.jsx';
import Divider from './Divider.jsx';
import Btn from './Btn.jsx';
import { waLink } from '../constants.js';

const chips = [
  { label: 'Wedding', msg: "Hello Oriana! I'm planning a wedding and want to know more about your packages." },
  { label: 'Nikkah', msg: "Hello Oriana! I'm planning a Nikkah and want to know more about your setups." },
  { label: 'Mehndi', msg: "Hello Oriana! I'm planning a Mehndi night and want to know more." },
  { label: 'Birthday', msg: "Hello Oriana! I'm planning a birthday and want to know more." },
  { label: 'Custom Order', msg: "Hello Oriana! I have a custom request that doesn't fit a category." },
];

export default function Contact() {
  return (
    <section className="section-pad" id="contact">
      <Reveal className="section-head" as="div">
        <h2>Let&apos;s Plan Your Event</h2>
        <Divider />
        <p>We only take inquiries on WhatsApp. It&apos;s faster for both of us.</p>
      </Reveal>

      <Reveal className="wa-contact-card" delay={0.05}>
        <div className="wa-contact-icon">
          <svg viewBox="0 0 32 32" fill="#fff"><path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.386.7 4.61 1.907 6.475L4 29l7.727-1.867A11.94 11.94 0 0016 27c6.627 0 12-5.373 12-12S22.628 3 16.001 3zm0 21.6a9.55 9.55 0 01-4.87-1.33l-.35-.207-4.586 1.107 1.127-4.47-.228-.362A9.56 9.56 0 016.4 15c0-5.302 4.298-9.6 9.6-9.6 5.301 0 9.6 4.298 9.6 9.6 0 5.301-4.299 9.6-9.6 9.6zm5.264-7.19c-.288-.144-1.706-.842-1.97-.938-.264-.096-.456-.144-.648.144-.192.288-.744.938-.912 1.13-.168.192-.336.216-.624.072-.288-.144-1.216-.448-2.316-1.428-.856-.763-1.434-1.706-1.602-1.994-.168-.288-.018-.444.126-.588.13-.129.288-.336.432-.504.144-.168.192-.288.288-.48.096-.192.048-.36-.024-.504-.072-.144-.648-1.562-.888-2.14-.234-.562-.472-.486-.648-.495l-.552-.01c-.192 0-.504.072-.768.36-.264.288-1.008.985-1.008 2.403 0 1.418 1.032 2.788 1.176 2.98.144.192 2.03 3.1 4.92 4.347.687.297 1.223.474 1.641.607.689.219 1.316.188 1.812.114.553-.083 1.706-.697 1.946-1.37.24-.673.24-1.25.168-1.37-.072-.12-.264-.192-.552-.336z" /></svg>
        </div>
        <h3>Message Us on WhatsApp</h3>
        <p>Tell us your event type, date, and city, and we&apos;ll reply with what&apos;s possible for your venue and budget. Usually within a few hours.</p>
        <Btn href={waLink("Hello Oriana! I'd like to ask about decorating my event.")} target="_blank" rel="noopener" className="btn-solid">
          Start a Chat
        </Btn>

        <div className="wa-chips">
          {chips.map((c) => (
            <a key={c.label} className="wa-chip" target="_blank" rel="noopener" href={waLink(c.msg)}>{c.label}</a>
          ))}
        </div>
      </Reveal>

      <Reveal className="contact-info-row" delay={0.1}>
        <div className="info-item">📍 Lahore, Pakistan</div>
        <div className="info-item">⏰ 7 days a week, 9 AM – 11 PM</div>
        <div className="info-item">📸 <a href="#" target="_blank" rel="noopener">@orianaevents</a></div>
      </Reveal>
    </section>
  );
}
