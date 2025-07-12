import { Router } from "express";
import { DeleteTvShow, GetTvShowById, GetTvShows, InsertTvMazeShow, InsertTvShow, UpdateTvShow } from "controllers/tv-show-controller";

const router = Router();

// Getter for all TV shows
router.get("/", async (_req, res) => {
    try {
        const tvShows = await GetTvShows();
        res.json(tvShows);
    }

    catch (error) {
        res.status(500).json({ error: "Failed to fetch TV shows" });
    }
});

// Getter for a TV show by ID
router.get("/:id", async (req, res) => {
    const tvShowId = parseInt(req.params.id, 10);
    if (isNaN(tvShowId)) {
        res.status(400).json({ error: "Invalid TV show ID" });
        return;
    }

    const tvShow = await GetTvShowById(tvShowId);
    tvShow ? res.json(tvShow) : res.status(404).json({ error: "TV show not found" });
});

// Setter for inserting a TV show
router.post("/", async (req, res) => {
    const tvShow = req.body;
    if (await InsertTvShow(tvShow)) {
        res.status(201).json({ message: "TV show inserted successfully" });
    }

    else {
        res.status(500).json({ error: "Failed to insert TV show" });
    }
});

// Insert TV show from TV Maze API
router.post("/tv-maze", async (req, res) => {
    const { title, imdbId } = req.body;
    if (!title && !imdbId) {
        res.status(400).json({ error: "Title or IMDb ID is required" });
        return;
    }

    await InsertTvMazeShow(title, imdbId)
    .then((result) => {
        if (result.success) {
            res.status(201).json({ message: "TV show inserted successfully" });
        }

        else {
            res.status(500).json({ error: result.errorMessage || "Failed to insert TV show from TV Maze" });
        }
    });
});

// TV show updates
router.patch("/:id", async (req, res) => {
    // Parse ID
    const tvShowId = parseInt(req.params.id, 10);
    if (isNaN(tvShowId)) {
        res.status(400).json({ error: "Invalid TV show ID" });
        return;
    }

    // Update
    const updatedData = req.body;
    if (await UpdateTvShow(tvShowId, updatedData)) {
        res.status(200).json({ message: "TV show updated successfully" });
    }

    else {
        res.status(500).json({ error: "Failed to update TV show" });
    }
});

// TV show deletion
router.delete("/:id", async (req, res) => {
    const tvShowId = parseInt(req.params.id, 10);
    if (isNaN(tvShowId)) {
        res.status(400).json({ error: "Invalid TV show ID" });
        return;
    }

    if (await DeleteTvShow(tvShowId)) {
        res.status(200).json({ message: "TV show deleted successfully" });
    }

    else {
        res.status(500).json({ error: "Failed to delete TV show" });
    }
});

export default router;