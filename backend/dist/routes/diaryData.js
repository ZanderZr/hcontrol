"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const diaryData_1 = require("../controllers/diaryData");
const router = (0, express_1.Router)();
/**
 * @route GET /api/diary/:id
 * @description Obtiene todos los registros de diario de un usuario específico.
 * @access Público
 */
router.get('/:id', diaryData_1.getAllDiary);
/**
 * @route POST /api/diary
 * @description Crea un nuevo registro en el diario.
 * @access Público
 */
router.post('/', diaryData_1.postDiary);
/**
 * @route DELETE /api/diary/:id
 * @description Elimina un registro del diario por ID.
 * @access Público
 */
router.delete('/:id', diaryData_1.deleteDiary);
exports.default = router;
