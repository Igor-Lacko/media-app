import Genre from "@shared/enum/genre";
import WatchStatus from "@shared/enum/watch-status";
import Movie from "@shared/interface/models/movie";
import DetailHeaders from "utils/enum/detail-headers";
import DetailProps from "utils/props/detail/detail-props";

export default function MockDetailProps(): DetailProps<Movie> {
    return {
        model: {
            identifier: 1,
            title: "Mock Title",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dapibus sit amet nibh ac rutrum. Pellentesque sollicitudin placerat eros quis facilisis. Vivamus varius sodales tellus, sit amet mattis tortor ultricies a. Vestibulum lacinia sem felis, mattis pellentesque justo aliquet at. Duis in dui elementum, sagittis enim a, posuere elit. Vestibulum rhoncus mi nec ex suscipit dictum at a purus. Vestibulum orci felis, efficitur in ex ac, viverra pulvinar metus.\
            Proin  neque ullamcorper non. Nam fringilla rhoncus ipsum a scelerisque. Cras non tristique arcu. Integer a leo ex. In a mattis ipsum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed ut feugiat mauris. Aliquam ipsum felis, efficitur nec nisl a, dignissim molestie erat. Proin elementum metus vitae lectus fringilla lacinia. Maecenas quis orci suscipit, blandit lectus non, luctus nisi. Ut ac enim auctor, tempor quam non, ullamcorper magna. Nullam aliquet rhoncus libero, sed egestas velit viverra sit amet. Duis eleifend sapien in nulla volutpat faucibus. Donec viverra sed velit vel dictum.",
            genres: [Genre.ACTION, Genre.ADVENTURE],
            rating: 4.5,
            length: 120,
            thumbnailUrl: "https://m.media-amazon.com/images/M/MV5BNzkyNzk4OTEwNF5BMl5BanBnXkFtZTgwOTA3MTc3MTE@._V1_FMjpg_UX1000_.jpg",
            watchStatus: WatchStatus.WATCHING
        },
        title: "Mock Detail Title",
        hasThumbnail: true,
        hasGenres: true,
        hasDescription: true,
        canBeMarkedFavorite: true,
        playable: true,
        headerType: DetailHeaders.ENTERTAINMENT,
        hasWatchStatus: true,
        editBarProps: {
            editTitle: "Edit",
            onEdit: () => console.log("Edit clicked"),
            deleteTitle: "Delete",
            onDelete: () => console.log("Delete clicked"),
            hasMarkFavorite: true,
            onMarkFavorite: () => console.log("Mark favorite clicked"),
            rateTitle: "Rate",
            onRate: () => console.log("Rate clicked"),
            onSetWatchStatus: () => console.log("Set watch status clicked")
        }
    }
}