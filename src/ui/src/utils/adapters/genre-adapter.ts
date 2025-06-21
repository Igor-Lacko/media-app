import Genre from "@shared/enum/genre";

/**
 * Adaps the genre enum to readable strings and returns a key(readable string) to value mapping.
 */
export default function GenreAdapter(genre : Genre) : { key: string, value: Genre } {
    switch (genre) {
        case Genre.ALL:
            return { key: "All", value: Genre.ALL };
        case Genre.ACTION:
            return { key: "Action", value: Genre.ACTION };
        case Genre.COMEDY:
            return { key: "Comedy", value: Genre.COMEDY };
        case Genre.DRAMA:
            return { key: "Drama", value: Genre.DRAMA };
        case Genre.HORROR:
            return { key: "Horror", value: Genre.HORROR };
        case Genre.SCIFI:
            return { key: "Sci-Fi", value: Genre.SCIFI };
    }
}