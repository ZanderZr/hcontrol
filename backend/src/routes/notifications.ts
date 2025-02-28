import { Router } from 'express';
import { getAllNotification, postNotifications } from '../controllers/notification';

const router = Router();

router.get('/:idReceiver', getAllNotification);
router.post('/', postNotifications);

export default router;
