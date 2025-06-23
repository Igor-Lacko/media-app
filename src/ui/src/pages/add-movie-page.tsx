import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
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

/**
 * Form page for adding a new movie.
 */
export default function AddMoviePage() {
    // Go back
    const navigate = useNavigate();

    // Constructed object, do not want to render on every change
    const movieRef = useRef<Movie>({} as Movie);

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

    return (
        <div 
            className={"flex flex-col w-full h-full items-center justify-start overflow-x-hidden overflow-y-auto bg-white dark:bg-gray-800"}
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
                className={"flex flex-col w-full h-23/25 items-center justify-start"}
                onSubmit={(event) => {
                    event.preventDefault();
                    console.log("Form submitted");
                }}
            >
                <h2
                    className={"text-3xl w-full items-center justify-start p-5 font-semibold text-gray-700 dark:text-gray-400\
                            mb-0 mt-10 border-t border-gray-300 dark:border-gray-600"}
                >
                    Movie Details
                </h2>
                <InputOption
                    title={"Title"}
                    placeholder={"Enter movie title"}
                    onChange={(value) => movieRef.current.title = value}
                />
                <TextAreaOption
                    title={"Short Description"}
                    placeholder={"Enter a short description of the movie"}
                    onChange={(value) => movieRef.current.shortDescription = value}
                />
                <h2
                    className={"text-3xl w-full items-center justify-start p-5 font-semibold text-gray-700 dark:text-gray-400\
                            mb-0 mt-10"}
                >
                    Additional Information
                </h2>
                    <DropdownCheckboxOption
                        props={genreDropdownProps}
                        title={"Genres"}
                        extraClassNames={"mb-10"}
                    />
                    <SliderOption
                        props={ratingSliderProps}
                        title={"Rating"}
                    />
                <h2
                    className={"text-3xl w-full items-center justify-start p-5 font-semibold text-gray-700 dark:text-gray-400\
                            mb-0 mt-10"}
                >
                    Media Information
                </h2>
                <FileBrowseOption
                    title={"Thumbnail"}
                    onChange={(value) => movieRef.current.thumbnailUrl = value}
                />
            </form>
        </div>
    );
}