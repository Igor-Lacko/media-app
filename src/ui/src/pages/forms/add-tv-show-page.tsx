import { useRef, useState } from "react";

import TvShow from "@shared/interface/models/tv-show";
import Season from "@shared/interface/models/season";
import Episode from "@shared/interface/models/episode";
import { defaultTvShow } from "utils/model-defaults";
import { defaultSeason } from "utils/model-defaults";
import { defaultEpisode } from "utils/model-defaults";
import FormLayout from "layouts/form-layout";
import TvShowSubmitHandler from "data/submit-handlers/tv-show-submit";
import FormSection from "components/form-section";
import InputOption from "components/options/input-option";
import TextAreaOption from "components/options/text-area-option";
import DropdownCheckboxOption from "components/options/dropdown-checkbox-option";
import useGenreDropdown from "hooks/use-genre-dropdown";
import useRatingSlider from "hooks/use-rating-slider";
import SliderOption from "components/options/slider-option";
import AddOption from "components/options/add-option";
import RemoveOption from "components/options/remove-option";
import FileBrowseOption from "components/options/file-browse-option";

/**
 * Form page for adding a new TV show.
 */
export default function AddTvShowPage() {
    // Constructed TV show
    const tvShowRef = useRef<TvShow>(defaultTvShow);

    // To re-render on each add
    const [seasons, setSeasons] = useState<Season[]>([]);
    const [episodes, setEpisodes] = useState<Episode[]>([]);

    // Props
    const genreDropdownProps = useGenreDropdown(tvShowRef);
    const ratingSliderProps = useRatingSlider(tvShowRef);

    return (
        <FormLayout
            title={"Add TV Show"}
            ref={tvShowRef}
            submitFunction={(tvShow: TvShow) => TvShowSubmitHandler(tvShow, seasons, episodes)}
            errorModalMessage={"Please fill in all required fields."}
            successModalMessage={"TV show added successfully."}
        >
            <FormSection
                title={"Basic Information"}
            >
                <InputOption
                    title={"TV Show Title*"}
                    placeholder={"Enter TV show title"}
                    onChange={(value) => tvShowRef.current.title = value}
                />
                <TextAreaOption
                    title={"Short Description"}
                    placeholder={"Enter a short description of the TV show"}
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
            </FormSection>
            <FormSection
                title={"Seasons"}
            >
                <AddOption
                    buttonText={"New Season"}
                    onChange={() => {setSeasons([...seasons, defaultSeason()])}}
                />
                {/** Nested once for seasons */}
                {seasons.map((season, index) => (
                    <FormSection
                        key={index}
                        title={`Season ${index + 1}`}
                    >
                        <TextAreaOption
                            title={"Season short description"}
                            placeholder={"Enter a short description for the season"}
                            onChange={(value) => season.description = value}
                        />
                        {/* The hook is probably unusable here */}
                        <SliderOption
                            title={"Season Rating"}
                            props={{
                                onChange: (value) => season.rating = value,
                                initial: 0,
                                max: 10
                            }}
                        />
                        <RemoveOption
                            buttonText={"Remove Season"}
                            onChange={() => {
                                // Remove this season and it's episodes and decrement season numbers of all episodes after this one
                                setSeasons(seasons.filter((_, i) => i !== index));
                                setEpisodes(
                                    episodes.filter(episode => episode.seasonNumber !== index + 1)
                                    .map(
                                        episode => episode.seasonNumber > index + 1 ?
                                        {...episode, seasonNumber: episode.seasonNumber - 1} :
                                        episode
                                    )
                                );
                            }}
                        />
                        <FormSection
                            title={"Episodes"}
                            classNames={"border-none"}
                        >
                            <AddOption
                                buttonText={"New Episode"}
                                onChange={() => {setEpisodes([...episodes, defaultEpisode(1, index + 1)])}}
                            />
                            {/** Nested again for episodes */}
                            {episodes.filter(episode => episode.seasonNumber === index + 1).map((episode, episodeIndex) => (
                                <FormSection
                                    key={episodeIndex}
                                    title={`Episode ${episode.seasonNumber}.${episodeIndex + 1}`}
                                >
                                    <InputOption
                                        title={"Episode Title*"}
                                        placeholder={"Enter episode title"}
                                        onChange={(value) => episode.title = value}
                                    />
                                    <TextAreaOption
                                        title={"Episode Short Description"}
                                        placeholder={"Enter a short description for the episode"}
                                        onChange={(value) => episode.shortDescription = value}
                                    />
                                    <SliderOption
                                        title={"Episode Rating"}
                                        props={{
                                            onChange: (value) => episode.rating = value,
                                            initial: 0,
                                            max: 10
                                        }}
                                    />
                                    <FileBrowseOption
                                        title={"Episode Thumbnail"}
                                        onChange={(value) => episode.thumbnailUrl = value}
                                    />
                                    <FileBrowseOption
                                        title={"Episode Video File"}
                                        onChange={(value) => episode.videoUrl = value}
                                    />
                                    <RemoveOption
                                        buttonText={"Remove Episode"}
                                        onChange={() => {setEpisodes(episodes.filter((_, i) => i !== episodeIndex))}}
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