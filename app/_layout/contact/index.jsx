'use client';

import { useRef } from 'react';

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';

import { useContactSlider } from '@/hooks';

import { SocialInfo, UserDetails } from './components';

/** Height of the curved reveal, in vh, before the footer is fully in view. */
const CURTAIN_RANGE = [90, 0];

/** Scroll progress at which the curtain has finished retracting. */
const CURTAIN_PROGRESS = [0, 0.8];

/** Upward drift, in px, applied to the footer content as it scrolls in. */
const CONTENT_Y_RANGE = [-70, 0];

export function Contact() {
  /** @type {import('react').MutableRefObject<HTMLElement>} */
  const containerRef = useRef(null);
  const { transformX } = useContactSlider(containerRef);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start'],
  });
  const curtainHeight = useTransform(
    scrollYProgress,
    CURTAIN_PROGRESS,
    CURTAIN_RANGE,
  );
  const contentY = useTransform(scrollYProgress, [0, 1], CONTENT_Y_RANGE);

  return (
    <motion.footer ref={containerRef} className='reference-footer'>
      <motion.div
        className='footer-curtain'
        aria-hidden='true'
        style={{ height: reducedMotion ? 0 : curtainHeight }}
      />
      <motion.div
        className='footer-content'
        style={{ y: reducedMotion ? 0 : contentY }}
      >
        <UserDetails transformX={transformX} />
        <SocialInfo />
      </motion.div>
    </motion.footer>
  );
}
