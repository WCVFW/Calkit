const nodemailer = require("nodemailer");

function createTransport() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null; // No SMTP configured; we'll fallback to console log
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

async function sendEmail({ to, subject, text, html }) {
  const transport = createTransport();
  if (!transport) {
    console.info(`[email-mock] To: ${to} | Subject: ${subject} | Text: ${text}`);
    return { accepted: [to], mocked: true };
  }
  const from = process.env.SMTP_FROM || process.env.SMTP_USER;
  return transport.sendMail({ from, to, subject, text, html });
}

module.exports = { sendEmail };
