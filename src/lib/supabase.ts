import { Product, Order, DeliveryStatus, CourierPartner } from "@/types";

export const defaultCatalog: Product[] = [
  {
    id: "prod_001",
    sku: "JJ-M-SLM-01",
    name: "14oz Japanese Raw Selvedge",
    subtitle: "Unwashed authentic shuttle-loom denim",
    description:
      "Crafted from 14oz heavyweight raw Japanese denim with red selvedge ID. Stiff initial feel that moulds uniquely to your body with wear.",
    price: 4950,
    originalPrice: 5800,
    fit: "Slim",
    gender: "Men",
    wash: "Raw Deep Indigo",
    fabric: "100% Ring-Spun Kurabo Cotton",
    sizes: ["30", "32", "34", "36"],
    inStock: true,
    stockCount: 42,
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1604176354204-9268737828e4?q=80&w=1000&auto=format&fit=crop",
    ],
    isFeatured: true,
    isNewArrival: true,
  },
  {
    id: "prod_002",
    sku: "JJ-W-MOM-02",
    name: "Sculpt High-Rise Contour",
    subtitle: "Form-flattering premium stretch recovery",
    description:
      "Engineered with multi-directional stretch to flatter natural curves while holding its shape all day long.",
    price: 4200,
    fit: "Mom Fit",
    gender: "Women",
    wash: "Midnight Indigo",
    fabric: "92% Organic Cotton, 6% Elastomultiester, 2% Elastane",
    sizes: ["26", "28", "30", "32"],
    inStock: true,
    stockCount: 58,
    images: [
      "https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?q=80&w=1000&auto=format&fit=crop",
    ],
    isFeatured: true,
    isBestSeller: true,
  },
  {
    id: "prod_003",
    sku: "JJ-M-RLX-03",
    name: "90s Relaxed Vintage Wash",
    subtitle: "Spacious seat with authentic hand-sanded fades",
    description:
      "Relaxed through thigh and knee with subtle distressing inspired by 1990s archival workwear.",
    price: 3850,
    fit: "Relaxed",
    gender: "Men",
    wash: "Vintage Stonewash",
    fabric: "100% Sustainable BCI Cotton",
    sizes: ["30", "32", "34", "36"],
    inStock: true,
    stockCount: 24,
    images: [
      "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?q=80&w=1000&auto=format&fit=crop",
    ],
    isBestSeller: true,
  },
  {
    id: "prod_004",
    sku: "JJ-W-WID-04",
    name: "Architectural High-Rise Wide Leg",
    subtitle: "High fashion volume with elongating drape",
    description:
      "A statement wide leg with a tailored waist that pairs effortlessly with boots or sneakers.",
    price: 4600,
    fit: "Wide Leg",
    gender: "Women",
    wash: "Clean Dark Indigo",
    fabric: "99% Cotton, 1% Comfort Stretch",
    sizes: ["26", "28", "30", "32"],
    inStock: true,
    stockCount: 36,
    images: [
      "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?q=80&w=1000&auto=format&fit=crop",
    ],
    isNewArrival: true,
  },
  {
    id: "prod_005",
    sku: "JJ-M-STR-05",
    name: "Classic 1994 Straight Cut",
    subtitle: "Timeless heritage mid-rise straight silhouette",
    description:
      "Standard straight fit throughout with premium tobacco topstitching and custom copper hardware.",
    price: 4150,
    originalPrice: 4800,
    fit: "Straight",
    gender: "Men",
    wash: "Medium Blue Whiskered",
    fabric: "98% Cotton, 2% Stretch",
    sizes: ["30", "32", "34", "36"],
    inStock: true,
    stockCount: 30,
    images: [
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1000&auto=format&fit=crop",
    ],
    onSale: true,
  },
  {
    id: "prod_006",
    sku: "JJ-W-FLR-06",
    name: "Retro Flare Bell Bottom",
    subtitle: "70s revival wide sweep flare",
    description:
      "Fitted through thigh opening into a dramatic sweeping bell hem. Crafted from organic washed cotton.",
    price: 3950,
    fit: "Flare",
    gender: "Women",
    wash: "Light Sky Blue",
    fabric: "100% Breathable Cotton",
    sizes: ["26", "28", "30", "32"],
    inStock: true,
    stockCount: 19,
    images: [
      "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?q=80&w=1000&auto=format&fit=crop",
    ],
  },
];

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(
  SUPABASE_URL && 
  SUPABASE_ANON_KEY && 
  !SUPABASE_URL.includes("your-project") &&
  !SUPABASE_ANON_KEY.includes("your-anon-key")
);

