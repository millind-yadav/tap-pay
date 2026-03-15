export async function onRequestPost(context) {
  const { request, env } = context;

  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json(
        { error: 'Please enter a valid email address.' },
        { status: 400, headers: corsHeaders }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check if already registered
    const existing = await env.TAPPAY_EMAILS.get(`email:${normalizedEmail}`);
    if (existing) {
      const totalCount = parseInt(await env.TAPPAY_EMAILS.get('meta:total_count') || '0');
      return Response.json(
        { 
          duplicate: true, 
          message: `You're already on the list! We'll notify you at ${normalizedEmail}`,
          totalCount 
        },
        { status: 200, headers: corsHeaders }
      );
    }

    // Increment total count
    const currentCount = parseInt(await env.TAPPAY_EMAILS.get('meta:total_count') || '0');
    const newCount = currentCount + 1;

    // Store email with metadata
    await env.TAPPAY_EMAILS.put(`email:${normalizedEmail}`, JSON.stringify({
      email: normalizedEmail,
      position: newCount,
      registeredAt: new Date().toISOString(),
      userAgent: request.headers.get('User-Agent') || 'unknown',
      country: request.cf?.country || 'unknown',
      city: request.cf?.city || 'unknown',
    }));

    // Update total count
    await env.TAPPAY_EMAILS.put('meta:total_count', newCount.toString());

    // Store in ordered list for easy retrieval
    await env.TAPPAY_EMAILS.put(`position:${newCount}`, normalizedEmail);

    return Response.json(
      {
        success: true,
        message: 'Welcome aboard! 🚀',
        position: newCount,
        totalCount: newCount,
        email: normalizedEmail,
      },
      { status: 200, headers: corsHeaders }
    );
  } catch (err) {
    return Response.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500, headers: corsHeaders }
    );
  }
}

// Handle CORS preflight for OPTIONS requests
export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
