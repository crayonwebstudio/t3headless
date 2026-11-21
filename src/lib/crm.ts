const CRM_BASE = 'https://manager.woodwolfdigital.com/api/method';
const LOCAL_PROXY_BASE = '/api/crm';
const WEBSITE_ORIGIN = 't3headless.com';

const ALLOWED_TOPICS = new Set([
  'Headless TYPO3 Setup',
  'T3Element License / Demo',
  '360 Care SLA Program',
  'Enterprise Consulting',
  'Support',
]);

export interface ContactPayload {
  name: string;
  email: string;
  topic: string;
  message: string;
  phone?: string;
  company?: string;
  site_url?: string;
}

export interface SupportTicketPayload {
  email: string;
  subject: string;
  ticket_type: string;
  priority: string;
  summary: string;
  description: string;
}

export interface CrmResult {
  ok: boolean;
  status?: string;
  error?: string;
  lead?: string;
}

async function postJson(endpoint: string, body: Record<string, unknown>): Promise<CrmResult> {
  const isLocal =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
  const baseUrl = isLocal ? LOCAL_PROXY_BASE : CRM_BASE;

  try {
    const res = await fetch(`${baseUrl}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (res.status === 429) {
      return { ok: false, status: 'rate_limited', error: 'Too many requests. Please wait a minute and try again.' };
    }

    const data = await res.json().catch(() => ({}));
    const status =
      (typeof data?.message === 'object' && data?.message?.status) ||
      data?.status ||
      (typeof data?.message === 'string' ? data.message : undefined);
    const lead =
      (typeof data?.message === 'object' && (data?.message?.lead || data?.message?.name)) ||
      data?.lead ||
      data?.name ||
      undefined;

    if (!res.ok) {
      let errorMsg = `Request failed (${res.status})`;
      if (typeof data?.message === 'string') {
        errorMsg = data.message;
      } else if (typeof data?.message === 'object' && data?.message?.error) {
        errorMsg = String(data.message.error);
      } else if (typeof data?.exc_type === 'string') {
        errorMsg = data.exc_type;
      } else if (typeof data?._server_messages === 'string') {
        try {
          const parsed = JSON.parse(data._server_messages);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const inner = JSON.parse(parsed[0]);
            if (inner?.message) errorMsg = inner.message;
          }
        } catch {
          // ignore parsing error
        }
      }

      return {
        ok: false,
        status,
        error: errorMsg,
      };
    }

    return { ok: true, status, lead };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : 'Network error while submitting request.',
    };
  }
}

const DISCORD_WEBHOOK_URL =
  (typeof process !== 'undefined' && process.env?.DISCORD_WEBHOOK_URL) ||
  import.meta.env.PUBLIC_DISCORD_WEBHOOK_URL ||
  '';

async function notifyDiscord(
  formType: 'contact' | 'support_ticket' | 'demo' | 'newsletter',
  payload: Record<string, unknown>,
  leadId?: string
) {
  if (!DISCORD_WEBHOOK_URL) return;

  const titles: Record<string, string> = {
    contact: '📬 New Contact Form Submission (t3headless.com)',
    support_ticket: '🚨 New Support Ticket Submitted (t3headless.com)',
    demo: '🚀 New Demo Request (t3headless.com)',
    newsletter: '📰 New Newsletter Subscription (t3headless.com)',
  };

  const fields = [
    leadId ? { name: 'CRM Lead', value: `\`${leadId}\``, inline: true } : null,
    payload.name ? { name: 'Name', value: String(payload.name), inline: true } : null,
    payload.subject ? { name: 'Subject', value: String(payload.subject), inline: true } : null,
    payload.email ? { name: 'Email', value: String(payload.email), inline: true } : null,
    payload.topic ? { name: 'Topic', value: String(payload.topic), inline: true } : null,
    payload.ticket_type ? { name: 'Ticket Type', value: String(payload.ticket_type), inline: true } : null,
    payload.priority ? { name: 'Priority', value: String(payload.priority), inline: true } : null,
    payload.summary ? { name: 'Summary', value: String(payload.summary), inline: false } : null,
    payload.description ? { name: 'Description', value: String(payload.description).slice(0, 1000), inline: false } : null,
    payload.message ? { name: 'Message', value: String(payload.message).slice(0, 1000), inline: false } : null,
    payload.company ? { name: 'Company', value: String(payload.company), inline: true } : null,
    payload.phone ? { name: 'Phone', value: String(payload.phone), inline: true } : null,
    payload.site_url ? { name: 'Site URL', value: String(payload.site_url), inline: true } : null,
  ].filter(Boolean);

  try {
    await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'T3Headless Notifier',
        embeds: [
          {
            title: titles[formType] || 'New T3Headless Form Submission',
            color: formType === 'support_ticket' ? 0xe02424 : 0xf7931e,
            fields,
            timestamp: new Date().toISOString(),
            footer: {
              text: 'T3Headless CRM Integration • manager.woodwolfdigital.com',
            },
          },
        ],
      }),
    });
  } catch {
    // Non-blocking: Discord failure should not fail the user's CRM submission
  }
}

