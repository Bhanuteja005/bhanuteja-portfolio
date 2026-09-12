import { portfolio } from '@/portfolio.config';

/**
 * The inquiry fields, in the order they are numbered on screen.
 *
 * `multiline` renders a textarea; every other entry renders an input.
 *
 * @type {Array<{
 *   name: string,
 *   label: string,
 *   placeholder: string,
 *   type?: string,
 *   autoComplete?: string,
 *   required?: boolean,
 *   maxLength: number,
 *   multiline?: boolean,
 * }>}
 */
export const inquiryFields = [
  {
    name: 'name',
    label: 'What’s your name?',
    autoComplete: 'name',
    placeholder: 'Your name *',
    required: true,
    maxLength: 100,
  },
  {
    name: 'email',
    label: 'What’s your email?',
    type: 'email',
    autoComplete: 'email',
    placeholder: 'you@company.com *',
    required: true,
    maxLength: 150,
  },
  {
    name: 'company',
    label: 'What’s the name of your organization?',
    autoComplete: 'organization',
    placeholder: 'Your organization',
    maxLength: 150,
  },
  {
    name: 'service',
    label: 'What services are you looking for?',
    placeholder: 'AI, full stack development... *',
    required: true,
    maxLength: 250,
  },
  {
    name: 'message',
    label: 'Your message',
    placeholder: `Hello ${portfolio.firstName}, can you help me with... *`,
    required: true,
    maxLength: 4000,
    multiline: true,
  },
];
