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
        case Genre.ROMANCE:
            return { key: "Romance", value: Genre.ROMANCE };
        case Genre.THRILLER:
            return { key: "Thriller", value: Genre.THRILLER };
        case Genre.FANTASY:
            return { key: "Fantasy", value: Genre.FANTASY };
        case Genre.MYSTERY:
            return { key: "Mystery", value: Genre.MYSTERY };
        case Genre.DOCUMENTARY:
            return { key: "Documentary", value: Genre.DOCUMENTARY };
        case Genre.ADVENTURE:
            return { key: "Adventure", value: Genre.ADVENTURE };
        case Genre.BIOGRAPHY:
            return { key: "Biography", value: Genre.BIOGRAPHY };
        case Genre.MUSICAL:
            return { key: "Musical", value: Genre.MUSICAL };
        case Genre.SPORT:
            return { key: "Sport", value: Genre.SPORT };
        case Genre.WAR:
            return { key: "War", value: Genre.WAR };
        case Genre.WESTERN:
            return { key: "Western", value: Genre.WESTERN };
        case Genre.CRIME:
            return { key: "Crime", value: Genre.CRIME };
    }
}