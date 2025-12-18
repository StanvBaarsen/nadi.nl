import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json({ error: 'missing_token' }, { status: 400 });
  }

  try {
    // Find user with this token and check expiry
    const { data: user, error } = await supabase
      .from('signatories')
      .select('id, email_verification_expiry')
      .eq('email_verification_token', token)
      .single();

    if (error || !user) {
      return NextResponse.json({ error: 'invalid_token' }, { status: 400 });
    }

    const now = new Date();
    const expiry = new Date(user.email_verification_expiry);

    if (now > expiry) {
      return NextResponse.json({ error: 'expired_token' }, { status: 400 });
    }

    // Verify user
    const { error: updateError } = await supabase
      .from('signatories')
      .update({
        email_verified: true,
        email_verification_token: null,
        email_verification_expiry: null
      })
      .eq('id', user.id);

    if (updateError) {
      console.error('Error verifying user:', updateError);
      return NextResponse.json({ error: 'verification_failed' }, { status: 500 });
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}
