import { useState } from "react";
import classNames from "classnames";
import { Outlet } from "react-router-dom";

import Sidebar from "components/sidebar/sidebar";
import ThemeContext from "context/theme-context";
import Theme from "utils/enum/theme";

export default function MainPage() {
    const [isSidebarToggled, setSidebarToggled] = useState(false);
    const [theme, setTheme] = useState<Theme>(Theme.Light);

    return (
        <ThemeContext
            value={{
                theme,
                setTheme
            }}
        >
            <div
                className={classNames(
                    "flex bg-white dark:bg-gray-800 h-screen w-screen p-0",
                    {
                        "dark" : theme === Theme.Dark,
                        "light" : theme === Theme.Light
                    }
                )}
            >
                <Sidebar />
                <div
                    className={"flex flex-grow items-center justify-center w-6/7 p-4"}
                >
                    <Outlet />
                </div>
            </div>
        </ThemeContext>
    );
}