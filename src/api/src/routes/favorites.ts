import { Router } from "express";
import { GetFavorites } from "controllers/favorites-controller";

const router = Router();

router.get("/", async (_req, res) => {
	try {
		const favorites = await GetFavorites();
		res.status(200).json(favorites);
	} catch (e) {
		res.status(500).json({
			error:
				e instanceof Error
					? e.message
					: "An error occurred while fetching favorites.",
		});
	}
});

export default router;
