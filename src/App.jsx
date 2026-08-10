import { useState } from 'react';
import { useScrollTracking } from './hooks/useScrollTracking.js';
import ScrollProgress from './components/ScrollProgress.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import CategoryNav from './components/CategoryNav.jsx';
import Marquee from './components/Marquee.jsx';
import Story from './components/Story.jsx';
import Gallery from './components/Gallery.jsx';
import Videos from './components/Videos.jsx';
import Testimonials from './components/Testimonials.jsx';
import Why from './components/Why.jsx';
import FAQ from './components/FAQ.jsx';
import Contact from './components/Contact.jsx';
import Services from './components/Services.jsx';
import Packages from './components/Packages.jsx';
import Footer from './components/Footer.jsx';
import WaFloat from './components/WaFloat.jsx';
import ScrollTop from './components/ScrollTop.jsx';

function SectionDivider() {
  return <div className="section-divider-line" />;
}

export default function App() {
  const { scrolled, activeSection, progress, showScrollTop } = useScrollTracking();
  const [activeServiceTab, setActiveServiceTab] = useState('all');

  return (
    <>
      <ScrollProgress progress={progress} />
      <Header scrolled={scrolled} activeSection={activeSection} />

      <Hero />
      <CategoryNav onSelectTab={setActiveServiceTab} />
      <Marquee />

      <Story />
      <SectionDivider />
      <Gallery />
      <SectionDivider />
      <Videos />
      <SectionDivider />
      <Testimonials />
      <SectionDivider />
      <Why />
      <SectionDivider />
      <FAQ />
      <SectionDivider />
      <Contact />
      <SectionDivider />
      <Services activeTab={activeServiceTab} onSelectTab={setActiveServiceTab} />
      <SectionDivider />
      <Packages />

      <WaFloat />
      <ScrollTop show={showScrollTop} />
      <Footer />
    </>
  );
}
