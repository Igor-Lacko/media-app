import express from "express";

import MovieRouter from "routes/movies";
import SettingsRouter from "routes/settings";
import { NukeDatabase } from "controllers/settings-controller";
import seedMovies from "utils/insert-mock-data";
import { GetMovies } from "controllers/movie-controller";

export const viteNodeApp = express();

console.log("Starting Express server...");

// For parsing
viteNodeApp.use(express.json());

// Add routers
viteNodeApp.use("/movies", MovieRouter);
viteNodeApp.use("/settings", SettingsRouter);

// Start the server
const PORT = process.env.PORT || 3000;
viteNodeApp.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}
);

// TODO remove
(async () => {
    try {
        await NukeDatabase();
        await seedMovies();
        const insertedMovies = await GetMovies();
        console.log("Inserted movies:", insertedMovies);
        console.log("Database seeded successfully.");
    } catch (error) {
        console.error("Error occurred:", error);
        process.exit(1);
    }
})();