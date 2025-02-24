import { Router } from 'express';
import { getAllRoutinesById, getRoutine, postRoutine, putRoutine, deleteRoutine } from '../controllers/routine';

const router = Router();

router.get('/:id', getAllRoutinesById);
router.get('/details/:id', getRoutine);
router.post('/', postRoutine);
router.put('/:id', putRoutine);
router.delete('/:id', deleteRoutine);

export default router;
