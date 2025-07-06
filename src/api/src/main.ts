import express from "express";
import cors from "cors";

import MovieRouter from "routes/movies";
import SettingsRouter from "routes/settings";
import TvShowRouter from "routes/tv-shows";
import SubjectsRouter from "routes/subjects";
import SeasonsRouter from "routes/seasons";
import EpisodesRouter from "routes/episodes";
import LecturesRouter from "routes/lectures";
import FavoritesRouter from "routes/favorites";
import { NukeDatabase } from "controllers/settings-controller";
import seedData from "utils/insert-mock-data";
import { GetMovies } from "controllers/movie-controller";
import { GetTvShows } from "controllers/tv-show-controller";

export const viteNodeApp = express();

console.log("Starting Express server...");
viteNodeApp.use(cors());

// For parsing
viteNodeApp.use(express.json());

// Add routers
viteNodeApp.use("/api/movies", MovieRouter);
viteNodeApp.use("/api/settings", SettingsRouter);
viteNodeApp.use("/api/shows", TvShowRouter);
viteNodeApp.use("/api/subjects", SubjectsRouter);
viteNodeApp.use("/api/seasons", SeasonsRouter);
viteNodeApp.use("/api/episodes", EpisodesRouter);
viteNodeApp.use("/api/lectures", LecturesRouter);
viteNodeApp.use("/api/favorites", FavoritesRouter);

// TODO remove
(async () => {
    try {
        await NukeDatabase();
        await seedData();
        const movies = await GetMovies();
        const tvShows = await GetTvShows();
        console.log("Seeded movies:", movies);
        console.log("Seeded TV shows:", tvShows);
    } catch (error) {
        console.error("Error occurred:", error);
        process.exit(1);
    }
})();

// Start the server
const PORT = process.env.PORT || 3000;
viteNodeApp.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}
);

