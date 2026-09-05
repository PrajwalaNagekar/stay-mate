import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#e8eef5]">

      {/* Sidebar */}
      <Sidebar />

      {/* Right side */}
      <div className="ml-[260px] min-h-screen">

        {/* Header */}
        <Header />

        {/* Page */}
        <main className="min-h-[calc(100vh-72px)] p-6">
          {children}
        </main>

      </div>
    </div>
  );
}