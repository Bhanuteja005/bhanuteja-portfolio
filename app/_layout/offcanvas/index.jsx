'use client';

import { useEffect, useState } from 'react';

import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

import { OPEN_MENU_EVENT } from '@/config';

import { OffcanvasBody, OffcanvasToggle } from './components';

export function Offcanvas() {
  const [isOpen, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const open = () => setOpen(true);
    const closeOnEscape = event => {
      if (event.key === 'Escape') setOpen(false);
    };

    window.addEventListener(OPEN_MENU_EVENT, open);
    window.addEventListener('keydown', closeOnEscape);

    return () => {
      window.removeEventListener(OPEN_MENU_EVENT, open);
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

  // Close the menu whenever a link inside it navigates.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <AnimatePresence mode='wait'>
        {isOpen ? <OffcanvasBody /> : null}
      </AnimatePresence>
      <OffcanvasToggle isOpen={isOpen} handleOpen={setOpen} />
    </>
  );
}
