'use client';

import { MagneticLink, ParallaxReveal } from '@/components';
import { portfolio } from '@/portfolio.config';

export function Description() {
  return (
    <section className='portfolio-section intro-grid'>
      <h2 className='section-statement'>
        <ParallaxReveal paragraph={portfolio.headline} />
      </h2>
      <div>
        <p className='body-copy'>{portfolio.intro}</p>
        <MagneticLink href='/about' className='about-circle'>
          About me
        </MagneticLink>
      </div>
    </section>
  );
}
