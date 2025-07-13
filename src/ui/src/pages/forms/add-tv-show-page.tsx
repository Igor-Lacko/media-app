import { useEffect, useRef, useState } from "react";

import TvShow from "@shared/interface/models/tv-show";
import Season from "@shared/interface/models/season";
import Episode from "@shared/interface/models/episode";
import { defaultTvShow } from "utils/other/model-defaults";
import { defaultSeason } from "utils/other/model-defaults";
import { defaultEpisode } from "utils/other/model-defaults";
import FormLayout from "layouts/form-layout";
import TvShowSubmitHandler from "data/submit-handlers/tv-show-submit";
import FormSection from "components/sections/form-section";
import InputOption from "components/options/input-option";
import TextAreaOption from "components/options/text-area-option";
import DropdownCheckboxOption from "components/options/dropdown-checkbox-option";
import useGenreDropdown from "hooks/use-genre-dropdown";
import useRatingSlider from "hooks/use-rating-slider";
import SliderOption from "components/options/slider-option";
import AddOption from "components/options/add-option";
import RemoveOption from "components/options/remove-option";
import FileBrowseOption from "components/options/file-browse-option";
import { RemoveEpisodeFromShowFilter } from "utils/form-remove-functions/remove-episode-filter";
import RemoveSeasonFilter from "utils/form-remove-functions/remove-season-filter";
import useFetchById from "hooks/use-fetch-by-id";
import LoadingPage from "pages/other/loading-page";

/**
 * Form page for adding a new TV show.
 * Can also be used to edit an existing TV show, this is done by passing a `tvshow` prop.
 * @param tvshow Optional TV show object to pre-fill the form.
 */
export default function AddTvShowPage({ route } : { route?: any }) {
    // Get TV show or use a blank one
    const {model: tvshow, isLoading} = useFetchById<TvShow>("/api/shows");

    // State for initial data and creating status
    const [initial, setInitial] = useState(tvshow || structuredClone(defaultTvShow));
    const [creating, setCreating] = useState(!tvshow);

    // Constructed TV show
    const tvShowRef = useRef<TvShow>(tvshow || structuredClone(defaultTvShow));

    // To re-render on each add
    const [seasons, setSeasons] = useState<Season[]>(initial.seasons);
    const [episodes, setEpisodes] = useState<Episode[]>(initial.seasons
        .flatMap(season => season.episodes)
    );
    const episodeCounterRef = useRef(episodes.length + 1);
    const seasonCounterRef = useRef(seasons.length + 1);

    // Still haven't found a better way to do this :((
    useEffect(() => {
        if (!tvshow) {
            setCreating(true);
            tvShowRef.current = structuredClone(defaultTvShow);
            episodeCounterRef.current = 1;
            seasonCounterRef.current = 1;
            setSeasons([]);
            setEpisodes([]);
            setInitial(structuredClone(defaultTvShow));
        } else {
            setCreating(false);
            tvShowRef.current = tvshow;
            episodeCounterRef.current = tvshow.seasons.flatMap(season => season.episodes).length + 1;
            seasonCounterRef.current = tvshow.seasons.length + 1;
            setSeasons(tvshow.seasons || []);
            setEpisodes(tvshow.seasons.flatMap(season => season.episodes) || []);
            setInitial(tvshow);
        }
    }, [tvshow, isLoading]);

    // Props
    const genreDropdownProps = useGenreDropdown(tvShowRef, initial.genres || []);
    const ratingSliderProps = useRatingSlider(tvShowRef, initial.rating || 0);

    if (isLoading) {
        return <LoadingPage />;
    }

    return (
        <FormLayout
            title={!creating ? "Edit TV Show" : "Add TV Show"}
            ref={tvShowRef}
            submitFunction={!creating ? async (tvShow: TvShow) => await TvShowSubmitHandler(tvShow, seasons, episodes, true, initial.identifier!)
                : async (tvShow: TvShow) => await TvShowSubmitHandler(tvShow, seasons, episodes, false)}
            errorModalMessage={"Please fill in all required fields."}
            successModalMessage={!creating ? "TV Show updated successfully." : "TV Show added successfully."}
        >
            <FormSection
                title={"Basic Information"}
            >
                <InputOption
                    title={"TV Show Title*"}
                    initial={initial.title!}
                    onChange={(value) => tvShowRef.current.title = value}
                />
                <TextAreaOption
                    title={"Short Description"}
                    initial={initial.shortDescription || ""}
                    onChange={(value) => tvShowRef.current.shortDescription = value}
                />
            </FormSection>
            <FormSection
                title={"Additional Information"}
            >
                <DropdownCheckboxOption
                    props={genreDropdownProps}
                    title={"Genres*"}
                />
                <SliderOption
                    props={ratingSliderProps}
                    title={"Rating"}
                />
                <FileBrowseOption
                    title={"Thumbnail Image"}
                    allowed={"image"}
                    initial={tvShowRef.current.thumbnailUrl || ""}
                    onChange={(value) => tvShowRef.current.thumbnailUrl = value}
                />
            </FormSection>
            <FormSection
                title={"Seasons"}
            >
                <AddOption
                    buttonText={"New Season"}
                    onChange={() => {setSeasons([...seasons, defaultSeason(seasonCounterRef.current++)])}}
                />
                {/** Nested once for seasons */}
                {seasons.map((season, index) => (
                    <FormSection
                        key={season.seasonNumber}
                        title={`Season ${index + 1}`}
                    >
                        <TextAreaOption
                            title={"Season short description"}
                            initial={season.shortDescription || ""}
                            onChange={(value) => season.shortDescription = value}
                        />
                        {/* The hook is probably unusable here */}
                        <SliderOption
                            title={"Season Rating"}
                            props={{
                                onChange: (value) => season.rating = value,
                                initial: season.rating || 0,
                                max: 10
                            }}
                        />
                        <RemoveOption
                            buttonText={"Remove Season"}
                            onChange={() => RemoveSeasonFilter(
                                season,
                                seasons,
                                setSeasons,
                                episodes,
                                setEpisodes,
                            )}
                        />
                        <FormSection
                            title={"Episodes"}
                            classNames={"border-none"}
                        >
                            <AddOption
                                buttonText={"New Episode"}
                                onChange={() => {setEpisodes([...episodes, defaultEpisode(episodeCounterRef.current++, season.seasonNumber)])}}
                            />
                            {/** Nested again for episodes */}
                            {episodes.filter(episode => episode.seasonNumber === season.seasonNumber).map((episode, episodeIndex) => (
                                <FormSection
                                    key={episode.episodeNumber}
                                    title={`Episode ${index + 1}.${episodeIndex + 1}`}
                                >
                                    <InputOption
                                        title={"Episode Title*"}
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
                                            max: 10
                                        }}
                                    />
                                    <FileBrowseOption
                                        title={"Episode Video File"}
                                        allowed={"video"}
                                        initial={episode.videoUrl || ""}
                                        onChange={(value) => episode.videoUrl = value}
                                    />
                                    <RemoveOption
                                        buttonText={"Remove Episode"}
                                        onChange={() => RemoveEpisodeFromShowFilter(
                                            episode,
                                            episodes,
                                            setEpisodes,
                                        )}
                                    />
                                </FormSection>
                            ))}
                        </FormSection>
                    </FormSection>
                ))}
            </FormSection>
        </FormLayout>
    );
}