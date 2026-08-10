import { lazy, Suspense, useState } from 'react';
import { useScrollTracking } from './hooks/useScrollTracking.js';
import ScrollProgress from './components/ScrollProgress.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import CategoryNav from './components/CategoryNav.jsx';
import Marquee from './components/Marquee.jsx';

// below-the-fold sections: code-split so they don't block the initial
// paint of the hero, which is what visitors actually wait on
const Story = lazy(() => import('./components/Story.jsx'));
const Gallery = lazy(() => import('./components/Gallery.jsx'));
const Videos = lazy(() => import('./components/Videos.jsx'));
const Testimonials = lazy(() => import('./components/Testimonials.jsx'));
const Why = lazy(() => import('./components/Why.jsx'));
const FAQ = lazy(() => import('./components/FAQ.jsx'));
const Contact = lazy(() => import('./components/Contact.jsx'));
const Services = lazy(() => import('./components/Services.jsx'));
const Packages = lazy(() => import('./components/Packages.jsx'));
const Footer = lazy(() => import('./components/Footer.jsx'));
const WaFloat = lazy(() => import('./components/WaFloat.jsx'));
const ScrollTop = lazy(() => import('./components/ScrollTop.jsx'));

function SectionDivider() {
  return <div className="section-divider-line" />;
}

export default function App() {
  const { scrolled, activeSection, progress, showScrollTop } = useScrollTracking();
  const [activeServiceTab, setActiveServiceTab] = useState('all');

  return (
    <>
      <CustomCursor />
      <ScrollProgress progress={progress} />
      <Header scrolled={scrolled} activeSection={activeSection} />

      <Hero />
      <CategoryNav onSelectTab={setActiveServiceTab} />
      <Marquee />

      <Suspense fallback={null}>
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
      </Suspense>
    </>
  );
}
