import { Router } from 'express';
import { 
    getAllRoutinesById, 
    getRoutine, 
    postRoutine, 
    putRoutine, 
    deleteRoutine 
} from '../controllers/routine';

const router = Router();

/**
 * @route GET /api/routines/:id
 * @description Obtiene todas las rutinas de un usuario específico.
 * @access Público
 */
router.get('/:id', getAllRoutinesById);

/**
 * @route GET /api/routines/details/:id
 * @description Obtiene los detalles de una rutina específica.
 * @access Público
 */
router.get('/details/:id', getRoutine);

/**
 * @route POST /api/routines
 * @description Crea una nueva rutina.
 * @access Público
 */
router.post('/', postRoutine);

/**
 * @route PUT /api/routines/:id
 * @description Actualiza una rutina existente por ID.
 * @access Público
 */
router.put('/:id', putRoutine);

/**
 * @route DELETE /api/routines/:id
 * @description Elimina una rutina por ID.
 * @access Público
 */
router.delete('/:id', deleteRoutine);

export default router;
