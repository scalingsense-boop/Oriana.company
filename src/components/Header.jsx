import { useState } from 'react';
import { waLink } from '../constants.js';
import Btn from './Btn.jsx';

const navItems = [
  { href: '#home', label: 'Home' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#videos', label: 'Videos' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#why', label: 'Why Oriana' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact Us' },
];

const serviceLinks = [
  'Wedding Decoration', 'Nikkah Decor', 'Mehndi & Walima Decor', 'Birthday Decor',
  'House Lighting', 'House Decor', 'Stairs Decor', 'Car Decor', 'Barat Decor',
  'Entry Gadgets (Cold Fire & Pyro)', 'Photo Spotlight', 'Sound & DJ System', 'Custom Order',
];

const mobileServiceLinks = [
  'Wedding Decoration', 'Nikkah Decor', 'Mehndi & Walima Decor', 'Birthday Decor',
  'House Lighting', 'House Decor', 'Stairs Decor', 'Car Decor', 'Barat Decor',
  'Entry Gadgets', 'Photo Spotlight', 'Sound & DJ System', 'Custom Order',
];

export default function Header({ scrolled, activeSection }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  function closeMobileNav() {
    setMobileOpen(false);
  }

  return (
    <>
      <header id="siteHeader" className={scrolled ? 'scrolled' : ''}>
        <div className="logo-box">
          <a href="#home"><span className="logo-text">Oriana</span></a>
          <span className="logo-tag">Event Decor, Lahore</span>
        </div>

        <nav className="desktop-nav">
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={`nav-link${activeSection === item.href.slice(1) ? ' active' : ''}`}>
                  {item.label}
                </a>
              </li>
            ))}
            <li className="services-item">
              <a href="#services" className={`nav-link has-dropdown${activeSection === 'services' ? ' active' : ''}`}>Services ▾</a>
              <ul className="dropdown">
                {serviceLinks.map((s) => (
                  <li key={s}><a href="#services">{s}</a></li>
                ))}
              </ul>
            </li>
            <li>
              <a href="#packages" className={`nav-link${activeSection === 'packages' ? ' active' : ''}`}>Packages</a>
            </li>
          </ul>
          <div className="nav-cta">
            <Btn href={waLink('Hello Oriana! I would like a free quote for my event.')} target="_blank" rel="noopener" className="btn-solid btn-small">
              Get a Free Quote
            </Btn>
          </div>
        </nav>

        <button className={`hamburger${mobileOpen ? ' open' : ''}`} aria-label="Menu" onClick={() => setMobileOpen((v) => !v)}>
          <span></span><span></span><span></span>
        </button>
      </header>

      <div className={`nav-overlay${mobileOpen ? ' open' : ''}`} onClick={closeMobileNav} />

      <div className={`mobile-nav${mobileOpen ? ' open' : ''}`}>
        <ul>
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="mobile-link" onClick={closeMobileNav}>{item.label}</a>
            </li>
          ))}
          <li>
            <div className="mobile-services-toggle" onClick={() => setMobileServicesOpen((v) => !v)}>
              <span>Services</span><span>▾</span>
            </div>
            <ul className={`mobile-submenu${mobileServicesOpen ? ' open' : ''}`}>
              {mobileServiceLinks.map((s) => (
                <li key={s}><a href="#services" className="mobile-link" onClick={closeMobileNav}>{s}</a></li>
              ))}
            </ul>
          </li>
          <li><a href="#packages" className="mobile-link" onClick={closeMobileNav}>Packages</a></li>
        </ul>
        <a
          className="btn btn-solid"
          style={{ display: 'block', textAlign: 'center', marginTop: 26 }}
          target="_blank"
          rel="noopener"
          href={waLink('Hello Oriana! I would like a free quote for my event.')}
        >
          Get a Free Quote
        </a>
      </div>
    </>
  );
}
