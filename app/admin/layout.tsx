import { isAdminAuthenticated } from "@/lib/auth";
import { LoginForm } from "@/components/admin/LoginForm";
import { AdminNav } from "@/components/admin/AdminNav";

export const metadata = {
  title: "Admin Panel | Portfolio",
  description: "Manage your portfolio content",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = await isAdminAuthenticated();

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen px-6 py-8">
      <div className="mx-auto max-w-6xl">
        <AdminNav />
        {children}
      </div>
    </div>
  );
}
