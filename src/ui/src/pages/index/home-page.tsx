import Movie from "@shared/interface/models/movie";
import TvShow from "@shared/interface/models/tv-show";
import { useQuery } from "@tanstack/react-query";
import CardGrid from "components/lists/card-grid";
import HomePageSection from "components/sections/homepage-section";
import {
	FetchCurrentlyWatchingItems,
	FetchData,
	FetchLastWatchedItems,
	FetchToWatchItems,
} from "data/crud/read";
import { IsValidVideo } from "electron/electron-api";
import LoadingPage from "pages/other/loading-page";
import { useEffect, useState } from "react";
import LastWatched from "@shared/interface/last-watched";
import LastWatchedPreview from "components/model-displays/last-watched-preview";
import Watchlist from "components/lists/watchlist";
import CourseWatchlist from "components/lists/course-watchlist";

/**
 * App home page. Displays a list of favorites, recently watched items and a to-watch list.
 */
export default function HomePage() {
	// Fetch favorites
	const { data: favorites, isLoading: favoritesLoading } = useQuery({
		queryKey: ["Favorites"],
		queryFn: async () => await FetchData<TvShow | Movie>("/api/favorites"),
	});

	// Fetch last watched items
	const { data: lastWatched, isLoading: lastWatchedLoading } = useQuery({
		queryKey: ["LastWatched"],
		queryFn: async () => await FetchLastWatchedItems(5),
	});

	// Fetch to-watch items
	const { data: toWatch, isLoading: toWatchLoading } = useQuery({
		queryKey: ["ToWatch"],
		queryFn: async () => await FetchToWatchItems(),
	});

	// Fetch currently watching items
	const { data: currentlyWatching, isLoading: currentlyWatchingLoading } =
		useQuery({
			queryKey: ["CurrentlyWatching"],
			queryFn: async () => await FetchCurrentlyWatchingItems(),
		});

	// Items which have valid video files set in item.videoUrl (wouldn't make much sense to display other items since it links to the video)
	const [validLastWatched, setValidLastWatched] = useState<LastWatched[]>(
		lastWatched || [],
	);

	// Filter out invalid videos from last watched
	useEffect(() => {
		const filterInvalidVideos = async () => {
			if (!lastWatched) {
				return;
			}

			let validItems: LastWatched[] = [];
			await Promise.all(
				lastWatched.map(async (item) => {
					const isValid = await IsValidVideo(item.filePath);
					if (isValid) {
						validItems.push(item);
					}
				}),
			);

			setValidLastWatched(validItems);
		};
		filterInvalidVideos();
	}, [lastWatched]);

	if (
		favoritesLoading
		|| lastWatchedLoading
		|| toWatchLoading
		|| currentlyWatchingLoading
	) {
		return <LoadingPage />;
	}

	return (
		<div
			className={
				"flex min-w screen min-h-screen flex-col flex-grow items-start overflow-y-auto mt-15 justify-center py-0 m-0"
			}
		>
			{validLastWatched.length > 0 && (
				<HomePageSection
					title={"Continue watching"}
					extraClassNames={"w-full h-full"}
					extraChildClassNames={
						"border-t w-full h-[800px] border-gray-300 dark:border-gray-700 justify-center items-center"
					}
				>
					<LastWatchedPreview
						models={validLastWatched}
						extraClassNames={"w-4/7 h-full"}
					/>
				</HomePageSection>
			)}
			<HomePageSection
				title={"Favorites"}
				extraClassNames={
					validLastWatched.length > 0 ? "mt-50" : "mt-20"
				}
				extraChildClassNames={
					"w-full h-full border-t border-gray-300 dark:border-gray-700"
				}
			>
				{favorites && favorites.length > 0 ?
					<CardGrid
						items={favorites}
						extraClassNames={"w-full h-full"}
					/>
				:	<div
						className={
							"flex flex-col justify-center items-center w-full h-120"
						}
					>
						<span
							className={
								"text-black dark:text-gray-400 text-4xl font-semibold px-50"
							}
						>
							You don't have any favorite items yet.
						</span>
						<span
							className={
								"text-black dark:text-gray-400 text-lg font-normal px-50 mt-10"
							}
						>
							You can add movies or tv shows here by clicking the
							star button on their page.
						</span>
					</div>
				}
			</HomePageSection>
			<HomePageSection
				title={"Currently watching"}
				extraClassNames={"mt-50"}
				extraChildClassNames={
					"w-full h-full border-t border-gray-300 dark:border-gray-700"
				}
			>
				{currentlyWatching && currentlyWatching.length > 0 ?
					<Watchlist
						items={currentlyWatching}
						showProgressBar={true}
						showShortDescription={false}
					/>
				:	<div
						className={
							"w-full h-120 flex flex-col justify-center items-center"
						}
					>
						<span
							className={
								"text-black dark:text-gray-400 text-4xl font-semibold px-50"
							}
						>
							It appears you are not currently watching anything.
						</span>
						<span
							className={
								"text-black dark:text-gray-400 text-lg font-normal px-30 mt-10"
							}
						>
							Movies and Shows will appear here if you set their
							watch status to "Currently Watching" on their
							respective pages or adding a video file to them and
							starting watching it.
						</span>
					</div>
				}
			</HomePageSection>
			<HomePageSection
				title={"Shows and movies you plan to watch"}
				extraClassNames={"mt-50"}
				extraChildClassNames={
					"w-full h-full border-t border-gray-300 dark:border-gray-700"
				}
			>
				{toWatch && toWatch.entertainment.length > 0 ?
					<Watchlist
						items={toWatch.entertainment}
						showProgressBar={false}
						showShortDescription={true}
					/>
				:	<div
						className={
							"w-full h-120 flex flex-col justify-center items-center"
						}
					>
						<span
							className={
								"text-black dark:text-gray-400 text-4xl font-semibold px-50"
							}
						>
							You don't have any movies or shows to watch yet.
						</span>
						<span
							className={
								"text-black dark:text-gray-400 text-lg font-normal px-50 mt-10"
							}
						>
							You can add movies and shows here on their
							respective pages (set their watch status to "Plan to
							watch").
						</span>
					</div>
				}
			</HomePageSection>
			<HomePageSection
				title={"Your courses to watch"}
				extraClassNames={"mt-50"}
				extraChildClassNames={
					"w-full h-full border-t border-gray-300 dark:border-gray-700"
				}
			>
				{toWatch && toWatch.courses.length > 0 ?
					<CourseWatchlist items={toWatch.courses} />
				:	<div
						className={
							"w-full h-120 flex flex-col justify-center items-center"
						}
					>
						<span
							className={
								"text-black dark:text-gray-400 text-4xl font-semibold px-50"
							}
						>
							You don't have any courses to watch yet.
						</span>
						<span
							className={
								"text-black dark:text-gray-400 text-lg font-normal px-50 mt-10"
							}
						>
							You can add courses here on their respective pages.
						</span>
					</div>
				}
			</HomePageSection>
		</div>
	);
}
