'use client';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';

const Loader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 1.5 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
      onAnimationComplete={() => {
        const element = document.querySelector('.fixed.inset-0.z-\\[100\\]');
        if (element) {
          (element as HTMLElement).style.display = 'none';
        }
      }}
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
          delay: 0.2,
        }}
        className="flex items-center gap-3"
      >
        <Camera className="h-12 w-12 text-primary" />
        <span className="font-headline text-4xl font-bold text-primary">
          Frame & Focus
        </span>
      </motion.div>
    </motion.div>
  );
};

export default Loader;
