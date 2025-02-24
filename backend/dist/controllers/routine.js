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
// Obtener todas las rutinas con sus ejercicios
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
// Obtener una rutina con sus ejercicios
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
// Crear una nueva rutina con ejercicios
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
// Actualizar una rutina y sus ejercicios
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
// Eliminar una rutina y sus relaciones con ejercicios
const deleteRoutine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const routine = yield routine_1.default.findByPk(req.params.id);
        if (!routine) {
            return res.status(404).send('Not Found');
        }
        yield routineExercises_1.default.destroy({ where: { routine_id: routine.id } });
        yield routine.destroy();
        res.status(204).send();
    }
    catch (error) {
        console.error("Error al eliminar la rutina:", error);
        res.status(500).json({ message: "Error al eliminar la rutina." });
    }
});
exports.deleteRoutine = deleteRoutine;
exports.default = router;
