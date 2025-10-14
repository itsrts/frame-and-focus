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
import { siteContent } from '@/app/lib/content';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState(siteContent);

  useEffect(() => {
    // Load content from localStorage or initial content
    const storedContent = localStorage.getItem('siteContent');
    if (storedContent) {
      setContent(JSON.parse(storedContent));
    }

    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.cursor = 'auto';
      window.scrollTo(0, 0);
    }, 2000);

    // Listen for content changes from other tabs
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'siteContent' && event.newValue) {
        setContent(JSON.parse(event.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <>
      {loading && <Loader />}
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <Hero content={content.hero} />
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
