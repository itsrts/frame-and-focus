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
// import { useFirebase } from '@/context/firebase-provider';

export default function Home() {
  const [appReady, setAppReady] = useState(false);
  const { content } = useSiteContent();
  // const { dbConnection } = useFirebase();

  useEffect(() => {
    // if (content && dbConnection === 'connected') {
    if (content) {
      const timer = setTimeout(() => {
        setAppReady(true);
        document.body.style.cursor = 'auto';
        window.scrollTo(0, 0);
      }, 2000); // Keep loader for 2 seconds for smooth transition

      return () => {
        clearTimeout(timer);
      };
    }
  // }, [content, dbConnection]);
  }, [content]);
  
  // const isLoading = !appReady || !content || dbConnection !== 'connected';
  const isLoading = !appReady || !content;

  return (
    <>
      {isLoading && <Loader />}
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
