import Header from './components/Header';
import Hero from './components/Hero';
import BeforeAfter from './components/BeforeAfter';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import Gallery from './components/Gallery';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <BeforeAfter />
      <HowItWorks />
      <Features />
      <Gallery />
      <Pricing />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
