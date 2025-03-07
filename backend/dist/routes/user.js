"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const router = (0, express_1.Router)();
/**
 * @route POST /api/users/register
 * @description Registra un nuevo usuario en la plataforma.
 * @access Público
 */
router.post('/register', user_1.registerUser);
/**
 * @route POST /api/users/login
 * @description Inicia sesión y devuelve un token de autenticación.
 * @access Público
 */
router.post('/login', user_1.loginUser);
/**
 * @route GET /api/users/verify-email
 * @description Verifica la cuenta del usuario mediante un token
 * @access Público
 */
router.get('/verify-email', user_1.verifyEmail);
exports.default = router;
