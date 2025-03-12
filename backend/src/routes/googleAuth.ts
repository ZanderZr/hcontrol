import { Router } from 'express';
import { authGoogle } from '../controllers/googleAuth';

const router = Router();

router.post('/', authGoogle)
// Ruta para redirigir a Google
/* router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Ruta de callback después del login en Google
router.get('/google/callback', passport.authenticate('google', { session: false }),
    (req, res) => {
        // Extraer token del usuario autenticado
        const user = req.user as any;
        res.redirect(`http://localhost:4200/login-success?token=${user.token}`);
    }
); */

export default router;
