export default function DetailImage({ src, classNames }: { src: string, classNames?: string }) {
    return (
        <img
            src={`file://${src}`}
            alt="Detail"
            className={"w-full ml-10 border-2 border-black dark:border-gray-700 rounded-lg\
            overflow-hidden shadow-lg object-fit " + (classNames || "")}
        />
    )
}