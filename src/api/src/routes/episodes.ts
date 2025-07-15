import { Router } from "express";
import {
	CreateEpisode,
	DeleteEpisode,
	GetEpisodeById,
	UpdateEpisode,
} from "controllers/episode-controller";

const router = Router();

// Episode getter
router.get("/:id", async (req, res) => {
	const episodeId = parseInt(req.params.id, 10);
	if (isNaN(episodeId)) {
		res.status(400).json({ error: "Invalid episode ID" });
		return;
	}

	const episode = await GetEpisodeById(episodeId);
	episode
		? res.json(episode)
		: res.status(404).json({ error: "Episode not found" });
});

// Create a new episode
router.post("/:id", async (req, res) => {
	const seasonId = parseInt(req.params.id, 10);
	if (isNaN(seasonId)) {
		res.status(400).json({ error: "Invalid season ID" });
		return;
	}

	const episode = req.body;
	if (await CreateEpisode(episode, seasonId)) {
		res.status(201).json({ message: "Episode created successfully" });
	} else {
		res.status(500).json({ error: "Failed to create episode" });
	}
});

// Episode updates
router.patch("/:id", async (req, res) => {
	const episodeId = parseInt(req.params.id, 10);
	if (isNaN(episodeId)) {
		res.status(400).json({ error: "Invalid episode ID" });
		return;
	}

	const updatedData = req.body;
	if (await UpdateEpisode(episodeId, updatedData)) {
		res.status(200).json({ message: "Episode updated successfully" });
	} else {
		res.status(500).json({ error: "Failed to update episode" });
	}
});

// Episode deletion
router.delete("/:id", async (req, res) => {
	const episodeId = parseInt(req.params.id, 10);
	if (isNaN(episodeId)) {
		res.status(400).json({ error: "Invalid episode ID" });
		return;
	}

	if (await DeleteEpisode(episodeId)) {
		res.status(200).json({ message: "Episode deleted successfully" });
	} else {
		res.status(500).json({ error: "Failed to delete episode" });
	}
});

export default router;
