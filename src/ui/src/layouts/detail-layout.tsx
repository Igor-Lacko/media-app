import { FaArrowLeft } from "react-icons/fa"
import { useNavigate } from "react-router-dom";

import EntertainmentDetailHeader from "components/detail-headers/entertainment-detail-header";
import LectureDetailHeader from "components/detail-headers/lecture-detail-header";
import SubjectDetailHeader from "components/detail-headers/subject-detail-header";
import DetailHeaders from "utils/enum/detail-headers";
import DetailProps from "utils/props/detail-props";
import EditBar from "components/edit-bar";
import DetailFillable from "@shared/interface/detail-fillable";
import MediaItemList from "components/media-item-list";

/**
 * Layout for a detail element.
 * @param props Detail properties including model, submedia, title, and display options.
 */
export default function DetailLayout<T extends DetailFillable>(props : DetailProps<T>) {
    const navigate = useNavigate();
    return (
        <div
            className={"flex flex-col w-full h-full items-center justify-start overflow-x-hidden\
                    overflow-y-auto bg-white dark:bg-gray-800"}
        >
            <div
                className={"flex items-center justify-start ml-10 mt-5 w-full h-1/25 sm:h-1/20"}
            >
                <FaArrowLeft
                    className={"text-gray-500 text-2xl cursor-pointer"}
                    onClick={() => navigate(-1)}
                />
            </div>
            {props.headerType === DetailHeaders.ENTERTAINMENT && <EntertainmentDetailHeader{...props} />}
            {props.headerType === DetailHeaders.LECTURE && <LectureDetailHeader{...props} />}
            {props.headerType === DetailHeaders.SUBJECT && <SubjectDetailHeader{...props} />}
            <EditBar
                {...props.editBarProps}
            />
            {/** Submedia list */}
            {props.listProps && <MediaItemList
                {...props.listProps}
            />}    
        </div>
    )
}