"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notification_1 = require("../controllers/notification");
const router = (0, express_1.Router)();
router.get('/:idReceiver', notification_1.getAllNotification);
router.post('/', notification_1.postNotifications);
exports.default = router;
