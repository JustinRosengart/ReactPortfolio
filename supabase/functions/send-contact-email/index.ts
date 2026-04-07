import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")
const ENGINEER_EMAIL = Deno.env.get("ENGINEER_EMAIL")

serve(async (req) => {
  try {
    const { record } = await req.json()

    if (!ENGINEER_EMAIL) {
      console.error('ENGINEER_EMAIL environment variable is not set')
      throw new Error('Notification recipient email not configured')
    }

    // Send email via Resend
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Portfolio <onboarding@resend.dev>',
        to: ENGINEER_EMAIL,
        subject: `New Contact Message from ${record.name}`,
        html: `
          <h1>New Contact Message</h1>
          <p><strong>Name:</strong> ${record.name}</p>
          <p><strong>Email:</strong> ${record.email}</p>
          <p><strong>Message:</strong></p>
          <p>${record.message}</p>
          <p><em>Sent at: ${new Date(record.created_at).toLocaleString()}</em></p>
        `,
      }),
    })

    const result = await res.json()
    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
