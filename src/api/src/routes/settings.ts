import { Router } from "express";
import { NukeDatabase } from "controllers/settings-controller";
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

export default router;