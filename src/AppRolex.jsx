import HeaderRolex from './components/HeaderRolex';
import HeroRolex from './components/HeroRolex';
import ProductShowcaseRolex from './components/ProductShowcaseRolex';
import HowItWorksRolex from './components/HowItWorksRolex';
import GalleryRolex from './components/GalleryRolex';
import ContactRolex from './components/ContactRolex';
import FooterRolex from './components/FooterRolex';
import VideoShowcaseRolex from './components/VideoShowcaseRolex';
import WhatsAppButtonRolex from './components/WhatsAppButtonRolex';


function AppRolex() {
  return (
    <div className="min-h-screen bg-black">
      <HeaderRolex />
      <HeroRolex />
      <ProductShowcaseRolex />
      <VideoShowcaseRolex /> 
      <HowItWorksRolex />
      <GalleryRolex />
      <ContactRolex />
      <FooterRolex />
      <WhatsAppButtonRolex />
    </div>
  );
}

export default AppRolex;
