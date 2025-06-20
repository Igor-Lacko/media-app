import { useState } from "react";
import classNames from "classnames";
import { Outlet } from "react-router-dom";
import { FaBars } from "react-icons/fa";

import ThemeContext from "context/theme-context";
import Theme from "utils/enum/theme";

import Sidebar from "components/sidebar/sidebar";


export default function MainPage() {
    const [theme, setTheme] = useState<Theme>(Theme.Light);
    const [sidebarVisible, setSidebarVisible] = useState(false);

    return (
        <ThemeContext
            value={{
                theme,
                setTheme
            }}
        >
            <div
                className={classNames(
                    "flex bg-white dark:bg-gray-800 h-screen w-screen",
                    {
                        "dark" : theme === Theme.Dark,
                        "light" : theme === Theme.Light,
                    }
                )}
            >
                {<Sidebar
                    visible={sidebarVisible}
                    onToggle={() => setSidebarVisible(!sidebarVisible)}
                />}
                <div
                    className={classNames(
                        "flex flex-grow items-center justify-center p-4 transition-all duration-500 ease-in-out",
                        {
                            "blur-sm" : sidebarVisible
                        }
                    )}
                >
                    <Outlet />
                </div>
                <div
                    className="flex w-1/25 h-full items-start pr-2 pt-4"
                >
                    <FaBars
                        className={classNames(
                            "text-black dark:text-gray-200 cursor-pointer h-1/20 transition-all duration-500 ease-in-out",
                            {
                                "blur-sm" : sidebarVisible,
                            }
                        )}
                        onClick={() => setSidebarVisible(true)}
                    />
                </div>
            </div>
        </ThemeContext>
    );
}