import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Resend } from 'resend';
import crypto from 'crypto';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('signatories')
      .select('name, role, affiliation, created_at')
      .eq('email_verified', true)
      .order('created_at', { ascending: false })
      .limit(50);

    const { count } = await supabase
      .from('signatories')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    let signatories = data || [];
    // Only return an even number of signatories
    if (signatories.length % 2 !== 0) {
      signatories = signatories.slice(0, -1);
    }
    return NextResponse.json({ signatories, count });
  } catch (error) {
    console.error('Error fetching signatories:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, role, affiliation, email, keepUpdated } = body;

    // Basic validation
    if (!name || !role || !affiliation || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if email already exists
    const { data: existingUser } = await supabase
      .from('signatories')
      .select('id, email_verified')
      .eq('email', email)
      .single();

    if (existingUser && existingUser.email_verified) {
      return NextResponse.json({ 
        error: 'ALREADY_SIGNED',
        message: 'U heeft de petitie al ondertekend.' 
      }, { status: 400 });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiry = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 24 hours

    let error;
    let isResend = false;

    if (existingUser) {
      // Update existing unverified user
      isResend = true;
      const { error: updateError } = await supabase
        .from('signatories')
        .update({
          name,
          role,
          affiliation,
          keep_updated: keepUpdated,
          email_verification_token: token,
          email_verification_expiry: expiry,
          email_verified: false
        })
        .eq('id', existingUser.id);
      error = updateError;
    } else {
      // Insert new user
      const { error: insertError } = await supabase
        .from('signatories')
        .insert([
          {
            name,
            role,
            affiliation,
            email,
            keep_updated: keepUpdated,
            email_verification_token: token,
            email_verification_expiry: expiry,
            email_verified: false
          },
        ]);
      error = insertError;
    }

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    // Send verification email
    const origin = request.headers.get('origin') || 'https://nadi.nl';
    const verifyLink = `${origin}/bevestig-email?token=${token}`;

    try {
      await resend.emails.send({
        from: 'NADI <email-bevestiging@nadi.nl>',
        to: email,
        subject: 'Verifieer uw handtekening voor NADI',
        html: `
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>Verifieer uw handtekening</title>
  <style>
    :root {
      color-scheme: light;
    }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; 
      line-height: 1.6; 
      color: #000000; 
      margin: 0; 
      padding: 0; 
      background-color: #f9fafb;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      width: 100%;
      background-color: #f9fafb;
      padding: 40px 0;
    }
    .container { 
      max-width: 560px; 
      margin: 0 auto; 
      padding: 0 20px; 
    }
    .card { 
      background-color: #ffffff; 
      border: 1px solid #e5e7eb; 
      border-radius: 16px; 
      padding: 40px; 
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); 
    }
    .logo { 
      font-size: 24px; 
      font-weight: 800; 
      letter-spacing: -0.03em; 
      margin-bottom: 32px; 
      display: block; 
      text-decoration: none; 
      color: #000000; 
    }
    .heading { 
      font-size: 20px; 
      font-weight: 600; 
      margin-bottom: 16px; 
      letter-spacing: -0.02em; 
      color: #000000;
    }
    .text { 
      margin-bottom: 24px; 
      font-size: 16px; 
      color: #374151; 
    }
    .button { 
      display: inline-block; 
      background-color: #000000; 
      color: #ffffff; 
      padding: 14px 28px; 
      border-radius: 9999px; 
      text-decoration: none; 
      font-weight: 500; 
      font-size: 16px; 
      margin-bottom: 32px; 
    }
    .link { 
      color: #6b7280; 
      text-decoration: underline; 
      word-break: break-all; 
    }
    /* Force light mode for dark mode clients */
    @media (prefers-color-scheme: dark) {
      body, .wrapper { background-color: #f9fafb !important; }
      .card { background-color: #ffffff !important; color: #000000 !important; }
      .text { color: #374151 !important; }
      .heading { color: #000000 !important; }
      .logo { color: #000000 !important; }
    }
  </style>
</head>
<body style="background-color: #f9fafb; margin: 0; padding: 0;">
  <div class="wrapper">
    <div class="container">
      <div class="card">
        <a href="https://nadi.nl" class="logo">
          <img src="${origin}/brein.svg" width="32" height="32" alt="" style="vertical-align: middle; margin-right: 12px;">
          <span style="vertical-align: middle;">NADI</span>
        </a>
        
        <h1 class="heading">Verifieer uw handtekening</h1>
        
        <p class="text">
          Bedankt voor uw steun aan NADI. Om uw ondertekening definitief te maken, vragen we u om uw e-mailadres te bevestigen.
        </p>
        
        <a href="${verifyLink}" class="button">Verifieer handtekening</a>
        
        <p class="text" style="font-size: 14px; color: #6b7280; margin-bottom: 8px;">
          Werkt de knop niet? Kopieer dan onderstaande link naar uw browser:
        </p>
        <a href="${verifyLink}" class="link" style="font-size: 14px;">${verifyLink}</a>
        
        <p class="text" style="font-size: 14px; color: #9ca3af; margin-top: 24px;">
          Deze link is 24 uur geldig.
        </p>
      </div>
    </div>
  </div>
</body>
</html>
        `
      });
    } catch (emailError) {
      console.error('Error sending email:', emailError);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Verification email sent',
      isResend
    });
  } catch (error) {
    console.error('Error adding signatory:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
