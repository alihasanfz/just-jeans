import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Backoffice | JUST JEANS",
  description: "Executive control dashboard and denim catalog orchestration.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0E1015] text-neutral-100 font-sans antialiased">
      {children}
    </div>
  );
}
