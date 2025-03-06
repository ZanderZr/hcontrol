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
/**
 * @description Obtiene todos los "boards" desde la base de datos y los devuelve en formato JSON.
 * @route GET /boards
 * @returns {Array} - Lista de objetos board.
 * @throws {500} - Si ocurre un error al obtener los datos.
 */
const getAllBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield board_1.default.findAll(); // Obtiene todos los boards de la base de datos
        res.json(data); // Devuelve los boards en formato JSON
    }
    catch (error) {
        console.error("Error al obtener el diario:", error);
        res.status(500).json({ message: "Error al obtener las mediciones." }); // En caso de error, devuelve código 500
    }
});
exports.getAllBoard = getAllBoard;
/**
 * @description Crea un nuevo "board" y lo guarda en la base de datos.
 * @route POST /boards
 * @param {Object} req.body - El cuerpo de la solicitud debe contener los datos del nuevo board.
 * @returns {Object} - El objeto board creado.
 * @throws {400} - Si ocurre un error al guardar el board.
 */
const postBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const board = req.body; // Obtiene los datos del board desde el cuerpo de la solicitud
        yield board_1.default.create(board); // Crea un nuevo board en la base de datos
        return res.status(201).json(board); // Devuelve el board recién creado con código de estado 201
    }
    catch (error) {
        console.error("❌ Error al guardar el board:", error);
        res.status(400).json({ message: "Error al guardar el board." }); // En caso de error, devuelve código 400
    }
});
exports.postBoard = postBoard;
exports.default = router;
