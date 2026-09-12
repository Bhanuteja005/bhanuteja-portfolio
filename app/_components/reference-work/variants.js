/** Shared easing used across the reference work hover affordances. */
const EASE_OUT_EXPO = [0.76, 0, 0.24, 1];

/** Spring driving the large image preview that trails the pointer. */
export const previewSpring = { stiffness: 120, damping: 23, mass: 0.5 };

/** Slightly tighter spring so the "View" badge leads the image preview. */
export const badgeSpring = { stiffness: 260, damping: 28, mass: 0.4 };

/** @type {import('framer-motion').Variants} */
export const scaleIn = {
  initial: { scale: 0 },
  enter: { scale: 1, transition: { duration: 0.45, ease: EASE_OUT_EXPO } },
  closed: { scale: 0, transition: { duration: 0.45, ease: EASE_OUT_EXPO } },
};

/** @type {import('framer-motion').Variants} */
export const badgeScaleIn = {
  initial: { scale: 0 },
  enter: { scale: 1, transition: { duration: 0.35, ease: EASE_OUT_EXPO } },
  closed: { scale: 0, transition: { duration: 0.35, ease: EASE_OUT_EXPO } },
};

/**
 * Vertical offset, in percent, that scrolls the preview track to `index`.
 * A negative index (nothing hovered) keeps the track at its first frame.
 *
 * @param {number} index
 */
export const previewOffset = index =>
  `translateY(-${Math.max(0, index) * 100}%)`;
