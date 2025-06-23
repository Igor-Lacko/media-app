/**
 * Returns a submit button component.
 * @param param0 Action to perform on click.
 */
export default function SubmitButton({onClick, title, classNames} : {onClick? : () => void, title : string, classNames? : string}) {
    return (
        <button
            type="submit"
            className={"flex justify-center items-center p-2 transition-all duration-300 ease-in-out\
                    bg-gray-300 dark:bg-gray-600 text-gray-400 rounded-lg cursor-pointer\
                    hover:bg-gray-500 dark:hover:bg-gray-500 text-lg  " + (classNames || "")}
            onClick={onClick}
        >
            {title}
        </button>
    );
}