import { Router } from "express";
import { DeleteOMDBKey, NukeDatabase, UpdateDarkMode, UpdateOMDBKey } from "controllers/settings-controller";
import { GetSettings } from "controllers/settings-controller";

const router = Router();

// Route to nuke the database
router.post("/nuke", async (req, res) => {
    try {
        await NukeDatabase();
        res.status(200).json({ message: "Database nuked successfully." });
    } catch (error) {
        console.error("Error nuking database:", error);
        res.status(500).json({ error: "Failed to nuke database" });
    }
});

// Settings getter
router.get("/", async (_req, res) => {
    try {
        const settings = await GetSettings();
        res.status(200).json(settings);
    } catch (error) {
        console.error("Error fetching settings:", error);
        res.status(500).json({ error: "Failed to fetch settings" });
    }
});

// Toggles dark mode
router.patch("/dark-mode", async (req, res) => {
    const { darkMode } = req.body;
    if (await UpdateDarkMode(darkMode)) {
        res.status(200).json({ message: "Dark mode updated successfully." });
    }

    else {
        res.status(500).json({ error: "Failed to update dark mode" });
    }
});

// Updates OMDB api key
router.patch("/omdb-key", async (req, res) => {
    const { omdbKey } = req.body;
    const response = await UpdateOMDBKey(omdbKey);

    if (response.success) {
        res.status(200).json({ message: "OMDB key updated successfully." });
    }

    else {
        res.status(500).json({ error: response.errorMessage || "Failed to update OMDB key" });
    }
});

// Deletes OMDB api key
router.delete("/omdb-key", async (req, res) => {
    if (await DeleteOMDBKey()) {
        res.status(200).json({ message: "OMDB key deleted successfully." });
    }

    else {
        res.status(500).json({ error: "Failed to delete OMDB key" });
    }
})

export default router;