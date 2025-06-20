import ControlBar from "components/control-bar";

/**
 * App movie page.
 * Displays a list of movies with control bar for filtering/sorting.
 */
export default function MoviePage() {
    const controlBarProps = {
        title: "Your movies",
        genre: true,
        rating: true,
        numberOfEpisodes: false,
        numberOfSeasons: false,
        length: true,
        enableFavorites: true
    };

    return (
        <div
            className={"flex w-full h-full flex-col items-center justify-center p-0 m-0"}
        >
            <ControlBar {...controlBarProps} />
            <div
                className={"flex flex-col w-full h-full p-4"}
            >

            </div>
        </div>
    );
}