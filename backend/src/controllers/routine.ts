import express from 'express';
import Routine from '../models/routine';

const router = express.Router();

export const getAllRoutine = router.get('/', async (req, res) => {
    const data = await Routine.findAll();
    res.json(data);
});

export const getRoutine = router.get('/:id', async (req, res) => {
    const data = await Routine.findByPk(req.params.id);
    data ? res.json(data) : res.status(404).send('Not Found');
});

export const postRoutine = router.post('/', async (req, res) => {
    try {
        const data = await Routine.create(req.body);
        res.status(201).json(data);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'Unknown error' });
        }
    }
});

export const putRoutine = router.put('/:id', async (req, res) => {
    const data = await Routine.findByPk(req.params.id);
    if (!data) return res.status(404).send('Not Found');
    await data.update(req.body);
    res.json(data);
});

export const deleteRoutine = router.delete('/:id', async (req, res) => {
    const data = await Routine.findByPk(req.params.id);
    if (!data) return res.status(404).send('Not Found');
    await data.destroy();
    res.status(204).send();
});

export default router;