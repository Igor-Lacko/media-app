import SliderProps from "utils/props/control-elements/slider-props";
import { useState } from "react";

/**
 * Slider component for selecting a value within a range.
 * @param props Properties for the slider component (onChange, max, initial).
 */
export default function Slider(props: SliderProps) {
	// Slider value
	const [value, setValue] = useState(props.initial);

	const displayedValue =
		!props.precision ? value.toFixed(1)
		: props.precision >= 0 ? value.toFixed(props.precision)
		: value;

	const displayedMax =
		!props.precision ? props.max.toFixed(1)
		: props.precision >= 0 ? props.max.toFixed(props.precision)
		: props.max;

	return (
		<div className="flex w-full h-full items-center justify-start">
			<div className="relative w-7/10 h-2 rounded-lg bg-gray-300 dark:bg-gray-500">
				<div
					className={`absolute top-0 left-0 h-full rounded-lg bg-blue-500`}
					style={{ width: `${(value / props.max) * 100}%` }}
				></div>
				<input
					type="range"
					min="0"
					max={props.max}
					step={props.jump || 0.1}
					defaultValue={props.initial}
					className="absolute w-full h-full appearance-none cursor-pointer"
					onChange={(event) => {
						props.onChange(parseFloat(event.target.value));
						setValue(parseFloat(event.target.value));
					}}
				/>
			</div>
			<span className="ml-4 text-gray-500 dark:text-gray-400 w-3/10">
				{displayedValue} / {displayedMax}
			</span>
		</div>
	);
}
