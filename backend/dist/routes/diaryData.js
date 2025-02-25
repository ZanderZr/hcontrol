"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const diaryData_1 = require("../controllers/diaryData");
const router = (0, express_1.Router)();
router.get('/:id', diaryData_1.getAllDiary);
/* router.get('/', getDiary);
 */
router.post('/', diaryData_1.postDiary);
router.delete('/:id', diaryData_1.deleteDiary);
exports.default = router;
