/**
 * Properties for a progress bar component.
 */
export interface ProgressBarProps {
    value: number;
    max: number;
    label?: string;
    extraClassNames?: string;
}

export default ProgressBarProps;