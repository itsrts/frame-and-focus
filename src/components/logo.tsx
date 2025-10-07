import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function Logo({ className, scrolled, ...props }: { className?: string, scrolled?: boolean }) {
  return (
    <Image
      src="/images/the-ultra-camera.png"
      alt="The Ulta Camera Logo"
      width={200}
      height={50}
      style={{ filter: scrolled ? 'invert(0)' : 'invert(1)' }}
      className={cn('h-auto', className)}
      {...props}
    />
  );
}
