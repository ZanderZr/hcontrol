import { Router } from "express";
import { loginUser, registerUser, verifyEmail } from "../controllers/user";

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

/**
 * @route GET /api/users/verify-email
 * @description Verifica la cuenta del usuario mediante un token
 * @access Público
 */
router.get('/verify-email', verifyEmail);


export default router;
