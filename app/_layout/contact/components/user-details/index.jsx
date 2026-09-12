'use client';
import { motion } from 'framer-motion';
import { MoveDownRight } from 'lucide-react';
import Image from 'next/image';

import { ContactOptions, MagneticLink } from '@/components';
import { portfolio } from '@/portfolio.config';
export function UserDetails({ transformX }) {
  return (
    <div className='portfolio-section footer-main'>
      <MoveDownRight className='footer-arrow' size={30} strokeWidth={1.4} />
      <h2>
        <Image
          src={portfolio.portrait}
          alt={portfolio.name}
          width={90}
          height={90}
          unoptimized
          className='footer-avatar'
        />
        Let’s work
        <br />
        together
      </h2>
      <div className='footer-divider'>
        <motion.div style={{ x: transformX }}>
          <MagneticLink href='/contact' className='contact-circle'>
            Get in touch
          </MagneticLink>
        </motion.div>
      </div>
      <ContactOptions />
    </div>
  );
}
