import MockDetailProps from "utils/mocks/mock-detail-props";
import DetailLayout from "layouts/detail-layout";

export default function MovieDetail() {
    // placeholder
    return (
        <DetailLayout
            {...MockDetailProps()}
        />
    );
}