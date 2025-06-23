import { Router } from "express";
import SortKey from "@shared/enum/sort-key";
import { Genre } from "generated/prisma/enums";
import { GetTvShows } from "controllers/tv-show-controller";

const router = Router();

// Getter for all TV shows
router.get("/", async (req, res) => {
    // Sort/filter/search
    const { sortBy, filter, search } = req.query;
    console.log("Fetching TV shows...");
    try {
        const tvShows = await GetTvShows(
            sortBy as SortKey,
            filter as Genre
        );
        res.json(tvShows);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch TV shows" });
    }
});

// Setter for inserting a TV show
router.post("/", async (req, res) => {
    const tvShow = req.body;

    try {
        const newTvShow = await GetTvShows(tvShow);
        res.status(201).json(newTvShow);
    } catch (error) {
        res.status(500).json({ error: "Failed to insert TV show" });
    }
});

export default router;