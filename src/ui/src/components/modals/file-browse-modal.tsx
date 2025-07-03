import { useRef } from "react";
import ModalProps from "utils/props/modal-props";
import AbstractModal from "./abstract-modal";
import FileBrowseButton from "components/buttons/file-browse-button";
import RoundedButton from "components/buttons/rounded-button";

export default function FileBrowseModal(props: ModalProps) {
    // Doesn't need to be state, since the button keeps that already
    const path = useRef(props.initialText || "");

    return (
        <AbstractModal>
            <h2 className={"text-xl font-semibold text-gray-800 dark:text-gray-200"}>
                {props.title}
            </h2>
            {props.message && (
                <p className={"text-gray-600 dark:text-gray-400 mb-4"}>
                    {props.message}
                </p>
            )}
            <FileBrowseButton
                initial={props.initialText || ""}
                allowed={props.allowed || "all"}
                onChange={(value: string) => {
                    path.current = value;
                }}
            />
            <RoundedButton
                text={"Close"}
                extraClassNames={"bg-purple-700 dark:bg-purple-800 hover:bg-purple-800"}
                onClick={async () => {
                    props.onSetText && await props.onSetText(path.current);
                    props.onClose();
                }}
            />
        </AbstractModal>
    )
}