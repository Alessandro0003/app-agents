import { createContext, type ReactNode, useContext, useState } from "react";

interface SidebarContextProps {
	isOpen: boolean;
	openSidebar: () => void;
	closeSidebar: () => void;
	toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
	undefined,
);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
	const [isOpen, setIsOpen] = useState(false);

	const openSidebar = () => setIsOpen(true);
	const closeSidebar = () => setIsOpen(false);
	const toggleSidebar = () => setIsOpen((prev) => !prev);

	return (
		<SidebarContext.Provider
			value={{ isOpen, openSidebar, closeSidebar, toggleSidebar }}
		>
			{children}
		</SidebarContext.Provider>
	);
};

export const useSidebar = () => {
	const context = useContext(SidebarContext);
	if (!context) {
		throw new Error("useSidebar must be used within a SidebarProvider");
	}
	return context;
};
