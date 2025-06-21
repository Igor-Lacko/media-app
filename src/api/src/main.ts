import express from "express";
import cors from "cors";

import MovieRouter from "routes/movies";
import SettingsRouter from "routes/settings";
import TvShowRouter from "routes/tv-shows";
import SubjectsRouter from "routes/subjects";
import { NukeDatabase } from "controllers/settings-controller";
import seedMovies from "utils/insert-mock-data";
import { GetMovies } from "controllers/movie-controller";

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

// TODO remove
(async () => {
    try {
        await NukeDatabase();
        await seedMovies();
        const movies = await GetMovies();
        console.log("Seeded movies:", movies);
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

