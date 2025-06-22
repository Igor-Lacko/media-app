
export default function SettingOption({title, component} : {title: string, component: React.ReactNode}) {
    return (
        <div
            className={"flex w-full h-1/10 items-center justify-between p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"}
        >
            <span
                className={"text-lg flex font-semibold items-center h-full text-gray-800 dark:text-gray-400"}
            >
                {title}
            </span>
            <div
                className={"flex items-center justify-center h-full"}
            >
                {component}
            </div>
        </div>
    )
} 