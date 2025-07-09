import { Router } from "express";
import GetToWatchItems from "controllers/watchlist-controller";

const router = Router();

// Fetch items to watch
router.get("/", async (req, res) => {
    const items = await GetToWatchItems();
    if (items) {
        res.status(200).json(items);
    }

    else {
        res.status(500).json({ error: "Failed to fetch items to watch." });
    }
});

export default router;