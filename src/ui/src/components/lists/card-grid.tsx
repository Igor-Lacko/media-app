import Movie from "@shared/interface/models/movie";
import TvShow from "@shared/interface/models/tv-show";
import MediaItemCard from "components/model-displays/media-item-card";

export default function CardGrid({ items, extraClassNames }: { items: (TvShow | Movie)[], extraClassNames?: string }) {
    return (
        <div
            className={"grid grid-flow-row grid-rows-[auto] grid-cols-4 gap-20 p-4 " + (extraClassNames || "")}
        >
            {items.map((item, index) => (
                <MediaItemCard
                    key={index}
                    model={item}
                    url={item.submediaString ? `/tv-shows/${item.identifier}` : `/movies/${item.identifier}`}
                />
            )
            )}
        </div>
    )
}