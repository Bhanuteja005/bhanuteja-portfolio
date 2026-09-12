'use client';
import Link from 'next/link';

import { portfolio } from '@/portfolio.config';
export function NavbarBrand() {
  return (
    <Link
      href='/'
      className='portfolio-brand'
      aria-label={`${portfolio.name} home`}
    >
      © Code by {portfolio.name}
    </Link>
  );
}
