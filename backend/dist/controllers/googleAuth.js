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
exports.authGoogle = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_1 = require("express");
const google_auth_library_1 = require("google-auth-library");
const user_1 = __importDefault(require("../models/user")); // Asegúrate de que la ruta al modelo User sea correcta
const uuid_1 = require("uuid");
const router = (0, express_1.Router)();
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID; // Usar variable de entorno para CLIENT_ID
const JWT_SECRET = process.env.JWT_SECRET;
const authGoogle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Solicitud recibida desde Google Sign-In');
    console.log('Query Params:', req.query);
    const credential = req.body.credential || req.query.credential;
    console.log('Credential:', credential);
    if (!CLIENT_ID) {
        console.error('GOOGLE_CLIENT_ID no está configurado en las variables de entorno.');
        return res.status(500).send('Internal Server Error');
    }
    const client = new google_auth_library_1.OAuth2Client(CLIENT_ID);
    function verify() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ticket = yield client.verifyIdToken({
                    idToken: credential,
                    audience: CLIENT_ID,
                });
                const payload = ticket.getPayload();
                if (!payload) {
                    throw new Error('Invalid token payload');
                }
                const userId = payload['sub'];
                console.log('User ID:', userId);
                console.log('Payload:', payload);
                return payload;
            }
            catch (error) {
                console.error('Error verifying token:', error);
                throw error; // Re-lanzar el error para que el bloque try...catch exterior lo maneje
            }
        });
    }
    try {
        const payload = yield verify();
        // Crear o buscar el usuario
        const [user, created] = yield user_1.default.findOrCreate({
            where: { email: payload.email },
            defaults: {
                username: payload.name,
                password: (0, uuid_1.v4)(),
                role: 'USER',
                verified: true,
            },
        });
        if (created) {
            console.log(`Usuario ${user.email} creado.`);
        }
        else {
            console.log(`Usuario ${user.email} encontrado.`);
        }
        if (!JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined in the environment variables.');
        }
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            email: user.email,
            username: user.username, // ✅ Agregar username
            role: user.role, // ✅ Agregar role
            verified: user.verified // ✅ Agregar verified
        }, JWT_SECRET, { expiresIn: '1h' });
        // 🔥 Redirigir con el token en la URL
        res.redirect(`http://localhost:4200/auth/callback?token=${token}`);
    }
    catch (error) {
        console.error('Error verifying token or creating user:', error);
        res.status(401).send('Unauthorized');
    }
});
exports.authGoogle = authGoogle;
exports.default = router;
