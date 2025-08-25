import { Router } from "express";
import { DBOptions, DBData } from "@shared/export-types";
import { ExportDatabase, LoadDatabase } from "controllers/backup-controller";

const router = Router();

// Returns the DB as JSON depending on the given params
router.get("/export", async (req, res) => {
    try {
        const options: DBOptions = {
            movies: req.query.movies === "true",
            shows: req.query.shows === "true",
            courses: req.query.courses === "true",
        };

        if (!options.movies && !options.shows && !options.courses) {
            res.status(400).json({ error: "Not exporting anything, invalid options" });
            return;
        }
        const db = await ExportDatabase(options);
        res.status(200).json(db);
    } catch (error) {
        res.status(500).json({
            error:
                error instanceof Error ?
                    error.message
                :	"Failed to export database",
        });
    }
});

// Loads the DB from JSON, either appending or rewriting the current DB
router.post("/load", async (req, res) => {
    try {
        const data: DBData = req.body.data;
        const rewrite = req.query.rewrite;
        if (rewrite === undefined || rewrite === null) {
            res.status(400).json({ error: "Please provide a rewrite/append option." });
            return;
        }

        if (!data) {
            res.status(400).json({ error: "No data provided" });
            return;
        }

        const result = await LoadDatabase(data, rewrite === "true");
        if (result.success) {
            res.status(200);
        } else {
            res.status(500).json({ error: result.errorMessage });
        }

    } catch (error) {
        res.status(500).json({
            error:
                error instanceof Error ?
                    error.message
                :	"Failed to load database",
        });
    }
});

export default router;