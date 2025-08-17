import express from "express";
import cors from "cors";

import MovieRouter from "routes/movies";
import SettingsRouter from "routes/settings";
import TvShowRouter from "routes/tv-shows";
import CoursesRouter from "routes/courses";
import SeasonsRouter from "routes/seasons";
import EpisodesRouter from "routes/episodes";
import LecturesRouter from "routes/lectures";
import FavoritesRouter from "routes/favorites";
import LastWatchedRouter from "routes/last-watched";
import WatchlistRouter from "routes/watchlists";
import CheckRouter from "routes/check";
const app = express();

app.use(cors());

// For parsing
app.use(express.json());

// Add routers
const addRouters = () => {
	app.use("/api/movies", MovieRouter);
	app.use("/api/settings", SettingsRouter);
	app.use("/api/shows", TvShowRouter);
	app.use("/api/courses", CoursesRouter);
	app.use("/api/seasons", SeasonsRouter);
	app.use("/api/episodes", EpisodesRouter);
	app.use("/api/lectures", LecturesRouter);
	app.use("/api/favorites", FavoritesRouter);
	app.use("/api/last-watched", LastWatchedRouter);
	app.use("/api/watchlist", WatchlistRouter);
	app.use("/api/check", CheckRouter);
};

export const startServer = async () => {
	try {
		addRouters();
		const PORT = 3000;
		app.listen(PORT, () => {
			console.log(`Server is running on http://localhost:${PORT}`);
		});
	} catch (error) {
		console.error("Error occurred:", error);
		process.exit(1);
	}
};

startServer();
