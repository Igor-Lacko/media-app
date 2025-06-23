import { Router } from 'express';
import SortKey from '@shared/enum/sort-key';
import { GetSubjects, InsertSubject } from 'controllers/subject-controller';

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