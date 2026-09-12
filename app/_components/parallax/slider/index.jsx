'use client';

import { Fragment } from 'react';

import { motion } from 'framer-motion';

import { useParallaxSlider } from '@/hooks';

/**
 * Repeats `children` on an endless horizontal marquee.
 *
 * @param {import('react').PropsWithChildren<{ repeat?: number, baseVelocity?: number }>} props
 */
export function ParallaxSlider({ children, repeat = 2, baseVelocity }) {
  const x = useParallaxSlider(baseVelocity);

  return (
    <div className='flex flex-nowrap overflow-hidden whitespace-nowrap'>
      <motion.div style={{ x }}>
        {Array.from({ length: repeat }, (_, index) => (
          // The copies are identical and never reorder, so the index is a
          // stable key. A generated id here would remount them every render.
          <Fragment key={index}>{children}</Fragment>
        ))}
      </motion.div>
    </div>
  );
}
