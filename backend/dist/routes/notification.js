"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notification_1 = require("../controllers/notification");
const router = (0, express_1.Router)();
/**
 * @route GET /api/notifications/:idReceiver
 * @description Obtiene todas las notificaciones de un usuario específico.
 * @access Público
 */
router.get('/:idReceiver', notification_1.getAllNotification);
/**
 * @route POST /api/notifications
 * @description Crea una nueva notificación.
 * @access Público
 */
router.post('/', notification_1.postNotifications);
/**
 * @route DELETE /api/notifications/:id
 * @description Elimina una notificación por ID.
 * @access Público
 */
router.delete('/:id', notification_1.deleteNotification);
exports.default = router;
