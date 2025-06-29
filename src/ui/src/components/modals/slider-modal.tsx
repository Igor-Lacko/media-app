import RoundedButton from "components/buttons/rounded-button";
import Slider from "components/slider";
import { useState } from "react";
import ModalProps from "utils/props/modal-props";
import AbstractModal from "./abstract-modal";

export default function SliderModal(props : ModalProps) {
    const [value, setValue] = useState(0);
    return (
        <AbstractModal>
            <h2 
                className={"text-xl font-semibold text-gray-800 dark:text-gray-200"}
            >
                {props.title}
            </h2>
            <Slider
                onChange={setValue}
                max={10}
                initial={0}
            />
            <RoundedButton
                text={"Close"}
                extraClassNames={"bg-purple-700 dark:bg-purple-800 hover:bg-purple-800"}
                onClick={async () => {
                    props.onSelectRating && await props.onSelectRating(value);
                    props.onClose();
                }}
            />
        </AbstractModal>
    )
}