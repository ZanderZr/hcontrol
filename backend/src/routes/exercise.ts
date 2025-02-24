import { Router } from 'express';
import { 
    getAllExercise, 
    getExercise, 
    postExercise, 
    putExercise, 
    deleteExercise } from '../controllers/exercise';

const router = Router();

router.get('/:id', getAllExercise);
router.get('/:id', getExercise);
router.post('/', postExercise);
router.put('/:id', putExercise);
router.delete('/:id', deleteExercise);

export default router;
