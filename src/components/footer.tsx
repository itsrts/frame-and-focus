
'use client';
import { Instagram, Facebook, Twitter, Pencil, LogOut } from 'lucide-react';
import Logo from './logo';
import { useSiteContent } from '@/context/site-content-context';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from './ui/label';
import { useState } from 'react';
import { useDatabase } from '@/context/database-provider';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { isEditMode, enterEditMode, logout } = useSiteContent();
  const { readData } = useDatabase();
  const { toast } = useToast();
  const [password, setPassword] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password) {
      // The readData function sets up a listener, we need to unsubscribe
      // after we get the value to avoid memory leaks.
      const unsubscribe = readData('admin-password', (dbPassword) => {
        if (password === dbPassword) {
          enterEditMode();
          toast({ title: 'Edit mode enabled.' });
          setIsOpen(false);
          setPassword('');
        } else {
          toast({ variant: 'destructive', title: 'Invalid password.' });
          setPassword('');
        }
        // Unsubscribe after checking the password
        unsubscribe();
      });
    }
  };

  const handleLogout = () => {
    logout();
  }

  const AuthButton = () => {
    if(isEditMode) {
      return (
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-primary"
          aria-label="Disable Edit Mode"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
        </Button>
      )
    }

    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-primary"
            aria-label="Enable Edit Mode"
          >
            <Pencil className="h-5 w-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handlePasswordSubmit}>
            <DialogHeader>
              <DialogTitle>Admin Authentication</DialogTitle>
              <DialogDescription>
                Enter the admin password to enable edit mode.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  className="col-span-3"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoFocus
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                  <Button type="button" variant="secondary">Cancel</Button>
              </DialogClose>
              <Button type="submit">Enable Editing</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    )
  }

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
            <AuthButton />
          </div>
        </div>
      </div>
    </footer>
  );
}
