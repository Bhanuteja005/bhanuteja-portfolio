import { portfolio } from '@/portfolio.config';
export function ContactOptions() {
  return (
    <div className='contact-options'>
      <a href={`mailto:${portfolio.email}`} className='contact-pill'>
        {portfolio.email} ↗
      </a>
      <a
        href={portfolio.linkedin}
        className='contact-pill'
        target='_blank'
        rel='noopener noreferrer'
      >
        LinkedIn ↗
      </a>
    </div>
  );
}
