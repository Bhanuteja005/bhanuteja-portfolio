'use client';

import Link from 'next/link';

import { OPEN_MENU_EVENT } from '@/config';
import { navItems } from '@/data';

export function NavbarList() {
  return (
    <>
      <button
        className='mobile-menu-trigger'
        type='button'
        aria-haspopup='dialog'
        onClick={() => window.dispatchEvent(new Event(OPEN_MENU_EVENT))}
      >
        • Menu
      </button>
      <ul className='portfolio-nav'>
        {/* The first item is Home, already covered by the brand link. */}
        {navItems.slice(1).map(({ href, title }) => (
          <li key={href}>
            <Link href={href}>{title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
