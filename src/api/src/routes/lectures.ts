import { Router } from "express";
import { UpdateLecture, DeleteLecture, CreateLecture, GetLectureById } from "controllers/lecture-controller";

const router = Router();

// Lecture getter
router.get("/:id", async (req, res) => {
    const lectureId = parseInt(req.params.id, 10);
    if (isNaN(lectureId)) {
        res.status(400).json({ error: "Invalid lecture ID" });
        return;
    }

    const lecture = await GetLectureById(lectureId);
    lecture ? res.json(lecture) : res.status(404).json({ error: "Lecture not found" });
});

// Creating a new lecture
router.post("/:id", async (req, res) => {
    const subjectId = parseInt(req.params.id, 10);
    if (isNaN(subjectId)) {
        res.status(400).json({ error: "Invalid subject ID" });
        return;
    }

    const lecture = req.body;
    if (await CreateLecture(lecture, subjectId)) {
        res.status(201).json({ message: "Lecture created successfully" });
    }

    else {
        res.status(500).json({ error: "Failed to create lecture" });
    }
});

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