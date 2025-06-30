import RoundedButton from "components/buttons/rounded-button";
import Slider from "components/slider";
import { useRef } from "react";
import ModalProps from "utils/props/modal-props";
import AbstractModal from "./abstract-modal";

/**
 * Modal that provides a slider for selecting from a range of values.
 * @param props Initial value, on select function, and title for the modal.
 */
export default function SliderModal(props : ModalProps) {
    const valueRef = useRef(0);

    return (
        <AbstractModal>
            <h2 
                className={"text-xl font-semibold text-gray-800 dark:text-gray-200"}
            >
                {props.title}
            </h2>
            <Slider
                onChange={(v: number) => {
                    valueRef.current = v;
                }}
                max={10}
                initial={props.initialRating !== undefined ? props.initialRating :0}
            />
            <RoundedButton
                text={"Close"}
                extraClassNames={"bg-purple-700 dark:bg-purple-800 hover:bg-purple-800"}
                onClick={async () => {
                    props.onSelectRating && await props.onSelectRating(valueRef.current);
                    props.onClose();
                }}
            />
        </AbstractModal>
    )
}