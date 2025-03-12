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
exports.verifyEmail = exports.registerUser = exports.loginUser = void 0;
const express_1 = require("express");
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const router = (0, express_1.Router)();
// Clave secreta para JWT desde variables de entorno
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET no está definido en las variables de entorno.");
}
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, // Define estas variables en el .env
        pass: process.env.EMAIL_PASS
    }
});
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
        if (!user.verified)
            return res.status(401).json({ message: 'No verficado' });
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
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, username, password, role } = req.body;
        const existingUser = yield user_1.default.findOne({ where: { email } });
        if (existingUser)
            return res.status(400).json({ message: "El usuario ya existe" });
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        yield user_1.default.create({
            email,
            username,
            password: hashedPassword,
            role,
            verified: false // Asegúrate de tener este campo en tu modelo User
        });
        // Generar token de verificación
        const verifyToken = jsonwebtoken_1.default.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
        // Enviar email con enlace de verificación
        const verifyLink = `http://localhost:4200/verify-email?token=${verifyToken}`;
        // Aquí verificamos si el transporte de correo se creó correctamente
        const emailSent = yield transporter.sendMail({
            from: '"Mi App" <tuemail@gmail.com>',
            to: email,
            subject: "Verifica tu cuenta",
            html: `<p>Haz clic en este enlace para verificar tu cuenta: <a href="${verifyLink}">Verificar</a></p>`
        });
        // Verificar si se envió el correo exitosamente
        if (!emailSent) {
            console.log("Error al enviar el correo de verificación.");
            return res.status(500).json({ message: "Error al enviar el correo de verificación." });
        }
        res.status(201).json({ message: "Usuario registrado, revisa tu correo para verificar tu cuenta." });
    }
    catch (error) {
        console.error("Error en el registro:", error);
        res.status(400).json({ message: "Error al registrar usuario." });
    }
});
exports.registerUser = registerUser;
const verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.query;
        if (!token)
            return res.status(400).json({ message: "Token requerido" });
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        const user = yield user_1.default.findOne({ where: { email: decoded.email } });
        if (!user)
            return res.status(400).json({ message: "Usuario no encontrado" });
        user.verified = true;
        yield user.save();
        res.json({ message: "Email verificado con éxito" });
    }
    catch (error) {
        console.error("Error en la verificación:", error);
        res.status(400).json({ message: "Token inválido o expirado" });
    }
});
exports.verifyEmail = verifyEmail;
exports.default = router;
