
'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/header';
import Hero from '@/components/hero';
import About from '@/components/about';
import Gallery from '@/components/gallery';
import Services from '@/components/services';
import Testimonials from '@/components/testimonials';
import Booking from '@/components/booking';
import Footer from '@/components/footer';
import Loader from '@/components/loader';
import { useSiteContent } from '@/context/site-content-context';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { content } = useSiteContent();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.cursor = 'auto';
      window.scrollTo(0, 0);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!content) {
    return <Loader />;
  }

  return (
    <>
      {loading && <Loader />}
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <Hero />
          <About />
          <Gallery />
          <Services />
          <Testimonials />
          <Booking />
        </main>
        <Footer />
      </div>
    </>
  );
}
