import { FaTags } from "react-icons/fa";
import GenreAdapter from "utils/adapters/genre-adapter";
import DropdownProps from "utils/props/dropdown-props";
import Genre from "@shared/enum/genre";
import SortKey from "@shared/enum/sort-key";

/**
 * Defines a hook for managing a genre dropdown component.
 * @param ref Reference to the constructed component.
 */
export default function useGenreDropdown<T extends { genres?: Genre[] }>(ref : React.RefObject<T>) : DropdownProps {
    const props : DropdownProps = {
        // Genre selection
        prefix: "Select",

        // Tags icon
        icon: <FaTags className={"text-gray-500 h-4 w-4"} />,

        // Without all (implicit)
        options: Object.values(Genre).filter((value : Genre) => value !== Genre.ALL)
            .map((value : Genre) => GenreAdapter(value)),

        // I guess it should suffice for all use cases?
        width: "w-1/8",

        // Insert/remove genre from the list
        onChange(value : Genre | SortKey) {
            // Is genre already checked ?
            ref.current.genres?.includes(value as Genre) ?

            // Yes, remove it
            ref.current.genres = ref.current.genres?.filter((genre) => genre !== value) :

            // No, add it
            ref.current.genres?.push(value as Genre);
        },

        // Select genres
        initialText: "genres",

        // Unused
        initialValue: Genre.ALL,

        // Initial genres
        initialSelections: ref.current.genres ? ref.current.genres.filter((genre) => genre !== Genre.ALL)
            : [],
    };

    return props;
}