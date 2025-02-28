"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const board_1 = require("../controllers/board");
const router = (0, express_1.Router)();
router.get('/', board_1.getAllBoard);
router.post('/', board_1.postBoard);
exports.default = router;
