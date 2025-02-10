import { Router } from 'express';
import { getAllDiary, deleteDiary, getDiary, postDiary } from '../controllers/diaryData';

const router = Router();

router.get('/', getAllDiary);
router.post('/:id', postDiary);
router.get('/:id', getDiary);
router.delete('/:id', deleteDiary);

export default router;
