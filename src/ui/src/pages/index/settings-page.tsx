import SettingsContext from "context/settings-context";
import { useContext, useRef, useState } from "react";
import Toggle from "components/buttons/toggle";
import classNames from "classnames";
import RoundedButton from "components/buttons/rounded-button";
import InfoModal from "components/modals/info-modal";
import ConfirmModal from "components/modals/confirm-modal";
import { DeleteAPIKey, ResetDatabase } from "data/crud/delete";
import { ToggleDarkMode, ToggleExternalImages, ToggleMarkdownPreview, ToggleTvShowProgressDisplay, UpdateOMDBKey } from "data/crud/update";
import { OpenExternal } from "electron/electron-api";

export default function SettingsPage() {
    // Current settings
    const { settings, setSettings } = useContext(SettingsContext);

    // For red ring around the input field
    const [error, setError] = useState(false);

    // Delete API key confirm modal
    const [deleteKeyModalVisible, setDeleteKeyModalVisible] = useState(false);

    // Delete DB confirm modal
    const [deleteDBModalVisible, setDeleteDBModalVisible] = useState(false);

    // Deletion status message
    const [deletionStatusMessage, setDeletionStatusMessage] = useState("");

    // Key submission status message
    const [keySubmissionStatusMessage, setKeySubmissionStatusMessage] = useState("");

    // Used for all divs here
    const divClasses = "flex w-full items-center justify-between space-x-7 p-4 h-20\
    shadow-sm border-t border-x border-gray-200 dark:border-gray-700 ";

    // The little gray text
    const apiKeyMessage = settings.hasApiKey ? "Your api key is set!" :
        "Will enable you to fill movie data automatically using the OMDB API. Avaliable at"

    // Ref to control the input field (is unused if the key is set already)
    const keyRef = useRef("");

    return (
        <div
            className={"flex w-full h-full flex-col items-start justify-start p-4 m-0"}
        >
            <h1
                className={"text-4xl font-bold text-gray-800 dark:text-gray-400 ml-10 mb-10"}
            >
                Settings
            </h1>
            {/** Dark mode toggle */}
            <div
                className={divClasses}
            >
                <h2
                    className={"text-lg font-semibold text-gray-800 dark:text-gray-400"}
                >
                    Dark mode
                </h2>
                <Toggle
                    checked={settings.darkMode}
                    onChange={async (checked: boolean) => {
                        const response = await ToggleDarkMode(checked);
                        if (response) {
                            setSettings({ ...settings, darkMode: checked });
                        }
                        else {
                            alert("Failed to update dark mode setting.");
                        }
                    }}
                />
            </div>
            {/** Tv show progress */}
            <div
                className={divClasses}
            >
                <h2
                    className={"text-lg font-semibold text-gray-800 dark:text-gray-400"}
                >
                    Show tv show progress in episodes
                </h2>
                <span
                    className={"text-sm text-gray-500 dark:text-gray-400"}
                >
                    E.g 27/100 episodes vs 2/10 seasons
                </span>
                <Toggle
                    checked={settings.tvShowProgressInEpisodes}
                    onChange={async (checked: boolean) => {
                        const response = await ToggleTvShowProgressDisplay(checked);
                        if (response) {
                            setSettings({ ...settings, tvShowProgressInEpisodes: checked });
                        }
                        else {
                            alert("Failed to update TV show progress setting.");
                        }
                    }}
                />
            </div>
            {/** Preview in markdown editors */}
            <div
                className={divClasses}
            >
                <h2
                    className={"text-lg font-semibold text-gray-800 dark:text-gray-400"}
                >
                    Preview in markdown editors
                </h2>
                <span
                    className={"text-sm text-gray-500 dark:text-gray-400"}
                >
                    If enabled, this shows a preview of the note in markdown editors for lecture notes.
                </span>
                <Toggle
                    checked={settings.showMarkdownPreview}
                    onChange={async (checked: boolean) => {
                        const response = await ToggleMarkdownPreview(checked);
                        if (response) {
                            setSettings({ ...settings, showMarkdownPreview: checked });
                        }
                        else {
                            alert("Failed to update markdown preview setting.");
                        }
                    }}
                />
            </div>
            {/** Show external images */}
            <div
                className={divClasses}
            >
                <h2
                    className={"text-lg font-semibold text-gray-800 dark:text-gray-400"}
                >
                    Show external images
                </h2>
                <span
                    className={"text-sm text-gray-500 dark:text-gray-400"}
                >
                    This enables showing external images fetched from the OMDb or TV Maze APIs (if present in the response) in addition to local files.
                </span>
                <Toggle
                    checked={settings.showExternalImages}
                    onChange={async (checked: boolean) => await ToggleExternalImages(checked)
                        .then((response) => {
                            if (response) {
                                setSettings({ ...settings, showExternalImages: checked });
                            }
                            else {
                                alert("Failed to update external images setting.");
                            }
                        })}
                />
            </div>
            {/** OMDB API key */}
            <div
                className={divClasses}
            >
                <h2
                    className={"text-lg font-semibold text-gray-800 dark:text-gray-400"}
                >
                    OMDB API Key
                </h2>
                <span
                    className={classNames(
                        "text-sm",
                        {
                            "text-gray-500 dark:text-gray-400": !settings.hasApiKey,
                            "text-green-500 dark:text-green-400": settings.hasApiKey
                        }
                    )}
                >
                    {apiKeyMessage}
                    {!settings.hasApiKey && <button
                        className={"text-blue-500 dark:text-blue-400 hover:underline ml-1 cursor-pointer"}
                        onClick={async () => await OpenExternal("https://www.omdbapi.com")}
                    >
                        https://www.omdbapi.com
                    </button>}
                </span>
                {settings.hasApiKey ? (
                    <RoundedButton
                        text={"Remove API key"}
                        onClick={() => setDeleteKeyModalVisible(true)}
                        extraClassNames={"bg-red-500 text-white hover:bg-red-400 dark:hover:bg-red-600 transition-all duration-300 ease-in-out"}
                    />
                ) : (
                    <div
                        className={"flex items-center justify-between h-full"}
                    >
                        <div
                            className={classNames(
                                "flex items-center h-full w-9/10",
                                {
                                    // Center the input
                                    "justify-start": !error,

                                    // Error text
                                    "justify-end": error,
                                }
                            )}
                        >
                            {error && (
                                <span
                                    className={"text-red-500 dark:text-red-400 text-xs mr-5"}
                                >
                                    Please enter a valid OMDB API key.
                                </span>
                            )}
                            <input
                                type={"text"}
                                placeholder={"Enter your OMDB API key..."}
                                defaultValue={settings.hasApiKey || ""}
                                onChange={(event) => keyRef.current = event.target.value}
                                onClick={() => setError(false)}
                                className={classNames(
                                    "w-70 h-10 p-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700",
                                    "dark:text-gray-200 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none focus:ring-2",
                                    "transition-all duration-300 ease-in-out",
                                    {
                                        "ring-2 ring-red-500 dark:ring-red-400 outline-none": error,
                                    }
                                )}
                            />
                        </div>
                        <RoundedButton
                            text={"Submit"}
                            onClick={async () => {
                                const key = keyRef.current.trim();
                                if (key && key !== "") {
                                    setError(false);
                                    const response = await UpdateOMDBKey(key);
                                    if (response.success) {
                                        setKeySubmissionStatusMessage("API key updated successfully.");
                                        setSettings({ ...settings, hasApiKey: true });
                                    }

                                    else {
                                        setKeySubmissionStatusMessage("Failed to update API key: " + response.errorMessage);
                                    }
                                }

                                else {
                                    setError(true);
                                }
                            }}
                            extraClassNames={"bg-blue-500 text-white hover:bg-blue-400 dark:hover:bg-blue-600\
                                    transition-all duration-300 ease-in-out ml-4"}
                        />
                    </div>
                )}
            </div>
            {/** Reset DB button */}
            <div
                className={divClasses + "border-b"}
            >
                <h2
                    className={"text-lg font-semibold dark:text-gray-400 text-gray-800"}
                >
                    Reset the DB
                </h2>
                <RoundedButton
                    onClick={() => setDeleteDBModalVisible(true)}
                    extraClassNames={"bg-red-500"}
                    text={"Reset database"}
                />
            </div>
            {/** Delete key confirm modal */}
            {deleteKeyModalVisible && <ConfirmModal
                title={"Delete API key"}
                message={"Are you sure you want to delete your API key? This action cannot be undone."}
                onClose={() => setDeleteKeyModalVisible(false)}
                onConfirm={async () => {
                    keyRef.current = "";
                    setDeleteKeyModalVisible(false);
                    const response = await DeleteAPIKey();
                    if (response.success) {
                        setSettings({ ...settings, hasApiKey: false });
                        setDeletionStatusMessage("API key deleted successfully.");
                    }

                    else {
                        setDeletionStatusMessage("Failed to delete API key: " + response.errorMessage);
                    }
                }}
            />}
            {/** Deletion status message */}
            {deletionStatusMessage !== "" && <InfoModal
                title={"API Key Deletion Status"}
                message={deletionStatusMessage}
                onClose={() => setDeletionStatusMessage("")}
            />}
            {/** Key submission status message */}
            {keySubmissionStatusMessage !== "" && <InfoModal
                title={"API Key Submission Status"}
                message={keySubmissionStatusMessage}
                onClose={() => setKeySubmissionStatusMessage("")}
            />}
            {/** Clear DB popup */}
            {deleteDBModalVisible && <ConfirmModal
                title={"Reset Database"}
                message={"Are you sure you want to reset the database? This cannot be undone."}
                onClose={() => setDeleteDBModalVisible(false)}
                onConfirm={async () => {
                    await ResetDatabase();
                    setSettings({
                        darkMode: settings.darkMode,
                        hasApiKey: false,
                        tvShowProgressInEpisodes: settings.tvShowProgressInEpisodes,
                        showMarkdownPreview: settings.showMarkdownPreview,
                        showExternalImages: settings.showExternalImages,
                    })
                    setDeleteDBModalVisible(false);
                }}
            />}
        </div>
    );
}