import { SmtpClient } from "https://deno.land/x/smtp/mod.ts";

const SMTP_HOST = Deno.env.get("SMTP_HOST");
const SMTP_PORT = parseInt(Deno.env.get("SMTP_PORT") || "587");
const SMTP_USER = Deno.env.get("SMTP_USER");
const SMTP_PASS = Deno.env.get("SMTP_PASS");
const SMTP_SENDER = Deno.env.get("SMTP_SENDER");
const ENGINEER_EMAIL = Deno.env.get("ENGINEER_EMAIL");

Deno.serve(async (req) => {
  try {
    const payload = await req.json();
    const record = payload.record;

    if (!record) {
      throw new Error('No record found in payload');
    }

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !ENGINEER_EMAIL || !SMTP_SENDER) {
      console.error('Missing configuration: SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_SENDER or ENGINEER_EMAIL');
      throw new Error('Notification service not fully configured');
    }

    console.log(`Sending SMTP notification for message from ${record.email} to ${ENGINEER_EMAIL}...`);

    const client = new SmtpClient();
    
    // Connect to SMTP server
    await client.connect({
      hostname: SMTP_HOST,
      port: SMTP_PORT,
      username: SMTP_USER,
      password: SMTP_PASS,
    });

    // Send email
    await client.send({
      from: SMTP_SENDER,
      to: ENGINEER_EMAIL,
      subject: `New Message: ${record.name}`,
      content: `New Contact Form Submission\n\nName: ${record.name}\nEmail: ${record.email}\n\nMessage:\n${record.message}\n\nSent at: ${new Date(record.created_at).toLocaleString()}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.5; color: #333;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${record.name}</p>
          <p><strong>Email:</strong> ${record.email}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f4f4f4; padding: 15px; border-left: 4px solid #3b82f6;">
            ${record.message.replace(/\n/g, '<br>')}
          </div>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 0.8em; color: #666;">Sent at: ${new Date(record.created_at).toLocaleString()}</p>
        </div>
      `,
    });

    await client.close();

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('SMTP Error:', error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
