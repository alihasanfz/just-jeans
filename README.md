# 👖 JUST JEANS — Premium Denim E-Commerce & Supabase Cloud

**Tagline:** Premium Denim. Designed for Everyday.

---

## ⚡ ১-ক্লিকে সাইট চালু করার নিয়ম (IDE ছাড়া)

Antigravity IDE সম্পূর্ণ বন্ধ করার পরও আপনি সাইটটি চালু রাখতে পারবেন:

### উপায় ১: ডাবল-ক্লিক করে (সবচেয়ে সহজ)
আপনার কম্পিউটারে `Desktop` > `Just Jeans` ফোল্ডারে যান:
1. **`start.bat`** ফাইলে ডাবল ক্লিক করুন।
2. সাথে সাথে একটি কালো উইন্ডো ওপেন হবে এবং আপনার ব্রাউজারে সাইটটি খুলে যাবে:  
   👉 **http://localhost:3000**

---

## 🗄️ Supabase (PostgreSQL) ক্লাউড ডাটাবেস কানেক্ট করার নিয়ম

আপনার প্রজেক্টের সাথে **Supabase PostgreSQL** সম্পূর্ণ ইন্টিগ্রেট করা আছে:

1. [Supabase.com](https://supabase.com)-এ গিয়ে একটি ফ্রি একাউন্ট ও **New Project** তৈরি করুন।
2. প্রজেক্টের **SQL Editor**-এ যান।
3. আপনার প্রোজেক্টের [`supabase/schema.sql`](supabase/schema.sql) ফাইলের সম্পূর্ণ কোডটি কপি করে পেস্ট করে **Run** বাটনে চাপুন। (এটি স্বয়ংক্রিয়ভাবে `products`, `orders`, `order_items` টেবিল তৈরি করবে এবং প্রিমিয়াম ডেনিম প্রোডাক্ট ডেটা লোড করবে)।
4. Supabase ড্যাশবোর্ডের **Project Settings** > **API** থেকে **Project URL** এবং **anon public key** কপি করুন।
5. আপনার প্রজেক্টের `.env.local` ফাইলে পেস্ট করে সেভ করুন:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
6. সার্ভার রিস্টার্ট দিন বা অ্যাডমিন প্যানেলে **"Sync DB"** বাটনে ক্লিক করুন!

> [!NOTE]
> কী (Keys) না বসালেও সাইটটি অফলাইন/লোকাল মোডে নিরবচ্ছিন্নভাবে স্বয়ংক্রিয়ভাবে চলবে।

---

## 🌐 ২৪ ঘণ্টা ইন্টারনেটে লাইভ করার নিয়ম (Free Hosting & Custom Domain)

1. [Vercel.com](https://vercel.com)-এ ফ্রি সাইন আপ করুন।
2. **"Add New Project"** এ ক্লিক করে GitHub রিপোজিটরি কানেক্ট করুন।
3. **Environment Variables**-এ `NEXT_PUBLIC_SUPABASE_URL` ও `NEXT_PUBLIC_SUPABASE_ANON_KEY` বসিয়ে **Deploy** চাপুন।
4. ৩০ সেকেন্ডের মধ্যে লাইভ লিঙ্ক পেয়ে যাবেন!

---

## 📂 গুরুত্বপূর্ণ পেজসমূহ:

* **হোমপেজ ও শপ:** `http://localhost:3000`
* **চেকআউট ও পেমেন্ট (bKash/Nagad/COD):** `http://localhost:3000/checkout`
* **লাইভ ডেলিভারি ট্র্যাকিং:** `http://localhost:3000/track`
* **অ্যাডমিন ড্যাশবোর্ড:** `http://localhost:3000/admin`
* **অ্যাডমিন লগইন:** `http://localhost:3000/admin/login` (Demo: `admin@justjeans.com` / `admin123`)
