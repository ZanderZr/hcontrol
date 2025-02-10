"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routine_1 = require("../controllers/routine");
const router = (0, express_1.Router)();
router.get('/', routine_1.getAllRoutine);
router.get('/:id', routine_1.getRoutine);
router.post('/:id', routine_1.postRoutine);
router.put('/:id', routine_1.putRoutine);
router.delete('/:id', routine_1.deleteRoutine);
exports.default = router;
