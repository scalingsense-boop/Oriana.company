import { useState } from 'react';
import Reveal from './Reveal.jsx';
import Divider from './Divider.jsx';
import { faqItems } from '../data/faq.js';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="section-pad" id="faq">
      <Reveal className="section-head" as="div">
        <h2>Questions We Get a Lot</h2>
        <Divider />
        <p>If yours isn&apos;t here, it&apos;s a WhatsApp message away.</p>
      </Reveal>

      <div className="faq-list">
        {faqItems.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <Reveal key={i} className={`faq-item${isOpen ? ' open' : ''}`} delay={(i % 8) * 0.04}>
              <button
                className="faq-question"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : i)}
              >
                <span>{item.q}</span>
                <span className="faq-icon">+</span>
              </button>
              <div className="faq-answer-wrap">
                <div className="faq-answer">
                  <p>{item.a}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
