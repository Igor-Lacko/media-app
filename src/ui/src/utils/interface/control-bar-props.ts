/**
 * Interface for control bar properties. Has options that are on/off and enable various features.
 */
export interface ControlBarProps {
    title: string;
    genre: boolean;
    rating: boolean;
    numberOfEpisodes: boolean;
    numberOfSeasons: boolean;
    length: boolean;
    enableFavorites: boolean;
}

export default ControlBarProps;