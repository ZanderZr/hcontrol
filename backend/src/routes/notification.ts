import { Router } from 'express';
import { 
    deleteNotification, 
    getAllNotification, 
    postNotifications 
} from '../controllers/notification';

const router = Router();

/**
 * @route GET /api/notifications/:idReceiver
 * @description Obtiene todas las notificaciones de un usuario específico.
 * @access Público
 */
router.get('/:idReceiver', getAllNotification);

/**
 * @route POST /api/notifications
 * @description Crea una nueva notificación.
 * @access Público
 */
router.post('/', postNotifications);

/**
 * @route DELETE /api/notifications/:id
 * @description Elimina una notificación por ID.
 * @access Público
 */
router.delete('/:id', deleteNotification);

export default router;
