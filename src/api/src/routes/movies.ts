import { Router } from "express";
import { GetMovies } from "controllers/movie-controller";

const router = Router();

// Getter for all movies
router.get("/", async (req, res) => {
    try {
        const movies = await GetAllMovies();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch movies" });
    }
});