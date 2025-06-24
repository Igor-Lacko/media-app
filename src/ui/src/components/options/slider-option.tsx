import Slider from "components/slider";
import SliderProps from "utils/interface/props/slider-props";
/**
 * SliderOption component for rendering a slider input with a label.
 */
export default function SliderOption({props, title, extraClassNames} : {props : SliderProps, title : string, extraClassNames? : string}) {
    return (
        <div
            className={"flex flex-col w-full h-auto items-start justify-center p-4 space-y-4 " + (extraClassNames || "")}
        >
            <span
                className={"text-lg flex font-semibold mb-5 items-center h-full text-gray-800 dark:text-gray-400"}
            >
                {title}
            </span>
            <div
                className={"flex items-center justify-center h-full w-2/10"}
            >
                <Slider
                    {...props}
                />
            </div>
        </div>
    )
}
