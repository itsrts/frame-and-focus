// IMPORTANT: To use this component, you must paste your SVG code into this file.
// Find the <svg> tag in your SVG file and replace the example SVG below.
// Make sure to add `className` and `fill="currentColor"` to the <svg> tag.

import { cn } from '@/lib/utils';

export default function Logo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  // Replace this with your own SVG
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 50"
      className={cn('h-auto', className)}
      fill="currentColor"
      {...props}
    >
      {/* Example SVG path - replace with your SVG content */}
      <path d="M42.4,32.5c-3.1,0-5.7-1.1-7.7-3.4s-3-5.2-3-8.8c0-3.6,1-6.5,3-8.8s4.6-3.4,7.7-3.4c2.5,0,4.6,0.7,6.3,2l-2.5,4.3c-1-0.7-2.2-1-3.7-1c-1.8,0-3.2,0.6-4.3,1.9s-1.6,2.9-1.6,5.1c0,2.1,0.5,3.8,1.6,5s2.5,1.8,4.3,1.8c1.5,0,2.8-0.3,3.8-1l2.5,4.3C47.1,31.9,45,32.5,42.4,32.5z" />
      <path d="M57.6,32.2V12.4h5.8l8.3,12.5V12.4h5.1v19.8h-5.4l-8.6-12.9v12.9H57.6z" />
      <path d="M96.4,32.5c-3.5,0-6.4-1.2-8.5-3.5s-3.2-5.4-3.2-9.2c0-3.8,1.1-6.9,3.2-9.2s4.9-3.5,8.5-3.5c3.5,0,6.4,1.2,8.5,3.5s3.2,5.4,3.2,9.2c0,3.8-1.1,6.9-3.2,9.2S99.9,32.5,96.4,32.5z M96.4,28.6c1.9,0,3.4-0.8,4.5-2.4s1.7-3.7,1.7-6.4c0-2.7-0.6-4.8-1.7-6.4c-1.1-1.6-2.6-2.4-4.5-2.4s-3.4,0.8-4.5,2.4s-1.7,3.7-1.7,6.4c0,2.7,0.6,4.8,1.7,6.4C93,27.8,94.5,28.6,96.4,28.6z" />
      <path d="M112.5,32.2V8.1h5.8v19.8h11.9v4.3H112.5z" />
      <path d="M135.5,32.2V8.1h5.8v24.1H135.5z" />
      <path d="M152.9,32.5c-3.1,0-5.7-1.1-7.7-3.4s-3-5.2-3-8.8c0-3.6,1-6.5,3-8.8s4.6-3.4,7.7-3.4c2.5,0,4.6,0.7,6.3,2l-2.5,4.3c-1-0.7-2.2-1-3.7-1c-1.8,0-3.2,0.6-4.3,1.9s-1.6,2.9-1.6,5.1c0,2.1,0.5,3.8,1.6,5s2.5,1.8,4.3,1.8c1.5,0,2.8-0.3,3.8-1l2.5,4.3C157.6,31.9,155.5,32.5,152.9,32.5z" />
      <path d="M168.1,32.2V8.1h5.8v15.2h10.4v-15.2h5.8v24.1h-22V32.2z" />
    </svg>
  );
}