"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const exercise_1 = require("../controllers/exercise");
const router = (0, express_1.Router)();
/**
 * @route GET /api/exercises/:id
 * @description Obtiene todos los ejercicios de un usuario específico.
 * @access Público
 */
router.get('/:id', exercise_1.getAllExercise);
/**
 * @route POST /api/exercises
 * @description Crea un nuevo ejercicio.
 * @access Público
 */
router.post('/', exercise_1.postExercise);
/**
 * @route PUT /api/exercises/:id
 * @description Actualiza un ejercicio por ID.
 * @access Público
 */
router.put('/:id', exercise_1.putExercise);
/**
 * @route DELETE /api/exercises/:id
 * @description Elimina un ejercicio por ID.
 * @access Público
 */
router.delete('/:id', exercise_1.deleteExercise);
exports.default = router;
