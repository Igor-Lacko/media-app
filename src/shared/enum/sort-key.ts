/**
 * Enum of values which can be used to sort media items.
 */
export enum SortKey {
    NAME = "title",
    LENGTH = "length",
    RATING = "rating",
    NOF_EPISODES = "numberOfEpisodes",
    NOF_SEASONS = "numberOfSeasons",
    NOF_LECTURES = "numberOfLectures" // Same as nofEpisodes, but for the name.
}

export default SortKey;