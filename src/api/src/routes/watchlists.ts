import { Router } from "express";
import GetWatchlistItems from "controllers/watchlist-controller";

const router = Router();

// Fetch items to watch
router.get("/to-watch", async (_req, res) => {
    const items = await GetWatchlistItems(false);
    if (items) {
        res.status(200).json(items);
    }

    else {
        res.status(500).json({ error: "Failed to fetch items to watch." });
    }
});

// Fetch currently watched items
router.get("/watching", async (_req, res)  => {
    const items = await GetWatchlistItems(true);
    if (items) {
        res.status(200).json(items.entertainment);
    }

    else {
        res.status(500).json({ error: "Failed to fetch currently watched items." });
    }
});

export default router;