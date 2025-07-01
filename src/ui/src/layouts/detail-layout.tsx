import { FaArrowLeft } from "react-icons/fa"
import { useNavigate } from "react-router-dom";

import EntertainmentDetailHeader from "components/detail-headers/entertainment-detail-header";
import LectureDetailHeader from "components/detail-headers/lecture-detail-header";
import SubjectDetailHeader from "components/detail-headers/subject-detail-header";
import DetailHeaders from "utils/enum/detail-headers";
import DetailProps from "utils/props/detail-props";
import EditBar from "components/controls/edit-bar";
import DetailFillable from "@shared/interface/detail-fillable";
import MediaItemList from "components/other/media-item-list";
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
import SeasonDetailHeader from "components/detail-headers/season-detail-header";
import Season from "@shared/interface/models/season";
import EpisodeDetailHeader from "components/detail-headers/episode-detail-header";
import Episode from "@shared/interface/models/episode";
import { IsValidFile } from "utils/electron-api";
import FileBrowseModal from "components/modals/file-browse-modal";

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
        onEdit: props.editTitle ? () => navigate("edit", {
            state: {
                id: props.model.identifier
            }
        }) : undefined,

        // Mark as favorite
        onMarkFavorite: props.markFavoriteFunction,
        
        // Rate
        onRate: () => setVisibleModal(VisibleModal.RATE),
        rateTitle: props.rateTitle,

        // Delete
        deleteTitle: props.deleteTitle,
        onDelete: () => setVisibleModal(VisibleModal.DELETE),

        // Play (will navigate to "/play" later)
        playTitle: props.playTitle,
        onPlay: props.playTitle ? async () => {
            if (!props.model.videoUrl) {
                setVisibleModal(VisibleModal.PLAY_NOFILE);
                return;
            }

            if (await IsValidFile(props.model.videoUrl)) {
                console.log("Playing video:", props.model.videoUrl);
                return;
            }

            setVisibleModal(VisibleModal.PLAY_WRONG_FILE);
        } : undefined,

        // Set watch status
        onSetWatchStatus: props.watchStatus ? () => setVisibleModal(VisibleModal.WATCH_STATUS) : undefined,

        // Set description
        onSetDescription: props.description !== null && props.description !== undefined ? () => setVisibleModal(VisibleModal.DESCRIPTION) 
        : undefined
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
            {props.headerType === DetailHeaders.SEASON && <SeasonDetailHeader {...props} model={props.model as unknown as Season} />}
            {props.headerType === DetailHeaders.EPISODE && <EpisodeDetailHeader {...props} model={props.model as unknown as Episode} />}
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
            {visibleModal === VisibleModal.RATE && props.rateFunction !== undefined && props.rateFunction !== null && <SliderModal
                title={props.rateTitle || "Rate"}
                onSelectRating={async (rating: number) => {
                    props.rateFunction && await props.rateFunction(rating);
                    setVisibleModal(VisibleModal.NONE);
                }}
                initialRating={props.rating && props.rating > 0 ? props.rating : 0}
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
            {visibleModal === VisibleModal.DESCRIPTION && props.description !== null && props.description !== undefined && <TextAreaModal
                title={"Set Description"}
                initialText={props.description}
                onSetText={async (description: string) => {
                    props.setDescriptionFunction && await props.setDescriptionFunction(description);
                    setVisibleModal(VisibleModal.NONE);
                }}
                onClose={() => setVisibleModal(VisibleModal.NONE)}
            />}
            {/** 5. No video file yet modal */}
            {visibleModal === VisibleModal.PLAY_NOFILE && <FileBrowseModal
                title={"Error: No video found"}
                message={`${props.title} does not have a video file associated with it yet. Please select a video file to play.`}
                initialText={props.model.videoUrl || ""}
                onSetText={async (videoUrl: string) => {
                    props.setVideoUrlFunction && await props.setVideoUrlFunction(videoUrl);
                    setVisibleModal(VisibleModal.NONE);
                }}
                onClose={() => setVisibleModal(VisibleModal.NONE)}
            />}
            {/** 6. Invalid video file modal */}
            {visibleModal === VisibleModal.PLAY_WRONG_FILE && <FileBrowseModal
                title={"Error: Invalid video file"}
                message={`The video file for ${props.title} is invalid or does not exist. Please select a valid video file.`}
                initialText={props.model.videoUrl || ""}
                onSetText={async (videoUrl: string) => {
                    props.setVideoUrlFunction && await props.setVideoUrlFunction(videoUrl);
                    setVisibleModal(VisibleModal.NONE);
                }}
                onClose={() => setVisibleModal(VisibleModal.NONE)}
            />}
        </div>
    )
}