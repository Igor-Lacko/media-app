import { Router } from "express";
import { GetMovieById, GetMovies, InsertMovie } from "controllers/movie-controller";
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
    } 

    catch (error) {
        res.status(500).json({ error: "Failed to fetch movies" });
    }
});

// Getter for a movie by ID
router.get("/:id", async (req, res) => {
    const movieId = parseInt(req.params.id, 10);
    if (isNaN(movieId)) {
        res.status(400).json({ error: "Invalid movie ID" });
        return;
    }

    const movie = await GetMovieById(movieId);
    movie ? res.json(movie) : res.status(404).json({ error: "Movie not found" });
});

// Setter for inserting a movie
router.post("/", async (req, res) => {
    const movie = req.body;

    try {
        const newMovie = await InsertMovie(movie);
        res.status(201).json(newMovie);
    } catch (error) {
        res.status(500).json({ error: "Failed to insert movie" });
    }
});

export default router;