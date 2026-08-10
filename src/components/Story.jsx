import Reveal from './Reveal.jsx';
import Btn from './Btn.jsx';
import { waLink } from '../constants.js';

export default function Story() {
  return (
    <section className="section-pad" id="story">
      <div className="story-grid">
        <Reveal className="story-media" as="div">
          <img className="main-shot" src="/media/img/stage-floral-mirror.jpg" alt="An Oriana wedding stage with a full floral wall and mirrored floor" loading="lazy" />
          <img className="inset-shot" src="/media/img/bts-mehndi-setup.jpg" alt="Our crew hanging florals before a Mehndi night" loading="lazy" />
        </Reveal>
        <Reveal className="story-text" delay={0.1}>
          <span className="story-eyebrow">How We Work</span>
          <h2>Real Crews, Real Setups, No Two Days Alike</h2>
          <p>Oriana started the way most decor teams in Lahore do: one wedding, word of mouth, and a crew that showed up early and stayed until the last chair was straight. That part hasn&apos;t changed. We still walk every venue ourselves, still hang the florals and lights by hand, and still pick up the phone the night before a Barat because that&apos;s when clients actually need an answer.</p>
          <p>What&apos;s grown is the scope. A single stage backdrop turned into full Barat setups, then Mehndi nights with hanging florals, then cold fire entrances and a tracking spotlight for the photographers who wanted every angle covered. Somewhere in there, WhatsApp became our whole front desk, mostly because it&apos;s just faster for both sides.</p>
          <Btn href={waLink('Hello Oriana! I saw your story on the website and wanted to ask about my event.')} target="_blank" rel="noopener" className="btn-outline">
            Talk to Us on WhatsApp
          </Btn>
        </Reveal>
      </div>
    </section>
  );
}
