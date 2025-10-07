import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function Logo({ className, ...props }: { className?: string }) {
  return (
    <Image
      src="/images/the-ultra-camera.svg"
      alt="The Ulta Camera Logo"
      width={200}
      height={50}
      className={cn('h-auto', className)}
      {...props}
    />
  );
}
