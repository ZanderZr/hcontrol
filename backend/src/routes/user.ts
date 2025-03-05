import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user";

const router = Router();

/**
 * @route POST /api/users/register
 * @description Registra un nuevo usuario en la plataforma.
 * @access Público
 */
router.post('/register', registerUser);

/**
 * @route POST /api/users/login
 * @description Inicia sesión y devuelve un token de autenticación.
 * @access Público
 */
router.post('/login', loginUser);

export default router;
