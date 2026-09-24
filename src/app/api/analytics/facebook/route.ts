import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { eventName, eventId, eventData, userData, pixelId, accessToken } = await req.json();

    const activePixelId = pixelId || process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
    const activeToken = accessToken || process.env.FACEBOOK_ACCESS_TOKEN;

    if (!activePixelId || !activeToken) {
      return NextResponse.json({
        success: false,
        message: "Meta Pixel ID or Access Token is missing",
      }, { status: 400 });
    }

    // Meta Conversions API Graph Endpoint
    const url = `https://graph.facebook.com/v19.0/${activePixelId}/events?access_token=${activeToken}`;

    const payload = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventId || `ev_${Date.now()}`,
          action_source: "website",
          user_data: {
            client_ip_address: req.headers.get("x-forwarded-for") || undefined,
            client_user_agent: req.headers.get("user-agent") || undefined,
            ...userData,
          },
          custom_data: eventData,
        },
      ],
    };

    const fbRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const fbResult = await fbRes.json();
    return NextResponse.json({ success: fbRes.ok, data: fbResult });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
