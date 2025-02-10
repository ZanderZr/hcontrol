import { Router } from 'express';
import { getAllExercise, getExercise, postExercise, putExercise, deleteExercise } from '../controllers/exercise';

const router = Router();

router.get('/', getAllExercise);
router.get('/:id', getExercise);
router.post('/:id', postExercise);
router.put('/:id', putExercise);
router.delete('/:id', deleteExercise);

export default router;
