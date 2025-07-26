export interface SliderProps {
	onChange: (value: number) => void;
	max: number;
	initial: number;

	// Defaults to 0.1
	jump?: number;

	// Defaults to 1 decimal place
	precision?: number;

	extraClassNames?: string;
}

export default SliderProps;
