/**
 * Device mock-ups are scraped as image URLs. The filename is the only clue to
 * which frame it is, and each frame needs its own aspect ratio in CSS.
 */
const FRAME_CLASSES = {
  iphone: 'is-phone',
  ipad: 'is-tablet',
  macpro: 'is-monitor',
};

/**
 * Maps a frame image URL to the modifier class that sizes it.
 *
 * @param {string | null | undefined} frame
 * @returns {string | undefined}
 */
export function deviceFrameClass(frame) {
  if (!frame) return undefined;

  const match = Object.keys(FRAME_CLASSES).find(name => frame.includes(name));

  return match && FRAME_CLASSES[match];
}
