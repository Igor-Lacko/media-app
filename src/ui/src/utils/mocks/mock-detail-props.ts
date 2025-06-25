import Genre from "@shared/enum/genre";
import DetailHeaders from "utils/enum/detail-headers";
import DetailProps from "utils/props/detail-props";

export default function MockDetailProps(): DetailProps {
    return {
        model: {
            identifier: 1,
            title: "Mock Title",
            description: "This is a mock description for testing purposes.",
            genres: [Genre.ACTION, Genre.ADVENTURE],
            rating: 4.5,
            thumbnailUrl: "https://m.media-amazon.com/images/M/MV5BNzkyNzk4OTEwNF5BMl5BanBnXkFtZTgwOTA3MTc3MTE@._V1_FMjpg_UX1000_.jpg",
        },
        title: "Mock Detail Title",
        hasThumbnail: true,
        hasGenres: true,
        hasDescription: true,
        canBeMarkedFavorite: true,
        playable: true,
        hasSubmedia: false,
        headerType: DetailHeaders.ENTERTAINMENT
    }
}