/**
 * The component that is displayed when a list has zero items.
 * Also used in place of thumbnails when they are not found.
 * @param param0 Title, message
 */
export default function ItemNotFound({ title, message }: { title:string; message: string }) {
    return (
        <div
            className={"flex flex-col items-center justify-center w-full h-full bg-gray-200 dark:bg-gray-800\
                text-gray-600 dark:text-gray-400"}
        >
            <div
                className={"flex items-center justify-start mb-4"}
            >
                <h1 
                    className={"text-2xl font-bold"}
                >
                    {title}
                </h1>
            </div>
            <p
                className={"text-lg text-center"}
            >
                {message}
            </p>
        </div>
    )
}