import Movie from "@shared/interface/models/movie";
import TvShow from "@shared/interface/models/tv-show";

/**
 * Interface for a card component that displays a movie or TV show.
 * Used in favorites for now.
 */
export default interface CardProps {
	// Model itself
	model: Movie | TvShow;

	// Navigates to the model's detail page
	url: string;

	// Extra class names for styling
	extraClassNames?: string;
}
