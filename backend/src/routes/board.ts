import { Router } from 'express';
import { getAllBoard, postBoard } from '../controllers/board';

const router = Router();

/**
 * @route GET /api/boards
 * @description Obtiene todos los registros de la tabla Board.
 * @access Público
 */
router.get('/', getAllBoard);

/**
 * @route POST /api/boards
 * @description Crea un nuevo registro en la tabla Board.
 * @access Público
 */
router.post('/', postBoard);

export default router;
