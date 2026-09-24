import { NextResponse } from "next/server";
import { findOrderByCodeInDb } from "@/lib/supabase";

export async function GET(
  req: Request,
  { params }: { params: { code: string } }
) {
  try {
    const code = params.code;
    if (!code) {
      return NextResponse.json({ success: false, error: "Tracking code is required" }, { status: 400 });
    }

    const order = await findOrderByCodeInDb(code);
    if (!order) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, order });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
