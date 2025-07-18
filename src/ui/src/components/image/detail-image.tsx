import ImagePathToURL from "utils/adapters/file-url-to-path";

export default function DetailImage({ src, classNames }: { src: string, classNames?: string }) {
    return (
        <img
            src={ImagePathToURL(src).path}
            alt="Detail"
            className={"size-110 ml-10 border-2 border-black dark:border-gray-700 rounded-lg\
            overflow-hidden shadow-lg object-fill " + (classNames || "")}
        />
    )
}