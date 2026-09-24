import { Product, CartItem, Order } from "@/types";

declare global {
  interface Window {
    fbq?: any;
    _fbq?: any;
    ttq?: any;
  }
}

export interface PixelConfig {
  fbPixelId: string;
  fbAccessToken?: string;
  fbEnabled: boolean;
  ttPixelId: string;
  ttAccessToken?: string;
  ttEnabled: boolean;
}

// ----------------------------------------------------
// Core Event Dispatcher
// ----------------------------------------------------

export const analytics = {
  // Page View Event
  pageView: (url?: string) => {
    if (typeof window === "undefined") return;

    // Facebook Pixel
    if (window.fbq) {
      window.fbq("track", "PageView");
    }

    // TikTok Pixel
    if (window.ttq) {
      window.ttq.page();
    }
  },

  // View Product Content Event
  viewContent: (product: Product) => {
    if (typeof window === "undefined") return;

    // Meta Pixel
    if (window.fbq) {
      window.fbq("track", "ViewContent", {
        content_name: product.name,
        content_category: `${product.gender} Denim > ${product.fit}`,
        content_ids: [product.id, product.sku],
        content_type: "product",
        value: product.price,
        currency: "BDT",
      });
    }

    // TikTok Pixel
    if (window.ttq) {
      window.ttq.track("ViewContent", {
        content_id: product.id,
        content_type: "product",
        content_name: product.name,
        value: product.price,
        currency: "BDT",
      });
    }
  },

  // Add To Cart Event
  addToCart: (product: Product, size: string, quantity = 1) => {
    if (typeof window === "undefined") return;

    // Meta Pixel
    if (window.fbq) {
      window.fbq("track", "AddToCart", {
        content_name: product.name,
        content_ids: [product.id],
        content_type: "product",
        value: product.price * quantity,
        currency: "BDT",
        contents: [
          {
            id: product.id,
            quantity: quantity,
            item_price: product.price,
          },
        ],
      });
    }

    // TikTok Pixel
    if (window.ttq) {
      window.ttq.track("AddToCart", {
        content_id: product.id,
        content_type: "product",
        content_name: product.name,
        quantity: quantity,
        price: product.price,
        value: product.price * quantity,
        currency: "BDT",
      });
    }
  },

  // Initiate Checkout Event
  initiateCheckout: (cart: CartItem[], total: number) => {
    if (typeof window === "undefined") return;

    // Meta Pixel
    if (window.fbq) {
      window.fbq("track", "InitiateCheckout", {
        content_ids: cart.map((item) => item.product.id),
        content_type: "product",
        num_items: cart.reduce((sum, item) => sum + item.quantity, 0),
        value: total,
        currency: "BDT",
      });
    }

    // TikTok Pixel
    if (window.ttq) {
      window.ttq.track("InitiateCheckout", {
        contents: cart.map((item) => ({
          content_id: item.product.id,
          content_name: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
        })),
        value: total,
        currency: "BDT",
      });
    }
  },

  // Purchase Complete Event
  purchase: (order: Order) => {
    if (typeof window === "undefined") return;

    // Meta Pixel
    if (window.fbq) {
      window.fbq("track", "Purchase", {
        content_ids: order.items.map((item) => item.product.id),
        content_type: "product",
        value: order.total,
        currency: "BDT",
        num_items: order.items.reduce((sum, item) => sum + item.quantity, 0),
        order_id: order.id,
      });
    }

    // TikTok Pixel
    if (window.ttq) {
      window.ttq.track("CompletePayment", {
        content_id: order.id,
        contents: order.items.map((item) => ({
          content_id: item.product.id,
          content_name: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
        })),
        value: order.total,
        currency: "BDT",
      });
    }

    // Server-Side Meta Conversions API (CAPI) Sync
    try {
      fetch("/api/analytics/facebook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventName: "Purchase",
          eventId: order.id,
          eventData: {
            value: order.total,
            currency: "BDT",
            content_ids: order.items.map((i) => i.product.id),
          },
          userData: {
            fn: order.customer.fullName,
            ph: order.customer.phoneNumber,
            em: order.customer.email,
            ct: order.customer.city,
          },
        }),
      }).catch(() => {});
    } catch (_) {}
  },

  // Custom Test Event Ping
  testPing: (platform: "facebook" | "tiktok") => {
    if (typeof window === "undefined") return false;

    if (platform === "facebook" && window.fbq) {
      window.fbq("trackCustom", "JustJeans_TestPing", {
        timestamp: new Date().toISOString(),
        status: "Active and Connected",
      });
      return true;
    }

    if (platform === "tiktok" && window.ttq) {
      window.ttq.track("JustJeans_TestPing", {
        timestamp: new Date().toISOString(),
      });
      return true;
    }

    return false;
  },
};
