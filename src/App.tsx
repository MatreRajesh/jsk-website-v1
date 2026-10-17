import { MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Services from './components/Services';
import Capabilities from './components/Capabilities';
import OnSite from './components/OnSite';
import Process from './components/Process';
import Industries from './components/Industries';
import Projects from './components/Projects';
import WhyJSK from './components/WhyJSK';
import CTA from './components/CTA';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { SmoothScroll } from './components/motion/SmoothScroll';
import ScrollProgress from './components/ui/ScrollProgress';

function App() {
  return (
    // reducedMotion="user": framer-motion skips transform animations for visitors who ask for less motion
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <ScrollProgress />
        <Navbar />
        <main>
          <Hero />
          <Marquee />
          <About />
          <Services />
          <Capabilities />
          <OnSite />
          <Process />
          <Industries />
          <Projects />
          <WhyJSK />
          <CTA />
          <Contact />
        </main>
        <Footer />
      </SmoothScroll>
    </MotionConfig>
  );
}

export default App;
