'use client';

import { useState, useEffect } from 'react';
import { Menu, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#services', label: 'Services' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#booking', label: 'Booking' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavLinks = ({ className }: { className?: string }) => (
    <>
      {NAV_LINKS.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className={cn(
            'font-bold transition-all text-lg',
            isScrolled 
              ? 'text-primary hover:scale-105'
              : 'text-white hover:text-primary hover:scale-105',
            className
          )}
        >
          {link.label}
        </a>
      ))}
    </>
  );

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background/80 backdrop-blur-sm shadow-md'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#" className="flex items-center gap-2">
            <Camera
              className={cn(
                'h-6 w-6 transition-colors',
                isScrolled ? 'text-primary' : 'text-white'
              )}
            />
            <span
              className={cn(
                'font-headline text-2xl font-bold transition-colors',
                isScrolled ? 'text-primary' : 'text-white'
              )}
            >
              Frame & Focus
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-6">
            <NavLinks />
          </nav>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col gap-6 p-6">
                  <a href="#" className="flex items-center gap-2 mb-4">
                    <Camera className="h-6 w-6 text-primary" />
                    <span className="font-headline text-2xl font-bold text-primary">
                      Frame & Focus
                    </span>
                  </a>
                  <nav className="flex flex-col gap-4">
                    {NAV_LINKS.map((link) => (
                      <SheetClose asChild key={link.href}>
                        <a
                          href={link.href}
                          className="text-lg font-bold transition-colors hover:text-primary"
                        >
                          {link.label}
                        </a>
                      </SheetClose>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
