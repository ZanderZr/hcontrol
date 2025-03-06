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
exports.default = router;
