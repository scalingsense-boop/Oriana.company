import { waLink } from '../constants.js';

const serviceLinks = [
  'Wedding Decoration', 'Nikkah Decor', 'Mehndi & Walima', 'Birthday Decor', 'Car Decor',
  'Barat Decor', 'House Lighting', 'House Decor', 'Stairs Decor', 'Entry Gadgets (Cold Fire)',
  'Photo Spotlight', 'Sound & DJ System', 'Custom Order',
];

const quickLinks = [
  { href: '#home', label: 'Home' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#videos', label: 'Videos' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#why', label: 'Why Oriana' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact Us' },
  { href: '#services', label: 'Services' },
  { href: '#packages', label: 'Packages' },
];

export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <div className="footer-logo">Oriana</div>
          <div className="footer-tag">Event Decor, Lahore</div>
          <p className="footer-desc">Event decor based in Lahore. Weddings, Mehndis, Nikkahs, and everything in between, planned around your venue and budget.</p>
        </div>
        <div>
          <h4>Our Services</h4>
          <ul>
            {serviceLinks.map((s) => (
              <li key={s}><a href="#services">{s}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>
            {quickLinks.map((l) => (
              <li key={l.href}><a href={l.href}>{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Contact &amp; Social</h4>
          <a
            className="btn btn-solid btn-small"
            style={{ marginBottom: 18 }}
            target="_blank"
            rel="noopener"
            href={waLink("Hello Oriana! I'd love to chat about decorating my event.")}
          >
            Chat With Us
          </a>
          <div className="social-row">
            <a href="#" target="_blank" rel="noopener" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" /></svg>
            </a>
            <a href="#" target="_blank" rel="noopener" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M15 8h-2a2 2 0 00-2 2v10M9 12h4M17 8h-2a2 2 0 00-2 2v10" /></svg>
            </a>
            <a href="#" target="_blank" rel="noopener" aria-label="TikTok">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 4v10.5a3.5 3.5 0 11-3.5-3.5H11M14 4a5 5 0 005 5" /></svg>
            </a>
          </div>
          <div className="footer-phone">📞 <a href="tel:+923286681373">+92 328 6681373</a></div>
        </div>
      </div>
      <div className="footer-bottom">© 2026 Oriana. All rights reserved. Lahore-based event decor.</div>
    </footer>
  );
}
