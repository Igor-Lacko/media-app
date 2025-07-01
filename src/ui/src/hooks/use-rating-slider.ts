import SliderProps from "utils/props/slider-props";

/**
 * Hook to manage a rating slider.
 * @param ref Reference to an object with a rating property.
 */
export default function useRatingSlider<T extends { rating?: number }>(ref : React.RefObject<T>) : SliderProps{
    console.log("useRatingSlider called with ref:", ref.current);
    const props : SliderProps = {
        onChange: (value: number) => { ref.current.rating = value; },
        max: 10,
        initial: ref.current.rating || 0,
    }

    return props;
}