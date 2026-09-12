'use client';
import { socialMedias } from '@/data';
import { portfolio } from '@/portfolio.config';
export function SocialInfo() {
  return (
    <div className='footer-meta'>
      <p>
        © {new Date().getFullYear()} {portfolio.name}
      </p>
      <p>{portfolio.location} · IST</p>
      <div className='project-links'>
        {socialMedias.map(item => (
          <a
            key={item.href}
            href={item.href}
            target='_blank'
            rel='noopener noreferrer'
          >
            {item.title} ↗
          </a>
        ))}
      </div>
    </div>
  );
}
