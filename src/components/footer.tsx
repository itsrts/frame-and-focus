'use client';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import Logo from './logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center">
            <Logo className="w-[22rem]" />
          </div>
          <p className="text-xs md:text-sm text-muted-foreground order-last md:order-none">
            &copy; {currentYear} The Ulta Camera. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="text-muted-foreground hover:text-[#E1306C] transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-[#1877F2] transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-[#1DA1F2] transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
