'use client';
import { motion } from 'framer-motion';
import { Globe2, MoveDownRight } from 'lucide-react';
import Image from 'next/image';

import { ParallaxSlider } from '@/components';
import { portfolio } from '@/portfolio.config';

import { slideUp } from './variants';
export function Header() {
  return (
    <motion.header
      className='portfolio-hero'
      variants={slideUp}
      initial='initial'
      animate='enter'
    >
      <Image
        src={portfolio.portrait}
        alt='Bhanu Teja in a dark green crewneck, smiling and looking to the side'
        width={1226}
        height={1283}
        unoptimized
        priority
        sizes='130vh'
        className='hero-photo'
      />
      <div className='hero-location'>
        <span>
          Located
          <br />
          in India
          <br />
          Hyderabad
        </span>
        <Globe2 size={34} strokeWidth={1.2} />
      </div>
      <div className='hero-intro'>
        <MoveDownRight size={28} strokeWidth={1.25} />
        <p>
          Freelance
          <br />
          {portfolio.role}
        </p>
      </div>
      <h1 className='hero-name' aria-label={portfolio.name}>
        <span aria-hidden='true'>
          <ParallaxSlider repeat={4} baseVelocity={2}>
            <span className='pe-12'>{portfolio.name} — </span>
          </ParallaxSlider>
        </span>
      </h1>
    </motion.header>
  );
}
