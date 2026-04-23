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

const WAT_FORMATTER = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
  timeZone: "Africa/Lagos",
});

function formatSlot(date: Date): string {
  return `${WAT_FORMATTER.format(date)} (West Africa Time)`;
}

export function notifyBookingMichelle(payload: {
  fullName: string;
  email: string;
  phone: string;
  slotStart: Date;
  notes: string | null;
}): void {
  const rows =
    row("Name", payload.fullName) +
    row("Email", payload.email) +
    row("Phone", payload.phone) +
    row("Slot", formatSlot(payload.slotStart));
  void send(
    `New consultation booking — ${payload.fullName}`,
    wrap(
      "New 15-min consultation booked",
      rows,
      payload.notes ?? "No additional notes from the client.",
    ),
  );
}

async function sendTo(toEmail: string, subject: string, html: string): Promise<void> {
  if (!resend) {
    logger.warn({ subject }, "RESEND_API_KEY not set — client confirmation not sent");
    return;
  }
  try {
    await resend.emails.send({ from: FROM_EMAIL, to: toEmail, subject, html });
    logger.info({ subject, to: toEmail }, "Confirmation email sent");
  } catch (err) {
    logger.error({ err, subject, to: toEmail }, "Failed to send confirmation email");
  }
}

export function sendBookingConfirmationToClient(payload: {
  fullName: string;
  email: string;
  slotStart: Date;
}): void {
  const slotPretty = formatSlot(payload.slotStart);
  const html = `<!doctype html><html><body style="margin:0;background:#f5efe6;padding:32px 16px;font-family:Inter,Arial,sans-serif">
    <table role="presentation" width="100%" style="max-width:600px;margin:0 auto;background:#fffaf2;border:1px solid #e6dccd">
      <tr><td style="padding:32px 32px 18px;border-bottom:2px solid #b8893d;text-align:center">
        <p style="margin:0;color:#b8893d;font-size:11px;letter-spacing:.3em;text-transform:uppercase">The Michelle Piper</p>
        <h1 style="margin:10px 0 0;color:#1d1410;font-family:Georgia,serif;font-size:26px">Your consultation is booked</h1>
      </td></tr>
      <tr><td style="padding:28px 32px 8px;color:#1d1410;font-size:16px;line-height:1.7">
        Hi ${escapeHtml(payload.fullName.split(" ")[0] ?? payload.fullName)},
        <br /><br />
        Thank you for booking a free 15-minute consultation with Michelle. Your slot is confirmed for:
      </td></tr>
      <tr><td style="padding:8px 32px 8px"><div style="background:#f5efe6;border-left:3px solid #b8893d;padding:18px 22px">
        <p style="margin:0;color:#3a2418;font-family:Georgia,serif;font-size:20px">${escapeHtml(slotPretty)}</p>
      </div></td></tr>
      <tr><td style="padding:18px 32px 8px;color:#1d1410;font-size:15px;line-height:1.7">
        Michelle will reach out shortly via WhatsApp or email to confirm the call link. In the meantime, feel free to reply to this email with anything you'd like her to prepare for.
      </td></tr>
      <tr><td style="padding:18px 32px 8px;color:#1d1410;font-size:15px;line-height:1.7">
        <strong>Need to reschedule?</strong> Just reply to this email or message Michelle on WhatsApp.
      </td></tr>
      <tr><td style="padding:24px 32px 28px;color:#3a2418;font-size:15px;line-height:1.7">
        Looking forward to speaking,<br />
        <em style="color:#b8893d;font-family:Georgia,serif;font-size:17px">Michelle Piper</em>
      </td></tr>
      <tr><td style="padding:14px 32px 22px;color:#8a7a6f;font-size:11px;letter-spacing:.18em;text-transform:uppercase;border-top:1px solid #e6dccd;text-align:center">
        Communication · Confidence · Digital Skills
      </td></tr>
    </table>
  </body></html>`;
  void sendTo(payload.email, `Your 15-min consultation with Michelle Piper is confirmed`, html);
}
