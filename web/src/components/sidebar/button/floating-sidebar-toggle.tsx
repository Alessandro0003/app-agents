// FloatingSidebarToggle.tsx
import { PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";

export const FloatingSidebarToggle = () => {
	const { toggleSidebar } = useSidebar();
	return (
		<Button type="button" onClick={toggleSidebar} size="icon" variant="ghost">
			<PanelLeft className="h-5 w-5" />
			<span className="sr-only">Alternar sidebar</span>
		</Button>
	);
};
