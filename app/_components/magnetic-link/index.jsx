'use client';

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import Link from 'next/link';

/** Spring that eases the link back to rest once the pointer leaves. */
const MAGNETIC_SPRING = { stiffness: 180, damping: 18 };

/** Fraction of the pointer's offset from centre that the link follows. */
const MAGNETIC_STRENGTH = 0.22;

/**
 * A link that drifts towards the pointer, then springs back.
 *
 * @param {import('next/link').LinkProps & import('react').PropsWithChildren<{ className?: string }>} props
 */
export function MagneticLink({ children, className, href, ...props }) {
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  const x = useSpring(offsetX, MAGNETIC_SPRING);
  const y = useSpring(offsetY, MAGNETIC_SPRING);
  const reducedMotion = useReducedMotion();

  /** @param {import('react').PointerEvent<HTMLDivElement>} event */
  function handlePointerMove(event) {
    if (event.pointerType === 'touch' || reducedMotion) return;

    const { left, top, width, height } =
      event.currentTarget.getBoundingClientRect();

    offsetX.set((event.clientX - left - width / 2) * MAGNETIC_STRENGTH);
    offsetY.set((event.clientY - top - height / 2) * MAGNETIC_STRENGTH);
  }

  function handlePointerLeave() {
    offsetX.set(0);
    offsetY.set(0);
  }

  return (
    <motion.div
      className='magnetic-link-wrap'
      style={{ x, y }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <Link href={href} className={className} {...props}>
        <span>{children}</span>
      </Link>
    </motion.div>
  );
}
