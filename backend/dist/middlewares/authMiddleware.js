"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseJsonBody = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    var _a;
    const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // Suponiendo que el token se envía como 'Bearer <token>'
    if (!token) {
        return res.status(401).json({ message: 'No se proporcionó token' });
    }
    jsonwebtoken_1.default.verify(token, 'jcKey', (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido' });
        }
        // Guardar el id del usuario decodificado en la request para usar en las siguientes rutas
        req.body.userId = decoded.id;
        next();
    });
};
exports.verifyToken = verifyToken;
const parseJsonBody = (req, res, next) => {
    // Si el header no es application/json
    if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
        let rawData = '';
        req.setEncoding('utf8');
        req.on('data', (chunk) => {
            rawData += chunk;
        });
        req.on('end', () => {
            if (rawData) {
                try {
                    req.body = JSON.parse(rawData);
                }
                catch (error) {
                    console.error('Error al parsear JSON:', error);
                    return res.status(400).json({ message: 'JSON inválido' });
                }
            }
            next();
        });
    }
    else {
        next();
    }
};
exports.parseJsonBody = parseJsonBody;
