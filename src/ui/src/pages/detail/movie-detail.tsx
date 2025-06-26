import MockDetailProps from "utils/mocks/mock-detail-props";
import DetailLayout from "layouts/detail-layout";
import Movie from "@shared/interface/models/movie";

export default function MovieDetail() {
    // placeholder
    return (
        <DetailLayout<Movie>
            {...MockDetailProps()}
        />
    );
}