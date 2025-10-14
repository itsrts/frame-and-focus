'use client';
import { Instagram, Facebook, Twitter, Pencil } from 'lucide-react';
import Logo from './logo';
import { useSiteContent } from '@/context/site-content-context';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { enterEditMode } = useSiteContent();
  const { toast } = useToast();

  const handleEditClick = () => {
    const password = prompt('Enter admin password to enable edit mode:');
    if (password) {
      if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
        enterEditMode();
        toast({ title: 'Edit mode enabled.' });
      } else {
        toast({ variant: 'destructive', title: 'Invalid password.' });
      }
    }
  };

  return (
    <footer className="bg-background border-t py-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 relative">
          <div className="flex items-center">
            <Logo scrolled className="w-[12rem] h-auto" />
          </div>
          <p className="text-xs md:text-sm text-muted-foreground order-last md:order-none">
            &copy; {currentYear} The Ulta Camera. All rights reserved.
          </p>
          <div className="flex gap-4 items-center">
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
            <Button
              variant="ghost"
              size="icon"
              onClick={handleEditClick}
              className="text-muted-foreground hover:text-primary"
              aria-label="Enable Edit Mode"
            >
              <Pencil className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
