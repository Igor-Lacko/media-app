/**
 * Properties for a progress bar component.
 */
export interface ProgressBarProps {
    // Optional since percentage can be provided instead
    value?: number;
    max?: number;


    label?: string;

    // Can be provided straight away
    percentage?: number;

    extraClassNames?: string;
}

export default ProgressBarProps;