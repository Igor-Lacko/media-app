import { FaPlay } from "react-icons/fa";

export default function PlayButton({ onClick, extraClassNames }: {onClick: () => void, extraClassNames?: string;}) {
    return (
        <div
            className={"flex items-center justify-center rounded-lg bg-purple-500 dark:bg-purple-700\
                hover:bg-purple-600 text-gray-200 dark:text-gray-300 cursor-pointer\
                transition-colors duration-200 ease-in-out transform hover:scale-105\
                text-lg " + (extraClassNames || "")}
            onClick={onClick}
        >
            Play
            <FaPlay
                className={"ml-2"}
            />
        </div>
    )
}