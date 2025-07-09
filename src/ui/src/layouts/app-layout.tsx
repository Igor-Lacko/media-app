import { useState, useEffect } from "react";
import classNames from "classnames";
import { Outlet } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useLocation } from "react-router-dom";

import SettingsContext from "context/settings-context";
import Sidebar from "components/other/sidebar";
import Settings from "@shared/interface/models/settings";
import { LoadSettings } from "data/crud/read";
import { useQuery } from "@tanstack/react-query";

/**
 * App layout component (sidebar and toggle, invisible in non-index pages).
 */
export default function AppLayout() {
    const [settings, setSettings] = useState<Settings>({darkMode: false});
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const location = useLocation();

    const { data: initialSettings, isLoading } = useQuery({
        queryKey: ["Settings"],
        queryFn: async () => await LoadSettings(),
    })

    useEffect(() => {
        if (initialSettings) {
            setSettings(initialSettings);
        }
    }, [initialSettings, isLoading]);

    const isIndexPage = ["/", "/movies", "/tv-shows", "/courses", "/settings"].some(
        (path) => location.pathname.endsWith(path) 
    );

    return (
        <SettingsContext
            value={{
                settings,
                setSettings,
            }}
        >
            <div
                className={classNames(
                    "flex bg-white flex-grow dark:bg-gray-800 h-screen w-full overflow-y-auto overflow-x-hidden",
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
                    className={"flex flex-col flex-grow h-full m-0 items-start justify-start space-y-2 w-full"}
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
                            "flex w-full flex-grow",
                            {
                                "blur-sm" : sidebarVisible,
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