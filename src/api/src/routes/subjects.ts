import { Router } from 'express';
import SortKey from '@shared/enum/sort-key';
import { GetSubjectById, GetSubjects, InsertSubject } from 'controllers/subject-controller';

const router = Router();

// Getter for all subjects
router.get('/', async (req, res) => {
    // Sort key
    const { sortBy } = req.query;
    console.log('Fetching subjects...');
    try {
        const subjects = await GetSubjects(sortBy as SortKey);
        res.json(subjects);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch subjects' });
    }
});

// Getter for a subject by ID
router.get('/:id', async (req, res) => {
    const subjectId = parseInt(req.params.id, 10);
    if (isNaN(subjectId)) {
        res.status(400).json({ error: 'Invalid subject ID' });
        return;
    }

    const subject = await GetSubjectById(subjectId);
    subject ? res.json(subject) : res.status(404).json({ error: 'Subject not found' });
});

// Setter for inserting a subject
router.post('/', async (req, res) => {
    const subject = req.body;

    try {
        const newSubject = await InsertSubject(subject);
        if (newSubject) {
            res.status(201).json(newSubject);
        } else {
            res.status(400).json({ error: 'Failed to insert subject' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to insert subject' });
    }
});

export default router;