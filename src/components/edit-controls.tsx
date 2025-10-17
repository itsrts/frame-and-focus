
'use client';

import { useSiteContent } from '@/context/site-content-context';
import { Button } from './ui/button';
import { Save, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EditControls() {
  const { editingSection, exitEditMode } = useSiteContent();

  if (!editingSection) {
    return null;
  }

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-[100] flex items-center gap-2"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <Button
        onClick={() => exitEditMode(false)}
        variant="destructive"
        className="gap-2 shadow-lg"
      >
        <XCircle size={18} />
        Cancel
      </Button>
      <Button
        onClick={() => exitEditMode(true)}
        className="gap-2 shadow-lg bg-green-600 hover:bg-green-700"
      >
        <Save size={18} />
        Save Changes
      </Button>
    </motion.div>
  );
}
