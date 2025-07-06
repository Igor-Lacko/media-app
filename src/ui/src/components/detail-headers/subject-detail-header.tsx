import Subject from "@shared/interface/models/subject";
import ProgressBar from "components/other/progress-bar";
import useProgressBar from "hooks/use-progress-bar";
import DetailProps from "utils/props/detail/detail-props";

/**
 * Header for a subject model's detail page.
 * @param props Detail properties including model, submedia, title, and display options.
 */
export default function SubjectDetailHeader(props: DetailProps<Subject>) {
    const progressBarProps = useProgressBar(props.model.lectures, "Lectures");

    return (
        <div
            className={"flex items-center justify-between w-full h-1/7 px-5"}
        >
            <div
                className={"flex flex-col w-5/10 h-full items-start justify-between py-3"}
            >
                <h1 className={"text-4xl font-extrabold text-black dark:text-gray-400 tracking-wide font-[Roboto]"}>
                    {props.title}
                </h1>
                <ProgressBar
                    {...{
                        ...progressBarProps,
                        extraClassNames: "h-15"
                    }}
                />
            </div>
        </div>
    );
}