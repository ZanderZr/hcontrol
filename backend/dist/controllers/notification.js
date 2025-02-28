"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNotification = exports.postNotifications = exports.getAllNotification = void 0;
const express_1 = require("express");
const notification_1 = __importDefault(require("../models/notification"));
const socket_1 = require("../services/socket"); // asegúrate de exportar la instancia de Socket.IO
const router = (0, express_1.Router)();
const getAllNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idReceiver } = req.params; // Obtener el id de los parámetros de la solicitud
    try {
        const data = yield notification_1.default.findAll({
            where: { idReceiver: idReceiver },
        });
        res.json(data);
    }
    catch (error) {
        console.error("Error al obtener el diario:", error);
        res.status(500).json({ message: "Error al obtener las mediciones." });
    }
});
exports.getAllNotification = getAllNotification;
const postNotifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        // Validar que el emisor y el receptor sean diferentes
        if (body.idEmitter === body.idReceiver) {
            return res.status(200).json({ message: "El emisor y receptor no pueden ser el mismo." });
        }
        // Buscar si ya existe una notificación con los mismos datos
        const existingNotification = yield notification_1.default.findOne({
            where: {
                idEmitter: body.idEmitter,
                idReceiver: body.idReceiver,
                description: body.description,
            }
        });
        if (existingNotification) {
            return res.status(200).json({
                message: "La notificación ya existe",
                notification: existingNotification
            });
        }
        // Crear la notificación
        const notification = yield notification_1.default.create(body);
        // 📡 Emitir evento en tiempo real SOLO al usuario con idReceiver
        socket_1.io.to(`user_${body.idReceiver}`).emit("new_notification", notification);
        return res.status(201).json(notification);
    }
    catch (error) {
        console.error("❌ Error al guardar la notificación:", error);
        res.status(400).json({ message: "Error al guardar la notificación." });
    }
});
exports.postNotifications = postNotifications;
const deleteNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield notification_1.default.findByPk(req.params.id);
        if (!data) {
            return res.status(404).send('Not Found');
        }
        yield data.destroy();
        res.status(204).send();
    }
    catch (error) {
        console.error("Error al eliminar la notificacion:", error);
        res.status(500).json({ message: "Error al eliminar la notificacion." });
    }
});
exports.deleteNotification = deleteNotification;
exports.default = router;
