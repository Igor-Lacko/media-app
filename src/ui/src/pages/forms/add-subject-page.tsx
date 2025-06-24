import { useRef, useState } from "react";

import Subject from "@shared/interface/models/subject";
import Lecture from "@shared/interface/models/lecture";
import { defaultSubject } from "utils/model-defaults";
import { defaultLecture } from "utils/model-defaults";
import FormLayout from "layouts/form-layout";
import SubjectSubmitHandler from "data/submit-handlers/subject-submit";
import FormSection from "components/form-section";
import InputOption from "components/options/input-option";
import AddOption from "components/options/add-option";
import FileBrowseOption from "components/options/file-browse-option";
import RemoveOption from "components/options/remove-option";

/**
 * Form page for adding a new subject.
 */
export default function AddSubjectPage() {
    // Constructed subject
    const subjectRef = useRef<Subject>(defaultSubject);

    // To re-render on each add
    const [lectures, setLectures] = useState<Lecture[]>([]);

    return (
        <FormLayout
            title={"Add Subject"}
            ref={subjectRef}
            submitFunction={(subject : Subject) => SubjectSubmitHandler(subject, lectures)}
            errorModalMessage={"Please fill in all required fields."}
            successModalMessage={"Subject added successfully."}
        >
            <FormSection
                title={"Basic Information"}
            >
                <InputOption
                    title={"Subject name*"}
                    placeholder={"Enter subject name"}
                    onChange={(value) => subjectRef.current.title = value}
                />
            </FormSection>
            <FormSection
                title={"Lectures"}
            >
                <AddOption
                    buttonText={"New Lecture"}
                    onChange={() => setLectures([...lectures, defaultLecture()])}
                />
                {lectures.map((lecture, index) => (
                    <FormSection
                        key={index}
                        title={`Lecture ${index + 1}`}
                    >
                        <InputOption
                            title={"Lecture name*"}
                            placeholder={"Enter lecture name"}
                            onChange={(value) => lecture.title = value}
                        />
                        <FileBrowseOption
                            title={"Lecture video"}
                            onChange={(value) => lecture.videoUrl = value}
                        />
                        <RemoveOption
                            buttonText={"Remove Lecture"}
                            onChange={() => {setLectures(lectures.filter((_, i) => i !== index))}}
                        />
                    </FormSection>
                ))}
            </FormSection>
        </FormLayout>
    )
}