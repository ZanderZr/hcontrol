import { Router } from 'express';
import { getAllRoutine, getRoutine, postRoutine, putRoutine, deleteRoutine } from '../controllers/routine';

const router = Router();

router.get('/', getAllRoutine);
router.get('/:id', getRoutine);
router.post('/', postRoutine);
router.put('/:id', putRoutine);
router.delete('/:id', deleteRoutine);

export default router;
