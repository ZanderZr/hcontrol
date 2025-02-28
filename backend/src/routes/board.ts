import { Router } from 'express';
import { getAllBoard, postBoard } from '../controllers/board';

const router = Router();

router.get('/', getAllBoard);
router.post('/', postBoard);

export default router;
