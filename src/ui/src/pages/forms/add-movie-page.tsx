import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { FaTags } from "react-icons/fa";

import Movie from "@shared/interface/models/movie";
import InputOption from "components/options/input-option";
import TextAreaOption from "components/options/text-area-option";
import DropdownCheckboxOption from "components/options/dropdown-checkbox-option";
import Genre from "@shared/enum/genre";
import GenreAdapter from "utils/adapters/genre-adapter";
import SortKey from "@shared/enum/sort-key";
import SliderOption from "components/options/slider-option";
import DropdownProps from "utils/interface/props/dropdown-props";
import SliderProps from "utils/interface/props/slider-props";
import FileBrowseOption from "components/options/file-browse-option";
import SubmitButton from "components/buttons/submit";
import { defaultMovie } from "utils/model-defaults";
import FormSection from "components/form-section";
import ModalProps from "utils/interface/props/modal-props";
import Modal from "components/modal";
import SubmitMovie from "data/submit-handlers/movie-submit";

/**
 * Form page for adding a new movie.
 */
export default function AddMoviePage() {
    // To show the error modal
    const [error, setError] = useState(false);

    // To show the success modal
    const [success, setSuccess] = useState(false);

    // Go back
    const navigate = useNavigate();

    // Constructed object, do not want to render on every change
    const movieRef = useRef<Movie>(defaultMovie);

    // Props for genre selection dropdown
    const genreDropdownProps : DropdownProps = {
        // Select genres
        prefix: "Select",

        // Push left from the text
        icon: <FaTags className={"text-gray-500 h-4 w-4 ml-2"} />,

        // Without all (implicit)
        options: Object.values(Genre).filter((value : Genre) => value !== Genre.ALL).map((value : Genre) => GenreAdapter(value)),

        // Ig
        width: "w-1/8",

        // Insert/remove genre from the list
        onChange(value : Genre | SortKey) { movieRef.current.genres?.includes(value) ?
            movieRef.current.genres = movieRef.current.genres?.filter((genre) => genre !== value) :
            movieRef.current.genres?.push(value);},

        // Select genres
        initialText: "genres",

        // Unused
        initialValue: Genre.ALL
    }

    const ratingSliderProps : SliderProps = {
        onChange: (value) => movieRef.current.rating = value,
        max: 10,
        initial: 0
    }

    // Popup if a required field is missing
    const errorModalProps : ModalProps = {
        title: "Error",
        message: "Please fill in all required fields.",
        onClose: () => setError(false),
    }

    // Popup if the movie is added successfully
    const successModalProps : ModalProps = {
        title: "Success",
        message: "Movie added successfully.",
        onClose: () => {
            setSuccess(false);
            navigate(-1);
        },
    }

    return (
        <div 
            className={"flex flex-col w-full h-full items-center justify-start\
                    overflow-x-hidden overflow-y-auto bg-white dark:bg-gray-800"}
        >
            <div
                className={"flex items-center justify-start ml-10 mt-5 w-full h-1/25 sm:h-1/20"}
            >
                <FaArrowLeft
                    className={"text-gray-500 text-2xl cursor-pointer transition-all duration-300 ease-in-out"}
                    onClick={() => navigate(-1)}
                />
            </div>
            <div
                className={"flex items-center justify-center w-full h-1/25 mt-10 mb-5 p-2"}
            >
                <h1 className={"text-4xl font-bold text-gray-800 dark:text-gray-400"}>
                    New Movie
                </h1>
            </div>
            <form
                className={"flex flex-col w-full h-23/25 items-center justify-start space-y-10"}
                onSubmit={async (event) => {
                    event.preventDefault();
                    await SubmitMovie(movieRef.current) ? setSuccess(true) : setError(true);
                }}
            >
                <FormSection
                    title={"Basic Information"}
                >
                    <InputOption
                        title={"Title *"}
                        placeholder={"Enter movie title"}
                        onChange={(value) => movieRef.current.title = value}
                    />
                    <TextAreaOption
                        title={"Short Description"}
                        placeholder={"Enter a short description of the movie"}
                        onChange={(value) => movieRef.current.shortDescription = value}
                    />
                </FormSection>
                <FormSection
                    title={"Additional Information"}
                >
                    <DropdownCheckboxOption
                        props={genreDropdownProps}
                        title={"Genres *"}
                    />
                    <SliderOption
                        props={ratingSliderProps}
                        title={"Rating"}
                    />
                </FormSection>
                <FormSection
                    title={"Media Files"}
                >
                    <FileBrowseOption
                        title={"Thumbnail"}
                        onChange={(value) => movieRef.current.thumbnailUrl = value}
                    />
                    <FileBrowseOption
                        title={"Video File"}
                        onChange={(value) => movieRef.current.videoUrl = value}
                    />
                </FormSection>
                <div
                    className={"flex w-full items-center justify-between p-4 border-t border-gray-300 dark:border-gray-600"}
                >
                    <span
                        className={"text-gray-500 text-sm"}
                    >
                        Fields marked with * are required.
                    </span>
                    <SubmitButton
                        title={"Add Movie"}
                        classNames={"w-1/15 h-full"}
                    />
                </div>
            </form>
            {error && <Modal
                    {...errorModalProps}
                />    
            }
            {success && <Modal
                    {...successModalProps}
                />
            }
        </div>
    );
}