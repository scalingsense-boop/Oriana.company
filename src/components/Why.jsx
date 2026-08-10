import Reveal from './Reveal.jsx';
import Divider from './Divider.jsx';
import TiltCard from './TiltCard.jsx';

const whyItems = [
  { icon: '🎯', title: 'Nothing Off the Shelf', text: 'No set packages. Every setup is planned around your theme, your budget, and your venue.' },
  { icon: '⚡', title: 'Punctual & Professional', text: 'We show up early and finish setup before your first guest arrives. Every time.' },
  { icon: '💰', title: 'Transparent Pricing', text: 'The price we quote on WhatsApp is the price you pay. No add-ons after the fact.' },
  { icon: '🌟', title: 'Materials That Hold Up', text: 'Fresh flowers, real fabric, proper lighting gear. It looks as good in person as it does in photos.' },
  { icon: '📞', title: 'One WhatsApp Thread', text: "From your first message to the last guest leaving, you're talking to the same team the whole way." },
  { icon: '📸', title: 'Years on the Ground', text: "We've set up enough weddings, Mehndis, and Barats across Lahore to know what usually goes wrong on the day, and plan around it before it does." },
];

export default function Why() {
  return (
    <section className="section-pad" id="why">
      <Reveal className="section-head" as="div">
        <h2>Why Families Choose Oriana</h2>
        <Divider />
        <p>The parts that don&apos;t show up in photos, but shape how the day actually goes.</p>
      </Reveal>

      <div className="why-grid">
        {whyItems.map((item, i) => (
          <Reveal key={item.title} delay={(i % 3) * 0.07}>
            <TiltCard className="why-card" liftY={-6} scaleAmt={1.02} maxTilt={6}>
              <div className="icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
