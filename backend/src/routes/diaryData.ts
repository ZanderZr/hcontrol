import { Router } from 'express';
import { getAllDiary, deleteDiary, getDiary, postDiary } from '../controllers/diaryData';

const router = Router();

router.get('/:id', getAllDiary);
router.post('/', postDiary);
router.delete('/:id', deleteDiary);

export default router;
