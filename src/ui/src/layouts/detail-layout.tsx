import { FaArrowLeft } from "react-icons/fa"
import { useNavigate } from "react-router-dom";

import EntertainmentDetailHeader from "components/detail-headers/entertainment-detail-header";
import LectureDetailHeader from "components/detail-headers/lecture-detail-header";
import CourseDetailHeader from "components/detail-headers/course-detail-header";
import DetailHeaders from "utils/enum/detail-headers";
import DetailProps from "utils/props/detail/detail-props";
import EditBar from "components/controls/edit-bar";
import DetailFillable from "@shared/interface/detail-fillable";
import MediaItemList from "components/lists/media-item-list";
import { useState } from "react";
import VisibleModal from "utils/enum/visible-modal";
import { EditBarProps } from "utils/props/control-elements/edit-bar-props";
import ConfirmModal from "components/modals/confirm-modal";
import Lecture from "@shared/interface/models/lecture";
import Course from "@shared/interface/models/course";
import SliderModal from "components/modals/slider-modal";
import EnumModal from "components/modals/enum-modal";
import WatchStatus from "@shared/enum/watch-status";
import watchStatusAdapter from "utils/adapters/watch-status-adapter";
import TextAreaModal from "components/modals/text-area-modal";
import SeasonDetailHeader from "components/detail-headers/season-detail-header";
import Season from "@shared/interface/models/season";
import EpisodeDetailHeader from "components/detail-headers/episode-detail-header";
import Episode from "@shared/interface/models/episode";
import { IsValidVideo } from "electron/electron-api";
import FileBrowseModal from "components/modals/file-browse-modal";
import MarkdownModal from "components/modals/markdown-modal";

/**
 * Layout for a detail element.
 * @param props Detail properties including model, submedia, title, and display options.
 */
