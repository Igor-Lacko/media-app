import { Router } from 'express';
import SortKey from '@shared/enum/sort-key';
import { DeleteCourse, GetCourseById, GetCourses, InsertCourse, UpdateCourse } from 'controllers/course-controller';

const router = Router();

// Getter for all courses
router.get('/', async (req, res) => {
    // Sort key
    const { sortBy } = req.query;
    console.log('Fetching Courses...');
    try {
        const courses = await GetCourses(sortBy as SortKey);
        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch Courses' });
    }
});

// Getter for a course by ID
router.get('/:id', async (req, res) => {
    const courseId = parseInt(req.params.id, 10);
    if (isNaN(courseId)) {
        res.status(400).json({ error: 'Invalid Course ID' });
        return;
    }

    const course = await GetCourseById(courseId);
    course ? res.json(course) : res.status(404).json({ error: 'Course not found' });
});

// Setter for inserting a course
router.post('/', async (req, res) => {
    const course = req.body;

    try {
        const newCourse = await InsertCourse(course);
        if (newCourse) {
            res.status(201).json(newCourse);
        } else {
            res.status(400).json({ error: 'Failed to insert Course' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to insert Course' });
    }
});

// Course updates
router.patch('/:id', async (req, res) => {
    const courseId = parseInt(req.params.id, 10);
    if (isNaN(courseId)) {
        res.status(400).json({ error: 'Invalid Course ID' });
        return;
    }

    const updatedData = req.body;
    if(await UpdateCourse(courseId, updatedData)) {
        res.status(200).json({ message: 'Course updated successfully' });
    }

    else {
        res.status(500).json({ error: 'Failed to update Course' });
    }
});

// Course deletion
router.delete('/:id', async (req, res) => {
    const courseId = parseInt(req.params.id, 10);
    if (isNaN(courseId)) {
        res.status(400).json({ error: 'Invalid Course ID' });
        return;
    }

    if (await DeleteCourse(courseId)) {
        res.status(200).json({ message: 'Course deleted successfully' });
    } 

    else {
        res.status(500).json({ error: 'Failed to delete Course' });
    }
});

export default router;