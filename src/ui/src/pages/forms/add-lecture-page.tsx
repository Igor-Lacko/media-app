import Lecture from "@shared/interface/models/lecture";
import FormSection from "components/sections/form-section";
import FileBrowseOption from "components/options/file-browse-option";
import InputOption from "components/options/input-option";
import SubmitLecture from "data/submit-handlers/lecture-submit";
import useFetchById from "hooks/use-fetch-by-id";
import FormLayout from "layouts/form-layout";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom"
import { defaultLecture } from "utils/other/model-defaults";
import LoadingPage from "pages/other/loading-page";

/**
 * Form page for adding a new lecture.
 * Can also be used to edit an existing lecture, this is done by passing a route param.
 * @param route Optional route parameter containing the lecture data to pre-fill the form.
 */
export default function AddLecturePage({ route }: { route?: any }) {
    // Initial data or the course that the lecture is for
    const location = useLocation();
    const courseId = location.state.id || -1;
    const { model: lecture, isLoading } = useFetchById<Lecture>("/api/lectures", "lectureId");

    // State for initial data and creating status
    const [initial, setInitial] = useState(lecture || { ...defaultLecture(-1, courseId) });
    const [creating, setCreating] = useState(!lecture);

    // Constructed lecture
    const lectureRef = useRef<Lecture>(lecture || defaultLecture(-1, courseId));

    useEffect(() => {
        if (!lecture) {
            setCreating(true);
            lectureRef.current = { ...defaultLecture(-1, courseId) }
            setInitial({ ...defaultLecture(-1, courseId) });
        } else {
            setCreating(false);
            lectureRef.current = lecture;
            setInitial(lecture);
        }
    }, [lecture, isLoading]);

    if (isLoading) {
        return <LoadingPage />;
    }

    return (
        <FormLayout
            title={!creating ? "Edit Lecture" : "Add Lecture"}
            ref={lectureRef}
            submitFunction={
                !creating ? async (lecture: Lecture) => await SubmitLecture(lecture, true)
                    : async (lecture: Lecture) => await SubmitLecture(lecture, false, courseId)
            }
            errorModalMessage={"Please fill in all required fields."}
            successModalMessage={!creating ? "Lecture updated successfully." : "Lecture added successfully."}
        >
            <FormSection
                title={"Lecture Information"}
            >
                <InputOption
                    title={"Lecture Title*"}
                    initial={initial.title}
                    onChange={(value) => lectureRef.current.title = value}
                />
                <FileBrowseOption
                    title={"Lecture video"}
                    allowed={"video"}
                    initial={initial.videoUrl || ""}
                    onChange={(value) => lectureRef.current.videoUrl = value}
                />
            </FormSection>
        </FormLayout>
    )
}