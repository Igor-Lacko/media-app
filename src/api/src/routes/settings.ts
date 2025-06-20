import { Router } from "express";
import { NukeDatabase } from "controllers/settings-controller";

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

export default router;