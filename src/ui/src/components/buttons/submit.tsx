/**
 * Returns a submit button component.
 * @param param0 Action to perform on click.
 */
export default function SubmitButton({title, classNames} : {title : string, classNames? : string}) {
    return (
        <button
            type="submit"
            className={"flex justify-center items-center p-2 transition-all duration-300 ease-in-out\
                bg-purple-800 dark:bg-purple-900 text-gray-200 rounded-lg cursor-pointer\
                hover:bg-purple-700 dark:hover:bg-purple-700 text-lg " + (classNames || "")}
        >
            {title}
        </button>
    );
}