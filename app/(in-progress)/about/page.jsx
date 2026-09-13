import Image from 'next/image';

import { PortfolioPage } from '@/layout';
import { articles } from '@/portfolio-content';
import { portfolio } from '@/portfolio.config';
import { toolkitGroups } from '@/toolkit-data';
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
        <p className='toolkit-intro'>
          From responsive interfaces to AI agents, APIs, and cloud deployments.
          The tools I bring to the work.
        </p>
        <div className='toolkit-grid'>
          {toolkitGroups.map(group => (
            <section className='toolkit-group' key={group.title}>
              <h3>{group.title}</h3>
              <ul className='skill-tags'>
                {group.skills.map(([name, icon]) => (
                  <li key={name}>
                    {icon ? (
                      <Image
                        src={`/images/toolkit/${icon}.svg`}
                        alt=''
                        width={28}
                        height={28}
                        unoptimized
                      />
                    ) : (
                      <span className='skill-mark' aria-hidden='true'>
                        ✦
                      </span>
                    )}
                    {name}
                  </li>
                ))}
              </ul>
            </section>
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
