import { Router } from 'express';
import { 
    getAllExercise, 
    getExercise, 
    postExercise, 
    putExercise, 
    deleteExercise 
} from '../controllers/exercise';

const router = Router();

/**
 * @route GET /api/exercises/:id
 * @description Obtiene todos los ejercicios de un usuario específico.
 * @access Público
 */
router.get('/:id', getAllExercise);

/**
 * @route POST /api/exercises
 * @description Crea un nuevo ejercicio.
 * @access Público
 */
router.post('/', postExercise);

/**
 * @route PUT /api/exercises/:id
 * @description Actualiza un ejercicio por ID.
 * @access Público
 */
router.put('/:id', putExercise);

/**
 * @route DELETE /api/exercises/:id
 * @description Elimina un ejercicio por ID.
 * @access Público
 */
router.delete('/:id', deleteExercise);

export default router;
