import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FormProps from "utils/props/form-props";
import SubmitButton from "components/buttons/submit-button";
import useModal from "hooks/use-modal";
import InfoModal from "components/modals/info-modal";

/**
 * Layout for a form page with a title, back button, content, submit button and modals for error/success.
 */
export default function FormLayout<T>(props: FormProps<T>) {
    // For modal showing and going back on submit
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    // Modal props
    const errorModalProps = useModal("Error", props.errorModalMessage, () => { setError(false); })
    const successModalProps = useModal("Success", props.successModalMessage, () => {
        setSuccess(false);
        navigate(-1);
    });

    // Submission
    const onSubmit = async () => {
        console.log("Submitting form");
        await props.submitFunction(props.ref.current) ? setSuccess(true) : setError(true);
    };

    return (
        <div
            className={"flex flex-col w-full h-full items-center justify-start\
                    overflow-x-hidden overflow-y-auto bg-white dark:bg-gray-800"}
        >
            <div
                className={"flex items-center justify-start ml-10 mt-5 w-full h-1/25 sm:h-1/20"}
            >
                <FaArrowLeft
                    className={"text-gray-500 text-2xl cursor-pointer"}
                    onClick={() => navigate(-1)}
                />
            </div>
            <div
                className={"flex items-center justify-center w-full h-1/25 mt-10 mb-5 p-2"}
            >
                <h1 className={"text-4xl font-bold text-gray-800 dark:text-gray-400"}>
                    {props.title}
                </h1>
            </div>
            <div
                className={"flex flex-col w-full h-24/25 items-center justify-start space-y-10"}
            >
                <div
                    className={"flex-grow w-full"}
                >
                    {props.children}
                </div>
                <div
                    className={"flex w-full items-end justify-between p-4 border-t\
                            border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"}
                >
                    <span
                        className={"text-gray-500 text-sm"}
                    >
                        Fields marked with * are required.
                    </span>
                    <SubmitButton
                        title={props.title}
                        classNames={"w-1/10 h-full"}
                        onClick={onSubmit}
                    />
                </div>
            </div>
            {error && <InfoModal
                {...errorModalProps}
            />
            }
            {success && <InfoModal
                {...successModalProps}
            />
            }
        </div>
    )
}