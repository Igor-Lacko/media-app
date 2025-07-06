import { useState } from "react";
import ModalProps from "utils/props/other/modal-props";
import AbstractModal from "./abstract-modal";
import { FaCheckCircle } from "react-icons/fa";
import RoundedButton from "components/buttons/rounded-button";

/**
 * Modal providing a list of items from which one can be selected.
 * @param props Props for the modal including title, onSelect function, and initial selection.
 */
export default function EnumModal(props : ModalProps) {
    const [selected, setSelected] = useState(props.initialWatchStatus!.value)

    return (
        <AbstractModal>
            <h2 className={"text-xl font-semibold text-gray-800 dark:text-gray-200"}>
                {props.title}
            </h2>
            {props.selectOptions && props.selectOptions.map((option) => (
                <button
                    key={option.value}
                    className={"flex items-center p-2 w-full text-left rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"}
                    onClick={() => {setSelected(option.value!);}}
                >
                    <span className={"flex-1"}>
                        {option.key}
                    </span>
                    {selected === option.value && (
                        <FaCheckCircle className={"text-green-500"} />
                    )}
                </button>
            ))}
            <RoundedButton
                text={"Close"}
                extraClassNames={"bg-purple-700 dark:bg-purple-800 hover:bg-purple-800"}
                onClick={async () => {
                    props.onSelectWatchStatus && await props.onSelectWatchStatus(selected);
                    props.onClose();
                }}
            />
        </AbstractModal>
    )
}