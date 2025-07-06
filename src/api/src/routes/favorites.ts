import { Router } from "express";
import { GetFavorites } from "controllers/favorites-controller";

const router = Router();

router.get("/", async (_req, res) => {
    try {
        const favorites = await GetFavorites();
        res.status(200).json(favorites);
    }

    catch (error) {
        console.error("Error fetching favorites: ", error);
        res.status(500).json({ error: "Failed to fetch favorites" });
    }
});

export default router;