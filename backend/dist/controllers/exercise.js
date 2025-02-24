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
exports.deleteExercise = exports.putExercise = exports.postExercise = exports.getExercise = exports.getAllExercise = void 0;
const express_1 = require("express");
const exercise_1 = __importDefault(require("../models/exercise"));
const router = (0, express_1.Router)();
const getAllExercise = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // Obtener el id de los parámetros de la solicitud
    try {
        const data = yield exercise_1.default.findAll({ where: { idUser: id } });
        res.json(data);
    }
    catch (error) {
        console.error("Error al obtener los ejercicios:", error);
        res.status(500).json({ message: "Error al obtener los ejercicios." });
    }
});
exports.getAllExercise = getAllExercise;
const getExercise = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield exercise_1.default.findByPk(req.params.id);
        if (data) {
            res.json(data);
        }
        else {
            res.status(404).send('Not Found');
        }
    }
    catch (error) {
        console.error("Error al obtener el ejercicio:", error);
        res.status(500).json({ message: "Error al obtener el ejercicio." });
    }
});
exports.getExercise = getExercise;
const postExercise = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, idUser, exec_time, max_weight, max_rep } = req.body;
        // Validar que los campos requeridos están presentes
        if (!name || !idUser) {
            return res.status(400).json({ message: "El nombre y el idUser son obligatorios." });
        }
        console.log("Datos recibidos en req.body:", req.body);
        // Buscar si ya existe un ejercicio con el mismo nombre y usuario
        let exercise = yield exercise_1.default.findOne({ where: { name, idUser } });
        if (exercise) {
            console.log("Ejercicio encontrado, actualizando...");
            exercise.exec_time = exec_time;
            exercise.max_weight = max_weight;
            exercise.max_rep = max_rep;
            yield exercise.save();
            return res.status(200).json({ message: "Ejercicio actualizado", exercise });
        }
        // Si no existe, crear un nuevo ejercicio solo con los campos permitidos
        console.log("Ejercicio no encontrado, creando uno nuevo...");
        const newExercise = yield exercise_1.default.create({
            name,
            idUser,
            exec_time,
            max_weight,
            max_rep
        });
        return res.status(201).json({ message: "Ejercicio creado", newExercise });
    }
    catch (error) {
        console.error("Error detallado:", error);
        res.status(500).json({ message: "Error en el servidor.", error });
    }
});
exports.postExercise = postExercise;
const putExercise = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield exercise_1.default.findByPk(req.params.id);
        if (!data) {
            return res.status(404).send('Not Found');
        }
        yield data.update(req.body);
        res.json(data);
    }
    catch (error) {
        console.error("Error al actualizar el ejercicio:", error);
        res.status(500).json({ message: "Error al actualizar el ejercicio." });
    }
});
exports.putExercise = putExercise;
const deleteExercise = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield exercise_1.default.findByPk(req.params.id);
        if (!data) {
            return res.status(404).send('Not Found');
        }
        yield data.destroy();
        res.status(204).send();
    }
    catch (error) {
        console.error("Error al eliminar el ejercicio:", error);
        res.status(500).json({ message: "Error al eliminar el ejercicio." });
    }
});
exports.deleteExercise = deleteExercise;
exports.default = router;
