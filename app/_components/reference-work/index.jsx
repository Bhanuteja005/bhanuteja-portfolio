'use client';

import { useState } from 'react';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight, LayoutGrid, List } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { referenceWorks } from '@/reference-work-data';
import { cn } from '@/utils';

import {
  badgeScaleIn,
  badgeSpring,
  previewOffset,
  previewSpring,
  scaleIn,
} from './variants';

/** Projects shown on the home page before the "More work" link. */
const HOME_COUNT = 5;

/** Sentinel for "no row hovered or focused". */
const NONE = -1;

/** Keeps a keyboard-focused row's preview near the row instead of the pointer. */
const FOCUS_OFFSET_LIMIT = 180;

/**
 * The work list, shared by the home page and the work page.
 *
 * @param {Object} props
 * @param {boolean} [props.home] Render the condensed home-page variant.
 */
export function ReferenceWork({ home = false }) {
  const [isGrid, setGrid] = useState(false);
  const [activeIndex, setActiveIndex] = useState(NONE);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const previewX = useSpring(pointerX, previewSpring);
  const previewY = useSpring(pointerY, previewSpring);
  const badgeX = useSpring(pointerX, badgeSpring);
  const badgeY = useSpring(pointerY, badgeSpring);

  const works = home ? referenceWorks.slice(0, HOME_COUNT) : referenceWorks;
  const isActive = activeIndex >= 0;

  /** @param {import('react').PointerEvent<HTMLElement>} event */
  function trackPointer(event) {
    pointerX.set(event.clientX);
    pointerY.set(event.clientY);
  }

  /**
   * @param {import('react').PointerEvent<HTMLElement>} event
   * @param {number} index
   */
  function handlePointerEnter(event, index) {
    // Touch devices keep native scrolling; the preview is pointer-only.
    if (event.pointerType === 'touch') return;

    trackPointer(event);
    setActiveIndex(index);
  }

  /**
   * @param {import('react').FocusEvent<HTMLElement>} event
   * @param {number} index
   */
  function handleFocus(event, index) {
    const { left, top, width, height } =
      event.currentTarget.getBoundingClientRect();

    pointerX.set(left + width / 2);
    pointerY.set(top + Math.min(height / 2, FOCUS_OFFSET_LIMIT));
    setActiveIndex(index);
  }

  const clearActive = () => setActiveIndex(NONE);

  return (
    <section
      className={cn(
        'reference-work',
        home ? 'home-work' : 'all-work',
        isGrid && 'is-grid',
      )}
    >
      {!home && (
        <div className='work-toolbar'>
          <h2 className='works-label'>
            Works <sup>{referenceWorks.length}</sup>
          </h2>
          <div className='work-view-switch'>
            <button
              type='button'
              aria-label='List view'
              aria-pressed={!isGrid}
              className={cn(!isGrid && 'selected')}
              onClick={() => setGrid(false)}
            >
              <List size={20} />
            </button>
            <button
              type='button'
              aria-label='Grid view'
              aria-pressed={isGrid}
              className={cn(isGrid && 'selected')}
              onClick={() => setGrid(true)}
            >
              <LayoutGrid size={18} />
            </button>
          </div>
        </div>
      )}

      <div className='work-section-label'>
        {home ? (
          <span>Recent work</span>
        ) : (
          <>
            <span>Project</span>
            <span>Location</span>
            <span>Services</span>
            <span>Year</span>
          </>
        )}
      </div>

      <ul className='reference-work-items' onPointerLeave={clearActive}>
        {works.map((project, index) => (
          <li
            key={project.slug}
            onPointerEnter={event => handlePointerEnter(event, index)}
            onPointerMove={trackPointer}
          >
            <Link
              className='reference-work-link'
              href={`/work/${project.slug}`}
              onFocus={event => handleFocus(event, index)}
              onBlur={clearActive}
              onClick={clearActive}
            >
              <div
                className='reference-tile-image'
                style={{ background: project.color }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes='(max-width: 720px) 90vw, 45vw'
                  unoptimized
                />
              </div>
              <h2>{project.title}</h2>
              {!home && (
                <span className='project-location'>{project.location}</span>
              )}
              <span className='project-services'>{project.service}</span>
              {!home && <span className='project-year'>{project.year}</span>}
            </Link>
          </li>
        ))}
      </ul>

      <div className='reference-work-action'>
        {home ? (
          <Link className='work-more-link' href='/work'>
            More work <sup>{referenceWorks.length}</sup>
          </Link>
        ) : (
          <Link className='work-more-link' href='/contact'>
            Let’s talk
          </Link>
        )}
      </div>

      <motion.div
        className='work-hover-position'
        style={{ x: previewX, y: previewY }}
        aria-hidden='true'
      >
        <motion.div
          className='work-hover-image'
          variants={scaleIn}
          initial='initial'
          animate={isActive ? 'enter' : 'closed'}
        >
          <div
            className='work-hover-track'
            style={{ transform: previewOffset(activeIndex) }}
          >
            {works.map(project => (
              <div key={project.slug} style={{ background: project.color }}>
                <Image
                  src={project.preview}
                  alt=''
                  fill
                  sizes='400px'
                  loading='eager'
                  unoptimized
                />
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className='work-hover-position'
        style={{ x: badgeX, y: badgeY }}
        aria-hidden='true'
      >
        <motion.div
          className='work-hover-view'
          variants={badgeScaleIn}
          initial='initial'
          animate={isActive ? 'enter' : 'closed'}
        >
          <span>View</span>
          <ArrowUpRight size={17} />
        </motion.div>
      </motion.div>
    </section>
  );
}
