"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routine_1 = require("../controllers/routine");
const router = (0, express_1.Router)();
/**
 * @route GET /api/routines/:id
 * @description Obtiene todas las rutinas de un usuario específico.
 * @access Público
 */
router.get('/:id', routine_1.getAllRoutinesById);
/**
 * @route GET /api/routines/details/:id
 * @description Obtiene los detalles de una rutina específica.
 * @access Público
 */
router.get('/details/:id', routine_1.getRoutine);
/**
 * @route POST /api/routines
 * @description Crea una nueva rutina.
 * @access Público
 */
router.post('/', routine_1.postRoutine);
/**
 * @route PUT /api/routines/:id
 * @description Actualiza una rutina existente por ID.
 * @access Público
 */
router.put('/:id', routine_1.putRoutine);
/**
 * @route DELETE /api/routines/:id
 * @description Elimina una rutina por ID.
 * @access Público
 */
router.delete('/:id', routine_1.deleteRoutine);
exports.default = router;
