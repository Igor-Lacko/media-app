import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

import Subject from "@shared/interface/models/subject";
import { defaultSubject } from "utils/model-defaults";

export default function AddSubjectPage() {
    // Go back
    const navigate = useNavigate();

    // Constructed subject
    const subjectRef = useRef<Subject>({} as Subject);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">Add Subject</h1>
            <p className="text-gray-600">This page is under construction.</p>
            <p className="text-gray-600">Please check back later.</p>
        </div>
    );
}