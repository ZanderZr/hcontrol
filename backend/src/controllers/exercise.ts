import express from 'express';
import Exercise from '../models/exercise';

const router = express.Router();

export const getAllExercise = router.get('/', async (req, res) => {
    const data = await Exercise.findAll();
    res.json(data);
});

export const getExercise = router.get('/:id', async (req, res) => {
    const data = await Exercise.findByPk(req.params.id);
    data ? res.json(data) : res.status(404).send('Not Found');
});

export const postExercise = router.post('/', async (req, res) => {
    try {
        const data = await Exercise.create(req.body);
        res.status(201).json(data);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'Unknown error' });
        }
    }
});

export const putExercise = router.put('/:id', async (req, res) => {
    const data = await Exercise.findByPk(req.params.id);
    if (!data) return res.status(404).send('Not Found');
    await data.update(req.body);
    res.json(data);
});

export const deleteExercise = router.delete('/:id', async (req, res) => {
    const data = await Exercise.findByPk(req.params.id);
    if (!data) return res.status(404).send('Not Found');
    await data.destroy();
    res.status(204).send();
});

export default router;