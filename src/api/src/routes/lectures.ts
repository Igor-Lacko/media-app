import { Router } from "express";
import { UpdateLecture, DeleteLecture } from "controllers/lecture-controller";

const router = Router();

// Lecture updates
router.patch("/:id", async (req, res) => {
    const lectureId = parseInt(req.params.id, 10);
    if (isNaN(lectureId)) {
        res.status(400).json({ error: "Invalid lecture ID" });
        return;
    }

    const updatedData = req.body;
    if (await UpdateLecture(lectureId, updatedData)) {
        res.status(200).json({ message: "Lecture updated successfully" });
    } 

    else {
        res.status(500).json({ error: "Failed to update lecture" });
    }
});

// Lecture deletion
router.delete("/:id", async (req, res) => {
    const lectureId = parseInt(req.params.id, 10);
    if (isNaN(lectureId)) {
        res.status(400).json({ error: "Invalid lecture ID" });
        return;
    }

    if (await DeleteLecture(lectureId)) {
        res.status(200).json({ message: "Lecture deleted successfully" });
    } 

    else {
        res.status(500).json({ error: "Failed to delete lecture" });
    }
});

export default router;