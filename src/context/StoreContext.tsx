"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Product, CartItem, Order, DeliveryStatus, CourierPartner } from "@/types";
import { isSupabaseConfigured } from "@/lib/supabase";
import { PixelConfig, analytics } from "@/lib/analytics";

export interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  pixelConfig: PixelConfig;
  updatePixelConfig: (config: Partial<PixelConfig>) => void;
  isCartOpen: boolean;
  isLoadingDb: boolean;
  isDbConnected: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, size: string, quantity?: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, delta: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  cartCount: number;
  cartSubtotal: number;
  placeOrder: (newOrder: Omit<Order, "id" | "createdAt">) => Promise<Order>;
  updateOrderStatus: (
    orderId: string,
    status: DeliveryStatus,
    courier?: CourierPartner,
    trackingCode?: string
  ) => Promise<void>;
  addProduct: (newProduct: Omit<Product, "id" | "sku">) => Promise<Product>;
  deleteProduct: (productId: string) => Promise<void>;
  updateProductStock: (productId: string, count: number) => void;
  refreshFromDb: () => Promise<void>;
}

const initialProducts: Product[] = [
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

const initialOrders: Order[] = [
  {
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
    items: [
      {
        product: initialProducts[0],
        selectedSize: "32",
        quantity: 1,
      },
    ],
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
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: "JJ-BD-8920",
    customer: {
      fullName: "Nusrat Jahan",
      phoneNumber: "01898765432",
      email: "nusrat.jahan@yahoo.com",
      address: "Nasirabad Housing Society, Road 4",
      city: "Chittagong",
      division: "Chittagong",
      notes: "Leave with security if not available",
    },
    items: [
      {
        product: initialProducts[1],
        selectedSize: "28",
        quantity: 1,
      },
    ],
    subtotal: 4200,
    shippingFee: 120,
    total: 4320,
    paymentMethod: "Nagad",
    transactionId: "NGD73B9014",
    paymentStatus: "Paid",
    deliveryStatus: "Out for Delivery",
    courierPartner: "Steadfast",
    courierTrackingCode: "STF-CTG-88219",
    estimatedDelivery: "Today by 5:00 PM",
    createdAt: new Date(Date.now() - 3600000 * 20).toISOString(),
  },
];

const defaultPixelConfig: PixelConfig = {
  fbPixelId: process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || "",
  fbAccessToken: process.env.FACEBOOK_ACCESS_TOKEN || "",
  fbEnabled: true,
  ttPixelId: process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID || "",
  ttAccessToken: process.env.TIKTOK_ACCESS_TOKEN || "",
  ttEnabled: true,
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [pixelConfig, setPixelConfig] = useState<PixelConfig>(defaultPixelConfig);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isLoadingDb, setIsLoadingDb] = useState(false);
  const isDbConnected = isSupabaseConfigured;

  // Sync with Supabase Database on Mount
  const refreshFromDb = useCallback(async () => {
    setIsLoadingDb(true);
    try {
      const res = await fetch("/api/products", { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setProducts(json.data);
        }
      }

      const ordRes = await fetch("/api/orders", { cache: "no-store" });
      if (ordRes.ok) {
        const ordJson = await ordRes.json();
        if (ordJson.success && Array.isArray(ordJson.data) && ordJson.data.length > 0) {
          setOrders(ordJson.data);
        }
      }
    } catch (err) {
      console.warn("Could not sync with backend DB, using cached state.", err);
    } finally {
      setIsLoadingDb(false);
    }
  }, []);

  // Initialize from LocalStorage and then try Database
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("jj_cart");
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem("jj_wishlist");
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedOrders = localStorage.getItem("jj_orders");
      if (savedOrders) setOrders(JSON.parse(savedOrders));

      const savedProducts = localStorage.getItem("jj_products");
      if (savedProducts) setProducts(JSON.parse(savedProducts));

      const savedPixel = localStorage.getItem("jj_pixel_config");
      if (savedPixel) setPixelConfig((prev) => ({ ...prev, ...JSON.parse(savedPixel) }));
    } catch (e) {
      console.warn("Could not load from localStorage", e);
    }
    setIsHydrated(true);

    // Refresh from Supabase if configured
    refreshFromDb();
  }, [refreshFromDb]);

  // Save changes to LocalStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem("jj_cart", JSON.stringify(cart));
      localStorage.setItem("jj_wishlist", JSON.stringify(wishlist));
      localStorage.setItem("jj_orders", JSON.stringify(orders));
      localStorage.setItem("jj_products", JSON.stringify(products));
      localStorage.setItem("jj_pixel_config", JSON.stringify(pixelConfig));
    } catch (e) {
      console.warn("Could not save to localStorage", e);
    }
  }, [cart, wishlist, orders, products, pixelConfig, isHydrated]);

  const updatePixelConfig = (newConfig: Partial<PixelConfig>) => {
    setPixelConfig((prev) => ({ ...prev, ...newConfig }));
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (product: Product, size: string, quantity = 1) => {
    // Fire Pixel Tracking Event
    analytics.addToCart(product, size, quantity);

    setCart((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.selectedSize === size
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.selectedSize === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, selectedSize: size, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, size: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedSize === size)
      )
    );
  };

  const updateQuantity = (productId: string, size: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.selectedSize === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const placeOrder = async (
    newOrderData: Omit<Order, "id" | "createdAt">
  ): Promise<Order> => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const trackingCodeSuffix = Math.floor(10000 + Math.random() * 90000);
    const orderId = `JJ-BD-${randomSuffix}`;

    const courierCode =
      newOrderData.courierPartner === "Pathao Courier"
        ? `PTH-DK-${trackingCodeSuffix}`
        : newOrderData.courierPartner === "Steadfast"
        ? `STF-BD-${trackingCodeSuffix}`
        : `RDX-${trackingCodeSuffix}`;

    const createdOrder: Order = {
      ...newOrderData,
      id: orderId,
      courierTrackingCode: courierCode,
      createdAt: new Date().toISOString(),
    };

    // Update local state immediately for instant feedback
    setOrders((prev) => [createdOrder, ...prev]);
    clearCart();

    // Fire Meta & TikTok Purchase Pixel Event
    analytics.purchase(createdOrder);

    // Persist to Supabase Database
    try {
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createdOrder),
      });
    } catch (e) {
      console.warn("Could not push order to Supabase API:", e);
    }

    return createdOrder;
  };

  const updateOrderStatus = async (
    orderId: string,
    status: DeliveryStatus,
    courier?: CourierPartner,
    trackingCode?: string
  ) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            deliveryStatus: status,
            courierPartner: courier || ord.courierPartner,
            courierTrackingCode: trackingCode || ord.courierTrackingCode,
            paymentStatus:
              status === "Delivered" && ord.paymentMethod === "COD"
                ? "Paid"
                : ord.paymentStatus,
          };
        }
        return ord;
      })
    );

    // Sync to Supabase
    try {
      await fetch("/api/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          deliveryStatus: status,
          courierPartner: courier,
          courierTrackingCode: trackingCode,
        }),
      });
    } catch (e) {
      console.warn("Could not update order in Supabase:", e);
    }
  };

  const addProduct = async (
    newProduct: Omit<Product, "id" | "sku">
  ): Promise<Product> => {
    const id = `prod_${Date.now()}`;
    const sku = `JJ-${newProduct.fit.substring(0, 3).toUpperCase()}-${Math.floor(
      10 + Math.random() * 90
    )}`;

    const created: Product = {
      ...newProduct,
      id,
      sku,
    };

    setProducts((prev) => [created, ...prev]);

    // Push to Supabase
    try {
      await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(created),
      });
    } catch (e) {
      console.warn("Could not insert product to Supabase:", e);
    }

    return created;
  };

  const deleteProduct = async (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));

    // Delete in Supabase
    try {
      await fetch(`/api/products?id=${productId}`, {
        method: "DELETE",
      });
    } catch (e) {
      console.warn("Could not delete product from Supabase:", e);
    }
  };

  const updateProductStock = (productId: string, count: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId
          ? {
              ...p,
              stockCount: count,
              inStock: count > 0,
            }
          : p
      )
    );
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        wishlist,
        orders,
        pixelConfig,
        updatePixelConfig,
        isCartOpen,
        isLoadingDb,
        isDbConnected,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        cartCount,
        cartSubtotal,
        placeOrder,
        updateOrderStatus,
        addProduct,
        deleteProduct,
        updateProductStock,
        refreshFromDb,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
