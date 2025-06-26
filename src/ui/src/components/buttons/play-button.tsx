import { FaPlay } from "react-icons/fa";

export default function PlayButton({ onClick, title, extraClassNames }: {onClick: () => void, title?: string, extraClassNames?: string;}) {
    return (
        <div
            className={"flex items-center justify-center rounded-lg bg-purple-700 dark:bg-purple-800\
            hover:bg-purple-800 text-gray-200 p-2 dark:text-gray-100 cursor-pointer\
            transition-colors duration-200 ease-in-out transform hover:scale-105\
            text-lg " + (extraClassNames || "")}
            onClick={onClick}
        >
            {title && <span className={"text-lg"}>{title}</span>}
            <FaPlay
            className={title ? "ml-2" : ""}
            />
        </div>
    )
}