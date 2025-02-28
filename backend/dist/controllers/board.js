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
exports.postBoard = exports.getAllBoard = void 0;
const express_1 = require("express");
const board_1 = __importDefault(require("../models/board"));
const router = (0, express_1.Router)();
const getAllBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield board_1.default.findAll();
        res.json(data);
    }
    catch (error) {
        console.error("Error al obtener el diario:", error);
        res.status(500).json({ message: "Error al obtener las mediciones." });
    }
});
exports.getAllBoard = getAllBoard;
const postBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const board = req.body;
        yield board_1.default.create(board);
        return res.status(201).json(board);
    }
    catch (error) {
        console.error("❌ Error al guardar el board:", error);
        res.status(400).json({ message: "Error al guardar el board." });
    }
});
exports.postBoard = postBoard;
exports.default = router;