// Generic Supabase REST client fetcher
async function supabaseFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T | null> {
  if (!isSupabaseConfigured) return null;

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${endpoint}`, {
      ...options,
      headers: {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "return=representation",
        ...options.headers,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.warn(`[Supabase Error ${res.status}]:`, errorText);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("[Supabase Fetch Error]:", error);
    return null;
  }
}

// ----------------------------------------------------
// Database Operations: Products
// ----------------------------------------------------

export async function fetchProductsFromDb(): Promise<Product[]> {
  if (!isSupabaseConfigured) {
    return defaultCatalog;
  }

  const data = await supabaseFetch<any[]>("products?select=*&order=created_at.desc");
  if (!data || data.length === 0) {
    return defaultCatalog;
  }

  return data.map((item) => ({
    id: item.id,
    sku: item.sku || `JJ-${item.id.slice(0, 5)}`,
    name: item.name,
    subtitle: item.subtitle || "",
    description: item.description || "",
    price: Number(item.price),
    originalPrice: item.original_price ? Number(item.original_price) : undefined,
    fit: item.fit,
    gender: item.gender,
    wash: item.wash || "Classic Wash",
    fabric: item.fabric || "99% Cotton, 1% Elastane",
    sizes: Array.isArray(item.sizes) ? item.sizes : ["30", "32", "34", "36"],
    inStock: item.stock_count > 0,
    stockCount: Number(item.stock_count || 10),
    images: Array.isArray(item.images) ? item.images : [item.image_url].filter(Boolean),
    isFeatured: Boolean(item.is_featured),
    isNewArrival: Boolean(item.is_new_arrival),
    isBestSeller: Boolean(item.is_bestseller),
    onSale: Boolean(item.on_sale),
  }));
}

export async function insertProductToDb(product: Partial<Product>): Promise<boolean> {
  if (!isSupabaseConfigured) return true;

  const payload = {
    name: product.name,
    subtitle: product.subtitle,
    description: product.description,
    price: product.price,
    original_price: product.originalPrice,
    fit: product.fit,
    gender: product.gender,
    wash: product.wash,
    fabric: product.fabric,
    sizes: product.sizes,
    stock_count: product.stockCount,
    images: product.images,
    is_featured: product.isFeatured || false,
    is_new_arrival: product.isNewArrival || false,
    is_bestseller: product.isBestSeller || false,
    on_sale: product.onSale || false,
  };

  const res = await supabaseFetch("products", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return Boolean(res);
}

export async function deleteProductFromDb(id: string): Promise<boolean> {
  if (!isSupabaseConfigured) return true;

  const res = await supabaseFetch(`products?id=eq.${id}`, {
    method: "DELETE",
  });

  return res !== null;
}

// ----------------------------------------------------
// Database Operations: Orders
// ----------------------------------------------------

export async function fetchOrdersFromDb(): Promise<Order[]> {
  if (!isSupabaseConfigured) return [];

  const data = await supabaseFetch<any[]>("orders?select=*,order_items(*)&order=created_at.desc");
  if (!data) return [];

  return data.map((row) => ({
    id: row.id,
    customer: {
      fullName: row.customer_name,
      phoneNumber: row.customer_phone,
      email: row.customer_email || undefined,
      address: row.shipping_address,
      city: row.city,
      division: row.division || "Dhaka",
      notes: row.notes || undefined,
    },
    items: (row.order_items || []).map((i: any) => ({
      product: {
        id: i.product_id,
        name: i.product_name,
        price: Number(i.price),
        images: [i.image],
      } as any,
      selectedSize: i.selected_size,
      quantity: Number(i.quantity),
    })),
    subtotal: Number(row.subtotal),
    shippingFee: Number(row.shipping_fee),
    total: Number(row.total),
    paymentMethod: row.payment_method,
    transactionId: row.transaction_id || undefined,
    paymentStatus: row.payment_status,
    deliveryStatus: row.delivery_status,
    courierPartner: row.courier_partner,
    courierTrackingCode: row.courier_tracking_code,
    estimatedDelivery: row.estimated_delivery,
    createdAt: row.created_at,
  }));
}

export async function insertOrderToDb(order: Order): Promise<boolean> {
  if (!isSupabaseConfigured) return true;

  // Insert order parent record
  const orderPayload = {
    id: order.id,
    customer_name: order.customer.fullName,
    customer_phone: order.customer.phoneNumber,
    customer_email: order.customer.email || null,
    shipping_address: order.customer.address,
    city: order.customer.city,
    division: order.customer.division,
    notes: order.customer.notes || null,
    subtotal: order.subtotal,
    shipping_fee: order.shippingFee,
    total: order.total,
    payment_method: order.paymentMethod,
    transaction_id: order.transactionId || null,
    payment_status: order.paymentStatus,
    delivery_status: order.deliveryStatus,
    courier_partner: order.courierPartner,
    courier_tracking_code: order.courierTrackingCode,
    estimated_delivery: order.estimatedDelivery,
  };

  const orderRes = await supabaseFetch("orders", {
    method: "POST",
    body: JSON.stringify(orderPayload),
  });

  if (!orderRes) return false;

  // Insert order items
  const itemsPayload = order.items.map((item) => ({
    order_id: order.id,
    product_id: item.product.id,
    product_name: item.product.name,
    selected_size: item.selectedSize,
    price: item.product.price,
    quantity: item.quantity,
    image: item.product.images?.[0] || "",
  }));

  if (itemsPayload.length > 0) {
    await supabaseFetch("order_items", {
      method: "POST",
      body: JSON.stringify(itemsPayload),
    });
  }

  return true;
}

export async function updateOrderStatusInDb(
  orderId: string,
  deliveryStatus: DeliveryStatus,
  courierPartner?: CourierPartner,
  courierTrackingCode?: string
): Promise<boolean> {
  if (!isSupabaseConfigured) return true;

  const payload: any = { delivery_status: deliveryStatus };
  if (courierPartner) payload.courier_partner = courierPartner;
  if (courierTrackingCode) payload.courier_tracking_code = courierTrackingCode;

  const res = await supabaseFetch(`orders?id=eq.${orderId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  return res !== null;
}

export async function findOrderByCodeInDb(code: string): Promise<Order | null> {
  const cleanCode = code.trim().toUpperCase();

  if (!isSupabaseConfigured) {
    const demo = defaultCatalog[0];
    if (cleanCode === "JJ-BD-8921" || cleanCode === "PTH-DK-94021") {
      return {
        id: "JJ-BD-8921",
        customer: {
          fullName: "Tanvir Ahmed",
          phoneNumber: "01712345678",
          email: "tanvir.ahmed@gmail.com",
          address: "House 42, Road 11, Banani",
          city: "Dhaka",
          division: "Dhaka",
          notes: "Please call before arrival",
        },
        items: [{ product: demo, selectedSize: "32", quantity: 1 }],
        subtotal: 4950,
        shippingFee: 0,
        total: 4950,
        paymentMethod: "bKash",
        transactionId: "BK9X84A291",
        paymentStatus: "Paid",
        deliveryStatus: "Handed to Courier",
        courierPartner: "Pathao Courier",
        courierTrackingCode: "PTH-DK-94021",
        estimatedDelivery: "Tomorrow, 2:00 PM - 6:00 PM",
        createdAt: new Date().toISOString(),
      };
    }
    return null;
  }

  const data = await supabaseFetch<any[]>(
    `orders?or=(id.eq.${cleanCode},courier_tracking_code.eq.${cleanCode})&select=*,order_items(*)&limit=1`
  );

  if (!data || data.length === 0) return null;
  const row = data[0];

  return {
    id: row.id,
    customer: {
      fullName: row.customer_name,
      phoneNumber: row.customer_phone,
      email: row.customer_email || undefined,
      address: row.shipping_address,
      city: row.city,
      division: row.division || "Dhaka",
      notes: row.notes || undefined,
    },
    items: (row.order_items || []).map((i: any) => ({
      product: {
        id: i.product_id,
        name: i.product_name,
        price: Number(i.price),
        images: [i.image],
      } as any,
      selectedSize: i.selected_size,
      quantity: Number(i.quantity),
    })),
    subtotal: Number(row.subtotal),
    shippingFee: Number(row.shipping_fee),
    total: Number(row.total),
    paymentMethod: row.payment_method,
    transactionId: row.transaction_id || undefined,
    paymentStatus: row.payment_status,
    deliveryStatus: row.delivery_status,
    courierPartner: row.courier_partner,
    courierTrackingCode: row.courier_tracking_code,
    estimatedDelivery: row.estimated_delivery,
    createdAt: row.created_at,
  };
}
