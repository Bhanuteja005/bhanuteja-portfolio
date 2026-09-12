import Image from 'next/image';

import { PortfolioPage } from '@/layout';
import { articles, skillsFun, skillsWork } from '@/portfolio-content';
import { portfolio } from '@/portfolio.config';
export const metadata = { title: 'About' };
export default function About() {
  return (
    <PortfolioPage
      eyebrow={`About ${portfolio.name}`}
      title='A developer. A curious mind.'
    >
      <div className='about-grid'>
        <div>
          <p className='about-copy'>{portfolio.bio}</p>
          <p className='body-copy'>{portfolio.about}</p>
          <a
            href={portfolio.resume}
            className='portfolio-link dark-link'
            target='_blank'
            rel='noopener noreferrer'
          >
            View my résumé ↗
          </a>
        </div>
        <Image
          src={portfolio.portrait}
          alt={portfolio.name}
          width={508}
          height={508}
          unoptimized
          className='about-photo'
        />
      </div>
      <div className='service-grid'>
        {portfolio.services.map((service, index) => (
          <section key={service.title}>
            <span className='section-eyebrow'>0{index + 1}</span>
            <h2>{service.title}</h2>
            <p>{service.description}</p>
          </section>
        ))}
      </div>
      <section className='skills-section'>
        <h2>My toolkit.</h2>
        <div className='skill-tags'>
          {[...skillsWork, ...skillsFun].map(skill => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </section>
      <section className='featured-section'>
        <h2>Beyond the projects.</h2>
        {articles.map(article => (
          <a
            key={article.title}
            href={article.url}
            target='_blank'
            rel='noopener noreferrer'
          >
            <span>{article.title}</span>
            <span>↗</span>
          </a>
        ))}
      </section>
    </PortfolioPage>
  );
}
