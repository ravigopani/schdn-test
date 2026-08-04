import { AdminHeader } from "@/components/admin/admin-header";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata = {
  title: "Admin Panel",
  description: "Admin dashboard and management",
};

export default function AdminLayout({ children }) {
  return (
    <SidebarProvider>
      <TooltipProvider>
        <AdminSidebar />
        <SidebarInset>
          <AdminHeader />
          <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">{children}</div>
        </SidebarInset>
      </TooltipProvider>
    </SidebarProvider>
  );
}
