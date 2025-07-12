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
import WatchlistRouter from "routes/to-watch";
import CheckRouter from "routes/check";
import { NukeDatabase } from "controllers/settings-controller";
import seedData from "utils/insert-mock-data";

export const viteNodeApp = express();

console.log("Starting Express server...");
viteNodeApp.use(cors());

// For parsing
viteNodeApp.use(express.json());

// Add routers
const addRouters = () => {
        viteNodeApp.use("/api/movies", MovieRouter);
        viteNodeApp.use("/api/settings", SettingsRouter);
        viteNodeApp.use("/api/shows", TvShowRouter);
        viteNodeApp.use("/api/courses", CoursesRouter);
        viteNodeApp.use("/api/seasons", SeasonsRouter);
        viteNodeApp.use("/api/episodes", EpisodesRouter);
        viteNodeApp.use("/api/lectures", LecturesRouter);
        viteNodeApp.use("/api/favorites", FavoritesRouter);
        viteNodeApp.use("/api/last-watched", LastWatchedRouter);
        viteNodeApp.use("/api/watchlist", WatchlistRouter);
        viteNodeApp.use("/api/check", CheckRouter);
}

// TODO remove data seeding
const startServer = async () => {
    try {
        //await NukeDatabase();
        await seedData();
        addRouters();
        const PORT = process.env.PORT || 3000;
        viteNodeApp.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Error occurred:", error);
        process.exit(1);
    }
}

startServer();