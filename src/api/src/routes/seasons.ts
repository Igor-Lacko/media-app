import { Router } from "express";
import { CreateSeason, UpdateSeason, DeleteSeason } from "controllers/season-controller";

const router = Router();

// Create a new season
router.post("/:id", async (req, res) => {
    const showId = parseInt(req.params.id, 10);
    if (isNaN(showId)) {
        res.status(400).json({ error: "Invalid show ID" });
        return;
    }

    const season = req.body;
    if (await CreateSeason(season, showId)) {
        res.status(201).json({ message: "Season created successfully" });
    } 

    else {
        res.status(500).json({ error: "Failed to create season" });
    }
});

// Update a season
router.patch("/:id", async (req, res) => {
    const seasonId = parseInt(req.params.id, 10);
    if (isNaN(seasonId)) {
        res.status(400).json({ error: "Invalid season ID" });
        return;
    }

    const updatedData = req.body;
    if (await UpdateSeason(seasonId, updatedData)) {
        res.status(200).json({ message: "Season updated successfully" });
    } 

    else {
        res.status(500).json({ error: "Failed to update season" });
    }
});

// Delete a season
router.delete("/:id", async (req, res) => {
    const seasonId = parseInt(req.params.id, 10);
    if (isNaN(seasonId)) {
        res.status(400).json({ error: "Invalid season ID" });
        return;
    }

    if (await DeleteSeason(seasonId)) {
        res.status(200).json({ message: "Season deleted successfully" });
    } 

    else {
        res.status(500).json({ error: "Failed to delete season" });
    }
});

export default router;