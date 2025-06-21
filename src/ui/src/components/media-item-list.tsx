import CardDisplayable from "@shared/interface/card-displayable";
import { NavLink } from "react-router-dom";

/**
 * List of media items with links to their pages.
 */
export default function MediaItemList({ items } : { items: CardDisplayable[] }) {
    return (
        <div className="flex flex-col items-center w-full h-full overflow-y-auto">
            {items.map((item) => (
                <NavLink
                    key={item.identifier}
                    to={`/media/${item.identifier}`}
                    className="w-full p-4 text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                    <div className="flex items-center space-x-4">
                        {item.thumbnailUrl && (
                            <img
                                src={item.thumbnailUrl}
                                alt={item.title}
                                className="w-16 h-16 object-cover rounded"
                            />
                        )}
                        <div>
                            <h3 className="text-lg font-semibold">{item.title}</h3>
                            {item.rating && (
                                <p className="text-sm text-gray-500">Rating: {item.rating}</p>
                            )}
                        </div>
                    </div>
                </NavLink>
            ))}
        </div>
    )
}