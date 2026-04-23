import { Resend } from "resend";
import { logger } from "./logger";

const RESEND_KEY = process.env["RESEND_API_KEY"] ?? "";
const NOTIFY_EMAIL = process.env["NOTIFY_EMAIL"] ?? "michelllepiper@gmail.com";
const FROM_EMAIL = process.env["NOTIFY_FROM_EMAIL"] ?? "Michelle Piper Site <onboarding@resend.dev>";

const resend = RESEND_KEY ? new Resend(RESEND_KEY) : null;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function row(label: string, value: string): string {
  return `<tr><td style="padding:8px 14px;color:#6b5b50;font-family:Inter,Arial,sans-serif;font-size:13px;text-transform:uppercase;letter-spacing:.08em;width:140px;vertical-align:top">${escapeHtml(
    label,
  )}</td><td style="padding:8px 14px;color:#1d1410;font-family:Inter,Arial,sans-serif;font-size:15px;line-height:1.55">${escapeHtml(
    value,
  )}</td></tr>`;
}

function wrap(title: string, rowsHtml: string, footer?: string): string {
  return `<!doctype html><html><body style="margin:0;background:#f5efe6;padding:32px 16px;font-family:Inter,Arial,sans-serif">
    <table role="presentation" width="100%" style="max-width:600px;margin:0 auto;background:#fffaf2;border:1px solid #e6dccd">
      <tr><td style="padding:28px 28px 14px;border-bottom:2px solid #b8893d">
        <p style="margin:0;color:#b8893d;font-size:11px;letter-spacing:.25em;text-transform:uppercase">The Michelle Piper</p>
        <h1 style="margin:6px 0 0;color:#1d1410;font-family:Georgia,serif;font-size:22px">${escapeHtml(title)}</h1>
      </td></tr>
      <tr><td style="padding:14px 14px 24px"><table width="100%" cellspacing="0" cellpadding="0">${rowsHtml}</table>${
        footer
          ? `<p style="margin:18px 14px 0;padding:14px;background:#f5efe6;color:#3a2418;font-size:14px;line-height:1.6;border-left:3px solid #b8893d">${escapeHtml(
              footer,
            )}</p>`
          : ""
      }</td></tr>
      <tr><td style="padding:14px 28px 22px;color:#8a7a6f;font-size:11px;letter-spacing:.18em;text-transform:uppercase;border-top:1px solid #e6dccd">Sent automatically from your site</td></tr>
    </table>
  </body></html>`;
}

async function send(subject: string, html: string): Promise<void> {
  if (!resend) {
    logger.warn({ subject }, "RESEND_API_KEY not set — notification not sent");
    return;
  }
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      subject,
      html,
    });
    logger.info({ subject, to: NOTIFY_EMAIL }, "Notification email sent");
  } catch (err) {
    logger.error({ err, subject }, "Failed to send notification email");
  }
}

export function notifyContact(payload: {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}): void {
  const rows =
    row("Name", payload.fullName) +
    row("Email", payload.email) +
    row("Phone", payload.phone) +
    row("Service", payload.service);
  void send(
    `New enquiry from ${payload.fullName}`,
    wrap("New contact enquiry", rows, payload.message),
  );
}

export function notifyEnrollment(payload: {
  fullName: string;
  email: string;
  phone: string;
  course: string;
}): void {
  const rows =
    row("Name", payload.fullName) +
    row("Email", payload.email) +
    row("Phone", payload.phone) +
    row("Course", payload.course);
  void send(
    `New enrolment: ${payload.fullName} — ${payload.course}`,
    wrap("New training enrolment", rows, "Awaiting payment proof on WhatsApp."),
  );
}

export function notifyTestimonial(payload: {
  name: string;
  role: string;
  text: string;
}): void {
  const rows = row("Name", payload.name) + row("Role", payload.role);
  void send(
    `New testimonial from ${payload.name}`,
    wrap("New testimonial submitted", rows, payload.text),
  );
}

export function notifyNewsletter(email: string): void {
  const rows = row("Email", email);
  void send("New newsletter subscriber", wrap("New newsletter subscriber", rows));
}
