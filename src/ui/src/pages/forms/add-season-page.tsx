import Episode from "@shared/interface/models/episode";
import Season from "@shared/interface/models/season";
import FormSection from "components/other/form-section";
import AddOption from "components/options/add-option";
import FileBrowseOption from "components/options/file-browse-option";
import InputOption from "components/options/input-option";
import RemoveOption from "components/options/remove-option";
import SliderOption from "components/options/slider-option";
import TextAreaOption from "components/options/text-area-option";
import SubmitSeason from "data/submit-handlers/season-submit";
import useFetchById from "hooks/use-fetch-by-id";
import useRatingSlider from "hooks/use-rating-slider";
import FormLayout from "layouts/form-layout";
import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { RemoveEpisodeFromSeasonFilter } from "utils/filters/remove-episode-filter";
import { defaultEpisode, defaultSeason } from "utils/model-defaults";

/**
 * Form page for adding a new season to a TV show.
 * Can also be used to edit an existing season, this is done by passing a route param.
 * @param route Optional route parameter containing the season data to pre-fill the form.
 */
export default function AddSeasonPage({ route } : { route? : any}) {
    // Initial data, either get the tv show id as a param or use a default season
    const location = useLocation();
    const showId = location.state.id || 1;
    const season : Season | undefined = useFetchById<Season>("/api/seasons", "seasonId");
    const creating = !season;

    // Constructed season
    const seasonRef = useRef<Season>(season || defaultSeason(-1, showId));

    // State episodes to re-render on each add
    const [episodes, setEpisodes] = useState<Episode[]>(seasonRef.current.episodes);
    const counterRef = useRef(episodes.length + 1);

    // Slider props
    const ratingSliderProps = useRatingSlider(seasonRef);

    return (
        <FormLayout
            title={creating ? "Add Season" : "Edit Season"}
            ref={seasonRef}
            submitFunction={/** Doesn't need any validation */
                creating ? async (season: Season) => await SubmitSeason(season, false, episodes, showId) :
                async (season: Season) => await SubmitSeason(season, true, episodes)
            }
            errorModalMessage={"Please fill in all required fields."}
            successModalMessage={creating ? "Season added successfully." : "Season updated successfully."}
        >
            <FormSection
                title={"Season Information"}
            >
                <TextAreaOption
                    title={"Short Description"}
                    initial={seasonRef.current.shortDescription || ""}
                    onChange={(value) => seasonRef.current.shortDescription = value}
                />
                <SliderOption
                    props={ratingSliderProps}
                    title={"Rating"}
                />
            </FormSection>
            <FormSection
                title={"Episodes"}
            >
                <AddOption
                    buttonText={"New Episode"}
                    onChange={() => {setEpisodes([...episodes, defaultEpisode(counterRef.current++)])}}
                />
                {episodes.map((episode, index) => (
                    <FormSection
                        key={episode.episodeNumber}
                        title={`Episode ${index + 1}`}
                    >
                        <InputOption
                            title={"Episode Title *"}
                            initial={episode.title!}
                            onChange={(value) => episode.title = value}
                        />
                        <TextAreaOption
                            title={"Episode Short Description"}
                            initial={episode.shortDescription || ""}
                            onChange={(value) => episode.shortDescription = value}
                        />
                        <SliderOption
                            title={"Episode Rating"}
                            props={{
                                onChange: (value) => episode.rating = value,
                                initial: episode.rating || 0,
                                max: 10,
                            }}
                        />
                        <FileBrowseOption
                            title={"Episode Video File"}
                            extensions={[".mp4", ".mkv", ".avi", ".mov"]}
                            initial={episode.videoUrl || ""}
                            onChange={(value) => episode.videoUrl = value}
                        />
                        <RemoveOption
                            buttonText={"Remove Episode"}
                            onChange={() => RemoveEpisodeFromSeasonFilter(
                                episode,
                                episodes,
                                setEpisodes
                            )}
                        />
                    </FormSection>
                ))}
            </FormSection>
        </FormLayout>
    )
}