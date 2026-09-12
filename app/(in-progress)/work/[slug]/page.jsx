import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import caseStudies from '@/case-studies.json';
import { CaseMedia, MagneticLink } from '@/components';
import { Navbar, SocialInfo, Transition } from '@/layout';
import { referenceWorks } from '@/reference-work-data';
import { cn } from '@/utils';

import { deviceFrameClass } from './device-frame';

/** Only the slugs from `generateStaticParams` exist; anything else 404s. */
export const dynamicParams = false;

/** Intrinsic size of the device frame overlays. */
const FRAME_WIDTH = 1600;
const FRAME_HEIGHT = 910;

/** Rendered size of the "next case" thumbnail. */
const NEXT_THUMBNAIL_SIZE = 500;

export function generateStaticParams() {
  return referenceWorks.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }) {
  const project = referenceWorks.find(({ slug }) => slug === params.slug);

  return { title: project?.title || 'Project' };
}

export default function CaseStudy({ params }) {
  const index = referenceWorks.findIndex(({ slug }) => slug === params.slug);
  const project = referenceWorks[index];
  const detail = project && caseStudies[project.slug];

  if (!detail) notFound();

  const next = referenceWorks[(index + 1) % referenceWorks.length];

  return (
    <Transition>
      <div className='case-page freelance-case'>
        <Navbar />
        <main>
          <header className='case-heading'>
            <h1>{project.title}</h1>
            <p className='case-summary'>{project.description}</p>
            <div className='case-facts'>
              <section>
                <h2>Role / Services</h2>
                <p>{project.service}</p>
              </section>
              <section>
                <h2>Location</h2>
                <p>{project.location}</p>
              </section>
            </div>
          </header>

          <section className='case-hero-section'>
            {detail.live && (
              <div className='case-live'>
                <MagneticLink
                  href={detail.live}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='contact-circle'
                >
                  View project <ArrowUpRight size={19} />
                </MagneticLink>
              </div>
            )}
            <div
              id='project-preview'
              className='case-hero-media'
              style={{ background: project.color }}
            >
              {detail.hero.map((media, mediaIndex) => (
                <div
                  key={media.src}
                  className={
                    mediaIndex ? 'case-hero-overlay' : 'case-hero-base'
                  }
                >
                  <CaseMedia
                    media={media}
                    alt={mediaIndex ? '' : `${project.title} case study`}
                    priority={!mediaIndex}
                  />
                </div>
              ))}
            </div>
          </section>

          {detail.blocks.map((block, blockIndex) => (
            <section
              key={blockIndex}
              className={cn(
                'case-media-block',
                block.className.includes('laptop') && 'case-laptop-demo',
                block.className.includes('block-fullwidth') && 'case-fullwidth',
                block.className.includes('mobile') && 'case-mobile-devices',
              )}
              style={{ background: block.color }}
            >
              <div className='case-media-groups'>
                {block.groups.map((group, groupIndex) => (
                  <div
                    key={groupIndex}
                    className={cn(
                      'case-device',
                      group.frame && 'has-frame',
                      deviceFrameClass(group.frame),
                    )}
                  >
                    <div className='case-device-screen'>
                      {group.media.map(media => (
                        <CaseMedia
                          key={media.src}
                          media={media}
                          poster={project.image}
                          alt={`${project.title} — project demonstration`}
                        />
                      ))}
                    </div>
                    {group.frame && (
                      <Image
                        src={group.frame}
                        width={FRAME_WIDTH}
                        height={FRAME_HEIGHT}
                        alt=''
                        unoptimized
                        className='case-device-frame'
                      />
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </main>

        <footer className='case-next'>
          <Link href={`/work/${next.slug}`} className='case-next-link'>
            <span>Next case</span>
            <h2>{next.title}</h2>
            <div className='case-next-image'>
              <Image
                src={next.preview}
                alt={next.title}
                width={NEXT_THUMBNAIL_SIZE}
                height={NEXT_THUMBNAIL_SIZE}
                unoptimized
              />
            </div>
            <span className='case-next-arrow'>
              <ArrowUpRight size={30} />
            </span>
          </Link>
          <Link href='/work' className='work-more-link'>
            All work <sup>{referenceWorks.length}</sup>
          </Link>
          <SocialInfo />
        </footer>
      </div>
    </Transition>
  );
}
