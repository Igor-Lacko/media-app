import React from "react";

/**
 * Props for sidebar buttons with link, label and icon.
 */
export default interface SidebarButtonProps {
	icon: React.ReactNode;
	label: string;
	link: string;
}
