import { FaVideo } from 'react-icons/fa';
import { FaHome } from 'react-icons/fa';
import { FaFilm } from 'react-icons/fa';
import { FaTv } from 'react-icons/fa';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { FaCog } from 'react-icons/fa';


import SidebarButton from 'components/buttons/sidebar-button';

/**
 * Returns a sidebar with buttons for switching between pages (and a dark mode toggle).
 */
export default function Sidebar() {
    return (
        <div
            className={"flex flex-col items-center bg-white dark:bg-gray-800 w-1/7 h-full border-r-2 border-gray-300 dark:border-gray-700"}
        >
            <div
                className={"flex w-full flex-col items-center justify-evenly border-b-2 border-b-gray-300 dark:border-b-gray-700 mb-2 h-1/5"}
            >
                <FaVideo
                    className={"text-purple-500 text-7xl font-bold"}
                />
                <span
                    className={"text-purple-500 text-5xl font-bold font-[lobster]"}
                >Media Player</span>
            </div>
            <div 
                className={"flex flex-col items-center p-2 w-full h-3/5"}
            >
                <SidebarButton
                    label={"Home"}
                    icon={<FaHome />}
                    link={"/home"}
                />
                <SidebarButton
                    label={"Movies"}
                    icon={<FaFilm />}
                    link={"/movies"}
                />
                <SidebarButton
                    label={"TV Shows"}
                    icon={<FaTv />}
                    link={"/tv-shows"}
                />
                <SidebarButton
                    label={"Lectures"}
                    icon={<FaChalkboardTeacher />}
                    link={"/lectures"}
                />
                <SidebarButton
                    label={"Settings"}
                    icon={<FaCog />}
                    link={"/settings"}
                />
            </div>
        </div>
    )
}