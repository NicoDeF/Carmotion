import HeaderRolex from './components/HeaderRolex';
import HeroRolex from './components/HeroRolex';
import ProductShowcaseRolex from './components/ProductShowcaseRolex';
import PricingRolex from './components/PricingRolex';
import IncludesRolex from './components/IncludesRolex';
import YouTubeShowcaseRolex from './components/YouTubeShowcaseRolex';
import GalleryRolex from './components/GalleryRolex';
import PressRolex from './components/PressRolex';
import ContactRolex from './components/ContactRolex';
import FooterRolex from './components/FooterRolex';
import WhatsAppButtonRolex from './components/WhatsAppButtonRolex';

/**
 * Tonalidades alternadas por sección:
 * #000000 → negro puro (hero ya es negro)
 * #0a0a0a → negro cálido (ProductShowcase)
 * #111111 → carbono suave (Includes)
 * #0a0a0a → vuelta al cálido (YouTube)
 * #111111 → carbono (Gallery)
 * #000000 → negro puro cierre (Contact, Footer)
 */

export default function AppRolex() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#000' }}>
      <HeaderRolex />

      {/* Hero — negro puro, maneja su propio fondo */}
      <HeroRolex />

      {/* #0a0a0a — negro cálido */}
      <div style={{ backgroundColor: '#0a0a0a' }}>
        <ProductShowcaseRolex />
      </div>

      {/* #0a0a0a — negro cálido */}
      <div style={{ backgroundColor: '#0a0a0a' }}>
        <PricingRolex />
      </div>

      {/* #0a0a0a — negro cálido */}
      <div style={{ backgroundColor: '#0a0a0a' }}>
        <IncludesRolex />
      </div>

      {/* #0a0a0a — negro cálido */}
      <div style={{ backgroundColor: '#0a0a0a' }}>
        <YouTubeShowcaseRolex />
      </div>

      {/* #0a0a0a — negro cálido */}
      <div style={{ backgroundColor: '#0a0a0a' }}>
        <GalleryRolex />
      </div>

      {/* #0a0a0a — negro cálido */}
      <div style={{ backgroundColor: '#0a0a0a' }}>
        <PressRolex />
      </div>

      {/* #000 — negro puro para el cierre */}
      <div style={{ backgroundColor: '#000' }}>
        <ContactRolex />
        <FooterRolex />
      </div>

      <WhatsAppButtonRolex />
    </div>
  );
}