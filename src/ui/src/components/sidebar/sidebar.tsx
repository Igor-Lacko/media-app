import classNames from 'classnames';
import { useState, useEffect } from 'react';
import { FaVideo } from 'react-icons/fa';
import { FaHome } from 'react-icons/fa';
import { FaFilm } from 'react-icons/fa';
import { FaTv } from 'react-icons/fa';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { FaCog } from 'react-icons/fa';

import SidebarButton from 'components/buttons/sidebar-button';

/**
 * Returns a sidebar with buttons for switching between pages (and a dark mode toggle).
 * Inspired by https://luigicavalieri.com/blog/build-retractable-sidebar-with-react-css/
 */
export default function Sidebar({ visible, onToggle }: { visible: boolean; onToggle: () => void }) {
    const [isVisible, setIsVisible] = useState(false);

    // Intermediate between render
    useEffect(() => {
        if(visible) {
            setIsVisible(true);
        }
    });

    // Set in parent too
    const handleToggle = () => {
        setIsVisible(!isVisible);
        onToggle();
    }

    return (
        <div
                className={classNames(
                    "flex z-50 flex-col items-center bg-white w-1/7 dark:bg-gray-800 h-full border-r-2 border-gray-300 dark:border-gray-700 transition-transform duration-500 ease-in-out",
                    {
                        "translate-x-0" : isVisible,
                        "-translate-x-full" : !isVisible,
                    }
                )}
            >
                <div
                    className={"flex w-full flex-col items-center space-y-2 pt-5 border-b-2 border-b-gray-300 dark:border-b-gray-700 mb-2 h-4/20"}
                >
                    <div
                        className={"flex items-center justify-end w-full"}
                    >
                        <FaVideo
                            className={"text-purple-500 lg:text-7xl w-full md:text-md sm:text-sm font-bold justify-center"}
                        />
                    </div>
                    <span
                        className={"text-purple-500 lg:text-5xl md:text-md sm:text-sm font-bold font-[lobster]"}
                    >Media Player</span>
                </div>
                <div 
                    className={"flex flex-col items-center p-2 w-full h-15/20"}
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
                <div 
                    className={"flex items-center justify-center w-full h-1/20 border-t-2 border-gray-300 dark:border-gray-700"}
                >
                    <button
                        className={"flex w-full h-full items-center justify-center cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-500 text-black dark:text-gray-200 p-2"}
                        onClick={() => { handleToggle(); }}
                    >
                        Hide Sidebar
                    </button>
                </div>
            </div>
    );
}