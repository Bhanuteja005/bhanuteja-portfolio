import { portfolio } from '@/portfolio.config';

/** @type {import('next').Metadata} */
export const rootMetadata = {
  title: {
    template: `%s | ${portfolio.name}`,
    default: `${portfolio.name} | Freelance Developer`,
  },
  description: portfolio.headline,
  applicationName: `${portfolio.name} Portfolio`,
  authors: [{ name: portfolio.fullName }],
  // Local prototype: keep it out of search results until it is published.
  robots: { index: false, follow: false },
};
