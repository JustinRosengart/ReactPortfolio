const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")
const ENGINEER_EMAIL = Deno.env.get("ENGINEER_EMAIL")

Deno.serve(async (req) => {
  try {
    const payload = await req.json()
    const record = payload.record

    if (!record) {
      throw new Error('No record found in payload')
    }

    if (!RESEND_API_KEY || !ENGINEER_EMAIL) {
      console.error('Missing configuration: RESEND_API_KEY or ENGINEER_EMAIL')
      throw new Error('Notification service not fully configured')
    }

    console.log(`Sending notification for message from ${record.email} to ${ENGINEER_EMAIL}...`)

    // Send email via Resend
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: ENGINEER_EMAIL,
        subject: `New Message: ${record.name}`,
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
      }),
    })

    if (!res.ok) {
      const errorData = await res.text()
      console.error('Resend API error:', errorData)
      throw new Error(`Resend API responded with ${res.status}`)
    }

    const result = await res.json()
    return new Response(JSON.stringify({ success: true, id: result.id }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('Function error:', error.message)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
