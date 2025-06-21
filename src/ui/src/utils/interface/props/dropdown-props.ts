import Genre from "@shared/enum/genre";
import SortKey from "@shared/enum/sort-key";
import React from "react";

/**
 * Properties for dropdown menus.
 */
export interface DropdownProps {
    // Visual
    title: string;
    icon: React.ReactNode;
    width: string;

    // Options
    options: { key: string; value: SortKey | Genre }[];
    onChange: (value: SortKey | Genre) => void;
    initialValue: SortKey | Genre;
}

export default DropdownProps;