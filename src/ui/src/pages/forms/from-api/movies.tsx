import classNames from "classnames";
import RoundedButton from "components/buttons/rounded-button";
import InfoModal from "components/modals/info-modal";
import { CreateMovieFromOMDb } from "data/crud/create";
import LoadingPage from "pages/other/loading-page";
import { useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom"

/**
 * Form page for adding movies from the OMDb API.
 * Contains basically just a go back button and a input.
 */
export default function OMDbMovieForm() {
    // To go back
    const navigate = useNavigate();

    // Ref for the title input
    const titleRef = useRef("");

    // To redden the input on empty submission
    const [error, setError] = useState(false);

    // To load on submission
    const [loading, setLoading] = useState(false);

    // Note: all the success/error modals could probably be an enum used by a hook, todo?

    // If the movie doesn't create successfully
    const [errorModalMessage, setErrorModalMessage] = useState("");

    // And if it does!
    const [successModalVisible, setSuccessModalVisible] = useState(false);

    // After the request is made
    if (loading) {
        return <LoadingPage />
    }

    return (
        <div
            className={"flex flex-col w-full h-full items-center justify-start"}
        >
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
                    <h1 className={"text-2xl mb-5"}>
                        Add Movie from OMDb API
                    </h1>
                    <div
                        className={"flex items-center justify-start w-full mb-1"}
                    >
                        <span className={"text-red-500 text-sm min-h-6"}>
                            {error ? "Please enter a movie title." : ""}
                        </span>
                    </div>

                    <input
                        type="text"
                        placeholder="Enter movie title"
                        className={classNames(
                            "w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg",
                            "focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400",
                            "transition mb-1 duration-200 ease-in-out text-black dark:text-gray-400",
                            {
                                "ring-2 ring-red-500": error
                            }
                        )}
                        onClick={() => setError(false)}
                        onChange={(e) => titleRef.current = e.target.value}
                    />
                    <div
                        className={"flex w-full items-center justify-end mt-5 bg-white dark:bg-gray-800"}
                    >
                        <RoundedButton
                            text={"Search"}
                            extraClassNames={"bg-blue-500 hover:bg-blue-600 text-white\
                                dark:bg-blue-700 dark:hover:bg-blue-800 dark:text-gray-200"}
                            onClick={async () => {
                                // Strip whitespace
                                const trimmed = titleRef.current.trim();
                                titleRef.current =  "";
                                if (trimmed === "") {
                                    setError(true);
                                    return;
                                }

                                // Wait for the request to complete
                                setLoading(true);

                                // Set error/success depending on the result
                                await CreateMovieFromOMDb(trimmed)
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
            {successModalVisible && <InfoModal
                title={"Movie Created Successfully"}
                message={"The movie has been successfully created from the OMDb API."}
                onClose={() => {
                    setSuccessModalVisible(false);
                    navigate(-1);
                }}
            />}
            {errorModalMessage !== "" && <InfoModal
                title={"Error Creating Movie"}
                message={errorModalMessage}
                // Maybe could also navigate back here?
                onClose={() => setErrorModalMessage("")}
            />}
        </div>
    )
}