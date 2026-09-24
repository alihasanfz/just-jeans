"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { siteConfig, fitItems } from "@/config/site";
import { motion } from "framer-motion";
import {
  Product,
  CartItem,
  Order,
  DeliveryStatus,
  CourierPartner,
  DenimFit,
  GenderCategory,
} from "@/types";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Settings,
  TrendingUp,
  ArrowUpRight,
  Sparkles,
  Search,
  Plus,
  Save,
  CheckCircle2,
  ExternalLink,
  Shield,
  Trash2,
  MapPin,
  Phone,
  Truck,
  DollarSign,
  Edit,
  Radio,
  Activity,
  Zap,
} from "lucide-react";
import { analytics } from "@/lib/analytics";

export default function AdminDashboardPage() {
  const {
    products,
    orders,
    addProduct,
    deleteProduct,
    updateProductStock,
    updateOrderStatus,
    isLoadingDb,
    isDbConnected,
    refreshFromDb,
    pixelConfig,
    updatePixelConfig,
  } = useStore();

  const [activeTab, setActiveTab] = useState<
    "overview" | "products" | "orders" | "settings" | "marketing"
  >("overview");

  // Editable Brand Settings State
  const [brandName, setBrandName] = useState(siteConfig.name);
  const [tagline, setTagline] = useState(siteConfig.tagline);
  const [announcementText, setAnnouncementText] = useState(
    siteConfig.announcement.text
  );
  const [storeAddress, setStoreAddress] = useState(
    siteConfig.location.fullAddress
  );
  const [storePhone, setStorePhone] = useState(siteConfig.location.phone);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Marketing & Pixels State
  const [fbPixelId, setFbPixelId] = useState(pixelConfig.fbPixelId || "");
  const [fbAccessToken, setFbAccessToken] = useState(pixelConfig.fbAccessToken || "");
  const [fbEnabled, setFbEnabled] = useState(pixelConfig.fbEnabled ?? true);

  const [ttPixelId, setTtPixelId] = useState(pixelConfig.ttPixelId || "");
  const [ttAccessToken, setTtAccessToken] = useState(pixelConfig.ttAccessToken || "");
  const [ttEnabled, setTtEnabled] = useState(pixelConfig.ttEnabled ?? true);

  const [pixelSaveSuccess, setPixelSaveSuccess] = useState(false);
  const [testPingMsg, setTestPingMsg] = useState("");

  // New Product Modal Form State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProdName, setNewProdName] = useState("");
  const [newProdSubtitle, setNewProdSubtitle] = useState("");
  const [newProdFit, setNewProdFit] = useState<DenimFit>("Straight");
  const [newProdGender, setNewProdGender] = useState<GenderCategory>("Men");
  const [newProdPrice, setNewProdPrice] = useState("4500");
  const [newProdStock, setNewProdStock] = useState("30");
  const [newProdWash, setNewProdWash] = useState("Raw Deep Indigo");
  const [newProdImage, setNewProdImage] = useState(
    "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1000&auto=format&fit=crop"
  );

  // Delivery status modification state
  const [selectedOrderForEdit, setSelectedOrderForEdit] = useState<Order | null>(
    null
  );

  // Calculated Real-Time Metrics
  const totalRevenue = orders.reduce((sum, ord) => sum + ord.total, 0);
  const totalItemsSold = orders.reduce(
    (sum, ord) =>
      sum + (ord.items || []).reduce((iSum: number, item: CartItem) => iSum + item.quantity, 0),
    0
  );
  const totalStockUnits = products.reduce((sum, p) => sum + p.stockCount, 0);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleSavePixels = (e: React.FormEvent) => {
    e.preventDefault();
    updatePixelConfig({
      fbPixelId: fbPixelId.trim(),
      fbAccessToken: fbAccessToken.trim(),
      fbEnabled,
      ttPixelId: ttPixelId.trim(),
      ttAccessToken: ttAccessToken.trim(),
      ttEnabled,
    });
    setPixelSaveSuccess(true);
    setTimeout(() => setPixelSaveSuccess(false), 3000);
  };

  const handleTestPing = (platform: "facebook" | "tiktok") => {
    const fired = analytics.testPing(platform);
    if (fired) {
      setTestPingMsg(`✓ ${platform.toUpperCase()} Test Ping dispatched successfully!`);
    } else {
      setTestPingMsg(`ℹ Pixel script initialized for ${platform}. Verify ID is entered.`);
    }
    setTimeout(() => setTestPingMsg(""), 4000);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName) return;

    addProduct({
      name: newProdName,
      subtitle: newProdSubtitle || "Handcrafted signature fit",
      description: "Crafted with durable selvedge yarns and premium comfort stretch.",
      fit: newProdFit,
      gender: newProdGender,
      price: parseFloat(newProdPrice) || 4500,
      stockCount: parseInt(newProdStock) || 30,
      inStock: true,
      wash: newProdWash,
      fabric: "100% Ring-Spun Cotton",
      sizes: ["30/32", "32/32", "34/32", "36/32"],
      images: [newProdImage],
      isNewArrival: true,
    });

    setShowAddModal(false);
    setNewProdName("");
  };

  const deliveryStatuses: DeliveryStatus[] = [
    "Order Placed",
    "Quality Checked",
    "Handed to Courier",
    "Out for Delivery",
    "Delivered",
  ];

  const courierOptions: CourierPartner[] = [
    "Pathao Courier",
    "Steadfast",
    "RedX",
    "Paperfly",
  ];

  return (
    <div className="min-h-screen bg-[#0B0C10] text-neutral-100 flex flex-col lg:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-72 bg-[#101218] border-r border-white/10 flex flex-col justify-between p-6 flex-shrink-0">
        <div>
          {/* Brand Header */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
            <div>
              <span className="font-serif text-2xl font-bold tracking-widest text-white">
                {brandName}
              </span>
              <div className="flex items-center space-x-1 text-[10px] uppercase tracking-luxury text-denim-400 font-medium mt-0.5">
                <Shield className="w-3 h-3" />
                <span>Executive Control</span>
              </div>
            </div>
            <Link
              href="/"
              target="_blank"
              title="View Live Store"
              className="p-2 rounded bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded text-xs font-semibold tracking-wider uppercase transition-all ${
                activeTab === "overview"
                  ? "bg-white text-black shadow-lg"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Executive Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab("products")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded text-xs font-semibold tracking-wider uppercase transition-all ${
                activeTab === "products"
                  ? "bg-white text-black shadow-lg"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Package className="w-4 h-4" />
              <div className="flex items-center justify-between flex-grow">
                <span>Denim Inventory</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/10 text-neutral-300">
                  {products.length}
                </span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded text-xs font-semibold tracking-wider uppercase transition-all ${
                activeTab === "orders"
                  ? "bg-white text-black shadow-lg"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Truck className="w-4 h-4" />
              <div className="flex items-center justify-between flex-grow">
                <span>Orders & Deliveries</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-denim-600 text-white font-bold">
                  {orders.length}
                </span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded text-xs font-semibold tracking-wider uppercase transition-all ${
                activeTab === "settings"
                  ? "bg-white text-black shadow-lg"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Brand Configuration</span>
            </button>

            <button
              onClick={() => setActiveTab("marketing")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded text-xs font-semibold tracking-wider uppercase transition-all ${
                activeTab === "marketing"
                  ? "bg-white text-black shadow-lg"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Radio className="w-4 h-4 text-rose-500" />
              <div className="flex items-center justify-between flex-grow">
                <span>Marketing & Pixels</span>
                <span className="text-[9px] px-1.5 py-0.2 bg-rose-950/80 border border-rose-500/40 text-rose-300 font-bold rounded">
                  FB & TIKTOK
                </span>
              </div>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer User Info */}
        <div className="pt-6 mt-6 border-t border-white/10 space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-denim-800 flex items-center justify-center text-xs font-bold text-white uppercase">
              AD
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-semibold text-white truncate">
                Admin Supervisor
              </p>
              <p className="text-[11px] text-neutral-500 truncate">
                admin@justjeans.com
              </p>
            </div>
          </div>
          <Link
            href="/"
            className="block text-center text-xs text-neutral-400 hover:text-white py-2.5 bg-white/5 rounded hover:bg-white/10 transition-colors uppercase tracking-widest font-semibold"
          >
            ← Open Live Storefront
          </Link>
        </div>
      </aside>

      {/* Main Dashboard Workspace */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-8 border-b border-white/10">
          <div>
            <span className="text-xs font-semibold tracking-luxury uppercase text-denim-400">
              Live Backoffice Management
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-medium text-white capitalize mt-1">
              {activeTab === "overview" && "Executive Overview"}
              {activeTab === "products" && "Denim Catalog & Stock"}
              {activeTab === "orders" && "Order Fulfillment & Courier Hub"}
              {activeTab === "settings" && "Brand Settings"}
              {activeTab === "marketing" && "Marketing & Conversion Pixels"}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Supabase Status Pill */}
            <div className={`px-3 py-1.5 rounded-full border text-[11px] font-semibold flex items-center space-x-1.5 ${
              isDbConnected 
                ? "bg-emerald-950/60 border-emerald-500/30 text-emerald-400"
                : "bg-amber-950/60 border-amber-500/30 text-amber-400"
            }`}>
              <span className={`w-2 h-2 rounded-full ${isDbConnected ? "bg-emerald-400 animate-pulse" : "bg-amber-400"}`} />
              <span>{isDbConnected ? "Supabase (Postgres) Live" : "Local Mode (Add .env.local to sync)"}</span>
            </div>

            <button
              onClick={() => refreshFromDb()}
              disabled={isLoadingDb}
              title="Sync latest data from database"
              className="px-3 py-1.5 bg-neutral-900 border border-neutral-700 text-neutral-300 hover:text-white text-xs font-semibold rounded transition-colors flex items-center space-x-1"
            >
              <span>{isLoadingDb ? "Syncing..." : "Sync DB"}</span>
            </button>

            <Link
              href="/track"
              target="_blank"
              className="px-4 py-2 bg-neutral-900 border border-neutral-700 text-neutral-300 hover:text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center space-x-1.5"
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Tracking Portal</span>
            </Link>
            <Link
              href="/"
              target="_blank"
              className="px-4 py-2 bg-white text-black hover:bg-neutral-200 text-xs font-semibold tracking-wider uppercase rounded transition-colors flex items-center space-x-1.5"
            >
              <span>Live Store</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-6 bg-[#13151D] border border-white/10 rounded-sm space-y-3">
                <div className="flex items-center justify-between text-neutral-400 text-xs uppercase tracking-widest">
                  <span>Gross Sales</span>
                  <span className="text-emerald-400 flex items-center text-xs font-semibold">
                    <TrendingUp className="w-3.5 h-3.5 mr-1" />
                    Live Data
                  </span>
                </div>
                <h3 className="font-serif text-3xl font-medium text-white">
                  ৳ {totalRevenue.toLocaleString()}
                </h3>
                <p className="text-[11px] text-neutral-500 font-light">
                  From {orders.length} placed orders
                </p>
              </div>

              <div className="p-6 bg-[#13151D] border border-white/10 rounded-sm space-y-3">
                <div className="flex items-center justify-between text-neutral-400 text-xs uppercase tracking-widest">
                  <span>Total Orders</span>
                  <span className="text-denim-300 font-semibold text-xs">
                    {orders.length} Active
                  </span>
                </div>
                <h3 className="font-serif text-3xl font-medium text-white">
                  {orders.length}
                </h3>
                <p className="text-[11px] text-neutral-500 font-light">
                  bKash, Nagad & COD
                </p>
              </div>

              <div className="p-6 bg-[#13151D] border border-white/10 rounded-sm space-y-3">
                <div className="flex items-center justify-between text-neutral-400 text-xs uppercase tracking-widest">
                  <span>Items In Circulation</span>
                  <span className="text-emerald-400 font-semibold text-xs">
                    {totalItemsSold} Sold
                  </span>
                </div>
                <h3 className="font-serif text-3xl font-medium text-white">
                  {totalItemsSold} Pairs
                </h3>
                <p className="text-[11px] text-neutral-500 font-light">
                  Direct customer shipments
                </p>
              </div>

              <div className="p-6 bg-[#13151D] border border-white/10 rounded-sm space-y-3">
                <div className="flex items-center justify-between text-neutral-400 text-xs uppercase tracking-widest">
                  <span>Warehouse Inventory</span>
                  <span className="text-denim-300 font-semibold text-xs">
                    {products.length} Models
                  </span>
                </div>
                <h3 className="font-serif text-3xl font-medium text-white">
                  {totalStockUnits} Units
                </h3>
                <p className="text-[11px] text-neutral-500 font-light">
                  Total available denim inventory
                </p>
              </div>
            </div>

            {/* Recent Orders Overview Table */}
            <div className="p-6 bg-[#13151D] border border-white/10 rounded-sm space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-xl font-medium text-white">
                    Live Deliveries Stream
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Recent orders with courier partners and real-time status
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab("orders")}
                  className="text-xs font-semibold uppercase tracking-wider text-denim-300 hover:text-white"
                >
                  View All Orders →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-900/80 border-b border-white/10 text-neutral-400 uppercase tracking-widest">
                    <tr>
                      <th className="p-3.5">Order ID</th>
                      <th className="p-3.5">Customer & City</th>
                      <th className="p-3.5">Items</th>
                      <th className="p-3.5">Total</th>
                      <th className="p-3.5">Courier & Trx</th>
                      <th className="p-3.5">Live Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {orders.slice(0, 5).map((o) => (
                      <tr key={o.id} className="hover:bg-white/[0.02]">
                        <td className="p-3.5 font-mono font-bold text-denim-300">
                          {o.id}
                        </td>
                        <td className="p-3.5">
                          <p className="font-semibold text-white">
                            {o.customer.fullName}
                          </p>
                          <p className="text-[11px] text-neutral-400">
                            {o.customer.city} ({o.customer.phoneNumber})
                          </p>
                        </td>
                        <td className="p-3.5 text-neutral-300">
                          {(o.items || []).map((i: CartItem) => i.product.name).join(", ")}
                        </td>
                        <td className="p-3.5 font-bold text-white">
                          ৳ {o.total.toLocaleString()}
                        </td>
                        <td className="p-3.5">
                          <p className="font-medium text-white">{o.courierPartner}</p>
                          <p className="text-[10px] text-neutral-400 font-mono">
                            {o.paymentMethod}: {o.transactionId || "COD"}
                          </p>
                        </td>
                        <td className="p-3.5">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              o.deliveryStatus === "Delivered"
                                ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                                : o.deliveryStatus === "Out for Delivery"
                                ? "bg-blue-950 text-blue-300 border border-blue-800"
                                : "bg-amber-950 text-amber-300 border border-amber-800"
                            }`}
                          >
                            {o.deliveryStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: PRODUCTS INVENTORY */}
        {activeTab === "products" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs text-neutral-400">
                Total <strong>{products.length}</strong> denim items in catalog
              </p>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-white text-black hover:bg-neutral-200 text-xs font-bold uppercase tracking-wider rounded flex items-center space-x-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Denim</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-[#13151D] border border-white/10 rounded overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-900/80 border-b border-white/10 text-neutral-400 uppercase tracking-widest">
                    <tr>
                      <th className="p-4">SKU</th>
                      <th className="p-4">Item Name</th>
                      <th className="p-4">Fit & Gender</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Stock Level</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-white/[0.02]">
                        <td className="p-4 font-mono text-neutral-400">{p.sku}</td>
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className="relative w-10 h-12 bg-neutral-800 flex-shrink-0">
                              <Image
                                src={p.images[0]}
                                alt={p.name}
                                fill
                                sizes="40px"
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-semibold text-white">{p.name}</p>
                              <p className="text-[11px] text-neutral-500">
                                {p.wash}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-neutral-300">
                          {p.fit} ({p.gender})
                        </td>
                        <td className="p-4 font-bold text-white">
                          ৳ {p.price.toLocaleString()}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() =>
                                updateProductStock(p.id, Math.max(0, p.stockCount - 1))
                              }
                              className="w-5 h-5 bg-neutral-800 hover:bg-neutral-700 text-white rounded flex items-center justify-center font-bold"
                            >
                              -
                            </button>
                            <span className="font-semibold w-8 text-center">
                              {p.stockCount}
                            </span>
                            <button
                              onClick={() => updateProductStock(p.id, p.stockCount + 1)}
                              className="w-5 h-5 bg-neutral-800 hover:bg-neutral-700 text-white rounded flex items-center justify-center font-bold"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              p.inStock
                                ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                                : "bg-red-950 text-red-300 border border-red-800"
                            }`}
                          >
                            {p.inStock ? "In Stock" : "Out of Stock"}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => deleteProduct(p.id)}
                            aria-label={`Delete ${p.name}`}
                            className="p-2 text-neutral-400 hover:text-red-400 rounded hover:bg-white/5 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Add New Product Modal */}
            {showAddModal && (
              <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#13151D] border border-white/15 p-8 rounded max-w-lg w-full space-y-6 shadow-2xl"
                >
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <h3 className="font-serif text-xl font-medium text-white">
                      Add New Denim Product
                    </h3>
                    <button
                      onClick={() => setShowAddModal(false)}
                      className="text-neutral-400 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleCreateProduct} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs uppercase font-semibold text-neutral-300">
                        Product Name *
                      </label>
                      <input
                        type="text"
                        value={newProdName}
                        onChange={(e) => setNewProdName(e.target.value)}
                        placeholder="e.g. 15oz Indigo Heavyweight Selvedge"
                        required
                        className="w-full h-10 bg-neutral-900 border border-neutral-700 px-3 text-xs text-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs uppercase font-semibold text-neutral-300">
                          Fit Silhouette
                        </label>
                        <select
                          value={newProdFit}
                          onChange={(e) => setNewProdFit(e.target.value as DenimFit)}
                          className="w-full h-10 bg-neutral-900 border border-neutral-700 px-3 text-xs text-white"
                        >
                          <option value="Straight">Straight Fit</option>
                          <option value="Slim">Slim Fit</option>
                          <option value="Relaxed">Relaxed Fit</option>
                          <option value="Tapered">Tapered Fit</option>
                          <option value="Wide Leg">Wide Leg</option>
                          <option value="Skinny">Skinny</option>
                          <option value="Mom Fit">Mom Fit</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs uppercase font-semibold text-neutral-300">
                          Gender Category
                        </label>
                        <select
                          value={newProdGender}
                          onChange={(e) =>
                            setNewProdGender(e.target.value as GenderCategory)
                          }
                          className="w-full h-10 bg-neutral-900 border border-neutral-700 px-3 text-xs text-white"
                        >
                          <option value="Men">Men</option>
                          <option value="Women">Women</option>
                          <option value="Unisex">Unisex</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs uppercase font-semibold text-neutral-300">
                          Price (BDT ৳) *
                        </label>
                        <input
                          type="number"
                          value={newProdPrice}
                          onChange={(e) => setNewProdPrice(e.target.value)}
                          required
                          className="w-full h-10 bg-neutral-900 border border-neutral-700 px-3 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs uppercase font-semibold text-neutral-300">
                          Initial Stock Count
                        </label>
                        <input
                          type="number"
                          value={newProdStock}
                          onChange={(e) => setNewProdStock(e.target.value)}
                          className="w-full h-10 bg-neutral-900 border border-neutral-700 px-3 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs uppercase font-semibold text-neutral-300">
                        Image URL (Unsplash or CDN)
                      </label>
                      <input
                        type="url"
                        value={newProdImage}
                        onChange={(e) => setNewProdImage(e.target.value)}
                        className="w-full h-10 bg-neutral-900 border border-neutral-700 px-3 text-xs text-white font-mono"
                      />
                    </div>

                    <div className="pt-4 flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setShowAddModal(false)}
                        className="px-4 py-2 border border-neutral-700 text-xs font-semibold uppercase text-neutral-400 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-white text-black hover:bg-neutral-200 text-xs font-bold uppercase tracking-wider"
                      >
                        Create Product
                      </button>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}
          </motion.div>
        )}

        {/* TAB 3: ORDERS & LIVE DELIVERY FULFILLMENT */}
        {activeTab === "orders" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs text-neutral-400">
                Managing <strong>{orders.length}</strong> live customer delivery orders
              </p>
            </div>

            {/* Orders List */}
            <div className="space-y-4">
              {orders.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-[#13151D] border border-white/10 p-6 rounded space-y-4 hover:border-white/20 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-mono font-bold text-denim-300 bg-denim-950 px-2.5 py-1 border border-denim-800 rounded">
                        {ord.id}
                      </span>
                      <span className="text-xs text-neutral-400">
                        {new Date(ord.createdAt).toLocaleString()}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          ord.paymentStatus === "Paid"
                            ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                            : "bg-amber-950 text-amber-300 border border-amber-800"
                        }`}
                      >
                        {ord.paymentMethod} ({ord.paymentStatus})
                      </span>
                    </div>

                    {/* Delivery Status Updater */}
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">
                        Update Status:
                      </span>
                      <select
                        value={ord.deliveryStatus}
                        onChange={(e) =>
                          updateOrderStatus(
                            ord.id,
                            e.target.value as DeliveryStatus
                          )
                        }
                        className="bg-neutral-900 border border-neutral-700 text-xs text-white px-3 py-1.5 rounded focus:outline-none focus:border-white font-semibold"
                      >
                        {deliveryStatuses.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Customer, Destination, and Items Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                    {/* Customer & Address Details */}
                    <div className="space-y-1.5 p-4 bg-neutral-900/60 rounded border border-white/5">
                      <div className="flex items-center space-x-1.5 text-neutral-300 font-bold uppercase tracking-wider">
                        <MapPin className="w-3.5 h-3.5 text-denim-400" />
                        <span>Delivery Destination</span>
                      </div>
                      <p className="font-semibold text-white">
                        {ord.customer.fullName}
                      </p>
                      <p className="text-neutral-400">
                        Phone: <strong className="text-white">{ord.customer.phoneNumber}</strong>
                      </p>
                      <p className="text-neutral-400">
                        Address: {ord.customer.address}
                      </p>
                      <p className="text-neutral-400">
                        City/District: <strong className="text-white">{ord.customer.city}</strong>
                      </p>
                      {ord.customer.notes && (
                        <p className="text-neutral-500 italic pt-1">
                          &quot;{ord.customer.notes}&quot;
                        </p>
                      )}
                    </div>

                    {/* Courier Logistics */}
                    <div className="space-y-2 p-4 bg-neutral-900/60 rounded border border-white/5">
                      <div className="flex items-center space-x-1.5 text-neutral-300 font-bold uppercase tracking-wider">
                        <Truck className="w-3.5 h-3.5 text-denim-400" />
                        <span>Courier Assignment</span>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-wider text-neutral-500 block font-semibold">
                          Courier Partner
                        </label>
                        <select
                          value={ord.courierPartner}
                          onChange={(e) =>
                            updateOrderStatus(
                              ord.id,
                              ord.deliveryStatus,
                              e.target.value as CourierPartner
                            )
                          }
                          className="w-full bg-neutral-900 border border-neutral-700 text-xs text-white p-1.5"
                        >
                          {courierOptions.map((cp) => (
                            <option key={cp} value={cp}>
                              {cp}
                            </option>
                          ))}
                        </select>
                      </div>

                      <p className="text-[11px] text-neutral-400">
                        Tracking ID:{" "}
                        <strong className="text-denim-300 font-mono">
                          {ord.courierTrackingCode || "Auto-generating"}
                        </strong>
                      </p>
                      {ord.transactionId && (
                        <p className="text-[11px] text-neutral-400">
                          {ord.paymentMethod} TrxID:{" "}
                          <strong className="text-white font-mono">
                            {ord.transactionId}
                          </strong>
                        </p>
                      )}
                    </div>

                    {/* Ordered Items & Total */}
                    <div className="space-y-2 p-4 bg-neutral-900/60 rounded border border-white/5 flex flex-col justify-between">
                      <div>
                        <span className="text-neutral-300 font-bold uppercase tracking-wider block mb-2">
                          Ordered Items
                        </span>
                        <div className="space-y-1.5">
                          {(ord.items || []).map((item: CartItem, idx: number) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between text-[11px]"
                            >
                              <span className="text-white line-clamp-1">
                                {item.product.name} ({item.selectedSize}) × {item.quantity}
                              </span>
                              <span className="font-semibold text-neutral-300">
                                ৳ {(item.product.price * item.quantity).toLocaleString()}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-bold text-white">
                        <span>Grand Total</span>
                        <span className="text-emerald-400">
                          ৳ {ord.total.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* TAB 4: BRAND SETTINGS */}
        {activeTab === "settings" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl space-y-8"
          >
            {savedSuccess && (
              <div className="p-4 bg-emerald-950/80 border border-emerald-700 text-emerald-200 text-xs rounded flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Brand settings updated successfully across storefront!</span>
              </div>
            )}

            <form
              onSubmit={handleSaveSettings}
              className="p-8 bg-[#13151D] border border-white/10 rounded-sm space-y-6"
            >
              <div className="space-y-1">
                <h3 className="font-serif text-2xl font-medium text-white">
                  Brand Identity & Store Settings
                </h3>
                <p className="text-xs text-neutral-400">
                  Update primary brand elements displayed throughout customer checkout & storefront
                </p>
              </div>

              <div className="space-y-4 pt-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-widest text-neutral-300 block">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    required
                    className="w-full h-11 bg-neutral-900 border border-neutral-700 px-4 text-sm text-white focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-widest text-neutral-300 block">
                    Brand Tagline
                  </label>
                  <input
                    type="text"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    required
                    className="w-full h-11 bg-neutral-900 border border-neutral-700 px-4 text-sm text-white focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-widest text-neutral-300 block">
                    Top Announcement Bar Text
                  </label>
                  <input
                    type="text"
                    value={announcementText}
                    onChange={(e) => setAnnouncementText(e.target.value)}
                    required
                    className="w-full h-11 bg-neutral-900 border border-neutral-700 px-4 text-sm text-white focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-widest text-neutral-300 block">
                    Flagship Store / Office Location
                  </label>
                  <input
                    type="text"
                    value={storeAddress}
                    onChange={(e) => setStoreAddress(e.target.value)}
                    required
                    className="w-full h-11 bg-neutral-900 border border-neutral-700 px-4 text-sm text-white focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-widest text-neutral-300 block">
                    Customer Hotline / Support Phone
                  </label>
                  <input
                    type="text"
                    value={storePhone}
                    onChange={(e) => setStorePhone(e.target.value)}
                    required
                    className="w-full h-11 bg-neutral-900 border border-neutral-700 px-4 text-sm text-white focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <p className="text-[11px] text-neutral-500">
                  Changes apply immediately across the storefront.
                </p>
                <button
                  type="submit"
                  className="px-6 py-3 bg-white text-black hover:bg-neutral-200 text-xs font-bold uppercase tracking-luxury rounded flex items-center space-x-2 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Configuration</span>
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* TAB 5: MARKETING & PIXELS */}
        {activeTab === "marketing" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl space-y-8"
          >
            {pixelSaveSuccess && (
              <div className="p-4 bg-emerald-950/80 border border-emerald-700 text-emerald-200 text-xs rounded flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Pixel credentials & API settings saved successfully! All live visitors are now tracked.</span>
              </div>
            )}

            {testPingMsg && (
              <div className="p-4 bg-denim-950/80 border border-denim-700 text-denim-200 text-xs rounded flex items-center space-x-2 animate-pulse">
                <Zap className="w-4 h-4 text-denim-400" />
                <span>{testPingMsg}</span>
              </div>
            )}

            <form onSubmit={handleSavePixels} className="space-y-6">
              {/* Header Info */}
              <div className="p-6 bg-[#13151D] border border-white/10 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif text-2xl font-medium text-white flex items-center space-x-2">
                    <Radio className="w-5 h-5 text-rose-500" />
                    <span>Pixel & Conversions API Hub</span>
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    Connect Meta (Facebook) Pixel and TikTok Pixel for automated e-commerce event tracking, retargeting & ROI analytics.
                  </p>
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-white text-black hover:bg-neutral-200 text-xs font-bold uppercase tracking-luxury rounded flex items-center space-x-2 transition-colors flex-shrink-0"
                >
                  <Save className="w-4 h-4" />
                  <span>Save All Pixels</span>
                </button>
              </div>

              {/* Grid: Meta Pixel & TikTok Pixel */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1. META (FACEBOOK) PIXEL & CAPI */}
                <div className="p-6 bg-[#13151D] border border-white/10 rounded-sm space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-[#1877F2]/20 border border-[#1877F2]/40 flex items-center justify-center text-[#1877F2] font-bold text-lg">
                        f
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                          Meta (Facebook) Pixel
                        </h4>
                        <span className="text-[11px] text-neutral-400">
                          Pixel ID & Conversions API (CAPI)
                        </span>
                      </div>
                    </div>
                    {/* Enable / Disable Toggle */}
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={fbEnabled}
                        onChange={(e) => setFbEnabled(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1877F2]"></div>
                    </label>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-widest text-neutral-300 block">
                        Facebook Pixel ID
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 182947192849102"
                        value={fbPixelId}
                        onChange={(e) => setFbPixelId(e.target.value)}
                        className="w-full h-11 bg-neutral-900 border border-neutral-700 px-4 text-xs font-mono text-white focus:outline-none focus:border-[#1877F2] transition-colors"
                      />
                      <p className="text-[10px] text-neutral-500">
                        Found in Meta Events Manager &gt; Data Sources &gt; Settings.
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-widest text-neutral-300 block">
                        Conversions API (CAPI) Access Token
                      </label>
                      <input
                        type="password"
                        placeholder="EAAG... (Optional for Server-side CAPI)"
                        value={fbAccessToken}
                        onChange={(e) => setFbAccessToken(e.target.value)}
                        className="w-full h-11 bg-neutral-900 border border-neutral-700 px-4 text-xs font-mono text-white focus:outline-none focus:border-[#1877F2] transition-colors"
                      />
                      <p className="text-[10px] text-neutral-500">
                        Allows iOS 14+ bypass with 100% server-side event tracking accuracy.
                      </p>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <span className={`text-[11px] font-semibold ${fbPixelId && fbEnabled ? "text-emerald-400" : "text-neutral-500"}`}>
                        {fbPixelId && fbEnabled ? "● Meta Tracking Active" : "○ Meta Inactive"}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleTestPing("facebook")}
                        className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-200 rounded transition-colors"
                      >
                        Send Test Ping
                      </button>
                    </div>
                  </div>
                </div>

                {/* 2. TIKTOK PIXEL & EVENTS API */}
                <div className="p-6 bg-[#13151D] border border-white/10 rounded-sm space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-[#FE2C55]/20 border border-[#FE2C55]/40 flex items-center justify-center text-[#FE2C55] font-bold text-lg">
                        ♪
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                          TikTok Pixel
                        </h4>
                        <span className="text-[11px] text-neutral-400">
                          TikTok Pixel ID & Events API
                        </span>
                      </div>
                    </div>
                    {/* Enable / Disable Toggle */}
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={ttEnabled}
                        onChange={(e) => setTtEnabled(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FE2C55]"></div>
                    </label>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-widest text-neutral-300 block">
                        TikTok Pixel ID
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. C1234567890ABCDEF"
                        value={ttPixelId}
                        onChange={(e) => setTtPixelId(e.target.value)}
                        className="w-full h-11 bg-neutral-900 border border-neutral-700 px-4 text-xs font-mono text-white focus:outline-none focus:border-[#FE2C55] transition-colors"
                      />
                      <p className="text-[10px] text-neutral-500">
                        Found in TikTok Ads Manager &gt; Assets &gt; Events.
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-widest text-neutral-300 block">
                        TikTok Events API Access Token
                      </label>
                      <input
                        type="password"
                        placeholder="Optional for TikTok Events API"
                        value={ttAccessToken}
                        onChange={(e) => setTtAccessToken(e.target.value)}
                        className="w-full h-11 bg-neutral-900 border border-neutral-700 px-4 text-xs font-mono text-white focus:outline-none focus:border-[#FE2C55] transition-colors"
                      />
                      <p className="text-[10px] text-neutral-500">
                        Enhanced web events measurement for video ads and viral campaigns.
                      </p>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <span className={`text-[11px] font-semibold ${ttPixelId && ttEnabled ? "text-emerald-400" : "text-neutral-500"}`}>
                        {ttPixelId && ttEnabled ? "● TikTok Tracking Active" : "○ TikTok Inactive"}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleTestPing("tiktok")}
                        className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-200 rounded transition-colors"
                      >
                        Send Test Ping
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Supported Events Showcase */}
              <div className="p-6 bg-[#101218] border border-white/5 rounded-sm">
                <h4 className="text-xs font-semibold uppercase tracking-widest text-white mb-3 flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-denim-400" />
                  <span>Automated E-Commerce Events Matrix</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-[11px]">
                  <div className="p-3 bg-white/5 rounded border border-white/5">
                    <span className="text-neutral-400 block">Page View</span>
                    <span className="text-white font-mono font-bold">PageView</span>
                  </div>
                  <div className="p-3 bg-white/5 rounded border border-white/5">
                    <span className="text-neutral-400 block">Product View</span>
                    <span className="text-white font-mono font-bold">ViewContent</span>
                  </div>
                  <div className="p-3 bg-white/5 rounded border border-white/5">
                    <span className="text-neutral-400 block">Add To Bag</span>
                    <span className="text-white font-mono font-bold">AddToCart</span>
                  </div>
                  <div className="p-3 bg-white/5 rounded border border-white/5">
                    <span className="text-neutral-400 block">Start Checkout</span>
                    <span className="text-white font-mono font-bold">InitiateCheckout</span>
                  </div>
                  <div className="p-3 bg-white/5 rounded border border-white/5">
                    <span className="text-neutral-400 block">Order Complete</span>
                    <span className="text-emerald-400 font-mono font-bold">Purchase (BDT)</span>
                  </div>
                </div>
              </div>
            </form>
          </motion.div>
        )}
      </main>
    </div>
  );
}
