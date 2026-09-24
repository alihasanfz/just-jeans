import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { eventName, eventId, eventData, userData, pixelId, accessToken } = await req.json();

    const activePixelId = pixelId || process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;
    const activeToken = accessToken || process.env.TIKTOK_ACCESS_TOKEN;

    if (!activePixelId || !activeToken) {
      return NextResponse.json({
        success: false,
        message: "TikTok Pixel ID or Access Token is missing",
      }, { status: 400 });
    }

    // TikTok Events API Endpoint
    const url = "https://business-api.tiktok.com/open_api/v1.3/event/track/";

    const payload = {
      event_source: "web",
      event_source_id: activePixelId,
      data: [
        {
          event: eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventId || `tt_${Date.now()}`,
          user: {
            ip: req.headers.get("x-forwarded-for") || undefined,
            user_agent: req.headers.get("user-agent") || undefined,
            ...userData,
          },
          properties: eventData,
        },
      ],
    };

    const ttRes = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Token": activeToken,
      },
      body: JSON.stringify(payload),
    });

    const ttResult = await ttRes.json();
    return NextResponse.json({ success: ttRes.ok, data: ttResult });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
