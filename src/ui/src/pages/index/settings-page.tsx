import SettingsContext from "context/settings-context";
import { useContext, useRef } from "react";
import Toggle from "components/buttons/toggle";
import Settings from "@shared/interface/models/settings";
import classNames from "classnames";
import RoundedButton from "components/buttons/rounded-button";

export default function SettingsPage() {
    // Current settings
    const { settings, setSettings } = useContext(SettingsContext);

    // Used for all divs here
    const divClasses = "flex w-full items-center justify-between space-x-7 p-4 h-20\
    shadow-sm border-t border-x border-gray-200 dark:border-gray-700";

    // The little gray text
    const apiKeyMessage = settings.hasApiKey ? "Your api key is set!" :
    "Will enable you to fill movie/show data automatically using the IMDP API."

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
                    onChange={(checked: boolean) => setSettings({ ...settings, darkMode: checked })}
                />
            </div>
            {/** IMDB API key */}
            <div
                className={divClasses}
            >
                <h2
                    className={"text-lg font-semibold text-gray-800 dark:text-gray-400"}
                >
                    IMDB API Key
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
                </span>
                {settings.hasApiKey ? (
                    // Todo add modal for confirm here at least
                    <RoundedButton
                    text={"Remove API key"}
                    onClick={() => setSettings({ ...settings, hasApiKey: false })}
                    extraClassNames={"bg-red-500 text-white hover:bg-red-400 dark:hover:bg-red-600 transition-all duration-300 ease-in-out"}
                    />
                ) : (
                    <div
                        className={"flex items-center justify-start h-full"}
                    >
                        <input
                        type={"text"}
                        placeholder={"Enter your IMDB API key..."}
                        defaultValue={settings.hasApiKey || ""}
                        onChange={(event) => keyRef.current = event.target.value}
                        className={"w-70 h-10 p-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700\
                            dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400\
                            transition-all duration-300 ease-in-out"}
                        />
                        <RoundedButton
                            text={"Submit"}
                            onClick={async () => {
                                const key = keyRef.current.trim();
                                if (key && key !== "") {
                                    setSettings({ ...settings, hasApiKey: true });
                                    await Promise.resolve(); // todo add update here
                                }

                                // Todo redden the input field here
                                else {
                                    alert("Please enter a valid API key.");
                                }
                            }}
                            extraClassNames={"bg-blue-500 text-white hover:bg-blue-400 dark:hover:bg-blue-600\
                                    transition-all duration-300 ease-in-out ml-4"}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}