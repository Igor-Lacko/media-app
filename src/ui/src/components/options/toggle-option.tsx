import Toggle from "components/toggle";

export default function ToggleOption({ title, checked, onChange, extraClassNames }: { title: string, checked: boolean, onChange: (checked: boolean) => void, extraClassNames?: string }) {
    return (
        <div
            className={"flex w-full h-1/10 items-center justify-start space-x-7 p-4 rounded-lg\
                    shadow-md border border-gray-200 dark:border-gray-700 " + (extraClassNames || "")}
        >
            <span
                className={"text-lg flex font-semibold items-center h-full text-gray-800 dark:text-gray-400"}
            >
                {title}
            </span>
            <div
                className={"flex items-center justify-center h-full"}
            >
                <Toggle
                    checked={checked}
                    onChange={onChange}
                />
            </div>
        </div>
    )
} 