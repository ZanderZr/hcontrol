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
exports.deleteDiary = exports.postDiary = exports.getDiary = exports.getAllDiary = void 0;
const express_1 = require("express");
const diaryData_1 = __importDefault(require("../models/diaryData"));
const sequelize_1 = require("sequelize");
const router = (0, express_1.Router)();
/**
 * @description Obtiene todos los registros del diario de un usuario por su ID.
 * @route GET /diary/:id
 * @param {string} id - El ID del usuario que se quiere obtener.
 * @returns {Array} - Lista de registros del diario del usuario.
 * @throws {500} - Si ocurre un error al obtener los datos.
 */
const getAllDiary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // Obtener el id de los parámetros de la solicitud
    try {
        const data = yield diaryData_1.default.findAll({ where: { idUser: id } });
        res.json(data); // Devuelve los registros del diario en formato JSON
    }
    catch (error) {
        console.error("Error al obtener el diario:", error);
        res.status(500).json({ message: "Error al obtener las mediciones." }); // En caso de error, devuelve código 500
    }
});
exports.getAllDiary = getAllDiary;
/**
 * @description Obtiene un registro específico del diario por su ID.
 * @route GET /diary/details/:id
 * @param {string} id - El ID del registro del diario a obtener.
 * @returns {Object} - El registro del diario correspondiente al ID proporcionado.
 * @throws {404} - Si no se encuentra el registro.
 * @throws {500} - Si ocurre un error al obtener el registro.
 */
const getDiary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield diaryData_1.default.findByPk(req.params.id); // Busca un diario por su ID
        if (data) {
            res.json(data); // Si se encuentra, devuelve el registro
        }
        else {
            res.status(404).send('Not Found'); // Si no se encuentra, devuelve un error 404
        }
    }
    catch (error) {
        console.error("Error al obtener el diario:", error);
        res.status(500).json({ message: "Error al obtener el diario." }); // En caso de error, devuelve código 500
    }
});
exports.getDiary = getDiary;
/**
 * @description Crea un nuevo registro de diario o actualiza uno existente si ya hay uno para el mismo día y usuario.
 * @route POST /diary
 * @param {Object} req.body - Contiene el idUser, data y timestamp del nuevo registro de diario.
 * @returns {Object} - El registro de diario creado o actualizado.
 * @throws {400} - Si ocurre un error al guardar el diario.
 */
const postDiary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idUser, data, timestamp } = req.body;
        // Convertir timestamp a formato 'YYYY-MM-DD' para comparar solo la fecha
        const dateOnly = new Date(timestamp).toISOString().split("T")[0];
        // Buscar si ya existe una entrada con el mismo idUser y la misma fecha
        const existingDiary = yield diaryData_1.default.findOne({
            where: {
                idUser,
                timestamp: {
                    [sequelize_1.Op.between]: [`${dateOnly} 00:00:00`, `${dateOnly} 23:59:59`]
                }
            }
        });
        if (existingDiary) {
            // Si existe, actualizar el contenido del diario
            existingDiary.data = data;
            yield existingDiary.save();
            return res.status(200).json(existingDiary); // Devuelve el diario actualizado
        }
        else {
            // Si no existe, crear un nuevo registro
            const newDiary = yield diaryData_1.default.create(req.body);
            return res.status(201).json(newDiary); // Devuelve el nuevo registro creado
        }
    }
    catch (error) {
        console.error("❌ Error al guardar el diario:", error);
        res.status(400).json({ message: "Error al guardar el diario." }); // En caso de error, devuelve código 400
    }
});
exports.postDiary = postDiary;
/**
 * @description Elimina un registro de diario por su ID.
 * @route DELETE /diary/:id
 * @param {string} id - El ID del registro del diario a eliminar.
 * @returns {void} - Respuesta vacía si el registro fue eliminado correctamente.
 * @throws {404} - Si no se encuentra el registro a eliminar.
 * @throws {500} - Si ocurre un error al eliminar el registro.
 */
const deleteDiary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield diaryData_1.default.findByPk(req.params.id); // Busca el diario por su ID
        if (!data) {
            return res.status(404).send('Not Found'); // Si no se encuentra el diario, devuelve un error 404
        }
        yield data.destroy(); // Elimina el registro del diario
        res.status(204).send(); // Devuelve respuesta vacía con código de estado 204
    }
    catch (error) {
        console.error("Error al eliminar el diario:", error);
        res.status(500).json({ message: "Error al eliminar el diario." }); // En caso de error, devuelve código 500
    }
});
exports.deleteDiary = deleteDiary;
exports.default = router;
