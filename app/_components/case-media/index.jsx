'use client';

import { useEffect, useRef } from 'react';

import { useReducedMotion } from 'framer-motion';
import Image from 'next/image';

/** Start/stop playback slightly before the video scrolls into view. */
const ROOT_MARGIN = '150px';

/** Intrinsic size hint for case-study stills; CSS drives the rendered size. */
const IMAGE_WIDTH = 1600;
const IMAGE_HEIGHT = 1000;

/**
 * Renders one case-study asset, playing videos only while they are on screen.
 *
 * @param {Object} props
 * @param {{ type: 'image' | 'video', src: string }} props.media
 * @param {string} [props.alt]
 * @param {boolean} [props.priority] Eager-load the image (above the fold).
 * @param {string} [props.poster] Still shown before a video has data.
 */
export function CaseMedia({ media, alt = '', priority = false, poster }) {
  /** @type {import('react').MutableRefObject<HTMLVideoElement>} */
  const videoRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !reducedMotion) {
          // Autoplay can still be blocked by the browser; ignore the rejection.
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: ROOT_MARGIN },
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, [reducedMotion]);

  if (media.type === 'video') {
    return (
      <video
        ref={videoRef}
        src={media.src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        controls
        preload='auto'
        aria-label={alt}
      />
    );
  }

  return (
    <Image
      src={media.src}
      alt={alt}
      width={IMAGE_WIDTH}
      height={IMAGE_HEIGHT}
      unoptimized
      priority={priority}
      style={{ width: '100%', height: 'auto' }}
    />
  );
}
