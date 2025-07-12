import { Router } from "express";
import { DeleteMovie, GetMovieById, GetMovies, InsertMovie, InsertMovieFromOMDb, UpdateMovie } from "controllers/movie-controller";

const router = Router();

// Getter for all movies
router.get("/", async (req, res) => {
    // Fetch and return
    const movies = await GetMovies();
    if(movies !== null) {
        res.json(movies);
    }

    else {
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

    if(await InsertMovie(movie)) {
        res.status(201).json({ message: "Movie inserted successfully" });
    }

    else {
        res.status(500).json({ error: "Failed to insert movie" });
    }
});

// Setter for inserting a movie from OMDb
router.post("/omdb", async (req, res) => {
    const title = req.body.title;

    // Should never happen
    if (!title) {
        res.status(400).json({ error: "Movie title is required" });
        return;
    }

    const result = await InsertMovieFromOMDb(title);
    if (result.success) {
        res.status(201).json({ message: "Movie inserted successfully from OMDb" });
    }

    else {
        res.status(500).json({ error: result.errorMessage || "Failed to insert movie from OMDb" });
    }
});

// Movie updates
router.patch("/:id", async (req, res) => {
    // Parse ID
    const movieId = parseInt(req.params.id, 10);
    if (isNaN(movieId)) {
        res.status(400).json({ error: "Invalid movie ID" });
        return;
    }

    // Update
    const updatedData = req.body;
    if(await UpdateMovie(movieId, updatedData)) {
        res.status(200).json({ message: "Movie updated successfully" });
    }

    else {
        res.status(500).json({ error: "Failed to update movie" });
    }
});

// Movie deletes
router.delete("/:id", async (req, res) => {
    const movieId = parseInt(req.params.id, 10);
    if (isNaN(movieId)) {
        res.status(400).json({ error: "Invalid movie ID" });
        return;
    }

    // Delete
    if (await DeleteMovie(movieId)) {
        res.status(200).json({ message: "Movie deleted successfully" })
    }

    else {
        res.status(500).json({ error: "Failed to delete movie" });
    }
});

export default router;