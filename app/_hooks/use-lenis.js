'use client';

import { useEffect } from 'react';

import Lenis from '@studio-freight/lenis';

/**
 * Smooth-scroll options. `syncTouch` stays off so touch devices keep their
 * native scrolling.
 */
const LENIS_OPTIONS = {
  lerp: 0.075,
  smoothWheel: true,
  wheelMultiplier: 0.85,
  touchMultiplier: 1.5,
  syncTouch: false,
};

/** Drives Lenis smooth scrolling, unless the visitor prefers reduced motion. */
export function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis(LENIS_OPTIONS);
    let frame;

    function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);
}
