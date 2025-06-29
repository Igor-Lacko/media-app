/**
 * Properties for a rounded button component. Includes text, click handler, optional icon, and extra class names.
 */
export interface RoundedButtonProps {
    text: string;
    onClick: () => void;
    extraClassNames: string; // Mandatory due to color at least
    icon?: React.ReactNode;
}

export default RoundedButtonProps;