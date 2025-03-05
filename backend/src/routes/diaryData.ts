import { Router } from 'express';
import { getAllDiary, deleteDiary, getDiary, postDiary } from '../controllers/diaryData';

const router = Router();

/**
 * @route GET /api/diary/:id
 * @description Obtiene todos los registros de diario de un usuario específico.
 * @access Público
 */
router.get('/:id', getAllDiary);

/**
 * @route POST /api/diary
 * @description Crea un nuevo registro en el diario.
 * @access Público
 */
router.post('/', postDiary);

/**
 * @route DELETE /api/diary/:id
 * @description Elimina un registro del diario por ID.
 * @access Público
 */
router.delete('/:id', deleteDiary);

export default router;
