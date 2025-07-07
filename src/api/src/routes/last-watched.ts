import { Router } from "express";
import { GetLastWatchedItems } from "controllers/last-watched-controller";

const router = Router();

// Getter for last watched items
router.get("/", async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : -1;
    if (isNaN(limit)) {
        res.status(400).json({ error: "Invalid limit parameter" });
        return;
    }

    const lastWatchedItems = await GetLastWatchedItems(limit);
    if (lastWatchedItems) {
        res.json(lastWatchedItems);
    }

    else {
        res.status(500).json({ error: "Failed to fetch last watched items" });
    }
});

export default router;