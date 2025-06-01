import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@meetzen/ui/components/sidebar";
import { CompanySidebar } from "@/modules/company/company-sidebar";
import { Separator } from "@meetzen/ui/src/components/separator";

export default function CompanyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <CompanySidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <p>Dashboard</p>
          </div>
        </header>
        <div className="px-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
