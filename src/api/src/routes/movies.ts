import { Router } from "express";
import { GetMovies } from "controllers/movie-controller";
import SortKey from "@shared/enum/sort-key";
import { Genre } from "generated/prisma/enums";

const router = Router();

// Getter for all movies
router.get("/", async (req, res) => {
    // Sort/filter/search
    const { sortBy, filter } = req.query;
    console.log("Fetching movies...");
    try {
        const movies = await GetMovies(sortBy as SortKey, filter as Genre);
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch movies" });
    }
});

// Setter for inserting a movie
router.post("/", async (req, res) => {
    const movie = req.body;

    try {
        const newMovie = await GetMovies(movie);
        res.status(201).json(newMovie);
    } catch (error) {
        res.status(500).json({ error: "Failed to insert movie" });
    }
});

export default router;