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
const socket_1 = require("../services/socket");
const router = (0, express_1.Router)();
/**
 * @description Obtiene todas las notificaciones de un receptor por su ID.
 * @route GET /notifications/:idReceiver
 * @param {string} idReceiver - El ID del receptor de las notificaciones.
 * @returns {Array} - Lista de notificaciones asociadas al receptor.
 * @throws {500} - Si ocurre un error al obtener las notificaciones.
 */
const getAllNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idReceiver } = req.params; // Obtener el id de los parámetros de la solicitud
    try {
        const data = yield notification_1.default.findAll({
            where: { idReceiver: idReceiver },
        });
        res.json(data); // Devuelve todas las notificaciones asociadas al receptor
    }
    catch (error) {
        console.error("Error al obtener el diario:", error);
        res.status(500).json({ message: "Error al obtener las mediciones." }); // En caso de error, devuelve un código 500
    }
});
exports.getAllNotification = getAllNotification;
/**
 * @description Crea una nueva notificación y la envía en tiempo real al receptor mediante Socket.IO.
 * @route POST /notifications
 * @param {Object} req.body - Los datos de la notificación que se va a crear (idEmitter, idReceiver, description, etc.).
 * @returns {Object} - La notificación creada.
 * @throws {400} - Si el emisor y el receptor son el mismo.
 * @throws {500} - Si ocurre un error al guardar la notificación.
 */
const postNotifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        // Validar que el emisor y el receptor sean diferentes
        if (body.idEmitter === body.idReceiver) {
            return res.status(200).json({ message: "El emisor y receptor no pueden ser el mismo." }); // Si son el mismo, retorna un error
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
        // Crear la notificación en la base de datos
        const notification = yield notification_1.default.create(body);
        // 📡 Emitir evento en tiempo real SOLO al usuario con idReceiver usando Socket.IO
        (0, socket_1.getIO)().to(body.idReceiver.toString()).emit("new_notification", notification);
        return res.status(201).json(notification); // Devuelve la notificación creada
    }
    catch (error) {
        console.error("❌ Error al guardar la notificación:", error);
        res.status(400).json({ message: "Error al guardar la notificación." }); // En caso de error, devuelve un código 400
    }
});
exports.postNotifications = postNotifications;
/**
 * @description Elimina una notificación por su ID.
 * @route DELETE /notifications/:id
 * @param {string} id - El ID de la notificación que se desea eliminar.
 * @returns {void} - Respuesta vacía si la notificación fue eliminada correctamente.
 * @throws {404} - Si no se encuentra la notificación.
 * @throws {500} - Si ocurre un error al eliminar la notificación.
 */
const deleteNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield notification_1.default.findByPk(req.params.id); // Buscar la notificación por ID
        if (!data) {
            return res.status(404).send('Not Found'); // Si no se encuentra, devuelve un error 404
        }
        yield data.destroy(); // Eliminar la notificación
        res.status(204).send(); // Respuesta vacía con código de estado 204
    }
    catch (error) {
        console.error("Error al eliminar la notificación:", error);
        res.status(500).json({ message: "Error al eliminar la notificación." }); // En caso de error, devuelve código 500
    }
});
exports.deleteNotification = deleteNotification;
exports.default = router;
