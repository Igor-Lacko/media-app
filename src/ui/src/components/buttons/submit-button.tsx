/**
 * Returns a submit button component.
 * @param param0 Title, optional class names, and onClick handler.
 */
export default function SubmitButton({title, classNames, onClick} : {title : string, classNames? : string, onClick? : () => void}) {
    return (
        <button
            className={"flex justify-center items-center p-2 transition-all duration-300 ease-in-out\
                bg-purple-800 dark:bg-purple-900 text-gray-200 rounded-lg cursor-pointer\
                hover:bg-purple-700 dark:hover:bg-purple-700 text-lg " + (classNames || "")}
            onClick={onClick}
        >
            {title}
        </button>
    );
}