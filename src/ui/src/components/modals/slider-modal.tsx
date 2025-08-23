import RoundedButton from "components/buttons/rounded-button";
import Slider from "components/controls/slider";
import { useRef } from "react";
import { SliderModalProps } from "utils/props/other/modal-props";
import AbstractModal from "./abstract-modal";

/**
 * Modal that provides a slider for selecting from a range of values.
 * @param props Initial value, on select function, and title for the modal.
 */
export default function SliderModal(props: SliderModalProps) {
    const valueRef = useRef(props.initialValue ?? 0);

    return (
        <AbstractModal>
            <h2
                className={"text-xl font-semibold text-gray-800 dark:text-gray-200"}
            >
                {props.title}
            </h2>
            <p
                className={"text-gray-600 dark:text-gray-400 mb-4"}
            >
                {props.message}
            </p>
            <Slider
                onChange={(v: number) => {
                    valueRef.current = v;
                }}
                jump={props.jump}
                max={props.maxValue}
                precision={props.precision}
                initial={props.initialValue !== undefined ? props.initialValue : 0}
            />
            <RoundedButton
                text={"Close"}
                extraClassNames={"bg-purple-700 dark:bg-purple-800 hover:bg-purple-800"}
                onClick={async () => {
                    await props.onSliderEnter(valueRef.current);
                    props.onClose();
                }}
            />
        </AbstractModal>
    )
}