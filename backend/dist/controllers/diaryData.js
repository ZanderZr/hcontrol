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
exports.deleteDiary = exports.postDiary = exports.getDiary = exports.getAllDiary = void 0;
const express_1 = __importDefault(require("express"));
const diaryData_1 = __importDefault(require("../models/diaryData"));
const router = express_1.default.Router();
const getAllDiary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield diaryData_1.default.findAll();
        res.json(data);
    }
    catch (error) {
        console.error("Error al obtener el diario:", error);
        res.status(500).json({ message: "Error al obtener las mediciones." });
    }
});
exports.getAllDiary = getAllDiary;
const getDiary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield diaryData_1.default.findByPk(req.params.id);
        if (data) {
            res.json(data);
        }
        else {
            res.status(404).send('Not Found');
        }
    }
    catch (error) {
        console.error("Error al obtener el diario:", error);
        res.status(500).json({ message: "Error al obtener el diario." });
    }
});
exports.getDiary = getDiary;
const postDiary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield diaryData_1.default.create(req.body);
        res.status(201).json(data);
    }
    catch (error) {
        console.error("Error al crear el diario:", error);
        res.status(400).json({ message: "Error al crear el diario." });
    }
});
exports.postDiary = postDiary;
const deleteDiary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield diaryData_1.default.findByPk(req.params.id);
        if (!data) {
            return res.status(404).send('Not Found');
        }
        yield data.destroy();
        res.status(204).send();
    }
    catch (error) {
        console.error("Error al eliminar el diario:", error);
        res.status(500).json({ message: "Error al eliminar el diario." });
    }
});
exports.deleteDiary = deleteDiary;
exports.default = router;
