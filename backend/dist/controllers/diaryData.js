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
const getAllDiary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // Obtener el id de los parámetros de la solicitud
    try {
        const data = yield diaryData_1.default.findAll({ where: { idUser: id } });
        res.json(data);
    }
    catch (error) {
        console.error("Error al obtener el diario:", error);
        res.status(500).json({ message: "Error al obtener las mediciones." });
    }
});
exports.getAllDiary = getAllDiary;
const getDiary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield diaryData_1.default.findByPk(req.params.id);
        if (data) {
            res.json(data);
        }
        else {
            res.status(404).send('Not Found');
        }
    }
    catch (error) {
        console.error("Error al obtener el diario:", error);
        res.status(500).json({ message: "Error al obtener el diario." });
    }
});
exports.getDiary = getDiary;
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
            return res.status(200).json(existingDiary);
        }
        else {
            // Si no existe, crear un nuevo registro
            const newDiary = yield diaryData_1.default.create(req.body);
            return res.status(201).json(newDiary);
        }
    }
    catch (error) {
        console.error("❌ Error al guardar el diario:", error);
        res.status(400).json({ message: "Error al guardar el diario." });
    }
});
exports.postDiary = postDiary;
const deleteDiary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield diaryData_1.default.findByPk(req.params.id);
        if (!data) {
            return res.status(404).send('Not Found');
        }
        yield data.destroy();
        res.status(204).send();
    }
    catch (error) {
        console.error("Error al eliminar el diario:", error);
        res.status(500).json({ message: "Error al eliminar el diario." });
    }
});
exports.deleteDiary = deleteDiary;
exports.default = router;
