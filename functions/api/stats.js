export async function onRequestGet(context) {
  const { env } = context;

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const totalCount = parseInt(await env.TAPPAY_EMAILS.get('meta:total_count') || '0');

    return Response.json(
      { totalCount },
      { status: 200, headers: corsHeaders }
    );
  } catch {
    return Response.json(
      { totalCount: 0 },
      { status: 200, headers: corsHeaders }
    );
  }
}
