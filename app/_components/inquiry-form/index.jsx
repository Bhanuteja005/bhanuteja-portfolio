'use client';

import { useState } from 'react';

import { ArrowUpRight } from 'lucide-react';

import { inquiryFields } from '@/config';

import { MagneticButton } from '../magnetic-button';

/** Rows for the multiline field. */
const MESSAGE_ROWS = 4;

const SUCCESS_MESSAGE = 'Thanks — your message is on its way. I’ll reply soon.';
const NETWORK_MESSAGE =
  'Could not reach the server. Please check your connection, or email me directly.';

export function InquiryForm() {
  const [status, setStatus] = useState('');
  const [isSending, setSending] = useState(false);

  /** @param {import('react').FormEvent<HTMLFormElement>} event */
  async function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));

    setSending(true);
    setStatus('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const body = await response.json().catch(() => ({}));

      if (response.ok) {
        form.reset();
        setStatus(SUCCESS_MESSAGE);
      } else {
        setStatus(body.error || NETWORK_MESSAGE);
      }
    } catch {
      setStatus(NETWORK_MESSAGE);
    } finally {
      setSending(false);
    }
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
        <MagneticButton
          type='submit'
          className='contact-circle contact-send'
          disabled={isSending}
        >
          {isSending ? 'Sending...' : 'Send it!'} <ArrowUpRight size={18} />
        </MagneticButton>
      </div>

      <p className='form-note'>
        Your message goes straight to my inbox. I read every one.
      </p>
      <p className='form-note' role='status'>
        {status}
      </p>
    </form>
  );
}
