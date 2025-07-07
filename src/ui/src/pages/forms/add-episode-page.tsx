import Episode from "@shared/interface/models/episode";
import FormSection from "components/sections/form-section";
import FileBrowseOption from "components/options/file-browse-option";
import InputOption from "components/options/input-option";
import SliderOption from "components/options/slider-option";
import TextAreaOption from "components/options/text-area-option";
import SubmitEpisode from "data/submit-handlers/episode-submit";
import useFetchById from "hooks/use-fetch-by-id";
import useRatingSlider from "hooks/use-rating-slider";
import FormLayout from "layouts/form-layout";
import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { defaultEpisode } from "utils/model-defaults";
import LoadingPage from "pages/other/loading-page";

/**
 * Form page for adding a new episode to a season.
 * Can also be used to edit an existing episode, this is done by passing a route param.
 */
export default function AddEpisodePage() {
    const location = useLocation();
    const seasonId = location.state.id || 1;
    const {model: episode, isLoading} = useFetchById<Episode>("/api/episodes", "episodeId");
    const creating = !episode;

    // Constructed episode
    const episodeRef = useRef<Episode>(episode || defaultEpisode(-1));

    // Slider
    const ratingSliderProps = useRatingSlider(episodeRef);

    if (isLoading) {
        return <LoadingPage />;
    }

    // Form
    return (
        <FormLayout
            title={creating ? "Add Episode" : "Edit Episode"}
            ref={episodeRef}
            submitFunction={creating ? async (episode: Episode) => await SubmitEpisode(episode, true, seasonId)
                : async (episode: Episode) => await SubmitEpisode(episode, false)}
            errorModalMessage={"Please fill in all required fields."}
            successModalMessage={creating ? "Episode added successfully." : "Episode updated successfully."}
        >
            <FormSection
                title={"Episode Information"}
            >
                <InputOption
                    title={"Title *"}
                    initial={episodeRef.current.title}
                    onChange={(value) => episodeRef.current.title = value}
                />
                <TextAreaOption
                    title={"Short Description"}
                    initial={episodeRef.current.shortDescription || ""}
                    onChange={(value) => episodeRef.current.shortDescription = value}
                />
                <SliderOption
                    props={ratingSliderProps}
                    title={"Rating"}
                />
            </FormSection>
            <FormSection
                title={"Media"}
            >
                <FileBrowseOption
                    title={"Video File"}
                    allowed={"video"}
                    initial={episodeRef.current.videoUrl || ""}
                    onChange={(value) => episodeRef.current.videoUrl = value}
                />
            </FormSection>
        </FormLayout>
    )
}