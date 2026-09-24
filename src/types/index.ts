export interface NavSubItem {
  name: string;
  href: string;
  description?: string;
  badge?: string;
}

export interface NavCategory {
  title: string;
  items: NavSubItem[];
}

export interface NavItem {
  name: string;
  href: string;
  megaMenu?: {
    featured?: {
      title: string;
      subtitle: string;
      image: string;
      href: string;
      ctaText: string;
    };
    categories: NavCategory[];
  };
}

export interface SiteConfig {
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  url: string;
  announcement: {
    enabled: boolean;
    text: string;
    linkText?: string;
    href?: string;
  };
  navigation: NavItem[];
  footerNavigation: {
    shop: { name: string; href: string }[];
    help: { name: string; href: string }[];
    company: { name: string; href: string }[];
  };
  location: {
    title: string;
    address: string;
    area: string;
    city: string;
    country: string;
    fullAddress: string;
    mapUrl: string;
    hours: string;
    phone: string;
    email: string;
  };
  socialLinks: {
    facebook: string;
    instagram: string;
    youtube: string;
    tiktok: string;
  };
}

export interface FitItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  href: string;
  gender?: "men" | "women" | "unisex";
}

export type DenimFit =
  | "Slim"
  | "Straight"
  | "Relaxed"
  | "Tapered"
  | "Wide Leg"
  | "Skinny"
  | "Mom Fit"
  | "Flare"
  | "Bootcut";

export type GenderCategory = "Men" | "Women" | "Unisex";

export interface Product {
  id: string;
  sku: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  originalPrice?: number;
  fit: DenimFit;
  gender: GenderCategory;
  wash: string;
  fabric: string;
  sizes: string[];
  inStock: boolean;
  stockCount: number;
  images: string[];
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  onSale?: boolean;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  quantity: number;
}

export type PaymentMethod = "bKash" | "Nagad" | "Card" | "COD";

export type DeliveryStatus =
  | "Order Placed"
  | "Quality Checked"
  | "Handed to Courier"
  | "Out for Delivery"
  | "Delivered"
  | "Cancelled";

export type CourierPartner = "Pathao Courier" | "Steadfast" | "RedX" | "Paperfly";

export interface OrderCustomer {
  fullName: string;
  phoneNumber: string;
  email?: string;
  address: string;
  city: string;
  division: string;
  notes?: string;
}

export interface Order {
  id: string;
  customer: OrderCustomer;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  paymentMethod: PaymentMethod;
  transactionId?: string;
  paymentStatus: "Paid" | "Pending" | "Cash on Delivery";
  deliveryStatus: DeliveryStatus;
  courierPartner: CourierPartner;
  courierTrackingCode: string;
  estimatedDelivery: string;
  createdAt: string;
}
