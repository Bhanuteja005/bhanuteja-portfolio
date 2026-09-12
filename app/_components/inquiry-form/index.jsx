'use client';

import { useState } from 'react';

import { ArrowUpRight } from 'lucide-react';

import { portfolio } from '@/portfolio.config';

import { inquiryFields } from './fields';
import { MagneticButton } from '../magnetic-button';

/** Shown once the mail client has been handed the draft. */
const DRAFT_READY_MESSAGE =
  'Your email draft is ready in your email app. Review it and send it there. If no app opens, use the email link on this page.';

/** Rows for the multiline field. */
const MESSAGE_ROWS = 4;

/** Builds the mailto body from the submitted form data. */
function composeBody(data) {
  return [
    `Hi ${portfolio.firstName},`,
    '',
    `I'm ${data.get('name')} (${data.get('email')}).`,
    `Organization: ${data.get('company') || 'Independent'}`,
    `Services: ${data.get('service')}`,
    '',
    data.get('message'),
  ].join('\n');
}

/**
 * Contact form that hands a prepared draft to the visitor's mail client.
 * There is no backend, so nothing is sent from the browser.
 */
export function InquiryForm() {
  const [status, setStatus] = useState('');

  /** @param {import('react').FormEvent<HTMLFormElement>} event */
  function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const subject = `Project inquiry: ${data.get('service')}`;
    // encodeURIComponent, not URLSearchParams: the latter encodes spaces as
    // "+", which some mail clients render literally in the draft body.
    const query = [
      `subject=${encodeURIComponent(subject)}`,
      `body=${encodeURIComponent(composeBody(data))}`,
    ].join('&');

    window.location.href = `mailto:${portfolio.email}?${query}`;
    setStatus(DRAFT_READY_MESSAGE);
  }

  return (
    <form className='inquiry-form reference-inquiry' onSubmit={handleSubmit}>
      {inquiryFields.map((field, index) => {
        const {
          name,
          label,
          type,
          autoComplete,
          placeholder,
          required,
          maxLength,
          multiline,
        } = field;

        return (
          <label key={name}>
            <span className='form-number'>
              {String(index + 1).padStart(2, '0')}
            </span>
            <span>{label}</span>
            {multiline ? (
              <textarea
                name={name}
                rows={MESSAGE_ROWS}
                placeholder={placeholder}
                required={required}
                maxLength={maxLength}
              />
            ) : (
              <input
                name={name}
                type={type}
                autoComplete={autoComplete}
                placeholder={placeholder}
                required={required}
                maxLength={maxLength}
              />
            )}
          </label>
        );
      })}

      <div className='contact-send-line'>
        <MagneticButton type='submit' className='contact-circle contact-send'>
          Send it! <ArrowUpRight size={18} />
        </MagneticButton>
      </div>

      <p className='form-note'>
        Opens your email app with a draft. Review and send it there.
      </p>
      <p className='form-note' role='status'>
        {status}
      </p>
    </form>
  );
}
