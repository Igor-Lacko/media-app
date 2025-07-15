import SliderProps from "utils/props/control-elements/slider-props";

/**
 * Hook to manage a rating slider.
 * @param ref Reference to an object with a rating property.
 */
export default function useRatingSlider<T extends { rating?: number }>(
	ref: React.RefObject<T>,
	initial: number,
): SliderProps {
	const props: SliderProps = {
		onChange: (value: number) => {
			ref.current.rating = value;
		},
		max: 10,
		initial: initial || 0,
	};

	return props;
}
