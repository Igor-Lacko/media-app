import { useState, useEffect } from "react";
import classNames from "classnames";
import { Outlet } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useLocation } from "react-router-dom";

import SettingsContext from "context/settings-context";
import Sidebar from "components/sidebar";
import Settings from "@shared/interface/models/settings";
import { LoadSettings } from "data/read";

/**
 * App layout component (sidebar and toggle, invisible in non-index pages).
 */
export default function MainPage() {
    const [settings, setSettings] = useState<Settings>({darkMode: false});
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const location = useLocation();

    const isIndexPage = ["/", "/movies", "/tv-shows", "/lectures", "/settings"].some(
        (path) => location.pathname.endsWith(path) 
    );

    useEffect(() => {
        const fetchSettings = async () => {
            const loadedSettings = await LoadSettings();
            setSettings(loadedSettings);
        };
        fetchSettings();
    }, []);

    return (
        <SettingsContext
            value={{
                settings,
                setSettings,
            }}
        >
            <div
                className={classNames(
                    "flex bg-white dark:bg-gray-800 h-screen w-screen overflow-y-hidden overflow-x-hidden",
                    {
                        "dark" : settings.darkMode,
                        "light" : !settings.darkMode,
                    }
                )}
            >
                {isIndexPage && <Sidebar
                    visible={sidebarVisible}
                    onToggle={() => setSidebarVisible(!sidebarVisible)}
                />}
                <div
                    className={classNames(
                        "flex flex-col flex-grow h-full m-0 items-start justify-start space-y-2",
                        {
                            "w-6/7": isIndexPage,
                            "w-full": !isIndexPage
                        }
                    )}
                >
                    {isIndexPage && <div
                        className="flex w-full h-1/25 sm:h-1/20 items-center justify-end pt-4 pr-4"
                    >
                        <FaBars
                            className={classNames(
                                "text-black dark:text-gray-200 h-full w-1/25 transition-all duration-500 ease-in-out p-0",
                                {
                                    "blur-sm" : sidebarVisible,
                                    "cursor-pointer" : !sidebarVisible
                                }
                            )}
                            onClick={() => setSidebarVisible(true)}
                        />
                    </div>}
                    <div
                        className={classNames(
                            "flex grow min-w-screen items-start justify-center transition-all duration-500 ease-in-out",
                            {
                                "blur-sm" : sidebarVisible,
                                "mt-10": isIndexPage,
                                "h-24/25": isIndexPage,
                                "min-h-screen": !isIndexPage
                            }
                        )}
                    >
                        <Outlet />
                    </div>
                </div>
            </div>
        </SettingsContext>
    );
}