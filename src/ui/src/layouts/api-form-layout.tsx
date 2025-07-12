import classNames from "classnames";
import RoundedButton from "components/buttons/rounded-button";
import InfoModal from "components/modals/info-modal";
import LoadingPage from "pages/other/loading-page";
import { useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ApiFormProps from "utils/props/forms/api-form-props";

export default function ApiFormLayout(props: ApiFormProps) {
    // To go back
    const navigate = useNavigate();

    // Title and imdbId refs
    const titleRef = useRef("");
    const imdbIdRef = useRef("");

    // Error state ("At least one of title or IMDb ID must be provided")
    const [error, setError] = useState(false);

    // To load on submission
    const [loading, setLoading] = useState(false);

    // Note: all the success/error modals could probably be an enum used by a hook, todo?

    // If the model doesn't create successfully
    const [errorModalMessage, setErrorModalMessage] = useState("");

    // And if it does!
    const [successModalVisible, setSuccessModalVisible] = useState(false);

    // After the request is made
    if (loading) {
        return <LoadingPage />;
    }

    // Input classes
    const inputClasses = classNames(
        "w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400",
        "transition mb-7 duration-200 ease-in-out text-black dark:text-gray-400",
        {
            "ring-2 ring-red-500": error,
        }
    );

    return (
        <div
            className={"flex flex-col w-full h-full items-center justify-start"}
        >
            {/** Div with go back button */}
            <div
                className={"flex items-center justify-start ml-20 mt-5 w-full h-1/25 sm:h-1/20"}
            >
                <FaArrowLeft
                    className={"text-gray-500 text-2xl cursor-pointer"}
                    onClick={() => navigate(-1)}
                />
            </div>
            {/** Form component */}
            <div
                className={"flex items-center justify-center w-full h-24/25"}
            >
                <div
                    className={"flex flex-col w-200 h-auto items-center justify-start\
                            p-10 rounded-lg shadow-lg border-2 border-gray-300 dark:border-gray-600\
                            text-black dark:text-gray-400"}
                >
                    <h1
                        className={"text-2xl mb-5"}
                    >
                        {props.title}
                    </h1>
                    <div
                        className={"flex flex-col items-center justify-start w-full mb-1"}
                    >
                        <span className={"text-red-500 text-sm min-h-6"}>
                            {error ? "At least one of Title or IMDb Id must be provided." : ""}
                        </span>
                        {/** Title */}
                        <input
                            type="text"
                            className={inputClasses}
                            placeholder={props.placeholders.title}
                            onChange={(e) => titleRef.current = e.target.value}
                            onClick={() => setError(false)}
                        />
                        {/** IMDb ID */}
                        <input
                            type="text"
                            className={inputClasses}
                            placeholder={props.placeholders.imdbId}
                            onChange={(e) => imdbIdRef.current = e.target.value}
                            onClick={() => setError(false)}
                        />
                    </div>
                    {/** Submit button */}
                    <div
                        className={"flex w-full items-center justify-end mt-5"}
                    >
                        <RoundedButton
                            text={"Search"}
                            extraClassNames={"bg-blue-500 hover:bg-blue-600 text-white\
                                dark:bg-blue-700 dark:hover:bg-blue-800 dark:text-gray-200"}
                            onClick={async () => {
                                // Strip whitespace
                                const trimmedTitle = titleRef.current.trim();
                                const trimmedImdbId = imdbIdRef.current.trim();
                                titleRef.current = "";
                                imdbIdRef.current = "";

                                // At least one of the fields must be provided
                                if (trimmedTitle === "" && trimmedImdbId === "") {
                                    setError(true);
                                    return;
                                }

                                // Start loading
                                setLoading(true);

                                // Clear refs
                                titleRef.current = "";
                                imdbIdRef.current = "";

                                // Submit
                                await props.onSubmit(trimmedTitle, trimmedImdbId)
                                .then((res) => {
                                    setLoading(false);
                                    res.success ? setSuccessModalVisible(true) :
                                    setErrorModalMessage(res.errorMessage || "An unknown error occurred.");
                                })
                            }}
                        />
                    </div>
                </div>
            </div>
            {/** Modals */}
            {successModalVisible && <InfoModal
                title={props.successModalTitle}
                message={props.successModalMessage}
                onClose={() => {
                    setSuccessModalVisible(false);
                    navigate(-1);
                }}
            />}
            {errorModalMessage !== "" && <InfoModal
                title={props.errorModalTitle}
                message={errorModalMessage}
                onClose={() => setErrorModalMessage("")}
            />}
        </div>
    )
}