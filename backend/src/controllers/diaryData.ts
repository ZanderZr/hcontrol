import express from 'express';
import DiaryData from '../models/diaryData';

const router = express.Router();

export const getAllDiary = router.get('/', async (req, res) => {
    const data = await DiaryData.findAll();
    res.json(data);
});

export const getDiary =router.get('/:id', async (req, res) => {
    const data = await DiaryData.findByPk(req.params.id);
    data ? res.json(data) : res.status(404).send('Not Found');
});

export const postDiary =router.post('/', async (req, res) => {
    try {
        const data = await DiaryData.create(req.body);
        res.status(201).json(data);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'Unknown error' });
        }
    }
});

export const deleteDiary = router.delete('/:id', async (req, res) => {
    const data = await DiaryData.findByPk(req.params.id);
    if (!data) return res.status(404).send('Not Found');
    await data.destroy();
    res.status(204).send();
});

export default router;