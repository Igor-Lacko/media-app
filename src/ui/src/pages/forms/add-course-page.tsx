import { useEffect, useRef, useState } from "react";

import Course from "@shared/interface/models/course";
import { defaultCourse } from "utils/other/model-defaults";
import { defaultLecture } from "utils/other/model-defaults";
import FormLayout from "layouts/form-layout";
import CourseSubmitHandler from "data/submit-handlers/course-submit";
import FormSection from "components/sections/form-section";
import InputOption from "components/options/input-option";
import AddOption from "components/options/add-option";
import FileBrowseOption from "components/options/file-browse-option";
import RemoveOption from "components/options/remove-option";
import RemoveLectureFilter from "utils/form-remove-functions/remove-lecture-filter";
import useFetchById from "hooks/use-fetch-by-id";
import LoadingPage from "pages/other/loading-page";

/**
 * Form page for adding a new course.
 * Can also be used to edit an existing course, this is done by passing a `course` prop.
 * @param Course Optional course object to pre-fill the form.
 */
export default function AddCoursePage({ route } : { route?: any }) {
    // Get param course or use a blank one
    const {model: course, isLoading} = useFetchById<Course>("/api/courses");

    // State for initial data and creating status
    const [initial, setInitial] = useState(course || structuredClone(defaultCourse));
    const [creating, setCreating] = useState(!course);

    // Constructed course
    const courseRef = useRef<Course>(course || structuredClone(defaultCourse));

    // To re-render on each add
    const [lectures, setLectures] = useState(initial.lectures);
    const counterRef = useRef(lectures.length + 1); 

    useEffect(() => {
        if (!course) {
            setCreating(true);
            courseRef.current = structuredClone(defaultCourse);
            counterRef.current = 1;
            setLectures([]);
            setInitial(structuredClone(defaultCourse));
        } else {
            setCreating(false);
            courseRef.current = course;
            counterRef.current = course.lectures.length + 1;
            setLectures(course.lectures || []);
            setInitial(course);
        }
    }, [course, isLoading]);

    if (isLoading) {
        return <LoadingPage />;
    }

    return (
        <FormLayout
            title={!creating ? "Edit Course" : "Add Course"}
            ref={courseRef}
            submitFunction={!creating ? async (course: Course) => await CourseSubmitHandler(course, lectures, true, course.identifier!)
                : async (course: Course) => await CourseSubmitHandler(course, lectures, false)}
            errorModalMessage={"Please fill in all required fields."}
            successModalMessage={!creating ? "Course updated successfully." : "Course added successfully."}
        >
            <FormSection
                title={"Basic Information"}
            >
                <InputOption
                    title={"Course name*"}
                    initial={initial.title!}
                    onChange={(value) => courseRef.current.title = value}
                />
            </FormSection>
            <FormSection
                title={"Lectures"}
            >
                <AddOption
                    buttonText={"New Lecture"}
                    onChange={() => {setLectures([...lectures, defaultLecture(counterRef.current++)])}}
                />
                {lectures.map((lecture, index) => (
                    <FormSection
                        key={lecture.lectureNumber}
                        title={`Lecture ${index + 1}`}
                    >
                        <InputOption
                            title={"Lecture name*"}
                            initial={lecture.title!}
                            onChange={(value) => lecture.title = value}
                        />
                        <FileBrowseOption
                            title={"Lecture video"}
                            allowed={"video"}
                            initial={lecture.videoUrl || ""}
                            onChange={(value) => lecture.videoUrl = value}
                        />
                        <RemoveOption
                            buttonText={"Remove Lecture"}
                            onChange={() => RemoveLectureFilter(
                                lecture,
                                lectures,
                                setLectures,
                            )}
                        />
                    </FormSection>
                ))}
            </FormSection>
        </FormLayout>
    )
}