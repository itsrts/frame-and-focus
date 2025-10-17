import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { SiteContentProvider } from '@/context/site-content-context';
import EditControls from '@/components/edit-controls';
import { FirebaseProvider } from '@/context/firebase-provider';

export const metadata: Metadata = {
  title: 'The Ulta Camera – Wedding Photography, Pre-Wedding Shoots, Invites & More in India',
  description: 'The Ulta Camera is your one-stop wedding solution in Delhi & across India. Capture stunning moments with expert wedding photography, design bespoke invites, create luxury gift hampers, and choose elegant wedding accessories. Book now!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=PT+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased'
        )}
      >
        <FirebaseProvider>
          <SiteContentProvider contentPath="landing-page">
            {children}
            <Toaster />
            <EditControls />
          </SiteContentProvider>
        </FirebaseProvider>
      </body>
    </html>
  );
}
