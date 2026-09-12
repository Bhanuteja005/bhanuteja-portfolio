import { inquiryFields } from '@/config';
import { portfolio } from '@/portfolio.config';

/** Resend's REST endpoint. Called directly so the project needs no extra SDK. */
const RESEND_ENDPOINT = 'https://api.resend.com/emails';

/**
 * Sender address. Resend only accepts a custom From once its domain is
 * verified; until then `onboarding@resend.dev` is the one address it allows.
 */
const DEFAULT_FROM = 'Portfolio Inquiry <onboarding@resend.dev>';

/** Loose sanity check — real validation is the mail provider accepting it. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(body, status) {
  return Response.json(body, { status });
}

/**
 * Validates the payload against the shared field schema.
 *
 * @param {Record<string, unknown>} payload
 * @returns {{ values: Record<string, string> } | { error: string }}
 */
function validate(payload) {
  /** @type {Record<string, string>} */
  const values = {};

  for (const field of inquiryFields) {
    const raw = payload?.[field.name];

    if (raw !== undefined && typeof raw !== 'string') {
      return { error: `${field.name} must be text.` };
    }

    const value = (raw || '').trim();

    if (field.required && !value) {
      return { error: `Please fill in: ${field.label}` };
    }
    if (value.length > field.maxLength) {
      return { error: `${field.label} is too long.` };
    }
    if (field.type === 'email' && value && !EMAIL_PATTERN.test(value)) {
      return { error: 'Please enter a valid email address.' };
    }

    values[field.name] = value;
  }

  return { values };
}

/** Builds the plain-text body of the notification email. */
function composeBody({ name, email, company, service, message }) {
  return [
    `Name:         ${name}`,
    `Email:        ${email}`,
    `Organization: ${company || 'Not given'}`,
    `Services:     ${service}`,
    '',
    'Message:',
    message,
  ].join('\n');
}

export async function POST(request) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY is not set.');
    return json({ error: 'The contact form is not configured yet.' }, 500);
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ error: 'Invalid request.' }, 400);
  }

  const result = validate(payload);
  if ('error' in result) {
    return json({ error: result.error }, 400);
  }

  const { values } = result;

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM,
        to: [portfolio.email],
        reply_to: values.email,
        subject: `Project inquiry: ${values.service}`,
        text: composeBody(values),
      }),
    });

    if (!response.ok) {
      // Log the provider's reason server-side; never return it to the browser.
      console.error(
        '[contact] Resend rejected the request:',
        response.status,
        await response.text(),
      );
      return json(
        { error: 'Could not send your message. Please email me directly.' },
        502,
      );
    }

    return json({ ok: true }, 200);
  } catch (error) {
    console.error('[contact] Failed to reach Resend:', error);
    return json(
      { error: 'Could not send your message. Please email me directly.' },
      502,
    );
  }
}
