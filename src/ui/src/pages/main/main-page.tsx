import { useState } from "react";
import Sidebar from "components/sidebar/sidebar";

export default function MainPage() {
    const [isSidebarToggled, setSidebarToggled] = useState(false);
    return (
        <div
            className={"flex bg-white dark:bg-gray-800 h-screen w-screen p-0"}
        >
            <Sidebar />
            <div
                className={"flex flex-grow items-center justify-center w-6/7 p-4"}
            >
            </div>
        </div>
    );
}