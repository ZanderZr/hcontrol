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
exports.registerUser = exports.loginUser = void 0;
const express_1 = require("express");
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = (0, express_1.Router)();
// Clave secreta para JWT desde variables de entorno
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET no está definido en las variables de entorno.");
}
/**
 * @description Inicia sesión de un usuario.
 * @route POST /login
 * @param {string} req.body.email - El correo electrónico del usuario.
 * @param {string} req.body.password - La contraseña del usuario.
 * @returns {Object} - Devuelve un objeto con el token JWT y los datos del usuario.
 * @throws {401} - Si las credenciales son incorrectas.
 * @throws {500} - Si ocurre un error en el servidor.
 */
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_1.default.findOne({ where: { email } });
        if (!user)
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch)
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        // 🔥 Devolver también los datos del usuario junto con el token
        res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                role: user.role
            }
        });
    }
    catch (error) {
        console.error("Error en el login:", error);
        res.status(500).json({ message: "Error en el servidor." });
    }
});
exports.loginUser = loginUser;
/**
 * @description Registra un nuevo usuario.
 * @route POST /register
 * @param {string} req.body.email - El correo electrónico del usuario.
 * @param {string} req.body.username - El nombre de usuario.
 * @param {string} req.body.password - La contraseña del usuario.
 * @param {string} req.body.role - El rol del usuario.
 * @returns {Object} - Devuelve un mensaje de éxito con el ID del usuario creado.
 * @throws {400} - Si ocurre un error al registrar el usuario.
 */
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, username, password, role } = req.body;
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield user_1.default.create({ email, username, password: hashedPassword, role });
        res.status(201).json({ message: 'Usuario creado', userId: newUser.id });
    }
    catch (error) {
        console.error("Error en el registro:", error);
        res.status(400).json({ message: "Error al registrar usuario." });
    }
});
exports.registerUser = registerUser;
exports.default = router;
