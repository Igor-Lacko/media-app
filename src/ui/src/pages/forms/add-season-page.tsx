import Episode from "@shared/interface/models/episode";
import Season from "@shared/interface/models/season";
import useRatingSlider from "hooks/use-rating-slider";
import FormLayout from "layouts/form-layout";
import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { defaultSeason } from "utils/model-defaults";

/**
 * Form page for adding a new season to a TV show.
 * Can also be used to edit an existing season, this is done by passing a route param.
 * @param route Optional route parameter containing the season data to pre-fill the form.
 */
export default function AddSeasonPage({ route } : { route? : any}) {
    // Initial data, either get the tv show id as a param or use a default season
    const location = useLocation();
    const id = location.state.id || 1;
    const season = location.state.model || defaultSeason(1);

    // Constructed season
    const seasonRef = useRef<Season>(season);

    // State episodes to re-render on each add
    const [episodes, setEpisodes] = useState<Episode[]>(seasonRef.current.episodes);

    // Slider props
    const ratingSliderProps = useRatingSlider(seasonRef);

    return (
        <FormLayout
            title=
        >

        </FormLayout>
    )
}