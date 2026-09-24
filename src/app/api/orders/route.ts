import { NextResponse } from "next/server";
import { fetchOrdersFromDb, insertOrderToDb, updateOrderStatusInDb } from "@/lib/supabase";

export async function GET() {
  try {
    const orders = await fetchOrdersFromDb();
    return NextResponse.json({ success: true, count: orders.length, data: orders });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const order = await req.json();
    const success = await insertOrderToDb(order);
    return NextResponse.json({ success, orderId: order.id, trackingCode: order.courierTrackingCode });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { orderId, deliveryStatus, courierPartner, courierTrackingCode } = await req.json();
    if (!orderId || !deliveryStatus) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }
    const success = await updateOrderStatusInDb(orderId, deliveryStatus, courierPartner, courierTrackingCode);
    return NextResponse.json({ success });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