export default function DetailLayout<T extends DetailFillable>(props: DetailProps<T>) {
    const navigate = useNavigate();
    const [visibleModal, setVisibleModal] = useState(VisibleModal.NONE);

    // Edit bar props
    const editBarProps: EditBarProps = {
        // Add
        onAdd: props.addTitle ? () => navigate("add", {
            state: {
                id: props.model.identifier
            }
        }) : undefined,
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
        isFavorite: props.isFavorite,

        // Toggle watchlist
        onToggleWatchlist: props.toggleWatchListFunction,
        isInWatchlist: props.inWatchlist,

        // Rate
        onRate: () => setVisibleModal(VisibleModal.RATE),
        rateTitle: props.rateTitle,

        // Delete
        deleteTitle: props.deleteTitle,
        onDelete: () => setVisibleModal(VisibleModal.DELETE),

        playTitle: props.playTitle,
        onPlay: props.playTitle ? async () => {
            if (!props.videoUrl?.current) {
                setVisibleModal(VisibleModal.PLAY_NOFILE);
                return;
            }

            if (await IsValidVideo(props.videoUrl.current)) {
                navigate("play")
                return;
            }

            setVisibleModal(VisibleModal.PLAY_WRONG_FILE);
        } : undefined,

        // Set watch status
        onSetWatchStatus: props.watchStatus ? () => setVisibleModal(VisibleModal.WATCH_STATUS) : undefined,

        // Set description
        onSetDescription: props.setDescriptionFunction ? () => setVisibleModal(VisibleModal.DESCRIPTION)
            : undefined,

        // Mark submedia as completed
        markSubmediaAsCompletedTitle: props.markSubmediaAsCompletedTitle,
        onCompleteSubmedia: props.completeSubmediaFunction ?  () => setVisibleModal(VisibleModal.MARK_SUBMEDIA_AS_COMPLETED)
            : undefined,

        // Open notes modal
        onAddNote: props.addNoteFunction ? () => setVisibleModal(VisibleModal.ADD_NOTE) : undefined
    }

    return (
        <div
            className={"flex flex-col w-full max-h-screen items-center justify-start overflow-x-hidden\
                    overflow-y-hidden bg-white dark:bg-gray-800"}
        >
            <div
                className={"flex items-center justify-start ml-10 mt-5 w-full h-1/25 sm:h-1/20"}
            >
                <FaArrowLeft
                    className={"text-gray-500 text-2xl cursor-pointer"}
                    onClick={() => navigate(props.backUrl)}
                />
            </div>
            {props.headerType === DetailHeaders.ENTERTAINMENT && <EntertainmentDetailHeader{...props} />}
            {props.headerType === DetailHeaders.LECTURE && <LectureDetailHeader {...props} model={props.model as unknown as Lecture} />}
            {props.headerType === DetailHeaders.COURSE && <CourseDetailHeader {...props} model={props.model as unknown as Course} />}
            {props.headerType === DetailHeaders.SEASON && <SeasonDetailHeader {...props} model={props.model as unknown as Season} />}
            {props.headerType === DetailHeaders.EPISODE && <EpisodeDetailHeader {...props} model={props.model as unknown as Episode} />}
            <EditBar
                {...editBarProps}
            />
            {/** Submedia list */}
            {props.listProps && <MediaItemList
                {...props.listProps}
            />}

            {/** Other children */}
            {props.children}

            {/** Modals */}
            {/** 1. Delete modal */}
            {visibleModal === VisibleModal.DELETE && <ConfirmModal
                title={props.deleteTitle || "Delete"}
                message={`Are you sure you want to delete ${props.title}? This action cannot be undone.`}
                onConfirm={async () => {
                    props.deleteFunction && await props.deleteFunction();
                    setVisibleModal(VisibleModal.NONE);
                    navigate(props.backUrl);
                }}
                onClose={() => setVisibleModal(VisibleModal.NONE)}
            />}
            {/** 2. Rate modal */}
            {visibleModal === VisibleModal.RATE && props.rateFunction !== undefined && props.rateFunction !== null && <SliderModal
                title={props.rateTitle || "Rate"}
                onSliderEnter={async (rating: number) => {
                    props.rateFunction && await props.rateFunction(rating);
                    setVisibleModal(VisibleModal.NONE);
                }}
                initialValue={props.rating && props.rating > 0 ? props.rating : 0}
                maxValue={10}
                onClose={() => setVisibleModal(VisibleModal.NONE)}
            />}
            {/** 3. Watch status modal */}
            {visibleModal === VisibleModal.WATCH_STATUS && props.watchStatus && <EnumModal
                title={"Select Watch Status"}
                selectOptions={props.watchStatusOptions!.map((status) => {
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
            {visibleModal === VisibleModal.DESCRIPTION && <TextAreaModal
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
                initialText={props.videoUrl?.current || ""}
                allowed={"video"}
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
                initialText={props.videoUrl?.current || ""}
                allowed={"video"}
                onSetText={async (videoUrl: string) => {
                    props.setVideoUrlFunction && await props.setVideoUrlFunction(videoUrl);
                    setVisibleModal(VisibleModal.NONE);
                }}
                onClose={() => setVisibleModal(VisibleModal.NONE)}
            />}
            {/** 7. Add note modal */}
            {visibleModal === VisibleModal.ADD_NOTE && props.addNoteFunction && <MarkdownModal
                title={"Add Note"}
                initialText={""}
                onSetText={async (note: string) => {
                    props.addNoteFunction && await props.addNoteFunction({ content: note });
                    setVisibleModal(VisibleModal.NONE);
                }}
                onClose={() => setVisibleModal(VisibleModal.NONE)}
            />}
            {/** 8. Complete submedia modal */}
            {visibleModal === VisibleModal.MARK_SUBMEDIA_AS_COMPLETED && props.completeSubmediaFunction && <SliderModal
                title={props.markSubmediaAsCompletedTitle || ""}
                message={"This will mark the first X submedia of this season as completed\
                        and the rest as not watched."}
                onSliderEnter={async (count: number) => {
                    props.completeSubmediaFunction && await props.completeSubmediaFunction((props.model as unknown as Season).identifier!, count);
                    setVisibleModal(VisibleModal.NONE);
                }}
                initialValue={
                    props.submedia
                        ?.filter((item) => item.watchStatus === WatchStatus.COMPLETED)
                        .length || 0
                }
                maxValue={props.submedia?.length || 0}
                jump={1}
                precision={-1}
                onClose={() => setVisibleModal(VisibleModal.NONE)}
            />}
        </div>
    )
}