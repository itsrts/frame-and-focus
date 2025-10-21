
'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/header';
import ServiceHero from '@/components/service-hero';
import Products from '@/components/products';
import Booking from '@/components/booking';
import Footer from '@/components/footer';
import Loader from '@/components/loader';
import { useSiteContent, SiteContentProvider } from '@/context/site-content-context';
import { useFirebase } from '@/context/firebase-provider';
import { usePathname } from 'next/navigation';

function ServicePageContent({ serviceId }: { serviceId: string }) {
  const [appReady, setAppReady] = useState(false);
  const { content } = useSiteContent();
  const { dbConnection } = useFirebase();

  useEffect(() => {
    if (content && dbConnection === 'connected') {
      const timer = setTimeout(() => {
        setAppReady(true);
        document.body.style.cursor = 'auto';
        window.scrollTo(0, 0);
      }, 2000); // Keep loader for 2 seconds for smooth transition

      return () => {
        clearTimeout(timer);
      };
    }
  }, [content, dbConnection]);

  const isLoading = !appReady || !content || dbConnection !== 'connected';

  return (
    <>
      {isLoading && <Loader />}
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <ServiceHero />
          <Products />
          <Booking />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default function ServicePage() {
  const pathname = usePathname();
  const serviceId = pathname.split('/').pop() || '';

  if (!serviceId) {
    return <Loader />; 
  }

  const contentPath = `service-${serviceId}`;

  return (
    <SiteContentProvider contentPath={contentPath}>
      <ServicePageContent serviceId={serviceId} />
    </SiteContentProvider>
  );
}
