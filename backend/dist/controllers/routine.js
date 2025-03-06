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
exports.deleteRoutine = exports.putRoutine = exports.postRoutine = exports.getRoutine = exports.getAllRoutinesById = void 0;
const express_1 = require("express");
const routine_1 = __importDefault(require("../models/routine"));
const routineExercises_1 = __importDefault(require("../models/routineExercises"));
const router = (0, express_1.Router)();
/**
 * @description Obtiene todas las rutinas de un usuario con sus respectivos ejercicios.
 * @route GET /routines/:id
 * @param {string} id - El ID del usuario cuyas rutinas se deben obtener.
 * @returns {Array} - Lista de rutinas formateadas con los ejercicios asociados.
 * @throws {500} - Si ocurre un error al obtener las rutinas o los ejercicios.
 */
const getAllRoutinesById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params; // Obtener el id de los parámetros de la solicitud
        const routines = yield routine_1.default.findAll({ where: { idUser: id } });
        const routineExercises = yield routineExercises_1.default.findAll();
        const formattedRoutines = routines.map(routine => {
            const exercisesForRoutine = routineExercises
                .filter(re => re.routine_id === routine.id)
                .map(re => re.exercise_name);
            return {
                id: routine.id,
                idUser: routine.idUser,
                name: routine.name,
                description: routine.description,
                exercises: exercisesForRoutine
            };
        });
        res.json(formattedRoutines);
    }
    catch (error) {
        console.error("Error al obtener las rutinas:", error);
        res.status(500).json({ message: "Error al obtener las rutinas." });
    }
});
exports.getAllRoutinesById = getAllRoutinesById;
/**
 * @description Obtiene una rutina específica con sus ejercicios.
 * @route GET /routines/:id
 * @param {string} id - El ID de la rutina que se debe obtener.
 * @returns {Object} - La rutina con su información y lista de ejercicios.
 * @throws {404} - Si no se encuentra la rutina.
 * @throws {500} - Si ocurre un error al obtener la rutina o los ejercicios.
 */
const getRoutine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const routine = yield routine_1.default.findByPk(req.params.id);
        if (!routine) {
            return res.status(404).send('Not Found');
        }
        const routineExercises = yield routineExercises_1.default.findAll({
            where: { routine_id: routine.id }
        });
        res.json({
            id: routine.id,
            idUser: routine.idUser,
            name: routine.name,
            description: routine.description,
            exercises: routineExercises.map(re => re.exercise_name)
        });
    }
    catch (error) {
        console.error("Error al obtener la rutina:", error);
        res.status(500).json({ message: "Error al obtener la rutina." });
    }
});
exports.getRoutine = getRoutine;
/**
 * @description Crea una nueva rutina junto con los ejercicios asociados.
 * @route POST /routines
 * @param {Object} req.body - Datos de la rutina y los ejercicios asociados.
 * @param {string} req.body.idUser - El ID del usuario propietario de la rutina.
 * @param {string} req.body.name - El nombre de la rutina.
 * @param {string} req.body.description - La descripción de la rutina.
 * @param {Array} req.body.exercises - Lista de nombres de ejercicios para asociar con la rutina.
 * @returns {Object} - La rutina creada con los ejercicios asociados.
 * @throws {400} - Si ocurre un error al crear la rutina o asociar los ejercicios.
 */
const postRoutine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idUser, name, description, exercises } = req.body;
        // Crear la rutina
        const routine = yield routine_1.default.create({ idUser, name, description });
        // Agregar los ejercicios a la rutina
        if (exercises && exercises.length > 0) {
            const routineExercises = exercises.map((exercise_name) => ({
                routine_id: routine.id,
                exercise_name
            }));
            yield routineExercises_1.default.bulkCreate(routineExercises);
        }
        res.status(201).json(Object.assign(Object.assign({}, routine.toJSON()), { exercises }));
    }
    catch (error) {
        console.error("Error al crear la rutina:", error);
        res.status(400).json({ message: "Error al crear la rutina." });
    }
});
exports.postRoutine = postRoutine;
/**
 * @description Actualiza una rutina y sus ejercicios asociados.
 * @route PUT /routines/:id
 * @param {string} id - El ID de la rutina que se debe actualizar.
 * @param {Object} req.body - Los nuevos datos de la rutina y ejercicios.
 * @param {string} req.body.idUser - El ID del usuario propietario de la rutina.
 * @param {string} req.body.name - El nuevo nombre de la rutina.
 * @param {string} req.body.description - La nueva descripción de la rutina.
 * @param {Array} req.body.exercises - Lista de nuevos ejercicios para asociar con la rutina.
 * @returns {Object} - La rutina actualizada con los ejercicios asociados.
 * @throws {404} - Si no se encuentra la rutina para actualizar.
 * @throws {500} - Si ocurre un error al actualizar la rutina o los ejercicios.
 */
const putRoutine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idUser, name, description, exercises } = req.body;
        const routine = yield routine_1.default.findByPk(req.params.id);
        if (!routine) {
            return res.status(404).send('Not Found');
        }
        yield routine.update({ idUser, name, description });
        // Actualizar los ejercicios asociados
        if (exercises) {
            yield routineExercises_1.default.destroy({ where: { routine_id: routine.id } });
            const newRoutineExercises = exercises.map((exercise_name) => ({
                routine_id: routine.id,
                exercise_name
            }));
            yield routineExercises_1.default.bulkCreate(newRoutineExercises);
        }
        res.json(Object.assign(Object.assign({}, routine.toJSON()), { exercises }));
    }
    catch (error) {
        console.error("Error al actualizar la rutina:", error);
        res.status(500).json({ message: "Error al actualizar la rutina." });
    }
});
exports.putRoutine = putRoutine;
/**
 * @description Elimina una rutina y sus ejercicios asociados.
 * @route DELETE /routines/:id
 * @param {string} id - El ID de la rutina que se debe eliminar.
 * @returns {void} - Respuesta vacía si la rutina y sus ejercicios se eliminan correctamente.
 * @throws {404} - Si no se encuentra la rutina para eliminar.
 * @throws {500} - Si ocurre un error al eliminar la rutina o los ejercicios.
 */
const deleteRoutine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const routine = yield routine_1.default.findByPk(req.params.id);
        if (!routine) {
            return res.status(404).send('Not Found');
        }
        yield routineExercises_1.default.destroy({ where: { routine_id: routine.id } });
        yield routine.destroy();
        res.status(204).send(); // Respuesta vacía con código de estado 204 (Eliminación exitosa)
    }
    catch (error) {
        console.error("Error al eliminar la rutina:", error);
        res.status(500).json({ message: "Error al eliminar la rutina." });
    }
});
exports.deleteRoutine = deleteRoutine;
exports.default = router;
