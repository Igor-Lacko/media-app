import React from "react";
/**
 * Represents the properties for a sidebar button component.
 */
export default interface SidebarButtonProps {
    /**
     * The text label displayed on the button.
     */
    label: string;

    /**
     * The icon node displayed on the button.-
     */
    icon: React.ReactNode;

    /**
     * Link or navigation target for the button.
     */
    link: string;
}