import Toggle from "components/buttons/toggle";

export default function ToggleOption({ title, checked, onChange, extraClassNames }: { title: string, checked: boolean, onChange: (checked: boolean) => void, extraClassNames?: string }) {
    return (
        <div
            className={"flex w-full items-center justify-start space-x-7 " + (extraClassNames || "")}
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