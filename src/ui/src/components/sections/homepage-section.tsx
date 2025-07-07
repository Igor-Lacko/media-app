import HomepageSectionProps from "utils/props/other/homepage-section-props";

/**
 * Returns a section on the homepage with a title and children.
 * @param props Title, children, optional extra class names.
 */
export default function HomePageSection(props: HomepageSectionProps) {
    return <div
        className={"flex flex-col items-center justify-start w-full h-auto space-y-10 p-10 " + (props.extraClassNames || "")}
    >
        <div
            className={"flex w-full items-center justify-start px-15"}
        >
            <h1 className={"text-4xl font-semibold text-black dark:text-gray-400 mb-5"}>
                {props.title}
            </h1>
        </div>
        <div className={"flex w-full flex-col items-start h-auto justify-between"}>
            {props.children}
        </div>
    </div>
}