import { Router } from 'express';
import { deleteNotification, getAllNotification, postNotifications } from '../controllers/notification';

const router = Router();

router.get('/:idReceiver', getAllNotification);
router.post('/', postNotifications);
router.delete('/:id', deleteNotification);

export default router;
