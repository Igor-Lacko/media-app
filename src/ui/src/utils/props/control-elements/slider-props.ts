export interface SliderProps {
	onChange: (value: number) => void;
	max: number;
	initial: number;
	extraClassNames?: string;
}

export default SliderProps;