export async function submitContactForm(payload: ContactPayload): Promise<CrmResult> {
  const normalizedTopic = ALLOWED_TOPICS.has(payload.topic) ? payload.topic : 'General Inquiry';

  const result = await postJson('submit_contact_form', {
    name: payload.name.trim(),
    email: payload.email.trim(),
    topic: normalizedTopic,
    message: payload.message.trim(),
    website: WEBSITE_ORIGIN,
    phone: (payload.phone || '').trim(),
    company: (payload.company || '').trim(),
    site_url: (payload.site_url || '').trim(),
  });

  if (result.ok) {
    notifyDiscord('contact', payload as unknown as Record<string, unknown>, result.lead);
  }

  return result;
}

/**
 * Submits a Support Ticket directly to submit_support_ticket.
 * If submit_support_ticket fails, seamlessly falls back to submit_contact_form with
 * topic="Support", subject as name, and full ticket details formatted in message.
 */
export async function submitSupportTicket(payload: SupportTicketPayload): Promise<CrmResult> {
  const cleanSubject = payload.subject.trim();
  const cleanEmail = payload.email.trim();
  const cleanType = payload.ticket_type.trim();
  const cleanPriority = payload.priority.trim();
  const cleanSummary = payload.summary.trim();
  const cleanDescription = payload.description.trim();

  // 1. Primary endpoint: submit_support_ticket
  let result = await postJson('submit_support_ticket', {
    subject: cleanSubject,
    email: cleanEmail,
    ticket_type: cleanType,
    priority: cleanPriority,
    summary: cleanSummary,
    description: cleanDescription,
    website: WEBSITE_ORIGIN,
  });

  if (!result.ok) {
    // 2. Fallback endpoint: submit_contact_form
    const fallbackMessage = [
      `Ticket Type: ${cleanType}`,
      `Priority: ${cleanPriority}`,
      `Summary: ${cleanSummary}`,
      `Description: ${cleanDescription}`,
    ].join('\n');

    result = await postJson('submit_contact_form', {
      name: cleanSubject,
      email: cleanEmail,
      topic: 'Support',
      message: fallbackMessage,
      website: WEBSITE_ORIGIN,
    });
  }

  if (result.ok) {
    notifyDiscord('support_ticket', payload as unknown as Record<string, unknown>, result.lead);
  }

  return result;
}

export async function subscribeNewsletter(email: string): Promise<CrmResult> {
  const result = await postJson('subscribe_newsletter', {
    email: email.trim(),
    website: WEBSITE_ORIGIN,
  });

  if (result.ok) {
    notifyDiscord('newsletter', { email }, result.lead);
  }

  return result;
}

export async function requestDemo(email: string): Promise<CrmResult> {
  const result = await postJson('request_demo', {
    email: email.trim(),
    website: WEBSITE_ORIGIN,
  });

  if (result.ok) {
    notifyDiscord('demo', { email }, result.lead);
  }

  return result;
}
