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
exports.deleteRoutine = exports.putRoutine = exports.postRoutine = exports.getRoutine = exports.getAllRoutine = void 0;
const express_1 = require("express");
const routine_1 = __importDefault(require("../models/routine"));
const router = (0, express_1.Router)();
const getAllRoutine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield routine_1.default.findAll();
        res.json(data);
    }
    catch (error) {
        console.error("Error al obtener las rutinas:", error);
        res.status(500).json({ message: "Error al obtener las rutinas." });
    }
});
exports.getAllRoutine = getAllRoutine;
const getRoutine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield routine_1.default.findByPk(req.params.id);
        if (data) {
            res.json(data);
        }
        else {
            res.status(404).send('Not Found');
        }
    }
    catch (error) {
        console.error("Error al obtener la rutina:", error);
        res.status(500).json({ message: "Error al obtener la rutina." });
    }
});
exports.getRoutine = getRoutine;
const postRoutine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield routine_1.default.create(req.body);
        res.status(201).json(data);
    }
    catch (error) {
        console.error("Error al crear la rutina:", error);
        res.status(400).json({ message: "Error al crear la rutina." });
    }
});
exports.postRoutine = postRoutine;
const putRoutine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield routine_1.default.findByPk(req.params.id);
        if (!data) {
            return res.status(404).send('Not Found');
        }
        yield data.update(req.body);
        res.json(data);
    }
    catch (error) {
        console.error("Error al actualizar la rutina:", error);
        res.status(500).json({ message: "Error al actualizar la rutina." });
    }
});
exports.putRoutine = putRoutine;
const deleteRoutine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield routine_1.default.findByPk(req.params.id);
        if (!data) {
            return res.status(404).send('Not Found');
        }
        yield data.destroy();
        res.status(204).send();
    }
    catch (error) {
        console.error("Error al eliminar la rutina:", error);
        res.status(500).json({ message: "Error al eliminar la rutina." });
    }
});
exports.deleteRoutine = deleteRoutine;
exports.default = router;
