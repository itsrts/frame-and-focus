import Header from '@/components/header';
import Hero from '@/components/hero';
import About from '@/components/about';
import Gallery from '@/components/gallery';
import Services from '@/components/services';
import Testimonials from '@/components/testimonials';
import Booking from '@/components/booking';
import Footer from '@/components/footer';
import ReviewAssistant from '@/components/review-assistant';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Gallery />
        <Services />
        <Testimonials />
        <ReviewAssistant />
        <Booking />
      </main>
      <Footer />
    </div>
  );
}
