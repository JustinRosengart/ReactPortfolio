import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const TURNSTILE_SECRET_KEY = Deno.env.get("TURNSTILE_SECRET_KEY")
const _SUPABASE_URL = Deno.env.get("SUPABASE_URL")
const _SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { name, email, message, token } = await req.json()

    // 1. Basic validation
    if (!name || !email || !message) {
        throw new Error("Missing required fields")
    }

    // 2. Validate Turnstile token
    if (!token) {
      throw new Error("CAPTCHA token is missing")
    }

    console.log("Verifying Turnstile token...")
    const formData = new FormData()
    formData.append('secret', TURNSTILE_SECRET_KEY || '')
    formData.append('response', token)

    const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
    })

    const verifyResult = await verifyRes.json()

    if (!verifyResult.success) {
      console.error("Turnstile verification failed:", verifyResult)
      throw new Error("CAPTCHA verification failed. Please try again.")
    }

    // 3. Insert into database using service role to bypass RLS
    console.log("Saving message to database...")
    const supabase = createClient(_SUPABASE_URL!, _SUPABASE_SERVICE_ROLE_KEY!)
    const { error: dbError } = await supabase
      .from('contact_messages')
      .insert([{ name, email, message }])

    if (dbError) {
        console.error("Database error:", dbError)
        throw new Error("Failed to save message to database")
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error("Function error:", error.message)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
