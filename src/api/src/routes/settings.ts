import { Router } from "express";
import {
	DeleteOMDBKey,
	NukeDatabase,
	UpdateDarkMode,
	UpdateOMDBKey,
	UpdateProgressDisplay,
} from "controllers/settings-controller";
import { GetSettings } from "controllers/settings-controller";

const router = Router();

// Route to reset the database
router.delete("/", async (_req, res) => {
	if (await NukeDatabase()) {
		res.status(200).json({ message: "Database reset successfully." });
	} else {
		res.status(500).json({ error: "Failed to reset database" });
	}
});

// Settings getter
router.get("/", async (_req, res) => {
	try {
		const settings = await GetSettings();
		res.status(200).json(settings);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch settings" });
	}
});

// Toggles dark mode
router.patch("/dark-mode", async (req, res) => {
	const { darkMode } = req.body;
	if (await UpdateDarkMode(darkMode)) {
		res.status(200).json({ message: "Dark mode updated successfully." });
	} else {
		res.status(500).json({ error: "Failed to update dark mode" });
	}
});

// Updates OMDB api key
router.patch("/omdb-key", async (req, res) => {
	const { omdbKey } = req.body;
	const response = await UpdateOMDBKey(omdbKey);

	if (response.success) {
		res.status(200).json({ message: "OMDB key updated successfully." });
	} else {
		res.status(500).json({ error: response.errorMessage! });
	}
});

// Updates TV show progress display setting
router.patch("/show-progress", async (req, res) => {
	const { tvShowProgressInEpisodes } = req.body;
	if (await UpdateProgressDisplay(tvShowProgressInEpisodes)) {
		res.status(200).json({
			message: "TV show progress display updated successfully.",
		});
	} else {
		res.status(500).json({
			error: "Failed to update TV show progress display",
		});
	}
});

// Updates markdown preview setting
router.patch("/markdown-preview", async (req, res) => {
	const { showMarkdownPreview } = req.body;
	if (await UpdateProgressDisplay(showMarkdownPreview)) {
		res.status(200).json({
			message: "Markdown preview setting updated successfully.",
		});
	} else {
		res.status(500).json({
			error: "Failed to update markdown preview setting",
		});
	}
});

// Deletes OMDB api key
router.delete("/omdb-key", async (req, res) => {
	if (await DeleteOMDBKey()) {
		res.status(200).json({ message: "OMDB key deleted successfully." });
	} else {
		res.status(500).json({ error: "Failed to delete OMDB key" });
	}
});

export default router;
