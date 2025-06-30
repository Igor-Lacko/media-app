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
import { useState } from "react";
import VisibleModal from "utils/enum/visible-modal";
import { EditBarProps } from "utils/props/edit-bar-props";
import ConfirmModal from "components/modals/confirm-modal";
import Lecture from "@shared/interface/models/lecture";
import Subject from "@shared/interface/models/subject";
import SliderModal from "components/modals/slider-modal";
import EnumModal from "components/modals/enum-modal";
import WatchStatus from "@shared/enum/watch-status";
import watchStatusAdapter from "utils/adapters/watch-status-adapter";
import TextAreaModal from "components/modals/text-area-modal";

/**
 * Layout for a detail element.
 * @param props Detail properties including model, submedia, title, and display options.
 */
export default function DetailLayout<T extends DetailFillable>(props : DetailProps<T>) {
    const navigate = useNavigate();
    const [visibleModal, setVisibleModal] = useState(VisibleModal.NONE);

    // Edit bar props
    const editBarProps : EditBarProps = {
        // Add
        onAdd: props.addTitle ? () => navigate("add", { state: {
            id: props.model.identifier
        } }) : undefined,
        addTitle: props.addTitle,

        // Edit
        editTitle: props.editTitle,
        onEdit: props.editTitle ? () => navigate("edit", { state: {
            model: props.model,
        } }) : undefined,

        // Mark as favorite
        onMarkFavorite: props.markFavoriteFunction,
        
        // Rate
        onRate: () => setVisibleModal(VisibleModal.RATE),
        rateTitle: props.rateTitle,

        // Delete
        deleteTitle: props.deleteTitle,
        onDelete: () => setVisibleModal(VisibleModal.DELETE),

        // Set watch status
        onSetWatchStatus: props.watchStatus ? () => setVisibleModal(VisibleModal.WATCH_STATUS) : undefined,

        // Set description
        onSetDescription: props.description ? () => setVisibleModal(VisibleModal.DESCRIPTION) : undefined
    }

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
            {props.headerType === DetailHeaders.LECTURE && <LectureDetailHeader {...props} model={props.model as unknown as Lecture} />}
            {props.headerType === DetailHeaders.SUBJECT && <SubjectDetailHeader {...props} model={props.model as unknown as Subject} />}
            <EditBar
                {...editBarProps}
            />
            {/** Submedia list */}
            {props.listProps && <MediaItemList
                {...props.listProps}
            />}
            {/** Modals */}
            {/** 1. Delete modal */}
            {visibleModal === VisibleModal.DELETE && <ConfirmModal
                title={props.deleteTitle || "Delete"}
                message={`Are you sure you want to delete ${props.title}? This action cannot be undone.`}
                onConfirm={async () => {
                    props.deleteFunction && await props.deleteFunction();
                    setVisibleModal(VisibleModal.NONE);
                    navigate(-1);
                }}
                onClose={() => setVisibleModal(VisibleModal.NONE)}
            />}
            {/** 2. Rate modal */}
            {visibleModal === VisibleModal.RATE && props.rating !== undefined && <SliderModal
                title={props.rateTitle || "Rate"}
                onSelectRating={async (rating: number) => {
                    props.rateFunction && await props.rateFunction(rating);
                    setVisibleModal(VisibleModal.NONE);
                }}
                initialRating={props.rating}
                onClose={() => setVisibleModal(VisibleModal.NONE)}
            />}
            {/** 3. Watch status modal */}
            {visibleModal === VisibleModal.WATCH_STATUS && props.watchStatus && <EnumModal
                title={"Select Watch Status"}
                selectOptions={Object.values(WatchStatus).map((status) => {
                    return {
                        key: watchStatusAdapter(status),
                        value: status
                    }
                })}
                initialWatchStatus={{
                    key: watchStatusAdapter(props.watchStatus),
                    value: props.watchStatus
                }}
                onSelectWatchStatus={async (watchStatus: WatchStatus) => {
                    props.watchStatusFunction && await props.watchStatusFunction(watchStatus);
                    setVisibleModal(VisibleModal.NONE);
                }}
                onClose={() => setVisibleModal(VisibleModal.NONE)}
            />}
            {/** 4. Set description modal */}
            {visibleModal === VisibleModal.DESCRIPTION && props.description && <TextAreaModal
                title={"Set Description"}
                initialDescription={props.description}
                onSetDescription={async (description: string) => {
                    props.setDescriptionFunction && await props.setDescriptionFunction(description);
                    setVisibleModal(VisibleModal.NONE);
                }}
                onClose={() => setVisibleModal(VisibleModal.NONE)}
            />}
        </div>
    )
}