"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const board_1 = require("../controllers/board");
const router = (0, express_1.Router)();
/**
 * @route GET /api/boards
 * @description Obtiene todos los registros de la tabla Board.
 * @access Público
 */
router.get('/', board_1.getAllBoard);
/**
 * @route POST /api/boards
 * @description Crea un nuevo registro en la tabla Board.
 * @access Público
 */
router.post('/', board_1.postBoard);
exports.default = router;
