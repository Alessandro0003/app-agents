import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/sidebar/app-sidebar";
export function AppLayout() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main className="flex-1 p-4 md:p-6 overflow-auto">
				<Outlet />
			</main>
		</SidebarProvider>
	);
}
