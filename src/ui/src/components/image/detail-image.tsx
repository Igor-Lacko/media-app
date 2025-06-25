export default function DetailImage({src, classNames} : {src: string, classNames? : string}) {
    return (
        <div
            className={"w-full ml-10 border-2 border-black-300 dark:border-gray-700 rounded-lg\
                overflow-hidden shadow-lg " + (classNames || "")}
        >
            <img
                src={src}
                alt="Detail"
                className={"w-full h-full object-fill rounded-lg shadow-md"}
            />
        </div>
    )
}