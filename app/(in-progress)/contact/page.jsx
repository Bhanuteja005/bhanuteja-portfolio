import { MoveDownRight } from 'lucide-react';
import Image from 'next/image';

import { InquiryForm } from '@/components';
import { socialMedias } from '@/data';
import { Navbar, SocialInfo, Transition } from '@/layout';
import { portfolio } from '@/portfolio.config';

export const metadata = { title: 'Contact' };

/** Rendered size of the portrait beside the heading. */
const AVATAR_SIZE = 90;

export default function Contact() {
  return (
    <Transition>
      <div className='contact-page-v2'>
        <Navbar />
        <main className='contact-shell'>
          <div className='contact-heading'>
            <h1>
              Let’s start a
              <br />
              project together
            </h1>
            <div className='contact-portrait'>
              <div className='contact-avatar'>
                <Image
                  src={portfolio.portrait}
                  width={AVATAR_SIZE}
                  height={AVATAR_SIZE}
                  alt={portfolio.name}
                  unoptimized
                />
              </div>
              <MoveDownRight size={25} strokeWidth={1.4} />
            </div>
          </div>

          <div className='contact-columns'>
            <InquiryForm />
            <aside className='contact-sidebar'>
              <h2>Contact details</h2>
              <a href={`mailto:${portfolio.email}`}>{portfolio.email}</a>

              <h2>Developer details</h2>
              <p>{portfolio.fullName}</p>
              <p>{portfolio.role}</p>
              <p>Location: {portfolio.location}</p>

              <h2>Socials</h2>
              {socialMedias.map(({ href, title }) => (
                <a
                  key={href}
                  href={href}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {title}
                </a>
              ))}
            </aside>
          </div>
        </main>
        <SocialInfo />
      </div>
    </Transition>
  );
}
